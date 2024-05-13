import { KeystoneContext } from "@keystone-6/core/types";
import { GlobalTypeInfo } from "../../../../common/types";
import { fetchFunction, openapiToFunctions } from "../functions/openapi_to_fx";
import { FunctionSet } from "../types/functionSet";
import { cms_openapi } from "./healthbot-ai";
import { surveyCreator } from "./surveyFunction";

export async function getSurveyAIFunctions(apiArgs?: {
  keystone: KeystoneContext<GlobalTypeInfo>;
  sessionID: string;
  metadata: any;
}): Promise<FunctionSet> {
  const cms_functions = await openapiToFunctions(cms_openapi, fetchFunction);
  const functions = {
    ...cms_functions,
    ...(await surveyCreator({
      name: "submitApplication",
      description:
        "Submit an application or inquiry for health insurance. Only ask 3 questions at a time to keep the user engaged. The user's answers could fill-out different fields if applicable. Example: I have a chronic disease and need insurance. Always ask the reason of application first, then  diseases, and then medications. If the user haven't provided any value yet, use 'unspecified'.",
      fields: [
        {
          name: "reasonOfApplication",
          description:
            "Ask the user for their reason of application. This could contain their disease, current medication, long term goals, current doctor, hospital, recommendation. Feel free to use the information here on other forms if applicable. Example: I have a chronic disease and need insurance.",
          type: "string",
        },
        {
          name: "diseases",
          description:
            "The user's current diseases or disabilities. This could be a list of diseases or disabilities. Example: diabetes, high blood pressure.",
          type: "string",
        },
        {
          name: "medications",
          description:
            "The user's current medications. This could be a list of medications. Example: insulin, metformin.",
          type: "string",
        },
        {
          name: "currentLivingSituation",
          description:
            "Ask for the user's current living situation. This could be their current living situation, such as living alone, with family, or in a nursing home, salary, current address, location. Example: I live with my family in Springfield, IL.",
          type: "string",
        },
        {
          name: "name",
          description:
            "The name of the applicant. This includes first and last name, suffixes, and prefixes. Example: John Doe Jr.",
          type: "string",
        },
        {
          name: "email",
          description: "The email of the applicant. Example: user@email.com",
          type: "string",
        },
        {
          name: "phone",
          description:
            "The phone number of the applicant. Example: 555-555-5555.",
          type: "string",
        },
        {
          name: "age",
          description:
            "The age of the applicant. This is a number, and is used to determine eligibility for certain programs. Example: 25.",
          type: "number",
        },
        {
          name: "yearlyIncome",
          description:
            "The yearly income of the applicant. This is a number, and is used to determine eligibility for certain programs. Example: 25000.",
          type: "number",
        },
        {
          name: "gender",
          description: "The gender of the applicant. Example: male",
          type: "string",
          options: ["male", "female", "transgender", "other"],
        },
        {
          name: "address",
          description:
            "The address of the applicant. Included are street, city, state, and zip code, and isPermanent. Example: 123 Main St, Springfield, IL 62701 (isPermanent: true).",
          type: "string",
        },
      ],
      toSubmitFunction: async (args) => {
        // check if any fields is labelled as 'unspecified'
        if (Object.values(args).some((v) => v === "unspecified")) {
          return {
            success: false,
            message:
              "Some values are unspecified, clarify first the values. If the user does not provide the information, use 'none'.",
          };
        }

        if (apiArgs?.sessionID) {
          await apiArgs?.keystone.prisma.inquiry.create({
            data: {
              sessionID: apiArgs.sessionID,
              reasonOfApplication: args.reasonOfApplication,
              diseases: args.diseases,
              medications: args.medications,
              currentLivingSituation: args.currentLivingSituation,
              name: args.name,
              email: args.email,
              phone: args.phone,
              age: args.age,
              yearlyIncome: args.yearlyIncome,
              gender: args.gender,
              address: args.address,
            },
          });
        }

        return { success: true, message: "Application submitted." };
      },
    })),
    ...(await surveyCreator({
      name: "submitSuggestion",
      description:
        "After the user had succesfully sent a form AND if the user has prompted that they like a policy offered, you can use this function to submit the selected policy of the user.",
      fields: [
        {
          name: "name",
          description:
            "The name of the applicant. This includes first and last name, suffixes, and prefixes. Example: John Doe Jr.",
          type: "string",
        },
        {
          name: "policyName",
          description:
            "The name of the policy that the user wants to claim. Refer to the conversation history for the policy details. Make sure you had used the 'SearchHealthcarePlans' function to get the policy details.",
          type: "string",
        },
        {
          name: "policyURL",
          description:
            "The URL of the policy that the user wants to claim. Provide a valid URL. Make sure you had used the 'SearchHealthcarePlans' function to get the policy details.",
          type: "string",
        },
      ],
      toSubmitFunction: async (args) => {
        // check if any fields is labelled as 'unspecified'
        if (Object.values(args).some((v) => v === "unspecified")) {
          return {
            success: false,
            message: "Some values are unspecified, clarify first the values",
          };
        }

        if (apiArgs?.sessionID) {
          await apiArgs?.keystone.prisma.policy.create({
            data: {
              sessionID: apiArgs.sessionID,
              name: args.name,
              policyName: args.policyName,
              policyURL: args.policyURL,
            },
          });
        }
        return { success: true, message: "Recommended policy submitted." };
      },
    })),
  };
  // console.log(JSON.stringify(functions, null, 2));
  return functions;
}
