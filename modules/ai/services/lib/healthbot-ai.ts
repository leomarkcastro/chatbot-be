import { KeystoneContext } from "@keystone-6/core/types";
import { z } from "zod";
import { GlobalTypeInfo } from "../../../../common/types";
import {
  OpenAPISpec,
  fetchFunction,
  openapiToFunctions,
} from "../functions/openapi_to_fx";
import { FunctionSet } from "../types/functionSet";

export const cms_openapi: OpenAPISpec = {
  openapi: "3.1.0",
  info: {
    title: "Healthcare Marketplace API",
    description: "Retrieves information from the Healthcare Marketplace.",
    version: "v1.0.0",
  },
  servers: [
    {
      url: "https://marketplace.api.healthcare.gov",
    },
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
              type: "string",
            },
          },
          {
            name: "apikey",
            in: "query",
            description: "API key for accessing the service",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      },
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
              type: "string",
            },
          },
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
                      zipcode: { type: "string" },
                    },
                  },
                  year: { type: "integer" },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/plans/{planid}": {
      get: {
        description: "Retrieve details for a specific healthcare plan",
        operationId: "GetPlanDetails",
        parameters: [
          {
            name: "planid",
            in: "path",
            description:
              "The ID of the healthcare plan to retrieve details for",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "year",
            in: "query",
            description: "The year for which the plan details are requested",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "apikey",
            in: "query",
            description: "API key for accessing the service",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      },
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
              type: "string",
            },
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      },
    },
    "/api/v1/drugs/covered": {
      get: {
        description:
          "Check if drugs are covered under specific healthcare plans",
        operationId: "CheckDrugCoverage",
        parameters: [
          {
            name: "year",
            in: "query",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "drugs",
            in: "query",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "planids",
            in: "query",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      },
    },
    "/api/v1/crosswalk": {
      get: {
        description:
          "Retrieve plan crosswalk information for a given plan ID, year, state, ZIP code, and FIPS code",
        operationId: "getPlanCrosswalk",
        parameters: [
          {
            name: "apikey",
            in: "query",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "year",
            in: "query",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "plan_id",
            in: "query",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "state",
            in: "query",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "zipcode",
            in: "query",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "fips",
            in: "query",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      },
    },
    "/api/v1/counties/{countyId}": {
      get: {
        description:
          "Retrieve county information by county ID for a specific year",
        operationId: "getCountyInfo",
        parameters: [
          {
            name: "countyId",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "year",
            in: "query",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      },
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
              type: "string",
            },
          },
          {
            name: "year",
            in: "query",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      },
    },
    "/api/v1/states/{stateCode}": {
      get: {
        description:
          "Retrieve information for a specific state by its code for a given year",
        operationId: "getStateInfo",
        parameters: [
          {
            name: "stateCode",
            in: "path",
            required: true,
            description: "The state code to retrieve information for",
            schema: {
              type: "string",
            },
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string",
            },
          },
          {
            name: "year",
            in: "query",
            required: true,
            description: "The year for which the information is requested",
            schema: {
              type: "string",
            },
          },
        ],
      },
    },
    "/api/v1/states/{stateCode}/medicaid": {
      get: {
        description:
          "Retrieve Medicaid information for a specific state, year, and quarter",
        operationId: "getStateMedicaidInfo",
        parameters: [
          {
            name: "stateCode",
            in: "path",
            required: true,
            description: "The state code to retrieve Medicaid information for",
            schema: {
              type: "string",
            },
          },
          {
            name: "year",
            in: "query",
            required: true,
            description:
              "The year for which the Medicaid information is requested",
            schema: {
              type: "string",
            },
          },
          {
            name: "quarter",
            in: "query",
            required: true,
            description:
              "The quarter for which the Medicaid information is requested",
            schema: {
              type: "integer",
              minimum: 1,
              maximum: 4,
            },
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string",
            },
          },
        ],
      },
    },
    "/api/v1/states/{stateCode}/poverty-guidelines": {
      get: {
        description:
          "Retrieve poverty guidelines for a specific state and year",
        operationId: "getStatePovertyGuidelines",
        parameters: [
          {
            name: "stateCode",
            in: "path",
            required: true,
            description:
              "The state code for which the poverty guidelines are requested",
            schema: {
              type: "string",
            },
          },
          {
            name: "year",
            in: "query",
            required: true,
            description:
              "The year for which the poverty guidelines are requested",
            schema: {
              type: "string",
            },
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string",
            },
          },
        ],
      },
    },
    "/api/v1/rate-areas": {
      get: {
        description:
          "Retrieve rate area information based on state, FIPS code, ZIP code, market, and year",
        operationId: "getRateAreas",
        parameters: [
          {
            name: "state",
            in: "query",
            required: true,
            description: "The state to retrieve rate areas for",
            schema: {
              type: "string",
            },
          },
          {
            name: "fips",
            in: "query",
            required: false,
            description: "The FIPS code to retrieve rate areas for",
            schema: {
              type: "string",
            },
          },
          {
            name: "zipcode",
            in: "query",
            required: false,
            description: "The ZIP code to retrieve rate areas for",
            schema: {
              type: "string",
            },
          },
          {
            name: "market",
            in: "query",
            required: false,
            description: "The market type to retrieve rate areas for",
            schema: {
              type: "string",
            },
          },
          {
            name: "year",
            in: "query",
            required: true,
            description: "The year to retrieve rate areas for",
            schema: {
              type: "string",
            },
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string",
            },
          },
        ],
      },
    },
    "/api/v1/coverage/stats": {
      get: {
        description:
          "Retrieve coverage statistics from the Healthcare Marketplace",
        operationId: "getCoverageStats",
        parameters: [
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string",
            },
          },
        ],
      },
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
              type: "string",
            },
          },
          {
            name: "zipcode",
            in: "query",
            required: true,
            description: "Zip code to refine the coverage search",
            schema: {
              type: "string",
            },
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string",
            },
          },
        ],
      },
    },
    "/api/v1/providers/autocomplete": {
      get: {
        description:
          "Autocomplete search for providers based on query, zipcode, and type",
        operationId: "autocompleteProviders",
        parameters: [
          {
            name: "q",
            in: "query",
            required: true,
            description: "Query string for searching providers",
            schema: {
              type: "string",
            },
          },
          {
            name: "zipcode",
            in: "query",
            required: true,
            description: "Zip code to refine the provider search",
            schema: {
              type: "string",
            },
          },
          {
            name: "type",
            in: "query",
            required: false,
            description: "Type of provider to search for",
            schema: {
              type: "string",
            },
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string",
            },
          },
        ],
      },
    },
    "/api/v1/providers/search": {
      get: {
        description:
          "Search for providers based on query, year, zipcode, and type",
        operationId: "searchProviders",
        parameters: [
          {
            name: "q",
            in: "query",
            required: true,
            description: "Query string for searching providers",
            schema: {
              type: "string",
            },
          },
          {
            name: "year",
            in: "query",
            required: true,
            description: "Year for the provider data",
            schema: {
              type: "string",
            },
          },
          {
            name: "zipcode",
            in: "query",
            required: true,
            description: "Zip code to refine the provider search",
            schema: {
              type: "string",
            },
          },
          {
            name: "type",
            in: "query",
            required: false,
            description: "Type of provider to search for",
            schema: {
              type: "string",
            },
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string",
            },
          },
        ],
      },
    },
    "/api/v1/providers/covered": {
      get: {
        description:
          "Check if providers are covered under specific plans for a given year",
        operationId: "getCoveredProviders",
        parameters: [
          {
            name: "providerids",
            in: "query",
            required: true,
            description:
              "Comma-separated list of provider identifiers to check coverage for",
            schema: {
              type: "string",
            },
          },
          {
            name: "planids",
            in: "query",
            required: true,
            description:
              "Comma-separated list of plan identifiers to check the provider coverage against",
            schema: {
              type: "string",
            },
          },
          {
            name: "year",
            in: "query",
            required: true,
            description: "The year for which the coverage is being checked",
            schema: {
              type: "string",
            },
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string",
            },
          },
        ],
      },
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
                  type: "string",
                },
                state: {
                  type: "string",
                },
                zipcode: {
                  type: "string",
                },
              },
            },
          },
          {
            name: "year",
            in: "query",
            required: true,
            description:
              "The year for which eligibility estimates are requested",
            schema: {
              type: "string",
            },
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string",
            },
          },
        ],
      },
    },
    "/api/v1/households/ichra": {
      post: {
        description:
          "Create or update Individual Coverage Health Reimbursement Arrangements (ICHRA)",
        operationId: "createOrUpdateICHRA",
        "x-openai-isConsequential": false,
        parameters: [
          {
            name: "year",
            in: "query",
            required: true,
            description:
              "The year for which the information is being created or updated",
            schema: {
              type: "string",
            },
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string",
            },
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
                      type: "integer",
                    },
                    people: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          dob: {
                            type: "string",
                            format: "date",
                          },
                          current_plan: {
                            type: "string",
                          },
                          csr_variant: {
                            type: "string",
                          },
                          relationship: {
                            type: "string",
                          },
                          uses_tobacco: {
                            type: "boolean",
                          },
                          age: {
                            type: "integer",
                          },
                        },
                      },
                    },
                    effective_date: {
                      type: "string",
                      format: "date",
                    },
                  },
                },
                place: {
                  type: "object",
                  properties: {
                    countyfips: {
                      type: "string",
                    },
                    state: {
                      type: "string",
                    },
                    zipcode: {
                      type: "string",
                    },
                  },
                },
                hra: {
                  type: "integer",
                },
              },
            },
          },
        ],
      },
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
            description:
              "The year for which the information is being created or updated",
            schema: {
              type: "string",
            },
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string",
            },
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
                      type: "integer",
                    },
                    people: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          dob: {
                            type: "string",
                            format: "date",
                          },
                          aptc_eligible: {
                            type: "boolean",
                          },
                          gender: {
                            type: "string",
                          },
                          uses_tobacco: {
                            type: "boolean",
                          },
                        },
                      },
                    },
                  },
                },
                market: {
                  type: "string",
                  enum: ["Individual", "SmallGroup"],
                },
                place: {
                  type: "object",
                  properties: {
                    countyfips: {
                      type: "string",
                    },
                    state: {
                      type: "string",
                    },
                    zipcode: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        ],
      },
    },
    "/api/v1/households/slcsp": {
      post: {
        description:
          "Retrieve Second Lowest Cost Silver Plan (SLCSP) for a household",
        operationId: "getSLCSPForHousehold",
        "x-openai-isConsequential": false,
        parameters: [
          {
            name: "year",
            in: "query",
            required: true,
            description: "The year for which the information is requested",
            schema: {
              type: "string",
            },
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string",
            },
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
                      type: "integer",
                    },
                    people: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          dob: {
                            type: "string",
                            format: "date",
                          },
                          aptc_eligible: {
                            type: "boolean",
                          },
                          gender: {
                            type: "string",
                          },
                          uses_tobacco: {
                            type: "boolean",
                          },
                        },
                      },
                    },
                  },
                },
                market: {
                  type: "string",
                  enum: ["Individual", "SmallGroup"],
                },
                place: {
                  type: "object",
                  properties: {
                    countyfips: {
                      type: "string",
                    },
                    state: {
                      type: "string",
                    },
                    zipcode: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        ],
      },
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
              type: "string",
            },
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string",
            },
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
                      type: "integer",
                    },
                    people: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          dob: {
                            type: "string",
                            format: "date",
                          },
                          aptc_eligible: {
                            type: "boolean",
                          },
                          gender: {
                            type: "string",
                          },
                          uses_tobacco: {
                            type: "boolean",
                          },
                        },
                      },
                    },
                  },
                },
                market: {
                  type: "string",
                  enum: ["Individual", "SmallGroup"],
                },
                place: {
                  type: "object",
                  properties: {
                    countyfips: {
                      type: "string",
                    },
                    state: {
                      type: "string",
                    },
                    zipcode: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        ],
      },
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
              type: "integer",
            },
          },
          {
            name: "size",
            in: "query",
            required: true,
            description: "Household size",
            schema: {
              type: "integer",
            },
          },
          {
            name: "state",
            in: "query",
            required: true,
            description: "State code",
            schema: {
              type: "string",
            },
          },
          {
            name: "year",
            in: "query",
            required: true,
            description: "The year for which the information is requested",
            schema: {
              type: "string",
            },
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string",
            },
          },
        ],
      },
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
              type: "string",
            },
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string",
            },
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
                      type: "integer",
                    },
                    people: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          age: {
                            type: "integer",
                          },
                          is_pregnant: {
                            type: "boolean",
                          },
                          is_parent: {
                            type: "boolean",
                          },
                          uses_tobacco: {
                            type: "boolean",
                          },
                          gender: {
                            type: "string",
                            enum: ["Male", "Female", "Other"],
                          },
                        },
                      },
                    },
                    has_married_couple: {
                      type: "boolean",
                    },
                  },
                },
                place: {
                  type: "object",
                  properties: {
                    countyfips: {
                      type: "string",
                    },
                    state: {
                      type: "string",
                    },
                    zipcode: {
                      type: "string",
                    },
                  },
                },
                market: {
                  type: "string",
                  enum: ["Individual", "SmallGroup"],
                },
                plan_ids: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                aptc_override: {
                  type: "integer",
                },
                csr_override: {
                  type: "string",
                },
                catastrophic_override: {
                  type: "boolean",
                },
              },
            },
          },
        ],
      },
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
              type: "string",
            },
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string",
            },
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
                      type: "integer",
                    },
                    people: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          dob: {
                            type: "string",
                            format: "date",
                          },
                          aptc_eligible: {
                            type: "boolean",
                          },
                          gender: {
                            type: "string",
                          },
                          uses_tobacco: {
                            type: "boolean",
                          },
                        },
                      },
                    },
                  },
                },
                market: {
                  type: "string",
                  enum: ["Individual", "SmallGroup"],
                },
                place: {
                  type: "object",
                  properties: {
                    countyfips: {
                      type: "string",
                    },
                    state: {
                      type: "string",
                    },
                    zipcode: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        ],
      },
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
            description:
              "The ID of the plan for which quality ratings are requested",
            schema: {
              type: "string",
            },
          },
          {
            name: "year",
            in: "query",
            required: true,
            description: "The year for which the quality ratings are requested",
            schema: {
              type: "string",
            },
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string",
            },
          },
        ],
      },
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
              type: "integer",
            },
          },
          {
            name: "limit",
            in: "query",
            required: false,
            description:
              "Limit for the number of results to be returned per page",
            schema: {
              type: "integer",
            },
          },
          {
            name: "state",
            in: "query",
            required: true,
            description: "State code for filtering issuers",
            schema: {
              type: "string",
            },
          },
          {
            name: "year",
            in: "query",
            required: true,
            description:
              "The year for which the issuers information is requested",
            schema: {
              type: "string",
            },
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string",
            },
          },
        ],
      },
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
            description:
              "The ID of the issuer for which information is requested",
            schema: {
              type: "string",
            },
          },
          {
            name: "year",
            in: "query",
            required: true,
            description:
              "The year for which the issuer information is requested",
            schema: {
              type: "string",
            },
          },
          {
            name: "apikey",
            in: "query",
            required: true,
            description: "API key for accessing the service",
            schema: {
              type: "string",
            },
          },
        ],
      },
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
              type: "string",
            },
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
                  type: "integer",
                },
                year: {
                  type: "integer",
                },
                is_custom: {
                  type: "boolean",
                },
                division: {
                  type: "string",
                },
                enrollment_groups: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      effective_date: {
                        type: "string",
                        format: "date",
                      },
                      csr: {
                        type: "string",
                      },
                      enrollees: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      subscriber_id: {
                        type: "string",
                      },
                      relationships: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            super_id: {
                              type: "string",
                            },
                            sub_id: {
                              type: "string",
                            },
                            relationship: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                  },
                },
                enrollees: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      name: {
                        type: "string",
                      },
                      gender: {
                        type: "string",
                      },
                      dob: {
                        type: "string",
                        format: "date",
                      },
                      location: {
                        type: "object",
                        properties: {
                          city: {
                            type: "string",
                          },
                          state: {
                            type: "string",
                          },
                          street_1: {
                            type: "string",
                          },
                          street_2: {
                            type: "string",
                          },
                          zipcode: {
                            type: "string",
                          },
                          countyfips: {
                            type: "string",
                          },
                        },
                      },
                      csr: {
                        type: "string",
                      },
                      is_filer: {
                        type: "boolean",
                      },
                      has_hardship: {
                        type: "boolean",
                      },
                      relationship: {
                        type: "string",
                      },
                      allowed_metal_levels: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      allowed_plan_ids: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      current_enrollment: {
                        type: "object",
                        properties: {
                          plan_id: {
                            type: "string",
                          },
                          effective_date: {
                            type: "string",
                            format: "date",
                          },
                          is_smoker: {
                            type: "boolean",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      },
    },
  },

  components: {
    schemas: {},
  },
};

