---
name: shopify-chatbot-builder
description: "Build, connect, test, install, and launch a private one-store Shopify AI chatbot with Codex. Use this single skill for the full guided beginner journey: real AI model setup, read-only Shopify product and policy sync, private real-store chatbot demo, backend chat API, commerce answer safety, support handoff, storefront widget installation, theme-safe launch, rollback, and plain-English progress tracking for users building their own chatbot."
---

# Shopify Chatbot Builder

Use this as the one skill for building a private Shopify chatbot. The user should not need to know separate agent-internal specialties. Walk them through the whole project from repo inspection to real-model and real-store private demo to storefront launch.

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
[ ] 2. Configure or verify the real AI model server-side
[ ] 3. Connect Shopify read-only store data
[ ] 4. Sync products, pages, and policies
[ ] 5. Build a private real-store demo
[ ] 6. Test desktop, mobile, and risky questions
[ ] 7. Install the storefront widget on a development theme
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
- private real-store demo before storefront installation
- backend-owned secrets
- thin endpoint-only widget
- synced products, collections, pages, and policies as source of truth
- optional local dashboard
- deployment only after tests and target-repo deploy guide review
- development theme before live theme

## Readiness Ladder

1. Real inputs ready: server-side AI model access works and read-only Shopify credentials are verified.
2. Store knowledge synced: real products, collections, pages, and policies are available to retrieval.
3. Private real-store demo ready: the user can ask real store questions in a local/private UI and get model-generated, source-backed answers.
4. Private theme preview ready: hosted backend and widget work on a development theme.
5. Limited live beta ready: support handoff, rollback, guardrails, and monitoring are proven.

Do not confuse credential dry-runs, fake data, or a static mock with a real demo.

## Private Real-Store Demo Rule

The first demo the user sees must be useful and credible. It should use the user's real Shopify products, pages, and policies plus a real server-side AI model. It must not be a fake-data chatbot that only looks like a chatbot.

The private demo should include:

- a polished storefront-style chat widget or dashboard test chat
- real synced products, pages, and policies from the user's store
- real model-generated answers through the backend
- responsive desktop and mobile layout
- assistant/user message bubbles
- loading, error, and unavailable states
- source or product cards when answers are backed by store data
- support handoff action when the bot does not know
- clear private-preview labeling without making the UI feel fake

Do not show fake or sample data to the member as the chatbot demo. If credentials are not ready, run only an internal connectivity test and label it clearly as not the demo.

Read `references/private-real-store-demo.md` before building or judging the demo UI.

## Beginner-Friendly Working Style

- Explain each risky step in plain English.
- Give one safe next command when the user is blocked.
- Inspect the real repo before advising.
- Reuse existing setup when the user already has it. Verify existing projects, buckets, keys, Shopify apps, Theme Access, snippets, deployments, and env values before proposing to recreate or replace them.
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

## Store Knowledge Visibility Rule

The chatbot must only answer from customer-visible store content.

For Shopify sync/retrieval:

- Products must be active only. Use an Admin query filter such as `status:active`, request the `status` field, and drop any product whose status is not `ACTIVE`.
- Pages must be published only. Use `published_status:published` where supported, request `isPublished`, and drop any page where `isPublished` is false.
- Draft, archived, unpublished, hidden, or otherwise non-customer-visible content must never be used in retrieval context.
- Collection records must not leak draft or archived product titles. If syncing collection product references, filter them through the already-synced active product handles, or omit product lists from collection records.
- Store the applied source filters in health/knowledge metadata so the user can verify what content is eligible.

## Implementation Order

1. Inspect the project and current files.
2. Configure or verify a real AI model key server-side.
3. Keep `.env` ignored and examples placeholder-only.
4. Build backend health and chat endpoints.
5. Configure or verify read-only Shopify Admin/API access server-side.
6. Sync real products, collections, pages, and policies.
7. Add retrieval and commerce guardrails.
8. Build the private real-store demo UI that calls only the backend.
9. Test real store questions and risky questions.
10. Add a thin widget or snippet that calls only the backend.
11. Before deploy, read the target chatbot repo's `deploy.md` or `DEPLOY.md` if present.
12. Deploy only after private demo and private preview checks pass.

## Existing Setup Rule

If the user says they already have part of the setup, do not recreate it by default. Treat existing infrastructure and access as first-class inputs.

Examples:

- existing hosting project, deployment service, secret-manager entries, database, or storage bucket
- existing OpenAI or other LLM provider API key
- existing Shopify Theme Access password, Shopify CLI login, custom app, Admin API token, or app scopes
- existing storefront snippet, widget asset, metafields, backend endpoint, deployment, database, or local `.env`

For existing setup:

1. Ask what already exists at the relevant step.
2. Verify it with read-only checks when possible.
3. Reuse it if it matches the project needs.
4. Update configuration to point at it rather than creating a duplicate.
5. Explain when something must be changed and why.
6. Ask before replacing, deleting, rotating, recreating, or broadening permissions.

## References

Read only the reference needed for the current stage:

- `references/guided-progress.md` for the exact progress tracker and done signals.
- `references/private-real-store-demo.md` before creating or reviewing the private real-store demo UI.
- `references/shopify-connection.md` before asking for Shopify access, scopes, or store data.
- `references/widget-install-and-launch.md` before touching Shopify theme files, deployment, launch, rollback, or live enablement.

## Pre-Launch Checks

Before calling the chatbot ready for a real store, verify:

- private real-store demo still works
- hosted backend works, if applicable
- health endpoint works
- Shopify sync has real retrievable data
- smoke tests confirm synced products are active only
- smoke tests confirm synced pages are published only
- smoke tests confirm collection product mentions are filtered through active products
- smoke tests or browser checks confirm Markdown renders cleanly in assistant messages
- smoke tests confirm missing Shopify policy scopes are surfaced as warnings/failures rather than hidden
- server-side AI model calls work
- private demo acceptance gate is complete: real product count, synced policy/source names, private URL, model call verification, and pass/fail results for at least five real or risky questions
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
