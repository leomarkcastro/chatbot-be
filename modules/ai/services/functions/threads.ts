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
  const parsedMesasges = messages.data.map((message) => {
    return {
      id: message.id,
      role: message.role,
      content: message.content,
      createdAt: message.created_at,
    };
  });
  // sort by createdAt
  parsedMesasges.sort((a, b) => a.createdAt - b.createdAt);
  return parsedMesasges;
}
