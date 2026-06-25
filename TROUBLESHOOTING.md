# Troubleshooting

## The Skills Do Not Show Up

1. Confirm each skill folder contains `SKILL.md`.
2. Confirm the folders were copied under your coding agent's skills directory.
3. Restart or refresh the coding agent if needed.
4. Invoke the skill by exact name.

Try:

```text
What Amazing Shopify Chatbot skill can you see?
```

Then:

```text
Use the shopify-chatbot-builder skill. Help me build a polished local Shopify chatbot demo before connecting my store.
```

## The Agent Wants Secrets In Chat

Stop and redirect:

```text
Do not ask me to paste secrets into chat. Tell me the exact .env variable names or secret-manager entries I should fill in myself.
```

## The Agent Wants To Edit A Live Theme

Stop and redirect:

```text
Do not touch my live Shopify theme yet. Use the theme workflow inside shopify-chatbot-builder. Inspect current theme files, prefer a development theme, show the exact intended files, use targeted no-delete pushes where possible, and give me a rollback path.
```

## The Chatbot Gives Confident Unsupported Answers

Ask for a chatbot safety review:

```text
Use the shopify-chatbot-builder skill or the chatbot safety prompt fallback. Review the chatbot for unsupported claims about price, discounts, inventory, shipping, returns, warranty, safety, and order status.
```

## The Project Breaks During Setup

Ask for one safe next step:

```text
Use the shopify-chatbot-builder skill. Explain this error in plain English, inspect the repo, and give me one safe next command at a time. Do not delete files, rotate secrets, push themes, or deploy unless I explicitly approve.
```
