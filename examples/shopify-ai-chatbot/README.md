# Example: Private Shopify AI Chatbot

This example describes the pattern extracted from the Shopify AI chatbot starter repo.

It is not a finished app. Use it as a reference when asking Codex or Claude Code to build your own private chatbot.

## Default Architecture

```text
Shopify storefront widget
  -> backend chat API
  -> retrieval over synced Shopify/store knowledge
  -> LLM response with commerce guardrails
  -> human support handoff when uncertain
```

## First Local Demo

Build a local demo before connecting Shopify:

- `GET /health`
- `POST /api/chat`
- demo product data
- demo policy data
- unknown-product refusal
- discount/inventory/order-status guardrails
- widget-style page calling the local backend

## Shopify Access Model

Use two separate rails:

- Theme rail: Theme Access or Shopify CLI for snippets, assets, and render hooks.
- Backend data rail: Shopify Dev Dashboard client credentials or custom app Admin API token for backend-only sync.

Never put Admin API credentials in Liquid, browser JavaScript, metafields, screenshots, docs, or chat.

## Source-Backed Answers

The chatbot may answer from:

- synced products and variants
- synced collections
- synced pages and policies
- merchant-authored knowledge
- safe storefront context

If the source data does not explicitly support the answer, route to support.

## Launch Gate

Do not launch until:

- local demo works
- real Shopify data is synced or the project is clearly still demo-only
- widget works on a development theme
- support handoff works
- safety questions pass
- rollback or disable path is documented
