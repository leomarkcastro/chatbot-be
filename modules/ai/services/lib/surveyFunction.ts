import { FunctionSet } from "../types/functionSet";

export type SurveyField = {
  name: string;
  description: string;
  type: "string" | "number";
  options?: string[];
  default?: string;
  errorMessages?: {
    required?: string;
    invalid?: string;
  };
};

export async function surveyCreator(args: {
  name: string;
  description: string;
  fields: SurveyField[];
  toSubmitFunction: (args: Record<string, any>) => Promise<any>;
}): Promise<FunctionSet> {
  return {
    [args.name]: {
      definition: {
        name: args.name,
        description: `${args.description}. Do not prefill information unless a default value is provided or the user explicitly provided the information. The function will return { success: false, message: string } if the user did not provide the required information or if the information provided is invalid. Otherwise, the function will return { success: true, message: any }. Do not submit an incomplete survey. On submit, strictly format the date as provided in the description.`,
        parameters: {
          type: "object",
          properties: {
            ...args.fields.reduce(
              (acc, field) => {
                acc[field.name] = { type: field.type };
                if (field.options) {
                  acc[field.name].enum = field.options;
                }
                if (field.default) {
                  acc[field.name].defaultValue = field.default;
                }
                return acc;
              },
              {} as Record<
                string,
                { type: string; enum?: string[]; defaultValue?: string }
              >,
            ),
          },
          required: args.fields.map((field) => field.name),
        },
      },
      function: async (_args) => {
        console.log(JSON.stringify(_args, null, 2));
        let errorMessages = "";
        for (const field of args.fields) {
          if (!_args[field.name]) {
            errorMessages += `${field.errorMessages?.required || `${field.name} is required.`}\n`;
          }

          switch (field.type) {
            case "string": {
              if (field.options && !field.options.includes(_args[field.name])) {
                errorMessages +=
                  field.errorMessages?.invalid || `${field.name} is invalid.\n`;
              }
              break;
            }
            case "number": {
              if (isNaN(_args[field.name])) {
                errorMessages +=
                  field.errorMessages?.invalid || `${field.name} is invalid.\n`;
              }
              break;
            }
          }
        }

        if (errorMessages) {
          errorMessages +=
            "Only ask for 3 clarifications at a moment to avoid overwhelming the user.\n";
          console.log({
            success: false,
            message: errorMessages,
          });
          return {
            success: false,
            message: errorMessages,
          };
        }

        const data = await args.toSubmitFunction(_args);

        return { success: true, data };
      },
    },
  };
}
