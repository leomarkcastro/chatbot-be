"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_server_plugin_response_cache = __toESM(require("@apollo/server-plugin-response-cache"));
var import_zod_to_openapi3 = require("@asteasolutions/zod-to-openapi");
var import_core5 = require("@keystone-6/core");
var import_zod6 = require("zod");

// auth.ts
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");

// common/roles.ts
var PERMISSION_ENUM = {
  DEV: "dev",
  ADMIN: "admin",
  USER: "user"
};
var ALL_PERMISSIONS_LIST = Object.values(PERMISSION_ENUM);

// utils/config/env.ts
var dotenv = __toESM(require("dotenv"));
dotenv.config();
var CONFIG = {
  BASE_URL: process.env.BASE_URL || "http://localhost:3000",
  DATABASE_URL: process.env.DATABASE_URL || "",
  GRAPHQL_INSTROSPECTION: process.env.GRAPHQL_INSTROSPECTION || "true",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  PAGE_URL: process.env.PAGE_URL || "http://localhost:300",
  SERVER_CORS_HEADERS: process.env.SERVER_CORS_HEADERS || '"Origin, X-Requested-With, Content-Type, Accept, Authorization"',
  SERVER_CORS_URL: process.env.SERVER_CORS_URL || '"*"',
  SESSION_SECRET: process.env.SESSION_SECRET || '"secretashdasifhjldgjaisjflsjkasldfklaskdjf"',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "secret",
  HEALTHBOT_ASSISTANT_ID: process.env.HEALTHBOT_ASSISTANT_ID || "assistant-1"
};

