# Aide — AI-Powered Dietary Assistant

![Aide](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWgzcDVpbXU0cnI1dzZ2Ynk0a3J3ejlsemt6MGU3N3ZhcmgwYjQybCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lVl18d3GE6yR9dEBDt/giphy.gif)

An Electron desktop app that helps users manage their diet and meals, combining a traditional UI with an AI chat assistant powered by a local LLM (via LM Studio).

## Core Features

| Feature | Description |
| --- | --- |
| Chat | Conversational AI assistant focused strictly on dietary topics |
| Recipes | Browse, create, and manage recipes with nutritional info |
| Ingredients | Track available ingredients, quantities, and storage |
| Shopping List | Autogenerates a shopping list based on available ingredients and recipes |
| Meal Planner | Drag-and-drop weekly meal planning calendar |

## Tech Stack

- **Electron** — desktop app shell
- **React 19 + React Router** — UI
- **Vercel AI SDK** — LLM integration (streams responses token-by-token)
- **LM Studio** — local LLM running at `http://127.0.0.1:1234/v1` (no data sent to the cloud)
- **electron-store** — persistent local state
- **Zod** — schema validation for AI tool inputs

## AI Agent

The agent has a strict system prompt — it only discusses dietary topics and refuses anything unrelated. It can call tools to read/write app state directly:

- Read/add/update/remove ingredients
- Save & recall dietary restrictions
- Extract structured data from recipes
- Get the current date

Responses stream in real-time and the agent can chain multiple tool calls in a single turn.

## Summary

A privacy-first dietary management app — all AI processing happens locally on the user's machine, and the AI has direct access to the app's data (ingredients, restrictions, etc.) to give contextually aware advice.
