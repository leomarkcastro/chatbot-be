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

export async function completionChatStream(args: {
  prompt: string | null;
  streamFunction: (
    args:
      | { _type: "content"; content: string }
      | { _type: "setfunction" }
      | { _type: "stop" }
      | { _type: "callfunction"; content: string }
  ) => any;
  context?: ChatCompletionMessageParam[];
  history?: ChatCompletionMessageParam[];
  model?: ChatModel;
  responseFormat?: "json_object" | "text";
  functions?: FunctionSet;
  quickFunction?: boolean;
  verbose?: boolean;
}) {
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
    tool_choice: functionDefinition.length > 0 ? "auto" : undefined,
    tools: functionDefinition.length > 0 ? functionDefinition : undefined,
    response_format: {
      type: responseFormat,
    },
    stream: true,
  });

  let functionCalling = false;
  let finish_reason = "";
  let role = "";
  let functionCall: Record<
    string,
    {
      name: string;
      args: any;
    }
  > = {};
  let content = "";

  for await (const resp of response) {
    const responseObject = resp.choices[0];

    if (responseObject.finish_reason) {
      finish_reason = responseObject.finish_reason;
      break;
    }

    role = responseObject.delta.role || role;

    if (!functionCalling && responseObject.delta.content) {
      args.streamFunction({
        _type: "content",
        content: responseObject.delta.content,
      });
      content += responseObject.delta.content;
    }

    // check if tool_calls exist
    if (responseObject.delta.tool_calls) {
      functionCalling = true;
      await args.streamFunction({ _type: "setfunction" });
      for (const tool of responseObject.delta.tool_calls) {
        let _index = tool.index;
        let _fx = tool.function?.name;
        let _args = tool.function?.arguments;

        if (!functionCall[_index]) {
          functionCall[_index] = {
            name: "",
            args: "",
          };
        }

        if (_fx) {
          functionCall[_index].name = _fx;
        }

        if (_args) {
          functionCall[_index].args += _args;
        }
      }
    }
  }

  if (finish_reason == "stop") {
    await args.streamFunction({ _type: "stop" });
  }

  const action = finish_reason;

  if (args.verbose)
    console.log(
      JSON.stringify(
        {
          action,
          role,
          content,
          functionCall,
        },
        null,
        2
      )
    );

  // console.log("ACTION", action);
  if (action == "tool_calls" || (args.quickFunction && action == "stop")) {
    const toolsToUse = Object.values(functionCall) ?? [];
    if (args.verbose) console.log(JSON.stringify(toolsToUse, null, 2));
    // console.log(toolsToUse.length);
    for (const tool of toolsToUse) {
      // console.log(toolsToUse.length);
      await args.streamFunction({ _type: "callfunction", content: tool.name });
      const _fx = tool.name;
      const _args = JSON.parse(tool.args ?? {});

      const fx = functions[_fx];
      if (!fx) {
        continue;
      }

      if (fx.meta) {
        _args["meta"] = fx.meta;
      }
      const result = await fx.function(_args);

      if (args.verbose) console.log(JSON.stringify(result, null, 2));

      // if (result?._system === "outcome") {
      //   const moveTo = result.moveTo;

      //   console.log("OUTCOME", moveTo);
      //   // summarize the conversation
      //   const ch = await completionChatStream({
      //     prompt: `Condense and summairize the conversation into no more than 2500 words only (e.g. User asked for this, assistant replied/not replied yet. User said that he was something): ${newHistory
      //       .map((msg) => `${msg.role}: ${msg.content}`)
      //       .join("n")}`,
      //   });
      //   // console.log(JSON.stringify(ch, null, 2));

      //   let summary = "";
      //   if (ch?.__type === "response") {
      //     summary = (ch.message.content as string) ?? "";
      //   }
      //   return {
      //     __type: "outcome",
      //     history: [],
      //     context: summary,
      //     moveTo,
      //   };
      // }

      const fxResult = `${_fx}(${JSON.stringify(_args)})=>${JSON.stringify(
        result
      )?.substring(0, MAX_RESPONSE_LENGTH)}.`;

      if (args.verbose) console.log(fxResult);

      newHistory = [
        ...newHistory,
        {
          role: "system",
          content: fxResult,
        },
      ];
    }

    // newHistory = [
    //   ...newHistory,
    //   {
    //     role: "system",
    //     content: "Function call completed. Resuming conversation.",
    //   },
    // ];

    // if (action == "stop") {
    //   return {
    //     __type: "stop",
    //   };
    // }

    if (args.verbose) {
      console.log(JSON.stringify(newHistory, null, 2));
    }
    return completionChatStream({
      prompt: null,
      streamFunction: args.streamFunction,
      history: newHistory,
      model,
      responseFormat,
      functions,
      context,
      quickFunction: args.quickFunction,
      verbose: args.verbose,
    });
  } else if (action == "stop") {
    const newMessage: ChatCompletionMessageParam = {
      role: role as "system" | "user",
      content: content,
    };
    newHistory = [...newHistory, newMessage];
    // console.log("STOP", newMessage);
    return {
      __type: "response",
      message: newMessage,
      history: newHistory,
    };
  }
}