// auth.ts
var sessionSecret = CONFIG.SESSION_SECRET;
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "id name createdAt role",
  secretField: "adminPassword",
  initFirstItem: {
    fields: ["name", "email", "adminPassword"],
    itemData: {
      role: PERMISSION_ENUM.DEV
    }
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// dbConfig.ts
var dbConfig = {
  provider: "postgresql",
  url: CONFIG.DATABASE_URL
};
var dbConfig_default = dbConfig;

// server/index.ts
var import_zod_to_openapi2 = require("@asteasolutions/zod-to-openapi");
var import_express = require("express");
var import_swagger_ui_express = __toESM(require("swagger-ui-express"));

// server/api/health/index.ts
var import_zod2 = require("zod");

// server/declarations.ts
var import_zod = require("zod");
var import_zod_to_openapi = require("@asteasolutions/zod-to-openapi");
(0, import_zod_to_openapi.extendZodWithOpenApi)(import_zod.z);
var NO_INPUT = import_zod.z.object({});
var RouteDeclarationMetadata = class {
  method;
  inputParser;
  outputParser;
  accessConfig;
  // @ts-expect-error T does not satisfy the constraint 'z.ZodType<any>'.
  function;
  constructor(args) {
    this.method = args.method;
    this.function = args.func;
    this.inputParser = args.inputParser;
    this.accessConfig = args.accessConfig;
    this.outputParser = args.outputParser;
  }
};

// server/api/health/index.ts
var healthRouteDeclaration = {
  name: "/health",
  routes: /* @__PURE__ */ new Map()
};
healthRouteDeclaration.routes.set(
  "/",
  new RouteDeclarationMetadata({
    method: "get" /* GET */,
    inputParser: import_zod2.z.object({
      ["query" /* QUERY */]: import_zod2.z.object({
        database: import_zod2.z.preprocess((val) => {
          if (val === "true") {
            return true;
          } else {
            return false;
          }
        }, import_zod2.z.boolean().optional()).optional(),
        s3: import_zod2.z.preprocess((val) => {
          if (val === "true") {
            return true;
          } else {
            return false;
          }
        }, import_zod2.z.boolean().optional()).optional(),
        unified: import_zod2.z.preprocess((val) => {
          if (val === "true") {
            return true;
          } else {
            return false;
          }
        }, import_zod2.z.boolean().optional()).optional()
      })
    }),
    func: async ({
      context: { prisma },
      inputData: {
        ["query" /* QUERY */]: { database, s3, unified }
      },
      res
    }) => {
      const serverStatus = true;
      let databaseStatus = false;
      let s3Status = false;
      if (database) {
        try {
          await await prisma.$queryRaw`SELECT 1`;
          databaseStatus = true;
        } catch (e) {
          databaseStatus = false;
        }
      }
      let unifiedStatus = true;
      if (database) {
        unifiedStatus = unifiedStatus && databaseStatus;
      }
      if (s3) {
        unifiedStatus = unifiedStatus && s3Status;
      }
      if (unified) {
        if (unifiedStatus) {
          res.status(200).send({
            server: serverStatus,
            database: database ? databaseStatus : void 0,
            s3: s3 ? s3Status : void 0
          });
        } else {
          res.status(500).send({
            error: "One or more systems are down",
            server: serverStatus,
            database: database ? databaseStatus : void 0,
            s3: s3 ? s3Status : void 0
          });
        }
      } else {
        res.status(200).send({
          server: serverStatus,
          database: database ? databaseStatus : void 0,
          s3: s3 ? s3Status : void 0
        });
      }
    }
  })
);

// server/api/index.ts
var routeList = [healthRouteDeclaration];

// server/services/middleware/errorHandler.ts
var devErrorHandler = (err, req, res, next) => {
  err.stack = err.stack || "";
  const status = err.status || 500;
  const error = { message: err.message };
  res.status(status);
  return res.json({ status, error });
};

// server/index.ts
var registry = new import_zod_to_openapi2.OpenAPIRegistry();
var MAIN_API_ROUTE = "/api";
function convertExpressRouteToOpenApiRoute(route) {
  return route.replace(/:(\w+)/g, "{$1}");
}
function implementRouteDeclaration(mainRouter, commonContext, data) {
  const router = (0, import_express.Router)();
  for (const [route, routeData] of data.routes) {
    const method = routeData.method;
    registry.registerPath({
      method,
      path: convertExpressRouteToOpenApiRoute(
        MAIN_API_ROUTE + data.name + route
      ),
      tags: [data.name],
      security: routeData.accessConfig ? [{ bearerAuth: [] }] : void 0,
      request: {
        query: routeData.inputParser.pick({
          ["query" /* QUERY */]: true
        }).shape?.query,
        params: routeData.inputParser.pick({
          ["params" /* PARAMS */]: true
        }).shape?.params,
        headers: routeData.inputParser.pick({
          ["headers" /* HEADERS */]: true
        }).shape?.headers,
        body: ["get"].includes(method) ? void 0 : routeData.inputParser.pick({
          ["body" /* BODY */]: true
        }).shape?.body ? {
          content: {
            "application/json": {
              schema: routeData.inputParser.pick({
                ["body" /* BODY */]: true
              }).shape?.body
            }
          }
        } : void 0
      },
      responses: {
        200: {
          description: "Successful response",
          content: {
            "application/json": {
              schema: routeData.outputParser ? routeData.outputParser : {}
            }
          }
        }
      }
    });
    router[method](route, async (req, res, next) => {
      const context = await commonContext.withRequest(req, res);
      const parsedData = routeData.inputParser.safeParse({
        ["query" /* QUERY */]: req.query,
        ["body" /* BODY */]: req.body,
        ["params" /* PARAMS */]: req.params,
        ["headers" /* HEADERS */]: req.headers
      });
      if (!parsedData.success)
        return res.status(400).json({ error: parsedData.error });
      const session2 = context.session;
      if (routeData.accessConfig) {
        const accessResult = routeData.accessConfig({
          context,
          session: session2,
          operation: method
        });
        if (!accessResult)
          return res.status(403).json({ error: "Forbidden" });
      }
      try {
        const returnValue = await routeData.function({
          context,
          inputData: parsedData.data,
          req,
          res
        });
        if (returnValue) {
          if (routeData.outputParser) {
            const outputData = routeData.outputParser.safeParse(returnValue);
            if (!outputData.success)
              return res.status(500).json({ error: outputData.error });
            return res.json(outputData.data);
          } else {
            return res.json(returnValue);
          }
        }
      } catch (error) {
        next(error);
      }
    });
  }
  mainRouter.use(data.name, router);
}
function bootstrapExpress(app, commonContext, extraRouteList) {
  app.use((0, import_express.json)());
  app.use(devErrorHandler);
  const mainRouter = (0, import_express.Router)();
  for (const routeData of [...routeList, ...extraRouteList]) {
    implementRouteDeclaration(mainRouter, commonContext, routeData);
  }
  const definitions = registry.definitions;
  const generator = new import_zod_to_openapi2.OpenApiGeneratorV3(definitions);
  const document = generator.generateDocument({
    info: {
      title: "Server API",
      version: "1.0.0"
    },
    openapi: "3.0.0"
    // add bearerAuth security definition
  });
  document.components["securitySchemes"] = {
    bearerAuth: {
      type: "http",
      in: "header",
      name: "Authorization",
      description: "Bearer token to access these api endpoints",
      scheme: "bearer",
      bearerFormat: "JWT"
    }
  };
  app.use("/api/rest", import_swagger_ui_express.default.serve, import_swagger_ui_express.default.setup(document));
  app.use(MAIN_API_ROUTE, mainRouter);
}

// modules/ai/rest.ts
var import_zod4 = require("zod");

// modules/ai/services/functions/assistants/event-handler.ts
var import_stream = require("stream");
var SLEEP = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var EventHandler = class extends import_stream.EventEmitter {
  client;
  onResponse;
  onFunctionCall;
  onFunctionFetch;
  onDone;
  functions = {};
  constructor(args) {
    super();
    this.client = args.client;
    this.onResponse = args.onResponse;
    this.onFunctionCall = args.onFunctionCall;
    this.onFunctionFetch = args.onFunctionFetch;
    this.onDone = args.onDone;
    this.functions = args.functions;
  }
  async onEvent(event) {
    try {
      if (event.event === "thread.message.delta") {
        this.onResponse(event.data.delta.content?.[0]?.text?.value);
      }
      if (event.event === "thread.run.requires_action") {
        await this.handleRequiresAction(
          event.data,
          event.data.id,
          event.data.thread_id
        );
      }
      if (event.event === "thread.run.completed") {
        this.onDone();
      }
    } catch (error) {
      console.error("Error handling event:", error);
    }
  }
  async handleRequiresAction(data, runId, threadId) {
    try {
      const toolOutputs = [];
      for (const toolCall of data.required_action.submit_tool_outputs.tool_calls) {
        const call_id = toolCall.id;
        const _fxName = toolCall.function.name;
        const _args = JSON.parse(toolCall.function.arguments ?? "{}");
        const _fx = this.functions[_fxName];
        if (_fx.meta) {
          _args["meta"] = _fx.meta;
        }
        this.onFunctionCall(_fxName, _args);
        const result = await _fx.function(_args);
        this.onFunctionFetch(_fxName, JSON.stringify(result));
        toolOutputs.push({
          tool_call_id: call_id,
          output: JSON.stringify(result)
        });
      }
      await this.submitToolOutputs(toolOutputs, runId, threadId);
    } catch (error) {
      console.error("Error processing required action:", error);
    }
  }
  async submitToolOutputs(toolOutputs, runId, threadId) {
    try {
      const stream = this.client.beta.threads.runs.submitToolOutputsStream(
        threadId,
        runId,
        { tool_outputs: toolOutputs }
      );
      for await (const event of stream) {
        this.emit("event", event);
      }
    } catch (error) {
      console.error("Error submitting tool outputs:", error);
    }
  }
};

// modules/ai/services/lib/openai.ts
var import_openai = __toESM(require("openai"));
var openai = new import_openai.default({
  apiKey: CONFIG.OPENAI_API_KEY
});

// modules/ai/services/functions/openapi_to_fx.ts
var import_json_schema_ref_parser = __toESM(require("@apidevtools/json-schema-ref-parser"));
var import_axios = __toESM(require("axios"));
async function openapiToFunctions(openapiSpec, apiFunction) {
  const functions = {};
  const resolvedSpec = await import_json_schema_ref_parser.default.dereference(openapiSpec);
  for (const [path, methods] of Object.entries(resolvedSpec.paths)) {
    for (const [method, spec] of Object.entries(methods)) {
      const functionName = spec.operationId;
      const desc = spec.description || spec.summary || "";
      const schema = {
        type: "object",
        properties: {}
      };
      const reqBody = spec.requestBody?.content?.["application/json"]?.schema;
      if (reqBody) {
        schema.properties.requestBody = reqBody;
      }
      const params = spec.parameters || [];
      if (params.length > 0) {
        const paramProperties = params.reduce(
          (acc, param) => {
            if (param.schema) {
              acc[param.name] = param.schema;
            }
            return acc;
          },
          {}
        );
        schema.properties.parameters = {
          type: "object",
          properties: paramProperties
        };
      }
      functions[functionName] = {
        definition: {
          name: functionName,
          description: desc,
          parameters: schema
        },
        function: apiFunction,
        meta: {
          openapi: {
            host: resolvedSpec.servers[0].url,
            path,
            method,
            params: {
              apikey: "7h0uj7PqRrbMy9CibDw7KcEX76ShhXJW"
            }
          }
        }
      };
    }
  }
  return functions;
}
async function fetchFunction(args) {
  const host = args?.meta?.openapi?.host;
  let path = args?.meta?.openapi?.path;
  const method = args?.meta?.openapi?.method;
  const rootParams = args?.meta?.openapi?.params;
  if (!path || !method) {
    return "Invalid function call";
  }
  const body = args?.requestBody;
  const params = args?.parameters;
  const pathParams = path.match(/{\w+}/g);
  if (pathParams) {
    pathParams.forEach((param) => {
      const paramName = param.slice(1, -1);
      if (!params || !params[paramName]) {
        return;
      }
      path = path.replace(param, params[paramName]);
    });
  }
  try {
    const response = await (0, import_axios.default)({
      baseURL: host,
      url: path,
      method,
      data: method === "post" ? body : void 0,
      params: {
        ...params,
        ...rootParams
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    let errorMessage = "Error fetching data";
    if (error.response) {
      errorMessage = JSON.stringify(error.response.data);
    } else if (error.request) {
      errorMessage = JSON.stringify(error.request);
    } else {
      errorMessage = error.message;
    }
    errorMessage += " (Try to resolve it automatically by adjusting the parameters, if it still failed, stop)";
    console.log(errorMessage);
    return errorMessage;
  }
}

// modules/ai/services/lib/healthbot-ai.ts
var import_zod3 = require("zod");
var cms_openapi = {
  openapi: "3.1.0",
  info: {
    title: "Healthcare Marketplace API",
    description: "Retrieves information from the Healthcare Marketplace.",
    version: "v1.0.0"
  },
  servers: [
    {
      url: "https://marketplace.api.healthcare.gov"
    }
  ],
  paths: {
    "/api/v1/counties/by/zip/{zipcode}": {
      get: {
        description: "Get county information for a specific ZIP code",
        operationId: "GetCountyByZip",
        parameters: [
          {
            name: "zipcode",
            in: "path",
            description: "The ZIP code to retrieve the county information for",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            name: "apikey",
            in: "query",
            description: "API key for accessing the service",
            required: true,
            schema: {
              type: "string"
            }
          }
        ]
      }
    },
    "/api/v1/plans/search": {
      post: {
        description: "Search for healthcare plans based on provided criteria",
        operationId: "SearchHealthcarePlans",
        "x-openai-isConsequential": false,
        parameters: [
          {
            name: "apikey",
            in: "query",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  market: { type: "string" },
                  place: {
                    type: "object",
                    properties: {
                      countyfips: { type: "string" },
                      state: { type: "string" },
                      zipcode: { type: "string" }
                    }
                  },
                  year: { type: "integer" }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/plans/{planid}": {
      get: {
        description: "Retrieve details for a specific healthcare plan",
        operationId: "GetPlanDetails",
        parameters: [
          {
            name: "planid",
            in: "path",
            description: "The ID of the healthcare plan to retrieve details for",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            name: "year",
            in: "query",
            description: "The year for which the plan details are requested",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            name: "apikey",
            in: "query",
            description: "API key for accessing the service",
            required: true,
            schema: {
              type: "string"
            }
          }
        ]
      }
    },
    "/api/v1/drugs/autocomplete": {
      get: {
        description: "Autocomplete functionality to search for drugs",
        operationId: "DrugAutocompleteSearch",
        parameters: [
          {
            name: "query",
            in: "query",
            description: "Partial query for the drug search autocomplete",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            schema: {
              type: "string"
            }
          }
        ]
      }
    },
    "/api/v1/drugs/covered": {
      get: {
        description: "Check if drugs are covered under specific healthcare plans",
        operationId: "CheckDrugCoverage",
        parameters: [
          {
            name: "year",
            in: "query",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            name: "drugs",
            in: "query",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            name: "planids",
            in: "query",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            schema: {
              type: "string"
            }
          }
        ]
      }
    },
    "/api/v1/crosswalk": {
      get: {
        description: "Retrieve plan crosswalk information for a given plan ID, year, state, ZIP code, and FIPS code",
        operationId: "getPlanCrosswalk",
        parameters: [
          {
            name: "apikey",
            in: "query",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            name: "year",
            in: "query",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            name: "plan_id",
            in: "query",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            name: "state",
            in: "query",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            name: "zipcode",
            in: "query",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            name: "fips",
            in: "query",
            required: true,
            schema: {
              type: "string"
            }
          }
        ]
      }
    },
    "/api/v1/counties/{countyId}": {
      get: {
        description: "Retrieve county information by county ID for a specific year",
        operationId: "getCountyInfo",
        parameters: [
          {
            name: "countyId",
            in: "path",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            name: "year",
            in: "query",
            required: true,
            schema: {
              type: "string"
            }
          }
        ]
      }
    },
    "/api/v1/states": {
      get: {
        description: "Retrieve information about states for a specific year",
        operationId: "getStatesInfo",
        parameters: [
          {
            name: "apikey",
            in: "query",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            name: "year",
            in: "query",
            required: true,
            schema: {
              type: "string"
            }
          }
        ]
      }
    },
    "/api/v1/states/{stateCode}": {
      get: {
        description: "Retrieve information for a specific state by its code for a given year",
        operationId: "getStateInfo",
        parameters: [
          {
            name: "stateCode",
            in: "path",
            required: true,
            description: "The state code to retrieve information for",
            schema: {
              type: "string"
            }
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string"
            }
          },
          {
            name: "year",
            in: "query",
            required: true,
            description: "The year for which the information is requested",
            schema: {
              type: "string"
            }
          }
        ]
      }
    },
    "/api/v1/states/{stateCode}/medicaid": {
      get: {
        description: "Retrieve Medicaid information for a specific state, year, and quarter",
        operationId: "getStateMedicaidInfo",
        parameters: [
          {
            name: "stateCode",
            in: "path",
            required: true,
            description: "The state code to retrieve Medicaid information for",
            schema: {
              type: "string"
            }
          },
          {
            name: "year",
            in: "query",
            required: true,
            description: "The year for which the Medicaid information is requested",
            schema: {
              type: "string"
            }
          },
          {
            name: "quarter",
            in: "query",
            required: true,
            description: "The quarter for which the Medicaid information is requested",
            schema: {
              type: "integer",
              minimum: 1,
              maximum: 4
            }
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string"
            }
          }
        ]
      }
    },
    "/api/v1/states/{stateCode}/poverty-guidelines": {
      get: {
        description: "Retrieve poverty guidelines for a specific state and year",
        operationId: "getStatePovertyGuidelines",
        parameters: [
          {
            name: "stateCode",
            in: "path",
            required: true,
            description: "The state code for which the poverty guidelines are requested",
            schema: {
              type: "string"
            }
          },
          {
            name: "year",
            in: "query",
            required: true,
            description: "The year for which the poverty guidelines are requested",
            schema: {
              type: "string"
            }
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string"
            }
          }
        ]
      }
    },
    "/api/v1/rate-areas": {
      get: {
        description: "Retrieve rate area information based on state, FIPS code, ZIP code, market, and year",
        operationId: "getRateAreas",
        parameters: [
          {
            name: "state",
            in: "query",
            required: true,
            description: "The state to retrieve rate areas for",
            schema: {
              type: "string"
            }
          },
          {
            name: "fips",
            in: "query",
            required: false,
            description: "The FIPS code to retrieve rate areas for",
            schema: {
              type: "string"
            }
          },
          {
            name: "zipcode",
            in: "query",
            required: false,
            description: "The ZIP code to retrieve rate areas for",
            schema: {
              type: "string"
            }
          },
          {
            name: "market",
            in: "query",
            required: false,
            description: "The market type to retrieve rate areas for",
            schema: {
              type: "string"
            }
          },
          {
            name: "year",
            in: "query",
            required: true,
            description: "The year to retrieve rate areas for",
            schema: {
              type: "string"
            }
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string"
            }
          }
        ]
      }
    },
    "/api/v1/coverage/stats": {
      get: {
        description: "Retrieve coverage statistics from the Healthcare Marketplace",
        operationId: "getCoverageStats",
        parameters: [
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string"
            }
          }
        ]
      }
    },
    "/api/v1/coverage/search": {
      get: {
        description: "Search coverage options based on query and location",
        operationId: "searchCoverage",
        parameters: [
          {
            name: "q",
            in: "query",
            required: true,
            description: "Query string for searching coverage options",
            schema: {
              type: "string"
            }
          },
          {
            name: "zipcode",
            in: "query",
            required: true,
            description: "Zip code to refine the coverage search",
            schema: {
              type: "string"
            }
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string"
            }
          }
        ]
      }
    },
    "/api/v1/providers/autocomplete": {
      get: {
        description: "Autocomplete search for providers based on query, zipcode, and type",
        operationId: "autocompleteProviders",
        parameters: [
          {
            name: "q",
            in: "query",
            required: true,
            description: "Query string for searching providers",
            schema: {
              type: "string"
            }
          },
          {
            name: "zipcode",
            in: "query",
            required: true,
            description: "Zip code to refine the provider search",
            schema: {
              type: "string"
            }
          },
          {
            name: "type",
            in: "query",
            required: false,
            description: "Type of provider to search for",
            schema: {
              type: "string"
            }
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string"
            }
          }
        ]
      }
    },
    "/api/v1/providers/search": {
      get: {
        description: "Search for providers based on query, year, zipcode, and type",
        operationId: "searchProviders",
        parameters: [
          {
            name: "q",
            in: "query",
            required: true,
            description: "Query string for searching providers",
            schema: {
              type: "string"
            }
          },
          {
            name: "year",
            in: "query",
            required: true,
            description: "Year for the provider data",
            schema: {
              type: "string"
            }
          },
          {
            name: "zipcode",
            in: "query",
            required: true,
            description: "Zip code to refine the provider search",
            schema: {
              type: "string"
            }
          },
          {
            name: "type",
            in: "query",
            required: false,
            description: "Type of provider to search for",
            schema: {
              type: "string"
            }
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string"
            }
          }
        ]
      }
    },
    "/api/v1/providers/covered": {
      get: {
        description: "Check if providers are covered under specific plans for a given year",
        operationId: "getCoveredProviders",
        parameters: [
          {
            name: "providerids",
            in: "query",
            required: true,
            description: "Comma-separated list of provider identifiers to check coverage for",
            schema: {
              type: "string"
            }
          },
          {
            name: "planids",
            in: "query",
            required: true,
            description: "Comma-separated list of plan identifiers to check the provider coverage against",
            schema: {
              type: "string"
            }
          },
          {
            name: "year",
            in: "query",
            required: true,
            description: "The year for which the coverage is being checked",
            schema: {
              type: "string"
            }
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string"
            }
          }
        ]
      }
    },
    "/api/v1/households/eligibility/estimates": {
      post: {
        description: "Get eligibility estimates for households",
        operationId: "getHouseholdEligibilityEstimates",
        "x-openai-isConsequential": false,
        parameters: [
          {
            name: "place",
            in: "body",
            required: true,
            description: "Location information",
            schema: {
              type: "object",
              properties: {
                countyfips: {
                  type: "string"
                },
                state: {
                  type: "string"
                },
                zipcode: {
                  type: "string"
                }
              }
            }
          },
          {
            name: "year",
            in: "query",
            required: true,
            description: "The year for which eligibility estimates are requested",
            schema: {
              type: "string"
            }
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string"
            }
          }
        ]
      }
    },
    "/api/v1/households/ichra": {
      post: {
        description: "Create or update Individual Coverage Health Reimbursement Arrangements (ICHRA)",
        operationId: "createOrUpdateICHRA",
        "x-openai-isConsequential": false,
        parameters: [
          {
            name: "year",
            in: "query",
            required: true,
            description: "The year for which the information is being created or updated",
            schema: {
              type: "string"
            }
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string"
            }
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "Data for creating or updating ICHRA",
            schema: {
              type: "object",
              properties: {
                household: {
                  type: "object",
                  properties: {
                    income: {
                      type: "integer"
                    },
                    people: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          dob: {
                            type: "string",
                            format: "date"
                          },
                          current_plan: {
                            type: "string"
                          },
                          csr_variant: {
                            type: "string"
                          },
                          relationship: {
                            type: "string"
                          },
                          uses_tobacco: {
                            type: "boolean"
                          },
                          age: {
                            type: "integer"
                          }
                        }
                      }
                    },
                    effective_date: {
                      type: "string",
                      format: "date"
                    }
                  }
                },
                place: {
                  type: "object",
                  properties: {
                    countyfips: {
                      type: "string"
                    },
                    state: {
                      type: "string"
                    },
                    zipcode: {
                      type: "string"
                    }
                  }
                },
                hra: {
                  type: "integer"
                }
              }
            }
          }
        ]
      }
    },
    "/api/v1/households/lcbp": {
      post: {
        description: "Create or update Low-Cost Basic Plan (LCBP) households",
        operationId: "createOrUpdateLCBPHousehold",
        "x-openai-isConsequential": false,
        parameters: [
          {
            name: "year",
            in: "query",
            required: true,
            description: "The year for which the information is being created or updated",
            schema: {
              type: "string"
            }
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string"
            }
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "Data for creating or updating LCBP households",
            schema: {
              type: "object",
              properties: {
                household: {
                  type: "object",
                  properties: {
                    income: {
                      type: "integer"
                    },
                    people: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          dob: {
                            type: "string",
                            format: "date"
                          },
                          aptc_eligible: {
                            type: "boolean"
                          },
                          gender: {
                            type: "string"
                          },
                          uses_tobacco: {
                            type: "boolean"
                          }
                        }
                      }
                    }
                  }
                },
                market: {
                  type: "string",
                  enum: ["Individual", "SmallGroup"]
                },
                place: {
                  type: "object",
                  properties: {
                    countyfips: {
                      type: "string"
                    },
                    state: {
                      type: "string"
                    },
                    zipcode: {
                      type: "string"
                    }
                  }
                }
              }
            }
          }
        ]
      }
    },
    "/api/v1/households/slcsp": {
      post: {
        description: "Retrieve Second Lowest Cost Silver Plan (SLCSP) for a household",
        operationId: "getSLCSPForHousehold",
        "x-openai-isConsequential": false,
        parameters: [
          {
            name: "year",
            in: "query",
            required: true,
            description: "The year for which the information is requested",
            schema: {
              type: "string"
            }
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string"
            }
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "Data for calculating SLCSP for the household",
            schema: {
              type: "object",
              properties: {
                household: {
                  type: "object",
                  properties: {
                    income: {
                      type: "integer"
                    },
                    people: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          dob: {
                            type: "string",
                            format: "date"
                          },
                          aptc_eligible: {
                            type: "boolean"
                          },
                          gender: {
                            type: "string"
                          },
                          uses_tobacco: {
                            type: "boolean"
                          }
                        }
                      }
                    }
                  }
                },
                market: {
                  type: "string",
                  enum: ["Individual", "SmallGroup"]
                },
                place: {
                  type: "object",
                  properties: {
                    countyfips: {
                      type: "string"
                    },
                    state: {
                      type: "string"
                    },
                    zipcode: {
                      type: "string"
                    }
                  }
                }
              }
            }
          }
        ]
      }
    },
    "/api/v1/households/lcsp": {
      post: {
        description: "Retrieve Lowest Cost Silver Plan (LCSP) for a household",
        operationId: "getLCSPForHousehold",
        "x-openai-isConsequential": false,
        parameters: [
          {
            name: "year",
            in: "query",
            required: true,
            description: "The year for which the information is requested",
            schema: {
              type: "string"
            }
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string"
            }
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "Data for calculating LCSP for the household",
            schema: {
              type: "object",
              properties: {
                household: {
                  type: "object",
                  properties: {
                    income: {
                      type: "integer"
                    },
                    people: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          dob: {
                            type: "string",
                            format: "date"
                          },
                          aptc_eligible: {
                            type: "boolean"
                          },
                          gender: {
                            type: "string"
                          },
                          uses_tobacco: {
                            type: "boolean"
                          }
                        }
                      }
                    }
                  }
                },
                market: {
                  type: "string",
                  enum: ["Individual", "SmallGroup"]
                },
                place: {
                  type: "object",
                  properties: {
                    countyfips: {
                      type: "string"
                    },
                    state: {
                      type: "string"
                    },
                    zipcode: {
                      type: "string"
                    }
                  }
                }
              }
            }
          }
        ]
      }
    },
    "/api/v1/households/pcfpl": {
      get: {
        description: "Retrieve Federal Poverty Level (FPL) for a household",
        operationId: "getFPLForHousehold",
        parameters: [
          {
            name: "income",
            in: "query",
            required: true,
            description: "Household income",
            schema: {
              type: "integer"
            }
          },
          {
            name: "size",
            in: "query",
            required: true,
            description: "Household size",
            schema: {
              type: "integer"
            }
          },
          {
            name: "state",
            in: "query",
            required: true,
            description: "State code",
            schema: {
              type: "string"
            }
          },
          {
            name: "year",
            in: "query",
            required: true,
            description: "The year for which the information is requested",
            schema: {
              type: "string"
            }
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string"
            }
          }
        ]
      }
    },
    "/api/v1/plans": {
      post: {
        description: "Retrieve plans available in the marketplace",
        operationId: "getPlans",
        "x-openai-isConsequential": false,
        parameters: [
          {
            name: "year",
            in: "query",
            required: true,
            description: "The year for which the plans are requested",
            schema: {
              type: "string"
            }
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string"
            }
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "Data for filtering plans",
            schema: {
              type: "object",
              properties: {
                household: {
                  type: "object",
                  properties: {
                    income: {
                      type: "integer"
                    },
                    people: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          age: {
                            type: "integer"
                          },
                          is_pregnant: {
                            type: "boolean"
                          },
                          is_parent: {
                            type: "boolean"
                          },
                          uses_tobacco: {
                            type: "boolean"
                          },
                          gender: {
                            type: "string",
                            enum: ["Male", "Female", "Other"]
                          }
                        }
                      }
                    },
                    has_married_couple: {
                      type: "boolean"
                    }
                  }
                },
                place: {
                  type: "object",
                  properties: {
                    countyfips: {
                      type: "string"
                    },
                    state: {
                      type: "string"
                    },
                    zipcode: {
                      type: "string"
                    }
                  }
                },
                market: {
                  type: "string",
                  enum: ["Individual", "SmallGroup"]
                },
                plan_ids: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                },
                aptc_override: {
                  type: "integer"
                },
                csr_override: {
                  type: "string"
                },
                catastrophic_override: {
                  type: "boolean"
                }
              }
            }
          }
        ]
      }
    },
    "/api/v1/plans/search/stats": {
      post: {
        description: "Retrieve statistics for plan search",
        operationId: "getPlanSearchStats",
        "x-openai-isConsequential": false,
        parameters: [
          {
            name: "year",
            in: "query",
            required: true,
            description: "The year for which the statistics are requested",
            schema: {
              type: "string"
            }
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string"
            }
          },
          {
            name: "body",
            in: "body",
            required: true,
            description: "Data for retrieving plan search statistics",
            schema: {
              type: "object",
              properties: {
                household: {
                  type: "object",
                  properties: {
                    income: {
                      type: "integer"
                    },
                    people: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          dob: {
                            type: "string",
                            format: "date"
                          },
                          aptc_eligible: {
                            type: "boolean"
                          },
                          gender: {
                            type: "string"
                          },
                          uses_tobacco: {
                            type: "boolean"
                          }
                        }
                      }
                    }
                  }
                },
                market: {
                  type: "string",
                  enum: ["Individual", "SmallGroup"]
                },
                place: {
                  type: "object",
                  properties: {
                    countyfips: {
                      type: "string"
                    },
                    state: {
                      type: "string"
                    },
                    zipcode: {
                      type: "string"
                    }
                  }
                }
              }
            }
          }
        ]
      }
    },
    "/api/v1/plans/{plan_id}/quality-ratings": {
      get: {
        description: "Retrieve quality ratings for a specific plan",
        operationId: "getPlanQualityRatings",
        parameters: [
          {
            name: "plan_id",
            in: "path",
            required: true,
            description: "The ID of the plan for which quality ratings are requested",
            schema: {
              type: "string"
            }
          },
          {
            name: "year",
            in: "query",
            required: true,
            description: "The year for which the quality ratings are requested",
            schema: {
              type: "string"
            }
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string"
            }
          }
        ]
      }
    },
    "/api/v1/issuers": {
      get: {
        description: "Retrieve a list of issuers",
        operationId: "getIssuersList",
        "x-openai-isConsequential": false,
        parameters: [
          {
            name: "offset",
            in: "query",
            required: false,
            description: "Offset for paginating through the results",
            schema: {
              type: "integer"
            }
          },
          {
            name: "limit",
            in: "query",
            required: false,
            description: "Limit for the number of results to be returned per page",
            schema: {
              type: "integer"
            }
          },
          {
            name: "state",
            in: "query",
            required: true,
            description: "State code for filtering issuers",
            schema: {
              type: "string"
            }
          },
          {
            name: "year",
            in: "query",
            required: true,
            description: "The year for which the issuers information is requested",
            schema: {
              type: "string"
            }
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string"
            }
          }
        ]
      }
    },
    "/api/v1/issuers/{issuer_id}": {
      get: {
        description: "Retrieve information about a specific issuer",
        operationId: "getIssuerInformation",
        parameters: [
          {
            name: "issuer_id",
            in: "path",
            required: true,
            description: "The ID of the issuer for which information is requested",
            schema: {
              type: "string"
            }
          },
          {
            name: "year",
            in: "query",
            required: true,
            description: "The year for which the issuer information is requested",
            schema: {
              type: "string"
            }
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string"
            }
          }
        ]
      }
    },
    "/api/v1/enrollment/validate": {
      post: {
        description: "Validate enrollment data",
        operationId: "validateEnrollmentData",
        "x-openai-isConsequential": false,
        parameters: [
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string"
            }
          },
          {
            name: "body",
            in: "body",
            required: false,
            description: "Data for enrollment validation",
            schema: {
              type: "object",
              properties: {
                maxAPTC: {
                  type: "integer"
                },
                year: {
                  type: "integer"
                },
                is_custom: {
                  type: "boolean"
                },
                division: {
                  type: "string"
                },
                enrollment_groups: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string"
                      },
                      effective_date: {
                        type: "string",
                        format: "date"
                      },
                      csr: {
                        type: "string"
                      },
                      enrollees: {
                        type: "array",
                        items: {
                          type: "string"
                        }
                      },
                      subscriber_id: {
                        type: "string"
                      },
                      relationships: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            super_id: {
                              type: "string"
                            },
                            sub_id: {
                              type: "string"
                            },
                            relationship: {
                              type: "string"
                            }
                          }
                        }
                      }
                    }
                  }
                },
                enrollees: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string"
                      },
                      name: {
                        type: "string"
                      },
                      gender: {
                        type: "string"
                      },
                      dob: {
                        type: "string",
                        format: "date"
                      },
                      location: {
                        type: "object",
                        properties: {
                          city: {
                            type: "string"
                          },
                          state: {
                            type: "string"
                          },
                          street_1: {
                            type: "string"
                          },
                          street_2: {
                            type: "string"
                          },
                          zipcode: {
                            type: "string"
                          },
                          countyfips: {
                            type: "string"
                          }
                        }
                      },
                      csr: {
                        type: "string"
                      },
                      is_filer: {
                        type: "boolean"
                      },
                      has_hardship: {
                        type: "boolean"
                      },
                      relationship: {
                        type: "string"
                      },
                      allowed_metal_levels: {
                        type: "array",
                        items: {
                          type: "string"
                        }
                      },
                      allowed_plan_ids: {
                        type: "array",
                        items: {
                          type: "string"
                        }
                      },
                      current_enrollment: {
                        type: "object",
                        properties: {
                          plan_id: {
                            type: "string"
                          },
                          effective_date: {
                            type: "string",
                            format: "date"
                          },
                          is_smoker: {
                            type: "boolean"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        ]
      }
    }
  },
  components: {
    schemas: {}
  }
};

