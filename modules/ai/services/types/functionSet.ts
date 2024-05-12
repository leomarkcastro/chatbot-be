import { FunctionDefinition } from "openai/resources";

export type FunctionSet = Record<
  string,
  {
    definition: FunctionDefinition;
    function: (...args: any[]) => any;
    meta?: Record<string, any>;
  }
>;
