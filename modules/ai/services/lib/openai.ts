import OpenAI from "openai";
import { CONFIG } from "../../../../utils/config/env";

export const openai = new OpenAI({
  apiKey: CONFIG.OPENAI_API_KEY,
});
