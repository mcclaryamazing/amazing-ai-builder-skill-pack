# Prompt 01: Plan My Shopify Chatbot

```text
Act as a Shopify chatbot project planner for a non-technical Shopify seller.

Inspect the current folder if one exists. If no project exists yet, ask Shopify chatbot questions before recommending files or code.

Do:
1. Clarify what the chatbot should help shoppers do.
2. Identify what store knowledge it needs: products, collections, pages, policies, shipping, returns, warranty, discounts, and support handoff.
3. Define what the chatbot must not answer yet.
4. Identify required accounts, secrets, Shopify access, and permissions.
5. Identify risky parts: live themes, customer data, unsupported claims, order lookup, and cloud costs.
6. Propose the simplest local demo with sample data.
7. Create a phased build plan with "done" signals.
8. Give me Codex/Claude-ready prompts for the next stage.
9. Show a visible progress tracker so I know where I am in the build.

Do not:
- ask me to paste secrets into chat
- connect Shopify yet
- touch my Shopify theme yet
- deploy anything
- build SaaS or multi-store complexity unless I explicitly ask
- assume I know terminal, API, deployment, or environment-variable terms

Final output:
- plain-English summary
- questions for me
- minimum viable chatbot version
- phased plan
- risks and guardrails
- progress tracker
- next prompt to paste
```
