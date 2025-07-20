import { tool } from 'ai';
import { z } from 'zod';

export const getResume = tool({
  description:
    'This tool provides access to Rakshith\'s resume.',
  parameters: z.object({}).optional(),
  execute: async (params = {}) => {
    return "Resume data retrieved successfully.";
  },
});
