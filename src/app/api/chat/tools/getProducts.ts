import { tool } from "ai";
import { z } from "zod";

export const getProducts = tool({
  description:
    "This tool will show a list of all products created by Rakshith (GenBI, PromptBud, NLMDB)",
  parameters: z.object({}).optional(),
  execute: async (params = {}) => {
    return "Products data retrieved successfully.";
  },
}); 