// modules/ai/services/lib/surveyFunction.ts
async function surveyCreator(args) {
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
              {}
            )
          },
          required: args.fields.map((field) => field.name)
        }
      },
      function: async (_args) => {
        console.log(JSON.stringify(_args, null, 2));
        let errorMessages = "";
        for (const field of args.fields) {
          if (!_args[field.name]) {
            errorMessages += `${field.errorMessages?.required || `${field.name} is required.`}
`;
          }
          switch (field.type) {
            case "string": {
              if (field.options && !field.options.includes(_args[field.name])) {
                errorMessages += field.errorMessages?.invalid || `${field.name} is invalid.
`;
              }
              break;
            }
            case "number": {
              if (isNaN(_args[field.name])) {
                errorMessages += field.errorMessages?.invalid || `${field.name} is invalid.
`;
              }
              break;
            }
          }
        }
        if (errorMessages) {
          console.log({
            success: false,
            message: errorMessages
          });
          return {
            success: false,
            message: errorMessages
          };
        }
        const data = await args.toSubmitFunction(_args);
        return { success: true, data };
      }
    }
  };
}

// modules/ai/services/lib/survey-ai.ts
async function getSurveyAIFunctions(apiArgs) {
  const cms_functions = await openapiToFunctions(cms_openapi, fetchFunction);
  const functions = {
    ...cms_functions,
    ...await surveyCreator({
      name: "submitApplication",
      description: "Submit an application or inquiry for health insurance. Only ask 3 questions at a time to keep the user engaged. The user's answers could fill-out different fields if applicable. Example: I have a chronic disease and need insurance. Always ask the reason of application first, then  diseases, and then medications.",
      fields: [
        {
          name: "reasonOfApplication",
          description: "Ask the user for their reason of application. This could contain their disease, current medication, long term goals, current doctor, hospital, recommendation. Feel free to use the information here on other forms if applicable. Example: I have a chronic disease and need insurance.",
          type: "string"
        },
        {
          name: "diseases",
          description: "The user's current diseases or disabilities. This could be a list of diseases or disabilities. Example: diabetes, high blood pressure.",
          type: "string"
        },
        {
          name: "medications",
          description: "The user's current medications. This could be a list of medications. Example: insulin, metformin.",
          type: "string"
        },
        {
          name: "currentLivingSituation",
          description: "Ask for the user's current living situation. This could be their current living situation, such as living alone, with family, or in a nursing home, salary, current address, location. Example: I live with my family in Springfield, IL.",
          type: "string"
        },
        {
          name: "name",
          description: "The name of the applicant. This includes first and last name, suffixes, and prefixes. Example: John Doe Jr.",
          type: "string"
        },
        {
          name: "email",
          description: "The email of the applicant. Example: user@email.com",
          type: "string"
        },
        {
          name: "phone",
          description: "The phone number of the applicant. Example: 555-555-5555.",
          type: "string"
        },
        {
          name: "age",
          description: "The age of the applicant. This is a number, and is used to determine eligibility for certain programs. Example: 25.",
          type: "number"
        },
        {
          name: "yearlyIncome",
          description: "The yearly income of the applicant. This is a number, and is used to determine eligibility for certain programs. Example: 25000.",
          type: "number"
        },
        {
          name: "gender",
          description: "The gender of the applicant. Example: male",
          type: "string",
          options: ["male", "female", "transgender", "other"]
        },
        {
          name: "address",
          description: "The address of the applicant. Included are street, city, state, and zip code, and isPermanent. Example: 123 Main St, Springfield, IL 62701 (isPermanent: true).",
          type: "string"
        }
      ],
      toSubmitFunction: async (args) => {
        await apiArgs?.keystone.prisma.inquiry.create({
          data: {
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
            address: args.address
          }
        });
        return { success: true, message: "Application submitted." };
      }
    }),
    ...await surveyCreator({
      name: "submitSuggestion",
      description: "After the user had succesfully sent a form AND if the user has prompted that they like a policy offered, you can use this function to submit the selected policy of the user.",
      fields: [
        {
          name: "name",
          description: "The name of the applicant. This includes first and last name, suffixes, and prefixes. Example: John Doe Jr.",
          type: "string"
        },
        {
          name: "policyName",
          description: "The name of the policy that the user wants to claim. Refer to the conversation history for the policy details. Make sure you had used the 'SearchHealthcarePlans' function to get the policy details.",
          type: "string"
        },
        {
          name: "policyURL",
          description: "The URL of the policy that the user wants to claim. Provide a valid URL. Make sure you had used the 'SearchHealthcarePlans' function to get the policy details.",
          type: "string"
        }
      ],
      toSubmitFunction: async (args) => {
        await apiArgs?.keystone.prisma.policy.create({
          data: {
            name: args.name,
            policyName: args.policyName,
            policyURL: args.policyURL
          }
        });
        return { success: true, message: "Recommended policy submitted." };
      }
    })
  };
  return functions;
}

