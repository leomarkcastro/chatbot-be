import { list } from "@keystone-6/core";
import { checkbox, float, text } from "@keystone-6/core/fields";
import { accessConfig } from "../../common/access/definitions/access";
import { allow } from "../../common/access/definitions/templates";
import { ModuleDefinition } from "../definition";

export const healthFormDefinition: ModuleDefinition = {
  schema: [
    {
      Inquiry: list({
        fields: {
          reasonOfApplication: text(),
          diseases: text(),
          medications: text(),
          currentLivingSituation: text(),
          name: text(),
          email: text(),
          phone: text(),
          age: float(),
          yearlyIncome: float(),
          gender: text(),
          address: text(),
          addresed: checkbox(),
          remarks: text(),
        },
        access: accessConfig({
          isAuthed: true,
          operations: {
            all: allow,
          },
          filter: {
            all: allow,
          },
        }),
      }),
      Policy: list({
        fields: {
          name: text({ validation: { isRequired: true } }),
          policyName: text({ validation: { isRequired: true } }),
          policyURL: text({ validation: { isRequired: true } }),
        },
        access: accessConfig({
          filter: {
            all: allow,
          },
          operations: {
            all: allow,
          },
        }),
      }),
    },
  ],
  graphqlExtensions: [],
  restExtensions: [],
};
