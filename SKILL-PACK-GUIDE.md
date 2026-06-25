# Skill Pack Guide

## One Skill, One Guided Journey

Use `shopify-chatbot-builder` for the full Shopify chatbot build.

The skill should guide the learner through:

1. Understand the store and chatbot goal.
2. Build a polished local demo.
3. Add safe answers and support handoff.
4. Connect Shopify credentials server-side.
5. Sync products, pages, and policies.
6. Install the storefront widget on a development theme.
7. Test desktop, mobile, and risky questions.
8. Turn on limited live preview.
9. Confirm rollback and disable path.

The agent should keep a visible progress tracker so the user knows where they are, what just happened, and what comes next.

## Default Chatbot Architecture

```text
Shopify storefront widget
  -> backend chat API
  -> retrieval over synced Shopify/store knowledge
  -> LLM response with commerce guardrails
  -> human support handoff when uncertain
```

## Polished Local Demo Requirement

The first demo is not throwaway. It should look credible enough that a new Shopify seller trusts the final build path.

The local demo should include a polished chat UI, realistic sample products and policies, assistant/user bubbles, loading and error states, product or source cards when relevant, support handoff, and responsive desktop/mobile behavior.

## Readiness Ladder

- Local demo ready: polished UI, sample data, backend health, chat endpoint, safe refusals, and demo widget work.
- Shopify data ready: real store data is synced and retrievable by the chatbot.
- Private preview ready: hosted backend and widget work on a development theme.
- Limited live beta ready: guardrails, rollback, support handoff, and monitoring are in place.

Do not confuse credential dry-runs with real Shopify data ingestion.