// modules/ai/services/bot/survey-ai-assistant.ts
async function surveyAiAssistant(args) {
  const threadId = args.threadId;
  const assistantID = CONFIG.HEALTHBOT_ASSISTANT_ID;
  const fx = await getSurveyAIFunctions({
    keystone: args.keystoneArgs,
    metadata: {},
    sessionID: threadId
  });
  let system = {
    running: true
  };
  const query = args.query;
  const eventHandler = new EventHandler({
    client: openai,
    onResponse: (response) => {
      args.eventHandler({ _type: "response", response });
    },
    onFunctionCall: (functionName, functionArgs) => {
      args.eventHandler({
        _type: "function_call",
        functionName,
        functionArgs
      });
    },
    onFunctionFetch: (functionName, functionData) => {
      args.eventHandler({
        _type: "function_fetch",
        functionName,
        functionData
      });
    },
    onDone: () => {
      system.running = false;
    },
    functions: fx
  });
  eventHandler.on("event", eventHandler.onEvent.bind(eventHandler));
  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: query
  });
  const stream = await openai.beta.threads.runs.stream(
    threadId,
    { assistant_id: assistantID },
    // @ts-ignore
    eventHandler
  );
  for await (const event of stream) {
    eventHandler.emit("event", event);
  }
  while (system.running) {
    await SLEEP(1e3);
  }
  args.eventHandler({ _type: "done" });
  return system;
}

