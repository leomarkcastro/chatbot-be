import * as dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
  BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  DATABASE_URL: process.env.DATABASE_URL || '',
  GRAPHQL_INSTROSPECTION: process.env.GRAPHQL_INSTROSPECTION || 'true',
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  PAGE_URL: process.env.PAGE_URL || 'http://localhost:300',
  SERVER_CORS_HEADERS:
    process.env.SERVER_CORS_HEADERS ||
    '"Origin, X-Requested-With, Content-Type, Accept, Authorization"',
  SERVER_CORS_URL: process.env.SERVER_CORS_URL || '"*"',
  SESSION_SECRET:
    process.env.SESSION_SECRET ||
    '"secretashdasifhjldgjaisjflsjkasldfklaskdjf"',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || 'secret',
  HEALTHBOT_ASSISTANT_ID: process.env.HEALTHBOT_ASSISTANT_ID || 'assistant-1',
};
