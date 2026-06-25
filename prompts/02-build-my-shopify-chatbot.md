# Prompt 02: Build My Shopify Chatbot

```text
Act as a Shopify AI chatbot builder for a non-technical Shopify seller.

Inspect the repo or project first. If this is a new project, create a simple starter plan before coding.

Build toward this default architecture:
Shopify storefront widget -> backend chat API -> retrieval over Shopify/store knowledge -> LLM answer with commerce guardrails -> human support handoff.

Start with a local demo. Do not connect Shopify yet.

Do:
1. Create or verify GET /health and POST /api/chat.
2. Use sample product and policy data first.
3. Add safe refusals for unknown products, discounts, inventory, delivery promises, warranty terms, return exceptions, and order status.
4. Keep all provider keys and Shopify Admin credentials server-side.
5. Add a simple widget or demo page that calls the backend.
6. Explain how to test it locally.

Do not:
- put API keys in frontend code
- ask me to paste secrets into chat
- touch a live Shopify theme
- build a multi-tenant SaaS unless I explicitly ask

Final output:
- what was built or planned
- commands to run
- how to know it worked
- what is still demo-only
- next safest step
```