// modules/ai/services/functions/threads.ts
async function createThread() {
  const thread = await openai.beta.threads.create();
  return thread;
}

// modules/ai/rest.ts
var aiRouteDeclaration = {
  name: "/ai",
  routes: /* @__PURE__ */ new Map()
};
aiRouteDeclaration.routes.set(
  "/start",
  new RouteDeclarationMetadata({
    method: "post" /* POST */,
    inputParser: NO_INPUT,
    outputParser: import_zod4.z.object({
      sessionID: import_zod4.z.string(),
      createdAt: import_zod4.z.number()
    }),
    func: async ({}) => {
      const newThreadId = await createThread();
      return { sessionID: newThreadId.id, createdAt: newThreadId.created_at };
    }
  })
);
aiRouteDeclaration.routes.set(
  "/call",
  new RouteDeclarationMetadata({
    method: "post" /* POST */,
    inputParser: import_zod4.z.object({
      ["body" /* BODY */]: import_zod4.z.object({
        sessionID: import_zod4.z.string(),
        prompt: import_zod4.z.string()
      })
    }),
    func: async ({
      inputData: {
        body: { prompt, sessionID }
      },
      res,
      context
    }) => {
      await surveyAiAssistant({
        threadId: sessionID,
        query: prompt,
        eventHandler: (data) => {
          switch (data._type) {
            case "done": {
            }
            default: {
              res.write(JSON.stringify(data) + "\n");
            }
          }
        },
        keystoneArgs: context
      });
      res.end();
    }
  })
);

