import { tool } from 'ai';
import { z } from 'zod';

export const getMe = tool({
  description: 'This tool provides personal information about Rakshith Dharmappa including his background, interests, expertise, and experience.',
  parameters: z.object({
    query: z.string().describe("The user's query about Rakshith"),
  }),
  execute: async ({ query }) => {
    const meInfo = {
      name: "Rakshith Dharmappa",
      location: "Frisco, Dallas, USA",
      hometown: "Bengaluru, India",
      currentRole: "AI Developer at Reliance Jio",
      background: "Hey! I'm Rakshith Dharmappa, originally from Bengaluru and currently diving deep into the world of AI and tech. I've been working on cool stuff with Generative AI, building smart tools that make life easier—especially in the telecom space. Right now, I'm with Reliance Jio, and before that, I've had some great learning experiences across startups, research labs, and cloud platforms.",
      interests: "When I'm not geeking out over AI, you'll probably find me playing cricket, locked into a chess match, or dropping into Call of Duty. I'm a die-hard RCB fan boy for the past 18 years - AB de Villiers and Virat Kohli are my absolute favorites! I also have a soft spot for history and geo-politics—nothing like a deep dive into world affairs to keep the brain ticking.",
      photo: "/me.png",
      expertise: [
        "Generative AI",
        "Machine Learning",
        "Telecom Solutions",
        "Full-Stack Development",
        "Cloud Platforms"
      ],
      experience: [
        "Reliance Jio - AI Developer",
        "Startups - Various roles",
        "Research Labs - AI Research",
        "Cloud Platforms - Development"
      ]
    };

    return JSON.stringify({
      success: true,
      data: meInfo,
      message: "Here's information about Rakshith!"
    });
  },
}); 