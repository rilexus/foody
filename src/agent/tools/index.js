import { getCurrentDateAndTime } from "./getCurrentDateAndTime";
import { tool } from "ai";
import { z } from "zod";

export const tools = {
  getCurrentDateAndTime,
};

export const executeTool = async (name, args) => {
  const tool = tools[name];

  if (!tool) {
    return "Not known tool";
  }

  return tool.execute(args, {
    toolCallId: "",
    messages: [],
  });
};

export const createTools = ({ getState, setState }) => {
  return {
    getCurrentDateAndTime,

    saveDietaryRestrictions: tool({
      name: "saveDietaryRestriction",
      description: "Saves one dietary restriction for later reference.",
      inputSchema: z.object({
        dietaryRestriction: z
          .string()
          .describe("Dietary restriction to remember"),
      }),
      execute: async ({ dietaryRestriction }) => {
        try {
          const state = getState();
          const id = Date.now().toString();
          state.dietaryRestriction.push({
            id,
            content: dietaryRestriction,
          });

          setState(state);

          return `Dietary restriction "${id}: ${dietaryRestriction}" was saved for later reference.`;
        } catch (e) {
          console.error(e);
          return "An error occurred while saving the dietary restriction. Please try again.";
        }
      },
    }),
    readDietaryRestrictions: tool({
      name: "readDietaryRestrictions",
      description: "Reads all dietary restrictions.",
      inputSchema: z.object({}),
      execute: async () => {
        try {
          const state = getState();
          return state.dietaryRestriction
            .map(({ content, id }) => `ID: ${id}, Name: ${content}`)
            .join(", \n");
        } catch (e) {
          console.error(e);
          return false;
        }
      },
    }),
    removeDietaryRestrictionIById: tool({
      name: "removeDietaryRestrictionIById",
      description: "Removes a dietary restriction by its ID.",
      inputSchema: z.object({
        id: z.string().describe("ID of the dietary restriction to remove."),
      }),
      execute: async ({ id }) => {
        try {
          const state = getState();
          const newRestrictions = state.dietaryRestriction.filter(
            (res) => res.id !== id,
          );
          state.dietaryRestriction = newRestrictions;
          setState(state);

          return newRestrictions.length > 0
            ? `${id} removed successfully.`
            : `${id} was not removed.`;
        } catch (e) {
          console.error(e);
          return "Error occured durring deletion!";
        }
      },
    }),
  };
};