// modules/ai/index.ts
var aiDefinition = {
  schema: [],
  graphqlExtensions: [],
  restExtensions: [aiRouteDeclaration]
};

// modules/auth/graphql.ts
var import_core = require("@keystone-6/core");

// modules/auth/services/login.ts
var import_bcrypt = require("bcrypt");
async function authenticateUser(args, context) {
  return validateUserViaPassword(args, context);
}
async function validateUserViaPassword(args, context) {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
    include: {
      localAuth: true
    }
  });
  if (!user)
    return null;
  if (!user.localAuth)
    return null;
  const passHash = user.localAuth.password;
  const validate = (0, import_bcrypt.compareSync)(args.password, passHash);
  if (!validate)
    return null;
  return {
    type: "auth",
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role ?? "",
    createdAt: /* @__PURE__ */ new Date()
  };
}

// modules/auth/services/reset_password.ts
var import_bcrypt2 = require("bcrypt");

// common/jwt/index.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

// modules/auth/services/reset_password.ts
async function changePassword(user, passwordInput, context) {
  const userObj = await context.prisma.user.findUnique({
    where: { id: user.id },
    include: {
      localAuth: true
    }
  });
  if (!userObj)
    throw new Error("User not found");
  if (!userObj.localAuth) {
    const hashedPassword = (0, import_bcrypt2.hashSync)(passwordInput.newPassword, 10);
    await context.prisma.userLocalAuth.create({
      data: {
        password: hashedPassword,
        user: {
          connect: {
            id: user.id
          }
        }
      }
    });
    return;
  }
}

// modules/auth/graphql.ts
var gqlNames = {
  ItemAuthenticationWithPasswordSuccess: "ClientItemAuthenticationWithPasswordSuccess",
  ItemAuthenticationWithPasswordFailure: "ClientItemAuthenticationWithPasswordFailure",
  ItemAuthenticationWithPasswordResult: "ClientItemAuthenticationWithPasswordResult"
};
var listKey = "User";
var identityField = "email";
var secretField = "password";
var clientAuthGraphqlExtension = import_core.graphql.extend((base) => {
  const ItemAuthenticationWithPasswordSuccess = import_core.graphql.object()({
    name: gqlNames.ItemAuthenticationWithPasswordSuccess,
    fields: {
      sessionToken: import_core.graphql.field({ type: import_core.graphql.nonNull(import_core.graphql.String) }),
      item: import_core.graphql.field({ type: import_core.graphql.nonNull(base.object(listKey)) })
    }
  });
  const ItemAuthenticationWithPasswordFailure = import_core.graphql.object()({
    name: gqlNames.ItemAuthenticationWithPasswordFailure,
    fields: {
      message: import_core.graphql.field({ type: import_core.graphql.nonNull(import_core.graphql.String) })
    }
  });
  const AuthenticationResult = import_core.graphql.union({
    name: gqlNames.ItemAuthenticationWithPasswordResult,
    types: [
      ItemAuthenticationWithPasswordSuccess,
      ItemAuthenticationWithPasswordFailure
    ],
    resolveType(val) {
      if ("sessionToken" in val) {
        return gqlNames.ItemAuthenticationWithPasswordSuccess;
      }
      return gqlNames.ItemAuthenticationWithPasswordFailure;
    }
  });
  return {
    mutation: {
      authclient_login: import_core.graphql.field({
        type: AuthenticationResult,
        args: {
          [identityField]: import_core.graphql.arg({
            type: import_core.graphql.nonNull(import_core.graphql.String)
          }),
          [secretField]: import_core.graphql.arg({ type: import_core.graphql.nonNull(import_core.graphql.String) })
        },
        async resolve(_, { [identityField]: identity, [secretField]: secret }, context) {
          if (!context.sessionStrategy) {
            throw new Error("No session implementation available on context");
          }
          const user = await context.prisma.user.findUnique({
            where: { [identityField]: identity }
          });
          if (!user) {
            return { code: "FAILURE", message: "Authentication failed." };
          }
          const verifyResult = await authenticateUser(
            {
              email: identity,
              password: secret
            },
            context
          );
          if (!verifyResult) {
            return { code: "FAILURE", message: "Authentication failed." };
          }
          const sessionToken = await context.sessionStrategy.start({
            data: {
              listKey: "User",
              itemId: verifyResult.id,
              data: {
                role: verifyResult.role,
                id: verifyResult.id,
                name: verifyResult.name,
                createdAt: verifyResult.createdAt.toISOString()
              }
            },
            context
          });
          if (typeof sessionToken !== "string" || sessionToken.length === 0) {
            return { code: "FAILURE", message: "Failed to start session." };
          }
          return { sessionToken, item: user };
        }
      }),
      authclient_register: import_core.graphql.field({
        type: import_core.graphql.Boolean,
        args: {
          email: import_core.graphql.arg({ type: import_core.graphql.nonNull(import_core.graphql.String) }),
          firstName: import_core.graphql.arg({ type: import_core.graphql.nonNull(import_core.graphql.String) }),
          lastName: import_core.graphql.arg({ type: import_core.graphql.String }),
          password: import_core.graphql.arg({ type: import_core.graphql.nonNull(import_core.graphql.String) })
        },
        async resolve(_, { email, firstName, lastName, password: password2 }, context) {
          const user = await context.prisma.user.create({
            data: {
              email,
              name: firstName,
              lastName: lastName || ""
            }
          });
          if (!user) {
            return false;
          }
          try {
            await changePassword(
              {
                id: user.id
              },
              {
                oldPassword: "",
                newPassword: password2
              },
              context
            );
            return true;
          } catch (e) {
            console.error(e);
            return false;
          }
        }
      }),
      authclient_changePassword: import_core.graphql.field({
        type: import_core.graphql.Boolean,
        args: {
          oldPassword: import_core.graphql.arg({ type: import_core.graphql.nonNull(import_core.graphql.String) }),
          newPassword: import_core.graphql.arg({ type: import_core.graphql.nonNull(import_core.graphql.String) })
        },
        async resolve(_, { oldPassword, newPassword }, context) {
          try {
            if (!context.session?.data.id)
              throw new Error("No user session");
            await changePassword(
              {
                id: context.session?.data.id
              },
              {
                oldPassword,
                newPassword
              },
              context
            );
            return true;
          } catch (e) {
            console.error(e);
            return false;
          }
        }
      })
    }
  };
});

// modules/auth/rest-api/index.ts
var import_zod5 = require("zod");

// graphql/operations.ts
var LoginDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "Login" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "email" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "password" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "authenticateUserWithPassword" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "email" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "email" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "adminPassword" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "password" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "__typename" } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "UserAuthenticationWithPasswordSuccess" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "sessionToken" } }] } }] } }] } }] };

