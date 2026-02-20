import { tool } from "ai";
import { z } from "zod";

export const getCurrentDateAndTime = tool({
  name: "getCurrentDateAndTime",
  description: "Returns the current date and time.",
  inputSchema: z.object({}),
  execute: async () => {
    const now = new Date();
    return now.toLocaleDateString();
  },
});
