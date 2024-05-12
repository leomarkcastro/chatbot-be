import { CONFIG } from "../../../../../utils/config/env";
import { cms_openapi } from "../../lib/cms-openapi";
import { openai } from "../../lib/openai";
import { fetchFunction, openapiToFunctions } from "../openapi_to_fx";

async function updateBot() {
  // Setup the functions
  const cms_functions = await openapiToFunctions(cms_openapi, fetchFunction);
  const custom_functions = {
    applicationSubmit: {
      definition: {
        name: "applicationSubmit",
        description:
          "If the 'user' is ready to apply, call this function. Initially, the fields are empty, do not pre-fill the information here. Do NOT allow vague values, always ask for specific value. This function will return a message to open the permission link.",
        parameters: {
          type: "object",
          properties: {
            fullname: {
              type: "string",
              description:
                "The full name of the user. Provide first name and last name. ONLY USE VALUES FROM THE USER. DO NOT PRE-FILL.",
              defaultValue: "",
            },
            email: {
              type: "string",
              description:
                "The email of the user. Provide a valid email address. ONLY USE VALUES FROM THE USER. DO NOT PRE-FILL.",
              defaultValue: "",
            },
            phone: {
              type: "string",
              description:
                "The phone number of the user. Provide a valid phone number. ONLY USE VALUES FROM THE USER. DO NOT PRE-FILL.",
              defaultValue: "",
            },
            policyID: {
              type: "string",
              description:
                "The policy that the user wants to claim. Refer to the conversation history for the policy details. Make sure you had used the 'SearchHealthcarePlans' function to get the policy details.",
            },
            policyURL: {
              type: "string",
              description:
                "The URL of the policy that the user wants to claim. Provide a valid URL. Make sure you had used the 'SearchHealthcarePlans' function to get the policy details.",
              defaultValue: "",
            },
            location: {
              type: "object",
              properties: {
                zip: {
                  type: "string",
                  description:
                    "The ZIP code of the user. Provide a valid ZIP code.",
                  defaultValue: "",
                },
                county: {
                  type: "string",
                  description:
                    "The county of the user. Provide a valid county name.",
                  defaultValue: "",
                },
              },
            },
          },
          required: [
            "fullname",
            "email",
            "phone",
            "policyID",
            "policyURL",
            "location",
          ],
        },
      },
      function: (args: any) => {
        console.log(JSON.stringify(args, null, 2));
        console.log("Attempting to submit application...");
        if (!args.fullname) {
          return "Please provide your full name.";
        }
        if (!args.email) {
          return "Please provide your email.";
        }
        if (!args.phone) {
          return "Please provide your phone number.";
        }
        if (!args.policyURL || !args.policyID) {
          return "Please also get the policyID and policyURL from the conversation history.";
        }
        if (!args.location.zip) {
          return "Please provide your ZIP code.";
        }
        if (!args.location.county) {
          return "Please provide your county.";
        }
        console.log("Application submitted successfully.");
        return "https://www.healthsherpa.com/?_agent_id=myacaexpress";
      },
    },
  };
  const functions = { ...cms_functions, ...custom_functions };
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
    name: "ACA Health Insurance Marketplace Assistant",
    instructions:
      "The GPT will assist users in navigating the ACA Health insurance marketplace in the United States by utilizing CMS Marketplace API endpoints. It will guide users through searching for health insurance plans, getting county details by ZIP code, retrieving specific plan details, autocomplete for drug names, checking drug coverage by plan, and getting eligibility estimates for households. This GPT will assist you from the CMS Marketplace database. Use vector store for code-interpeter for api specification.",
    tools: functionmap,
  });

  console.log(assistant);
}

updateBot();
