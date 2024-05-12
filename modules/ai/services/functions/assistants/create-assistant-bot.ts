import { cms_openapi } from "../../lib/cms-openapi";
import { openai } from "../../lib/openai";
import { fetchFunction, openapiToFunctions } from "../openapi_to_fx";

async function createBot() {
  const functions = await openapiToFunctions(cms_openapi, fetchFunction);
  const functionmap = Object.values(functions).reduce(
    (acc, fx) => {
      acc.push({
        type: "function",
        function: {
          name: fx.definition.name,
          description: fx.definition.description ?? fx.definition.name,
          parameters: fx.definition.parameters,
        },
      });
      return acc;
    },
    [] as {
      type: "function";
      function: {
        name: string;
        description: string;
        parameters: any;
      };
    }[],
  );
  const assistant = await openai.beta.assistants.create({
    model: "gpt-4",
    instructions:
      "The GPT will assist users in navigating the ACA Health insurance marketplace in the United States by utilizing CMS Marketplace API endpoints. It will guide users through searching for health insurance plans, getting county details by ZIP code, retrieving specific plan details, autocomplete for drug names, checking drug coverage by plan, and getting eligibility estimates for households. This GPT will assist you from the CMS Marketplace database. Use vector store for code-interpeter for api specification.",
    tools: functionmap,
  });

  console.log(assistant);
}

createBot();
