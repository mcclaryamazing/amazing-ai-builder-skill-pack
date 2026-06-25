# Troubleshooting

## The Skill Does Not Show Up

1. Confirm `skills/shopify-chatbot-builder/SKILL.md` exists.
2. Confirm the folder was copied under your Codex skills directory.
3. Restart or refresh Codex.
4. Invoke the skill by exact name.

Try:

```text
What Amazing Shopify Chatbot skill can you see?
```

## Codex Asks For Secrets In Chat

Stop and redirect:

```text
Do not ask me to paste secrets into chat. Tell me the exact .env variable names or secret-manager entries I should fill in myself.
```

## Codex Wants To Use Fake Demo Data

Stop and redirect:

```text
Do not present fake products or made-up policies as my demo. The private demo must use my real Shopify products, pages, policies, and a real server-side AI model. If credentials are not ready, run only an internal connectivity test and label it clearly as not the demo.
```

## Codex Wants To Edit A Live Theme Too Early

Stop and redirect:

```text
Do not touch my live Shopify theme yet. First finish the private real-store demo, test risky questions, inspect current theme files, prefer a development theme, show the exact intended files, use targeted no-delete pushes where possible, and give me a rollback path.
```

## The Chatbot Gives Unsupported Answers

Ask:

```text
Use the shopify-chatbot-builder skill. Review the chatbot for unsupported claims about price, discounts, inventory, shipping, returns, warranty, safety, and order status. Fix the prompt, retrieval, or refusal behavior before any theme install.
```