// server/services/access/serverAccessConfig.ts
var serverAccessConfig = (generatorArgs) => {
  const globalMiddleware = (operation) => {
    if (!operation.session) {
      throw new Error("Not Authenticated");
    }
    if (!operation.context.session?.itemId) {
      throw new Error("Not Authenticated");
    }
    const superAccessRoles = [
      ...generatorArgs.superAccess || [],
      "dev" /* Dev */
    ];
    if (superAccessRoles.includes(operation.session.data.role)) {
      return true;
    }
    return false;
  };
  return (operation) => {
    let isAllowed = false;
    isAllowed = isAllowed || globalMiddleware(operation);
    for (const condition of generatorArgs.conditions || []) {
      if (isAllowed) {
        isAllowed = isAllowed || condition(operation);
      }
      if (!isAllowed) {
        break;
      }
    }
    return isAllowed;
  };
};
var hasRole = (args) => (operation) => {
  console.log(operation.session?.data?.role);
  return args.roles.includes(operation.session?.data?.role ?? "xxnorolexx");
};

// modules/auth/rest-api/index.ts
var authRouteDeclaration = {
  name: "/auth",
  routes: /* @__PURE__ */ new Map()
};
authRouteDeclaration.routes.set(
  "/signin",
  new RouteDeclarationMetadata({
    method: "post" /* POST */,
    inputParser: import_zod5.z.object({
      ["body" /* BODY */]: import_zod5.z.object({
        username: import_zod5.z.string(),
        password: import_zod5.z.string()
      })
    }),
    func: async ({
      context: { graphql: graphql4 },
      inputData: {
        ["body" /* BODY */]: { username, password: password2 }
      },
      res
    }) => {
      const request = await graphql4.run({
        query: LoginDocument,
        variables: {
          email: username,
          password: password2
        }
      });
      if (request.authenticateUserWithPassword?.__typename == "UserAuthenticationWithPasswordSuccess") {
        return {
          token: request.authenticateUserWithPassword.sessionToken
        };
      } else {
        res.status(401).json({
          error: "Invalid credentials"
        });
        return;
      }
    }
  })
);
authRouteDeclaration.routes.set(
  "/test/:id/:id2",
  new RouteDeclarationMetadata({
    method: "get" /* GET */,
    accessConfig: serverAccessConfig({
      conditions: [hasRole({ roles: [PERMISSION_ENUM.ADMIN] })]
    }),
    inputParser: import_zod5.z.object({
      ["params" /* PARAMS */]: import_zod5.z.object({
        id: import_zod5.z.preprocess((val) => parseInt(val), import_zod5.z.number()),
        id2: import_zod5.z.preprocess((val) => parseInt(val), import_zod5.z.number())
      }),
      ["query" /* QUERY */]: import_zod5.z.object({
        name: import_zod5.z.string()
      }),
      ["headers" /* HEADERS */]: import_zod5.z.object({
        whoosh: import_zod5.z.string().default("whoosh")
      })
    }),
    func: async ({ inputData, res }) => {
      return inputData;
    }
  })
);

// modules/auth/schema.ts
var import_core2 = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");

// utils/functions/deepMerge.ts
var deepMerge = (objects) => {
  const isObject = (obj) => obj && typeof obj === "object";
  const combinedObject = objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];
      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = deepMerge([pVal, oVal]);
      } else {
        prev[key] = oVal;
      }
    });
    return prev;
  }, {});
  return combinedObject;
};

// common/access/definitions/access.ts
var accessConfig = (generatorArgs) => {
  const globalMiddleware = (operation) => {
    if (generatorArgs.isAuthed) {
      if (!operation.context.session?.itemId) {
        throw new Error("Not Authenticated");
      }
    }
    const superAccessRoles = [
      ...generatorArgs.superAccess || [],
      "dev" /* Dev */
    ];
    if (superAccessRoles.includes(operation.session.data.role)) {
      return true;
    }
    return false;
  };
  const baseConfig = {
    operation: {
      query: (args) => {
        let checkerFunction = generatorArgs.operations.read || generatorArgs.operations.all;
        if (!checkerFunction) {
          checkerFunction = () => true;
        }
        return globalMiddleware(args) || checkerFunction(args);
      },
      create: (args) => {
        let checkerFunction = generatorArgs.operations.create || generatorArgs.operations.write || generatorArgs.operations.all;
        if (!checkerFunction) {
          checkerFunction = () => true;
        }
        return globalMiddleware(args) || checkerFunction(args);
      },
      update: (args) => {
        let checkerFunction = generatorArgs.operations.update || generatorArgs.operations.write || generatorArgs.operations.all;
        if (!checkerFunction) {
          checkerFunction = () => true;
        }
        return globalMiddleware(args) || checkerFunction(args);
      },
      delete: (args) => {
        let checkerFunction = generatorArgs.operations.delete || generatorArgs.operations.write || generatorArgs.operations.all;
        if (!checkerFunction) {
          checkerFunction = () => true;
        }
        return globalMiddleware(args) || checkerFunction(args);
      }
    },
    filter: {
      query: (args) => {
        let checkerFunction = generatorArgs.filter.read || generatorArgs.operations.all;
        if (!checkerFunction) {
          checkerFunction = () => true;
        }
        return globalMiddleware(args) || checkerFunction(args);
      },
      update: (args) => {
        let checkerFunction = generatorArgs.filter.update || generatorArgs.filter.write || generatorArgs.operations.all;
        if (!checkerFunction) {
          checkerFunction = () => true;
        }
        return globalMiddleware(args) || checkerFunction(args);
      },
      delete: (args) => {
        let checkerFunction = generatorArgs.filter.delete || generatorArgs.filter.write || generatorArgs.operations.all;
        if (!checkerFunction) {
          checkerFunction = () => true;
        }
        return globalMiddleware(args) || checkerFunction(args);
      }
    },
    ...generatorArgs.item ? {
      item: {
        create: (args) => {
          let checkerFunction = generatorArgs.item.create || generatorArgs.item.write || generatorArgs.operations.all;
          if (!checkerFunction) {
            checkerFunction = () => true;
          }
          return globalMiddleware(args) || checkerFunction(args);
        },
        update: (args) => {
          let checkerFunction = generatorArgs.item.create || generatorArgs.item.write || generatorArgs.operations.all;
          if (!checkerFunction) {
            checkerFunction = () => true;
          }
          return globalMiddleware(args) || checkerFunction(args) || generatorArgs.operations.all;
        },
        delete: (args) => {
          let checkerFunction = generatorArgs.item.create || generatorArgs.item.write || generatorArgs.operations.all;
          if (!checkerFunction) {
            checkerFunction = () => true;
          }
          return globalMiddleware(args) || checkerFunction(args);
        }
      }
    } : {}
  };
  return deepMerge([baseConfig, generatorArgs.extraConfig || {}]);
};

// common/access/definitions/templates.ts
var hasRole2 = (args) => (operation) => {
  return args.roles.includes(operation.session?.data?.role);
};
var isOwner = (args) => (operation) => {
  const userID = operation.session?.data?.id;
  if (!userID) {
    return false;
  }
  return {
    [args?.itemIDKey || "id"]: {
      equals: userID
    }
  };
};
var sequential = (checkers) => (operation) => {
  for (let checker of checkers) {
    const check = checker(operation);
    if (check) {
      return check;
    }
  }
  return false;
};
var allow = () => true;
var checkRole = (role, allowedRoles) => {
  return allowedRoles.includes(role);
};

