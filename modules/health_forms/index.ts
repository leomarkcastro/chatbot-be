import { list } from "@keystone-6/core";
import { checkbox, text } from "@keystone-6/core/fields";
import { accessConfig } from "../../common/access/definitions/access";
import { allow } from "../../common/access/definitions/templates";
import { ModuleDefinition } from "../definition";

export const healthFormDefinition: ModuleDefinition = {
  schema: [
    {
      Inquiry: list({
        fields: {
          fullname: text({ validation: { isRequired: true } }),
          email: text({ validation: { isRequired: true } }),
          phone: text({ validation: { isRequired: true } }),
          policyID: text({ validation: { isRequired: true } }),
          policyURL: text({ validation: { isRequired: true } }),
          zip: text({ validation: { isRequired: true } }),
          address: text({ validation: { isRequired: true } }),
          sessionID: text({ validation: { isRequired: true } }),
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
    },
  ],
  graphqlExtensions: [],
  restExtensions: [],
};
