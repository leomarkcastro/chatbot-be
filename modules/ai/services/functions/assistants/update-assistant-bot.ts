import { CONFIG } from "../../../../../utils/config/env";
import { openai } from "../../lib/openai";
import { getSurveyAIFunctions } from "../../lib/survey-ai";

async function updateBot() {
  const functions = await getSurveyAIFunctions();
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

  // Update the assistant
  const assistantID = CONFIG.HEALTHBOT_ASSISTANT_ID;
  const assistant = await openai.beta.assistants.update(assistantID, {
    model: "gpt-4",
    name: "Health Insurance Agent Assistant",
    instructions:
      "The GPT will assist users in helping Users find the best insurance policy for them. As for your goal, your task is to ask the user for informations that would help our agent to recommend them the best insurance policy that is applicable for them. You can use functions to get medications, get drug names, eligibility plan and so on to gather information. At the end, you should be able to collect information that you can submit to the agent. Your first task before anything else is to ask for user's information, primarily the reason of their application, diseases and medication. Do not search for plans yet not until the user submitted an applicaiton first. If the user submitted the application, you can now search for plans automatically and suggest a policy from the functions you have.",
    tools: functionmap,
  });

  console.log(assistant);
}

updateBot();
