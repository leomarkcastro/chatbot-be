import { ChatCompletionMessageParam } from "openai/resources";

export const MESSAGE = {
  SYSTEM: (content: string): ChatCompletionMessageParam => ({
    role: "system",
    content,
  }),
  USER: (content: string): ChatCompletionMessageParam => ({
    role: "user",
    content,
  }),
};
