import { graphql, list } from "@keystone-6/core";
import {
  checkbox,
  float,
  text,
  timestamp,
  virtual,
} from "@keystone-6/core/fields";
import { accessConfig } from "../../common/access/definitions/access";
import { allow } from "../../common/access/definitions/templates";
import { listMessages } from "../ai/services/functions/threads";
import { ModuleDefinition } from "../definition";

export const healthFormDefinition: ModuleDefinition = {
  schema: [
    {
      ChatSession: list({
        fields: {
          sessionID: text({ validation: { isRequired: true } }),
          session: virtual({
            field: graphql.field({
              type: graphql.String,
              async resolve(item) {
                const messages = await listMessages(item.sessionID);

                if (messages) {
                  return JSON.stringify(messages);
                }
              },
            }),
          }),
          createdAt: timestamp(),
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
          sessionID: text({ validation: { isRequired: true } }),
          session: virtual({
            field: graphql.field({
              type: graphql.String,
              async resolve(item) {
                const messages = await listMessages(item.sessionID);

                if (messages) {
                  return JSON.stringify(messages);
                }
              },
            }),
          }),
          aiSelected: virtual({
            field: graphql.field({
              type: graphql.String,
              async resolve(item, args, context) {
                const policy = await context.prisma.policy.findFirst({
                  where: {
                    sessionID: item.sessionID,
                  },
                });

                if (policy) {
                  return `${policy.policyName} (${policy.policyURL})`;
                }
              },
            }),
          }),
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
          sessionID: text({ validation: { isRequired: true } }),
          name: text(),
          policyName: text(),
          policyURL: text(),
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
