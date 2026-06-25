# Start Here

This pack teaches your AI coding agent how to help you build AI tools safely.

You do not need to become a software engineer to use it. Your job is to make business decisions, approve risky steps, and provide store-specific information. The coding agent's job is to inspect files, explain the plan, write code, run checks, and warn before risky changes.

## First Choice

If the pack is published on GitHub, the easiest path is to ask your coding agent to install the skills from the repo URL:

```text
Install all skills from this GitHub repo:
https://github.com/<owner>/amazing-ai-builder-skill-pack

The skills live under the skills/ directory.
```

If skills install correctly, use a skill by name:

```text
Use the shopify-ai-chatbot-builder skill. Help me plan the safest first version of a private chatbot for my Shopify store. Start with a local demo and do not connect to Shopify yet.
```

If skills do not install cleanly, use the prompt fallbacks:

- [PROMPT-FALLBACKS.md](PROMPT-FALLBACKS.md)
- [prompts/01-start-a-new-ai-tool-project.md](prompts/01-start-a-new-ai-tool-project.md)
- [prompts/02-build-my-shopify-chatbot.md](prompts/02-build-my-shopify-chatbot.md)

## What To Do First

1. Install the skills for your coding agent.
2. Ask the agent to explain what it can now help with.
3. Start with planning, not deployment.
4. Build a local demo before connecting real accounts.
5. Test guardrails before launch.

## What Not To Do First

- Do not paste API keys, access tokens, passwords, or service account files into chat.
- Do not push Shopify theme files before reviewing the exact intended changes.
- Do not deploy to cloud services before local tests pass.
- Do not ask the chatbot to answer from store data until the store data is actually connected.
- Do not assume "dry-run configured" means "real Shopify data is synced."

## Good First Request

```text
Use the ai-business-app-project-planner and non-technical-founder-coding-coach skills.
I want to build an AI tool for my business, but I am not technical.
Ask me only the business questions needed to plan a safe first version.
Explain the plan in plain English and do not write code yet.
```
