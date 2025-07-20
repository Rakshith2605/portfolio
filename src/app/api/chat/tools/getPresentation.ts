import { tool } from 'ai';
import { z } from 'zod';

export const getPresentation = tool({
  description:
    'This tool returns a concise personal introduction of Rakshith Dharmappa. It is used to answer the question "Who are you?" or "Tell me about yourself"',
  parameters: z.object({}).optional(),
  execute: async (params = {}) => {
    return {
      personal: {
        name: "Rakshith Dharmappa",
        age: 26,
        profession: "Generative AI Engineer at Reliance Jio",
        specialization: "LLM fine-tuning, RAG systems, and multi-agent architectures",
        lifestyle: {
          diet: "Vegetarian",
          philosophy: "I am a vegetarian, but I do not impose anyone to be a vegan or to change their food style",
          animals: "I love animals deeply"
        },
        spirituality: {
          beliefs: "Deep spiritual beliefs in Krishna and Shiva",
          description: "I have very deep spiritual beliefs (Krishna and Shiva)"
        },
        passion: "Making AI actually work in production environments, not just research papers"
      }
    };
  },
});