export async function getHealthAIFunctions(apiArgs: {
  keystone: KeystoneContext<GlobalTypeInfo>;
  sessionID: string;
  metadata: any;
}): Promise<FunctionSet> {
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
                "The full name of the user. Provide first name and last name.",
              defaultValue: "",
            },
            email: {
              type: "string",
              description:
                "The email of the user. Provide a valid email address.",
              defaultValue: "",
            },
            phone: {
              type: "string",
              description:
                "The phone number of the user. Provide a valid phone number.",
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
      function: async (args: any) => {
        const zodObj = z.object({
          fullname: z.string(),
          email: z.string().email(),
          phone: z.string(),
          policyID: z.string(),
          policyURL: z.string().url(),
          location: z.object({
            zip: z.string(),
            county: z.string(),
          }),
        });

        try {
          zodObj.parse(args);
          await apiArgs.keystone.prisma.inquiry.create({
            data: {
              fullname: args.fullname,
              email: args.email,
              phone: args.phone,
              policyID: args.policyID,
              policyURL: args.policyURL,
              zip: args.location.zip,
              address: args.location.county,
            },
          });
          return "https://www.healthsherpa.com/?_agent_id=myacaexpress";
        } catch (e) {
          // @ts-ignore
          const zodError = e?.errors?.[0]?.message || "Invalid input";
          console.log(e);
          return zodError;
        }
      },
    },
  };
  const functions = { ...cms_functions, ...custom_functions };

  return functions;
}
