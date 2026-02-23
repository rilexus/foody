import { getCurrentDateAndTime } from "./getCurrentDateAndTime";
import { tool } from "ai";
import { z } from "zod";

/**
 * Converts an array of objects to a markdown table string.
 * @param {Object[]} data - Array of objects with identical keys
 * @returns {string} Markdown table
 */
export const toMarkdownTable = (data) => {
  if (!data.length) return "";
  const headers = Object.keys(data[0]);
  const separator = headers.map(() => "---").join(" | ");
  const rows = data.map((row) => headers.map((h) => row[h] ?? "").join(" | "));
  return [
    `| ${headers.join(" | ")} |`,
    `| ${separator} |`,
    ...rows.map((r) => `| ${r} |`),
  ].join("");
};

/**
 * Removes an element from an array at the given index (immutably).
 * @param {Array} arr
 * @param {number} index
 * @returns {Array}
 */
export const removeAtIndex = (arr, index) => [
  ...arr.slice(0, index),
  ...arr.slice(index + 1),
];

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

    extractDataFromRecipe: tool({
      name: "extractDataFromRecipe",
      description: "Extracts data from a recipe.",
      inputSchema: z.object({
        name: z.string().describe("Recipe name"),
        instructions: z.array(z.string()).describe("Cooking instructions"),
        ingredients: z
          .array(
            z.object({
              name: z.string().describe("Ingredient name"),
              quantity: z.number().describe("Quantity of ingredient"),
              unit: z.string().describe("Unit of measurement"),
            }),
          )
          .describe("Cooking instructions"),
        tags: z
          .array(z.string())
          .describe(
            'Tags of the recipe like: "Breakfast", "Vegetarian", "High Fiber", "Quick".',
          ),
      }),
    }),
    removeIngredientByName: tool({
      name: "removeIngredientByName",
      description:
        "Removes an ingredient by name from the available ingredients.",
      inputSchema: z.object({
        name: z.string().describe("Name of the ingredient to remove"),
      }),
      execute: async ({ name }) => {
        try {
          const state = getState();
          const index = state.ingredients.findIndex((i) => i.name === name);
          if (index > -1) {
            const newIngredients = removeAtIndex(state.ingredients, index);
            state.ingredients = newIngredients;
            setState(state);
            return `Ingredient ${name} removed from the list.`;
          }
          return `Ingredient ${name} not found in the list`;
        } catch (e) {
          return "Something went wront. Abort!";
        }
      },
    }),
    addIngredient: tool({
      name: "addIngredient",
      description: "Adds an ingredient to available ingredients.",
      inputSchema: z.object({
        id: z.number(),
        name: z.string().describe("Ingredient name"),
        availableAmount: z.number().describe("Amount of ingredient"),
        availableUnit: z.string().describe("Unit of available ingredient"),
        category: z.string().describe("Category of ingredient"),
      }),
      execute: async ({
        id,
        name,
        availableAmount,
        availableUnit,
        category,
      }) => {
        try {
          const state = getState();
          state.ingredients.push({
            id,
            name,
            availableAmount,
            availableUnit,
            category,
          });

          setState(state);
          return `${name} added successfully!`;
        } catch (e) {
          return "Something went wrong. Ingredient not added. Abort!";
        }
      },
    }),
    updateIngredients: tool({
      name: "updateIngredients",
      description: "Updates the list of ingredients.",
      inputSchema: z.object({
        ingredients: z.array(
          z.object({
            id: z.number(),
            name: z.string().describe("Ingredient name"),
            availableAmount: z.number().describe("Amount of ingredient"),
            availableUnit: z.string().describe("Unit of measurement"),
          }),
        ),
      }),
      execute: async ({ ingredients }) => {
        try {
          const state = getState();
          state.ingredients = ingredients;

          setState(state);
          return "Ingredients updated successfully!";
        } catch (e) {
          return "Something went wrong. Ingredients not updated. Abort!";
        }
      },
    }),
    readIngredients: tool({
      name: "readIngredients",
      description: "Reads all available ingredients.",
      inputSchema: z.object({}),
      execute: async () => {
        const { ingredients } = getState();
        const rows = ingredients.map(
          ({ id, name, availableAmount, availableUnit }) => ({
            ID: id,
            Name: name,
            Amount: availableAmount,
            Unit: availableUnit,
          }),
        );
        return `Available ingredients:\n${toMarkdownTable(rows)}`;
      },
    }),
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
      description: "Reads all dietary restrictions of the user.",
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
