---
name: shopify-ai-chatbot-builder
description: Build, adapt, test, and launch a private one-store Shopify AI chatbot with Codex or Claude Code. Use for Shopify storefront chat widgets, backend chat APIs, Shopify/store data retrieval, commerce guardrails, human support handoff, local demo first workflows, GCP deployment preparation, and safe avoidance of live theme or secret mistakes.
---

# Shopify AI Chatbot Builder

Use this as the flagship skill for a private one-store Shopify chatbot.

## Default Architecture

```text
Shopify storefront widget
  -> backend chat API
  -> retrieval over synced Shopify/store knowledge
  -> LLM response with commerce guardrails
  -> human support handoff when uncertain
```

Default to:

- one Shopify store
- local demo first
- backend-owned secrets
- thin endpoint-only widget
- synced products, collections, pages, and policies as source of truth
- optional local dashboard
- GCP deployment only after tests
- development theme before live theme

## Readiness Ladder

1. Local demo ready: `GET /health`, `POST /api/chat`, demo products/policies, safe refusals, widget demo.
2. Shopify credentials configured: backend dry-run sees store domain plus client credentials or Admin token.
3. Real store knowledge synced: Shopify data is actually available to retrieval.
4. Private preview ready: hosted backend and widget work on a development theme.
5. Limited live beta ready: support handoff, rollback, guardrails, and monitoring are proven.

Do not confuse dry-run configuration with real data ingestion.

## Required Guardrails

Do not invent:

- prices
- discounts
- inventory
- delivery dates
- warranty terms
- return-policy exceptions
- order status
- medical, legal, financial, or safety claims

When uncertain, say there is not enough verified store knowledge and offer support handoff.

## Implementation Order

1. Inspect the project and current files.
2. Create or verify local sample mode before real credentials.
3. Keep `.env` ignored and examples placeholder-only.
4. Build backend health and chat endpoints.
5. Add sample product and policy retrieval.
6. Add commerce guardrails before storefront testing.
7. Add a thin widget or snippet that calls only the backend.
8. Configure Shopify access with separate theme and backend data rails.
9. Implement real Shopify ingestion.
10. Test safety questions.
11. Deploy only after local and private preview checks pass.

## Shopify Theme Rule

Never touch live Shopify theme files without:

- reading current files
- showing intended changes
- using a development theme first when possible
- using targeted pushes with no-delete behavior
- providing rollback
- getting explicit approval

## Secrets Rule

Never ask the learner to paste secrets into chat. Tell them the `.env` key or secret-manager entry to fill themselves.
