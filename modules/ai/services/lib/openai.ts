import { config } from "dotenv";
import OpenAI from "openai";
import { CONFIG } from "../../../../utils/config/env";

config();

export const openai = new OpenAI({
  apiKey: CONFIG.OPENAI_API_KEY,
});
