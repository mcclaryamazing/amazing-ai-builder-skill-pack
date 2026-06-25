---
name: shopify-chatbot-builder
description: Build, connect, test, install, and launch a private one-store Shopify AI chatbot with Codex or Claude Code. Use this single skill for the full guided beginner journey: polished local chatbot demo, backend chat API, Shopify product and policy sync, commerce answer safety, support handoff, storefront widget installation, theme-safe launch, rollback, and plain-English progress tracking for users building their own chatbot.
---

# Shopify Chatbot Builder

Use this as the one skill for building a private Shopify chatbot. The user should not need to know separate agent-internal specialties. Walk them through the whole project from empty folder to local demo to Shopify connection to storefront launch.

## First Response Contract

In the first response:

1. Inspect the current folder before advising.
2. State where the user is in the build journey.
3. Show a visible progress tracker.
4. Explain the immediate goal in plain English.
5. Give the next safe action.

Use a tracker like:

```text
Shopify Chatbot Build Progress
[ ] 1. Understand the store and chatbot goal
[ ] 2. Build a polished local demo
[ ] 3. Add safe answers and support handoff
[ ] 4. Connect Shopify credentials server-side
[ ] 5. Sync products, pages, and policies
[ ] 6. Install the storefront widget on a development theme
[ ] 7. Test desktop, mobile, and risky questions
[ ] 8. Turn on limited live preview
[ ] 9. Confirm rollback and disable path
```

Update the tracker after meaningful progress. Use `update_plan` when available, but still explain the user's stage in normal language.

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

## Polished Local Demo Rule

The first local demo must look and feel credible. Do not ship a junky test form as the user's first success moment.

The local demo should include:

- a polished storefront-style chat widget or dashboard test chat
- realistic sample products and policies
- responsive desktop and mobile layout
- assistant/user message bubbles
- loading, error, and unavailable states
- source or product cards when answers are backed by demo data
- support handoff action when the bot does not know
- clear demo-only labeling without making the UI feel fake

Read `references/polished-local-demo.md` before building or judging the demo UI.

## Beginner-Friendly Working Style

- Explain each risky step in plain English.
- Give one safe next command when the user is blocked.
- Inspect the real repo before advising.
- Warn before installs, deploys, theme pushes, secret changes, migrations, deletes, or live customer-facing changes.
- Keep `.env` files ignored and never ask the learner to paste secrets into chat.

## Required Chatbot Guardrails

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

## References

Read only the reference needed for the current stage:

- `references/guided-progress.md` for the exact progress tracker and done signals.
- `references/polished-local-demo.md` before creating or reviewing the local demo UI.
- `references/shopify-connection.md` before asking for Shopify access, scopes, or store data.
- `references/widget-install-and-launch.md` before touching Shopify theme files, deployment, launch, rollback, or live enablement.

## Pre-Launch Checks

Before calling the chatbot ready for a real store, verify:

- local demo still works
- hosted backend works, if applicable
- health endpoint works
- Shopify sync has real retrievable data, or sample data is clearly marked
- widget loads only where intended
- no secrets are in frontend code or committed files
- risky unsupported questions are refused or deflected
- support handoff works
- rollback or disable path exists
- privacy expectations are clear
- order lookup is disabled unless authentication, privacy, and backend logic are implemented

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
