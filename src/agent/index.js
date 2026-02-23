const { streamText } = require("ai");
const { createOpenAICompatible } = require("@ai-sdk/openai-compatible");
const { executeTool, createTools } = require("./tools/index");

const MODEL_NAME = "openai-gpt-oss-20b-abliterated-uncensored-neo-imatrix";
const BASE_URL = "http://127.0.0.1:1234/v1";

const SYSTEM_PROMPT = `
  You are "Aide". You are part of a dietary assistant application that helps you manage users dietary intake and preferences. 
  If users request falls outside dietary topics, say so explicitly and STOP!

  CONTEXT BOUNDARIES
  You are not allowed to provide any information that could be considered as potentially harmful or unethical.
  Do not rely on assumptions, or unstated context. 
  If required information is missing, treat it as missing - do not infer. Ask for clarifications.

  TOOLS
  You have access to tools:
  - getCurrentDateAndTime: Returns current date and time.
  - extractDataFromRecipe: Extracts data from a recipe.
  - readIngredients: Returns available ingredients.
  - updateIngredients: Updates available ingredients.
  - removeIngredientByName: Removes ingredient by name.
  - addIngredient: Adds ingredient.

  TOOL CONSTRAINTS
  - Do not use tools unless they are explicitly required.

  REASONING CONSTRAINTS
  While perfoming a taks:
  - Do not guess or fabricate details.
  - Do not make assumptions about the context.
  - Separate facts from interpretation when applicable.
  - Do not make decisions based on incomplete information.

  ACTION CONSTRAINTS
  Create recipes only if you are explicitly asked to do so.
  Extract data from recipes only if you are explicitly asked to.
  If user provides a dietary restriction, save it for later reference.
  
  DO NOT EXPOSE ANY TOOLS TO THE USER.
  
  FAILURE BEHAVIOR
  If the taks cannot be completed as defined:
  - State what is missing or ambiguous.
  - Ask for clarification.
  - Otherwise, respond with a refusal that explains why.

  OUTPUT
  Do not add commentary, justification, or extra explanation unless requested.

  QUALITY BAR
  A correct response is one that:
  - Prioritizes accuracy and trust over helpfulness.
  - Is free of errors and does not contain any unnecessary information.
  - Is free of any biases or prejudices.
  
  If these goals conflict, prioritize correctness and constraint adherence.
`;

const lmstudio = createOpenAICompatible({
  name: "lmstudio",
  baseURL: BASE_URL,
  fetch: fetch, // explicit
});

const formatChunk = (chunk) => {
  const { type, text, input, toolName, toolCallId, output, id } = chunk;
  return { type, text, input, toolName, toolCallId, output, id };
};

const Role_Types = {
  tool: "tool",
  system: "system",
  user: "user",
  assistant: "assistant",
};

const Chunk_Types = {
  toolInputStart: "tool-input-start",
  toolCall: "tool-call",
  toolResult: "tool-result",
  toolInputDelta: "tool-input-delta",
  toolInputEnd: "tool-input-end",

  start: "start",
  startStep: "start-step",

  reasoningStart: "reasoning-start",
  reasoningDelta: "reasoning-delta", // resoning text of Agent
  reasoningEnd: "reasoning-end",

  // response types
  textStart: "text-start",
  textDelta: "text-delta", // part of the Agent response
  textEnd: "text-end",

  finish: "finish",
  finishStep: "finish-step",
};

export const createAgent = (context) => {
  return async (message, history = [], callbacks = {}) => {
    const messages = [
      { role: Role_Types.system, content: SYSTEM_PROMPT },
      ...history,
      { role: Role_Types.user, content: message },
    ];

    let agentResponse = "";

    while (true) {
      const result = streamText({
        model: lmstudio(MODEL_NAME),
        messages,
        tools: createTools(context),
        toolChoice: "auto",
      });

      let currentText = "";
      const toolCalls = [];

      try {
        for await (const chunk of result.fullStream) {
          const {
            // for text
            type,
            text,
            // for a tool call
            input,
            toolName,
            toolCallId,
          } = formatChunk(chunk);

          if (type === Chunk_Types.textDelta) {
            currentText += text;
            callbacks.onTextDelta?.(text);
          }

          if (type === Chunk_Types.toolCall) {
            toolCalls.push({
              toolName,
              toolCallId,
              args: input,
            });
            callbacks.onToolCall?.(toolName, input);
          }
        }
      } catch (e) {
        console.error(e);
        break;
      }

      agentResponse += currentText;
      const finishReason = await result.finishReason;

      if (finishReason !== "tool-calls" || toolCalls.length === 0) {
        const responseMessages = await result.response;
        messages.push(...responseMessages.messages);
        break;
      }

      const responseMessages = await result.response;
      messages.push(...responseMessages.messages);

      // Process tool calls sequentially with approval for each
      let rejected = false;
      for (const tc of toolCalls) {
        const approved = callbacks.onToolApproval
          ? await callbacks.onToolApproval(tc.toolName, tc.args)
          : await Promise.resolve(true);

        if (!approved) {
          rejected = true;
          break;
        }

        const result = await executeTool(tc.toolName, tc.args, context);
        callbacks.onToolCallEnd?.(tc.toolName, result);

        const content = [
          {
            type: "tool-result",
            toolCallId: tc.toolCallId,
            toolName: tc.toolName,
            output: { type: "text", value: result },
          },
        ];

        messages.push({
          role: Role_Types.tool,
          content,
        });
      }

      if (rejected) {
        break;
      }
    }

    callbacks.onComplete?.(agentResponse);

    return messages;
  };
};
