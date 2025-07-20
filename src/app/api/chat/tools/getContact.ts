import { tool } from 'ai';
import { z } from 'zod';

export const getContact = tool({
  description:
    'Get Rakshith\'s contact information including email, phone, location, and social media links. Use this when users ask for contact details, how to reach you, or contact information.',
  parameters: z.object({}).optional(),
  execute: async (params = {}) => {
    return {
      contact: {
        email: 'dharmappa.r@northeastern.edu',
        phone: '+1-857-398-3843',
        location: 'Peenya, Bangalore',
        linkedin: 'https://www.linkedin.com/in/rakshithd26',
        github: 'https://github.com/rakshith2605',
        handle: '@rakshith2605'
      }
    };
  },
});
