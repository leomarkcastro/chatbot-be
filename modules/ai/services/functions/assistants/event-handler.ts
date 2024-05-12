import OpenAI from "openai";
import { EventEmitter } from "stream";
import { FunctionSet } from "../../types/functionSet";

export const SLEEP = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export class EventHandler extends EventEmitter {
  client: OpenAI;
  onResponse: (response: string) => void;
  onFunctionCall: (functionName: string, args: any) => any;
  onFunctionFetch: (functionName: string, data: any) => any;
  onDone: () => void;
  functions: FunctionSet = {};

  constructor(args: {
    client: OpenAI;
    onResponse: (response: string) => void;
    onFunctionCall: (functionName: string, args: any) => any;
    onFunctionFetch: (functionName: string, data: any) => any;
    onDone: () => void;
    functions: FunctionSet;
  }) {
    super();
    this.client = args.client;
    this.onResponse = args.onResponse;
    this.onFunctionCall = args.onFunctionCall;
    this.onFunctionFetch = args.onFunctionFetch;
    this.onDone = args.onDone;
    this.functions = args.functions;
  }

  async onEvent(event: any) {
    try {
      if (event.event === "thread.message.delta") {
        // process.stdout.write(event.data.delta.content?.[0]?.text?.value);
        // console.log(JSON.stringify(event));
        this.onResponse(event.data.delta.content?.[0]?.text?.value);
      }
      // Retrieve events that are denoted with 'requires_action'
      // since these will have our tool_calls
      if (event.event === "thread.run.requires_action") {
        await this.handleRequiresAction(
          event.data,
          event.data.id,
          event.data.thread_id,
        );
      }

      // Handle the completion of the run
      if (event.event === "thread.run.completed") {
        this.onDone();
      }
    } catch (error) {
      console.error("Error handling event:", error);
    }
  }

  async handleRequiresAction(data: any, runId: string, threadId: string) {
    try {
      const toolOutputs = [];

      for (const toolCall of data.required_action.submit_tool_outputs
        .tool_calls) {
        const call_id = toolCall.id;
        const _fxName = toolCall.function.name;
        const _args = JSON.parse(toolCall.function.arguments ?? "{}");
        const _fx = this.functions[_fxName];

        if (_fx.meta) {
          _args["meta"] = _fx.meta;
        }

        // console.log("Calling function:", _fxName, "with args:", _args);
        this.onFunctionCall(_fxName, _args);
        const result = await _fx.function(_args);

        this.onFunctionFetch(_fxName, JSON.stringify(result));

        toolOutputs.push({
          tool_call_id: call_id,
          output: JSON.stringify(result),
        });
      }

      // console.log(toolOutputs);

      // Submit all the tool outputs at the same time
      await this.submitToolOutputs(toolOutputs, runId, threadId);
    } catch (error) {
      console.error("Error processing required action:", error);
    }
  }

  async submitToolOutputs(toolOutputs: any, runId: string, threadId: string) {
    try {
      // Use the submitToolOutputsStream helper
      const stream = this.client.beta.threads.runs.submitToolOutputsStream(
        threadId,
        runId,
        { tool_outputs: toolOutputs },
      );
      for await (const event of stream) {
        this.emit("event", event);
      }
    } catch (error) {
      console.error("Error submitting tool outputs:", error);
    }
  }
}
