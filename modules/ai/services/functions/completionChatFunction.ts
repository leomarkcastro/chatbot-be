import {
  ChatCompletionMessageParam,
  ChatCompletionTool,
  ChatModel,
} from "openai/resources";
import { openai } from "../lib/openai";
import { FunctionSet } from "../types/functionSet";

const MAX_RESPONSE_LENGTH = 16000;
const PRUNE_SYSTEM_AFTER = 4;
const PRUNE_HISTORY_AFTER = 15;

export async function completionChat(args: {
  prompt: string | null;
  context?: ChatCompletionMessageParam[];
  history?: ChatCompletionMessageParam[];
  model?: ChatModel;
  responseFormat?: "json_object" | "text";
  functions?: FunctionSet;
  quickFunction?: boolean;
  verbose?: boolean;
}): Promise<
  | {
      __type: "response";
      message: ChatCompletionMessageParam;
      history: ChatCompletionMessageParam[];
    }
  | {
      __type: "outcome";
      history: ChatCompletionMessageParam[];
      context: string;
      moveTo: string;
    }
  | {
      __type: "stop";
    }
  | undefined
> {
  let history = args.history ?? [];
  const prompt = args.prompt;
  const model: ChatModel = args.model ?? "gpt-3.5-turbo";
  const responseFormat = args.responseFormat ?? "text";
  const functions = args.functions ?? {};

  // prune all system messages that is PRUNE_SYSTEM_AFTER messages ago from the end
  history = history.filter((msg, idx) => {
    if (msg.role === "system" && idx < history.length - PRUNE_SYSTEM_AFTER) {
      return false;
    }
    return true;
  });

  //  prune all messages that is PRUNE_HISTORY_AFTER messages ago from the end
  history = history.slice(-PRUNE_HISTORY_AFTER);

  let newHistory = [...history];
  if (prompt) {
    newHistory = [...newHistory, { role: "user", content: prompt }];
  }

  let functionDefinition: ChatCompletionTool[] = Object.values(functions).map(
    (fx) => ({
      type: "function",
      function: fx.definition,
    })
  );
  let context = args.context ?? [];
  const response = await openai.chat.completions.create({
    messages: [...context, ...newHistory],
    model,
    tool_choice:
      functionDefinition.length > 0
        ? args.quickFunction
          ? "required"
          : "auto"
        : undefined,
    tools: functionDefinition.length > 0 ? functionDefinition : undefined,
    response_format: {
      type: responseFormat,
    },
  });

  const responseObject = response.choices[0];

  const action = responseObject.finish_reason;

  if (args.verbose) console.log(JSON.stringify(responseObject, null, 2));

  if (action == "tool_calls" || (args.quickFunction && action == "stop")) {
    const toolsToUse = responseObject.message.tool_calls ?? [];
    for (const tool of toolsToUse) {
      const _fx = tool.function.name;
      const _args = JSON.parse(tool.function.arguments ?? {});

      const fx = functions[_fx];
      if (!fx) {
        continue;
      }

      if (fx.meta) {
        _args["meta"] = fx.meta;
      }
      const result = await fx.function(_args);

      if (args.verbose) console.log(JSON.stringify(result, null, 2));

      if (result?._system === "outcome") {
        const moveTo = result.moveTo;

        console.log("OUTCOME", moveTo);
        // summarize the conversation
        const ch = await completionChat({
          prompt: `Condense and summairize the conversation into no more than 2500 words only (e.g. User asked for this, assistant replied/not replied yet. User said that he was something): ${newHistory
            .map((msg) => `${msg.role}: ${msg.content}`)
            .join("n")}`,
        });
        // console.log(JSON.stringify(ch, null, 2));

        let summary = "";
        if (ch?.__type === "response") {
          summary = (ch.message.content as string) ?? "";
        }
        return {
          __type: "outcome",
          history: [],
          context: summary,
          moveTo,
        };
      }

      const fxResult = `(${_fx})->[${JSON.stringify(result)?.substring(
        0,
        MAX_RESPONSE_LENGTH
      )}]`;
      // console.log(fxResult);
      newHistory = [
        ...newHistory,
        {
          role: "system",
          content: fxResult,
        },
      ];
    }

    if (action == "stop") {
      return {
        __type: "stop",
      };
    }

    return completionChat({
      prompt: null,
      history: newHistory,
      model,
      responseFormat,
      functions,
      context,
      quickFunction: args.quickFunction,
      verbose: args.verbose,
    });
  } else if (action == "stop") {
    const newMessage = responseObject.message;
    newHistory = [...newHistory, newMessage];
    // console.log("STOP", newMessage);
    return {
      __type: "response",
      message: newMessage,
      history: newHistory,
    };
  }
}
