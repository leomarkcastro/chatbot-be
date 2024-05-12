import { ChatCompletionMessageParam } from "openai/resources";
import { FunctionSet } from "./functionSet";

export interface ChatSessionData {
  currentCapsule?: string;
  context: string;
  history: ChatCompletionMessageParam[];
}

export interface ChatCapsule {
  id: string;
  assisstantPrompt: string[];
  functions: FunctionSet;
  outcomes: FunctionSet;
}