// modules/auth/schema.ts
var userDataList = {
  User: (0, import_core2.list)({
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      lastName: (0, import_fields.text)(),
      displayName: (0, import_fields.virtual)({
        field: import_core2.graphql.field({
          type: import_core2.graphql.String,
          async resolve(item, {}, context) {
            return `${item.name} ${item.lastName}`.trim();
          }
        })
      }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
        // hooks: {
        //   resolveInput: async ({ inputData }) => {
        //     if (!inputData.email) {
        //       return `user-${Math.random().toString(36).substring(7)}@client`;
        //     }
        //     return inputData.email;
        //   },
        // },
      }),
      adminPassword: (0, import_fields.password)({
        validation: { isRequired: false },
        hooks: {
          validateInput: async ({
            resolvedData,
            context,
            addValidationError
          }) => {
            const role = context?.session?.data?.role;
            if (!resolvedData.adminPassword) {
              return;
            }
            if (checkRole(role, [PERMISSION_ENUM.DEV])) {
              return;
            }
            const userCount = await context.query.User.count({});
            if (userCount == 0) {
              return;
            }
            addValidationError("You are not allowed to modify this");
          }
        }
      }),
      localAuth: (0, import_fields.relationship)({
        ref: "UserLocalAuth.user",
        many: false,
        access: import_access.denyAll
      }),
      role: (0, import_fields.select)({
        type: "enum",
        options: [
          { label: "Dev", value: PERMISSION_ENUM.DEV },
          { label: "Admin", value: PERMISSION_ENUM.ADMIN },
          { label: "User", value: PERMISSION_ENUM.USER }
        ],
        defaultValue: PERMISSION_ENUM.USER,
        hooks: {
          validateInput: async ({
            resolvedData,
            context,
            addValidationError
          }) => {
            const role = context?.session?.data?.role;
            const selectedRole = resolvedData?.role?.toString() ?? "";
            if (!selectedRole) {
              return;
            }
            if (checkRole(role, [PERMISSION_ENUM.DEV])) {
              return;
            }
            if (checkRole(role, [PERMISSION_ENUM.DEV]) && checkRole(selectedRole, [PERMISSION_ENUM.DEV])) {
              return;
            }
            if (checkRole(role, [PERMISSION_ENUM.ADMIN]) && !checkRole(selectedRole, [PERMISSION_ENUM.DEV])) {
              return;
            }
            const userCount = await context.query.User.count({});
            if (userCount == 0) {
              return;
            }
            addValidationError("You are not allowed to change the role");
          }
        }
      }),
      groups: (0, import_fields.relationship)({
        ref: "Group.members",
        many: true
      }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      })
    },
    access: accessConfig({
      isAuthed: true,
      // superAccess: [PERMISSION_ENUM.ADMIN],
      operations: {
        read: allow,
        write: hasRole2({ roles: [PERMISSION_ENUM.ADMIN] }),
        update: allow
      },
      filter: {
        read: allow,
        write: sequential([
          hasRole2({ roles: [PERMISSION_ENUM.ADMIN] }),
          isOwner()
        ])
      }
    }),
    hooks: {
      validateDelete: async ({ item, context, addValidationError }) => {
        const userCount = await context.query.User.count({});
        if (userCount == 1) {
          return addValidationError("You cannot delete the only user");
        }
        const userRole = context.session?.data?.role;
        if (!userRole) {
          return addValidationError("You are not allowed to delete this");
        }
        if (checkRole(userRole, [PERMISSION_ENUM.DEV])) {
          return;
        }
        if (item.role === PERMISSION_ENUM.DEV) {
          return addValidationError("You are not allowed to delete this");
        }
      }
    }
  }),
  UserLocalAuth: (0, import_core2.list)({
    fields: {
      password: (0, import_fields.text)(),
      twoFaEmail: (0, import_fields.text)(),
      twoFaEmailSecret: (0, import_fields.text)(),
      twoFaEmailLastSent: (0, import_fields.timestamp)(),
      user: (0, import_fields.relationship)({
        ref: "User.localAuth",
        many: false
      })
    },
    access: import_access.denyAll,
    graphql: {
      omit: true
    }
  }),
  Group: (0, import_core2.list)({
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      members: (0, import_fields.relationship)({
        ref: "User.groups",
        many: true
      })
    },
    access: accessConfig({
      isAuthed: true,
      operations: {
        all: allow
      },
      filter: {
        all: allow
      }
    })
  })
};

// modules/auth/index.ts
var authDefinition = {
  schema: [userDataList],
  graphqlExtensions: [clientAuthGraphqlExtension],
  restExtensions: [authRouteDeclaration]
};

// modules/health_forms/index.ts
var import_core3 = require("@keystone-6/core");
var import_fields2 = require("@keystone-6/core/fields");
var healthFormDefinition = {
  schema: [
    {
      Inquiry: (0, import_core3.list)({
        fields: {
          reasonOfApplication: (0, import_fields2.text)(),
          diseases: (0, import_fields2.text)(),
          medications: (0, import_fields2.text)(),
          currentLivingSituation: (0, import_fields2.text)(),
          name: (0, import_fields2.text)(),
          email: (0, import_fields2.text)(),
          phone: (0, import_fields2.text)(),
          age: (0, import_fields2.float)(),
          yearlyIncome: (0, import_fields2.float)(),
          gender: (0, import_fields2.text)(),
          address: (0, import_fields2.text)(),
          addresed: (0, import_fields2.checkbox)(),
          remarks: (0, import_fields2.text)()
        },
        access: accessConfig({
          isAuthed: true,
          operations: {
            all: allow
          },
          filter: {
            all: allow
          }
        })
      }),
      Policy: (0, import_core3.list)({
        fields: {
          name: (0, import_fields2.text)({ validation: { isRequired: true } }),
          policyName: (0, import_fields2.text)({ validation: { isRequired: true } }),
          policyURL: (0, import_fields2.text)({ validation: { isRequired: true } })
        },
        access: accessConfig({
          filter: {
            all: allow
          },
          operations: {
            all: allow
          }
        })
      })
    }
  ],
  graphqlExtensions: [],
  restExtensions: []
};

// modules/test/index.ts
var import_core4 = require("@keystone-6/core");
var testDefinition = {
  schema: [],
  graphqlExtensions: [
    import_core4.graphql.extend((base) => {
      return {
        query: {
          test: import_core4.graphql.field({
            type: import_core4.graphql.String,
            resolve() {
              return "Hello world!";
            }
          })
        },
        mutation: {
          test: import_core4.graphql.field({
            type: import_core4.graphql.String,
            args: {
              email: import_core4.graphql.arg({ type: import_core4.graphql.String })
            },
            async resolve(source, { email }, context) {
              const user = await context.db.User.findOne({
                where: {
                  email
                }
              });
              return `Hello ${user?.name}!`;
            }
          })
        }
      };
    })
  ],
  restExtensions: []
};

// modules/index.ts
var modules = [
  testDefinition,
  authDefinition,
  aiDefinition,
  healthFormDefinition
];
function injectModules(config3) {
  for (const module2 of modules) {
    for (const schema of module2.schema) {
      config3.lists = { ...config3.lists, ...schema };
    }
  }
  const allExtensions = modules.reduce(
    (acc, module2) => [...acc, ...module2.graphqlExtensions],
    []
  );
  const existingExtendGraphqlSchema = config3.extendGraphqlSchema;
  config3.extendGraphqlSchema = (schema) => {
    let _schema = schema;
    const extensionList = allExtensions;
    if (existingExtendGraphqlSchema) {
      _schema = existingExtendGraphqlSchema(_schema);
    }
    extensionList.forEach((extension) => {
      _schema = extension(_schema);
    });
    return _schema;
  };
  const allRestExtensions = modules.reduce(
    (acc, module2) => [...acc, ...module2.restExtensions],
    []
  );
  if (!config3.server?.extendExpressApp) {
    config3.server = { ...config3.server, extendExpressApp: () => {
    } };
  }
  config3.server.extendExpressApp = (app, context) => {
    bootstrapExpress(app, context, allRestExtensions);
  };
  return config3;
}

// keystone.ts
(0, import_zod_to_openapi3.extendZodWithOpenApi)(import_zod6.z);
var MEM_CACHE = class {
  cache = /* @__PURE__ */ new Map();
  async set(key, value) {
    this.cache.set(key, value);
  }
  async get(key) {
    const val = this.cache.get(key);
    if (!val) {
      return void 0;
    }
    const valParsed = JSON.parse(val);
    if (valParsed.cacheTime + valParsed.cachePolicy.maxAge * 1e3 < Date.now()) {
      this.cache.delete(key);
      return void 0;
    }
    return this.cache.get(key);
  }
  async delete(key) {
    this.cache.delete(key);
  }
  processor = {
    set: this.set.bind(this),
    get: this.get.bind(this),
    delete: this.delete.bind(this)
  };
};
var MEM_CACHE_INSTANCE = new MEM_CACHE();
var configDef = injectModules({
  db: dbConfig_default,
  lists: {},
  session,
  graphql: {
    playground: CONFIG.GRAPHQL_INSTROSPECTION === "true",
    apolloConfig: {
      introspection: CONFIG.GRAPHQL_INSTROSPECTION === "true",
      // WARN: This is a security risk, should be configured properly, but cant be done in this project
      csrfPrevention: false,
      plugins: [
        // ApolloServerPluginCacheControl({ defaultMaxAge: 1 }),
        (0, import_server_plugin_response_cache.default)({
          sessionId: async ({ request }) => {
            const session2 = request?.http?.headers.get("Authorization") || null;
            return session2;
          }
        })
      ]
      // cache: MEM_CACHE_INSTANCE.processor,
    }
  },
  server: {
    cors: {
      origin: CONFIG.SERVER_CORS_URL.split(",")
    }
  }
});
var keystoneConfig = (0, import_core5.config)(configDef);
console.log(JSON.stringify(CONFIG, null, 2));
var keystone_default = withAuth(keystoneConfig);
//# sourceMappingURL=config.js.map
