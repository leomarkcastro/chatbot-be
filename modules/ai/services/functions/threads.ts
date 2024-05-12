import { openai } from "../lib/openai";

export async function createThread() {
  const thread = await openai.beta.threads.create();
  return thread;
}

export async function fetchThread(threadId: string) {
  const thread = await openai.beta.threads.retrieve(threadId);
  return thread;
}

export async function listMessages(threadId: string) {
  const messages = await openai.beta.threads.messages.list(threadId);
  return messages;
}
