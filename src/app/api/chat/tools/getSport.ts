
import { tool } from "ai";
import { z } from "zod";


export const getSports = tool({
  description:
    "This tool provides information about Rakshith's sports and hobbies",
  parameters: z.object({}).optional(),
  execute: async (params = {}) => {
    return {
      sports: {
        cricket: {
          role: "Right hand batsman",
          position: "Middle order or finisher",
          additional: "Wicket keeper and part time right hand off spin bowler",
          description: "I love cricket and chess games. I am a right hand batsman who plays at either in middle order or as a finisher, and wicket keeper plus part time right hand off spin bowler."
        },
        gaming: {
          games: ["Call of Duty", "PUBG"],
          description: "I love playing video games like Call of Duty and PUBG"
        },
        chess: {
          description: "I enjoy playing chess games"
        }
      }
    };
  },
});