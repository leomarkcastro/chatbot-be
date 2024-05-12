import { z } from "zod";
import { PERMISSION_ENUM } from "../../../common/roles";
import { LoginDocument } from "../../../graphql/operations";
import {
  RequestInputType,
  RouteDeclarationList,
  RouteDeclarationMetadata,
  RouteMethod,
} from "../../../server/declarations";
import {
  hasRole,
  serverAccessConfig,
} from "../../../server/services/access/serverAccessConfig";

const authRouteDeclaration: RouteDeclarationList = {
  name: "/auth",
  routes: new Map(),
};

authRouteDeclaration.routes.set(
  "/signin",
  new RouteDeclarationMetadata({
    method: RouteMethod.POST,
    inputParser: z.object({
      [RequestInputType.BODY]: z.object({
        username: z.string(),
        password: z.string(),
      }),
    }),

    func: async ({
      context: { graphql },
      inputData: {
        [RequestInputType.BODY]: { username, password },
      },
      res,
    }) => {
      const request = await graphql.run({
        query: LoginDocument,
        variables: {
          email: username as string,
          password: password as string,
        },
      });

      if (
        request.authenticateUserWithPassword?.__typename ==
        "UserAuthenticationWithPasswordSuccess"
      ) {
        return {
          token: request.authenticateUserWithPassword.sessionToken,
        };
      } else {
        res.status(401).json({
          error: "Invalid credentials",
        });
        return;
      }
    },
  })
);

authRouteDeclaration.routes.set(
  "/test/:id/:id2",
  new RouteDeclarationMetadata({
    method: RouteMethod.GET,
    accessConfig: serverAccessConfig({
      conditions: [hasRole({ roles: [PERMISSION_ENUM.ADMIN] })],
    }),
    inputParser: z.object({
      [RequestInputType.PARAMS]: z.object({
        id: z.preprocess((val: any) => parseInt(val), z.number()),
        id2: z.preprocess((val: any) => parseInt(val), z.number()),
      }),
      [RequestInputType.QUERY]: z.object({
        name: z.string(),
      }),
      [RequestInputType.HEADERS]: z.object({
        whoosh: z.string().default("whoosh"),
      }),
    }),

    func: async ({ inputData, res }) => {
      return inputData;
    },
  })
);

export { authRouteDeclaration };
