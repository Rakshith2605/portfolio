
import { tool } from "ai";
import { z } from "zod";


export const getCrazy = tool({
  description:
    "This tool will the craziest thing I've ever done. use it when the user ask someting like : 'What the craziest thing you've ever done?'",
  parameters: z.object({}).optional(),
  execute: async (params = {}) => {
    return "Crazy story data retrieved successfully.";
  },
});