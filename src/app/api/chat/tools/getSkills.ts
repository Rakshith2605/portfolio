import { tool } from 'ai';
import { z } from 'zod';

export const getSkills = tool({
  description:
    'This tool provides a comprehensive list of Rakshith\'s technical and soft skills.',
  parameters: z.object({}).optional(),
  execute: async (params = {}) => {
    return "Skills data retrieved successfully.";
  },
});
