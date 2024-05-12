import { ModuleDefinition } from "../definition";
import { aiRouteDeclaration } from "./rest";

export const aiDefinition: ModuleDefinition = {
  schema: [],
  graphqlExtensions: [],
  restExtensions: [aiRouteDeclaration],
};
