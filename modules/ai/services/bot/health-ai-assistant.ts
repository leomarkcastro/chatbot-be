import { KeystoneContext } from "@keystone-6/core/types";
import { GlobalTypeInfo } from "../../../../common/types";
import { CONFIG } from "../../../../utils/config/env";
import { EventHandler, SLEEP } from "../functions/assistants/event-handler";
import { getHealthAIFunctions } from "../lib/cms-openapi";
import { openai } from "../lib/openai";

export async function healthAiAssistant(args: {
  threadId: string;
  query: string;
  eventHandler: (data: {
    _type: "response" | "function_call" | "function_fetch" | "done";
    [key: string]: any;
  }) => void;
  keystoneArgs: KeystoneContext<GlobalTypeInfo>;
}) {
  const threadId = args.threadId;

  const assistantID = CONFIG.HEALTHBOT_ASSISTANT_ID;

  const fx = await getHealthAIFunctions({
    keystone: args.keystoneArgs,
    metadata: {},
    sessionID: threadId,
  });

  let system = {
    running: true,
  };
  const query = args.query;

  const eventHandler = new EventHandler({
    client: openai,
    onResponse: (response) => {
      // process.stdout.write(response);
      args.eventHandler({ _type: "response", response });
    },
    onFunctionCall: (functionName, functionArgs) => {
      args.eventHandler({
        _type: "function_call",
        functionName,
        functionArgs,
      });
      // process.stdout.write(`\nCalling function: ${functionName}\n`);
    },
    onFunctionFetch: (functionName, functionData) => {
      args.eventHandler({
        _type: "function_fetch",
        functionName,
        functionData,
      });
      // process.stdout.write(`\nFunction ${functionName} returned: ${data}\n`);
    },
    onDone: () => {
      // console.log("Session ended.");
      // process.stdout.write("\n");
      system.running = false;
    },
    functions: fx,
  });
  eventHandler.on("event", eventHandler.onEvent.bind(eventHandler));

  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: query,
  });

  const stream = await openai.beta.threads.runs.stream(
    threadId,
    { assistant_id: assistantID },
    // @ts-ignore
    eventHandler,
  );

  for await (const event of stream) {
    eventHandler.emit("event", event);
  }

  while (system.running) {
    await SLEEP(1000);
  }

  args.eventHandler({ _type: "done" });
  // console.log("Sysrun", system.running);

  return system;
}
