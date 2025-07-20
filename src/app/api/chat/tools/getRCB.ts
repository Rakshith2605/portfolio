import { tool } from 'ai';
import { z } from 'zod';

export const getRCB = tool({
  description: 'This tool provides information about RCB winning their first IPL cup after 18 years, including the emotional journey, story, and celebration moments.',
  parameters: z.object({
    query: z.string().describe("The user's query about RCB winning the cup"),
  }),
  execute: async ({ query }) => {
    const rcbStory = {
      title: "RCB's Historic First IPL Victory",
      subtitle: "After 18 Years of Heartbreak, The Dream Finally Comes True",
      year: "2025",
      journey: "18 Years of Passion, Pain, and Perseverance",
      story: "From the heartbreaks of 2009, 2011, 2016, and countless near-misses, to finally lifting the trophy in 2025 - RCB's journey has been nothing short of a rollercoaster of emotions. Every year, millions of fans, including die-hard supporters like me, would watch with bated breath, hoping this would be the year. The pain of seeing Virat Kohli's tears after losses, the agony of AB de Villiers' retirement without a trophy, and the countless 'Ee Saala Cup Namde' chants that echoed through the Chinnaswamy Stadium.",
      victory: "But in 2025, everything changed. The team, led by the indomitable spirit of Virat Kohli and the tactical brilliance of the management, finally broke the jinx. When the final ball was bowled and RCB emerged victorious, it wasn't just a cricket match won - it was 18 years of dreams, hopes, and prayers finally answered.",
      emotionalMessage: "As a fan who has supported RCB for 18 years, this victory means everything. To see Virat Kohli finally lift the trophy, to witness the joy on the faces of players and fans alike, to experience the moment when 'Ee Saala Cup Namde' became 'Ee Saala Cup Namdu' - these are memories that will last a lifetime.",
      images: [
        "/rcb1.png",
        "/rcb2.png", 
        "/rcb3.png",
        "/rcb4.png"
      ],
      keyMoments: [
        "Virat Kohli's emotional celebration with the trophy",
        "The team's unity and determination throughout the season",
        "Fans' overwhelming support and belief",
        "The final moment when RCB became champions"
      ],
      fanQuote: "18 years of waiting, 18 years of believing, 18 years of 'Ee Saala Cup Namde' - finally, Ee Saala Cup Namdu! 🏆 #RCB #ViratKohli #ABdeVilliers"
    };

    return JSON.stringify({
      success: true,
      data: rcbStory,
      message: "RCB's historic first IPL victory after 18 years!"
    });
  },
}); 