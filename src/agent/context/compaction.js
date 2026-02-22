import { generateText } from "ai";

const SUMMARIZATION_PROMPT = `You are a conversation summarizer. Your task is to create a concise summary of the conversation so far.

1. Analyze the input text and generate 5 essential questions that, when answered, capture the main points and core meaning of the text.
2. When formulating your questions:
  2.1. Address the central theme or argument
  2.2. Identify key supporting ideas
  2.3. Highlight important facts or evidence
  2.4. Reveal the author's purpose or perspective
  2.5. Explore any significant implications or conclusions.
3. Answer all of your generated questions one-by-one in detail.

Be concise but complete. The summary should allow the conversation to continue naturally.

Conversation to summarize:
`;

export async function compactConversation({ messages, model }) {
  // Filter out "system" messages
  const msgs = messages.filter((msg) => msg.role !== "system");
  if (msgs.length === 0) return [];

  // transform messages to a text
  const msgAsText = msgs
    .map(({ role, content }) => {
      return `[${role.toUpperCase()}]: ${content}`;
    })
    .join("\n\n");

  // create a summary with help of an assistant
  const { text: summary } = await generateText({
    model,
    prompt: SUMMARIZATION_PROMPT + msgAsText,
  });

  const compactedMessages = [
    {
      role: "user",
      content: `
        [Conversation Summary]
        The follwing text is a summary of the conversation:
        ---
        ${summary}
        ---
        Please continue the conversation based on this summary.
    `,
    },
    { role: "assistant", content: "I understand. How can I help?" },
  ];

  return { text: summary, messages: compactedMessages };
}
