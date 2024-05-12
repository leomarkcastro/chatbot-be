// Import the required modules

import $RefParser from "@apidevtools/json-schema-ref-parser";
import axios from "axios";
import { FunctionParameters } from "openai/resources";
import { FunctionSet } from "../types/functionSet";

export interface OpenAPISpec {
  openapi: string;
  info: {
    title: string;
    description: string;
    version: string;
  };
  servers: {
    url: string;
    description?: string;
  }[];
  paths: {
    [key: string]: {
      [key: string]: any;
    };
  };
  components: {
    schemas: {
      [key: string]: any;
    };
  };
}

export interface FunctionObject {
  type: string;
  function: {
    name: string;
    description: string;
    parameters: FunctionParameters;
  };
}

export async function openapiToFunctions(
  openapiSpec: OpenAPISpec,
  apiFunction: (args: any) => any
): Promise<FunctionSet> {
  const functions: FunctionSet = {};

  // Resolve references in the OpenAPI spec
  const resolvedSpec: OpenAPISpec = await $RefParser.dereference(openapiSpec);

  for (const [path, methods] of Object.entries(resolvedSpec.paths)) {
    for (const [method, spec] of Object.entries(methods)) {
      // 2. Extract a name for the functions
      const functionName = spec.operationId;

      // 3. Extract a description and parameters
      const desc = spec.description || spec.summary || "";

      const schema: FunctionParameters = {
        type: "object",
        properties: {},
      };

      const reqBody = spec.requestBody?.content?.["application/json"]?.schema;
      if (reqBody) {
        // @ts-ignore
        schema.properties.requestBody = reqBody;
      }

      const params = spec.parameters || [];
      if (params.length > 0) {
        const paramProperties = params.reduce(
          (acc: { [key: string]: any }, param: any) => {
            if (param.schema) {
              acc[param.name] = param.schema;
            }
            return acc;
          },
          {}
        );

        // @ts-ignore
        schema.properties.parameters = {
          type: "object",
          properties: paramProperties,
        };
      }

      functions[functionName] = {
        definition: {
          name: functionName,
          description: desc,
          parameters: schema,
        },
        function: apiFunction,
        meta: {
          openapi: {
            host: resolvedSpec.servers[0].url,
            path,
            method,
            params: {
              apikey: "7h0uj7PqRrbMy9CibDw7KcEX76ShhXJW",
            },
          },
        },
      };
    }
  }

  return functions;
}

const CACHE = new Map<string, any>();

export async function fetchFunction(args: any) {
  const host = args?.meta?.openapi?.host;
  let path = args?.meta?.openapi?.path;
  const method = args?.meta?.openapi?.method;
  const rootParams = args?.meta?.openapi?.params;
  if (!path || !method) {
    return "Invalid function call";
  }
  const body = args?.requestBody;
  const params = args?.parameters;

  // replace path parameters
  const pathParams = path.match(/{\w+}/g);
  if (pathParams) {
    pathParams.forEach((param: any) => {
      const paramName = param.slice(1, -1);
      if (!params || !params[paramName]) {
        return;
      }
      path = path.replace(param, params[paramName]);
    });
  }
  // console.log({
  //   baseURL: host,
  //   url: path,
  //   method,
  //   data: method === "post" ? body : undefined,
  //   params: params,
  // });

  try {
    // if (CACHE.has(path)) {
    //   return "Already Fetched. Refer to previous [system] responses.";
    // }
    const response = await axios({
      baseURL: host,
      url: path,
      method,
      data: method === "post" ? body : undefined,
      params: {
        ...params,
        ...rootParams,
      },
    });

    // console.log(JSON.stringify(response.data, null, 2));
    // CACHE.set(path, response.data);

    return response.data;
  } catch (error) {
    console.log(error);
    let errorMessage = "Error fetching data";
    // @ts-ignore
    if (error.response) {
      // @ts-ignore
      errorMessage = JSON.stringify(error.response.data);
      // @ts-ignore
    } else if (error.request) {
      // @ts-ignore
      errorMessage = JSON.stringify(error.request);
    } else {
      // @ts-ignore
      errorMessage = error.message;
    }
    errorMessage +=
      " (Try to resolve it automatically by adjusting the parameters, if it still failed, stop)";
    console.log(errorMessage);
    return errorMessage;
  }
}
