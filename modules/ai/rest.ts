import { z } from "zod";
import {
  NO_INPUT,
  RequestInputType,
  RouteDeclarationList,
  RouteDeclarationMetadata,
  RouteMethod,
} from "../../server/declarations";
import { surveyAiAssistant } from "./services/bot/survey-ai-assistant";
import { createThread } from "./services/functions/threads";

const aiRouteDeclaration: RouteDeclarationList = {
  name: "/ai",
  routes: new Map(),
};

aiRouteDeclaration.routes.set(
  "/start",
  new RouteDeclarationMetadata({
    method: RouteMethod.POST,
    inputParser: NO_INPUT,
    outputParser: z.object({
      sessionID: z.string(),
      createdAt: z.number(),
    }),
    func: async ({ context }) => {
      const newThreadId = await createThread();
      await context.prisma.chatSession.create({
        data: {
          sessionID: newThreadId.id,
          createdAt: new Date(newThreadId.created_at),
        },
      });
      return { sessionID: newThreadId.id, createdAt: newThreadId.created_at };
    },
  }),
);

aiRouteDeclaration.routes.set(
  "/call",
  new RouteDeclarationMetadata({
    method: RouteMethod.POST,
    inputParser: z.object({
      [RequestInputType.BODY]: z.object({
        sessionID: z.string(),
        prompt: z.string(),
      }),
    }),
    func: async ({
      inputData: {
        body: { prompt, sessionID },
      },
      res,
      context,
    }) => {
      await surveyAiAssistant({
        threadId: sessionID,
        query: prompt,
        eventHandler: (data) => {
          switch (data._type) {
            case "done": {
              // res.end();
            }
            default: {
              res.write(JSON.stringify(data) + "\n");
            }
          }
        },
        keystoneArgs: context,
      });

      res.end();
    },
  }),
);

export { aiRouteDeclaration };
