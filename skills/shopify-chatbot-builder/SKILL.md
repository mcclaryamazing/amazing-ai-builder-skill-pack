---
name: shopify-chatbot-builder
description: "Build, connect, test, install, and launch a private one-store Shopify AI chatbot with Codex. Use this single skill for the full guided beginner journey: real AI model setup, read-only Shopify product and policy sync, protected admin dashboard/control plane, embedded dashboard test chat, backend chat API, commerce answer safety, support handoff, storefront widget installation, theme-safe launch, rollback, and plain-English progress tracking for users building their own chatbot."
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
[ ] 4. Sync products, collections, pages, and policies
[ ] 5. Build the protected admin dashboard and embedded test chat
[ ] 6. Inspect sources and test risky questions
[ ] 7. Copy the current live theme, verify the copy, then install the storefront widget on that copied preview theme
[ ] 8. Turn on limited live preview
[ ] 9. Confirm rollback and disable path
```

Update the tracker after meaningful progress. Use `update_plan` when available, but still explain the user's stage in normal language.

## Default Architecture

```text
Protected admin dashboard
  -> backend admin APIs
  -> sync, source inspection, settings, mode, test chat

Shopify storefront widget
  -> backend chat API
  -> retrieval over synced Shopify/store knowledge
  -> LLM response with commerce guardrails
  -> human support handoff when uncertain
```

Default to:

- one Shopify store
- protected admin dashboard before storefront installation
- embedded dashboard test chat as the private real-store demo
- backend-owned secrets
- thin endpoint-only widget
- synced products, collections, pages, and policies as source of truth
- dashboard-owned controls for sync, source inspection, settings, mode, and testing
- deployment only after tests and target-repo deploy guide review
- a fresh verified copy of the current live theme before any live theme change

## Readiness Ladder

1. Real inputs ready: server-side AI model access works and read-only Shopify credentials are verified.
2. Store knowledge synced: real products, collections, pages, and policies are available to retrieval.
3. Admin dashboard ready: the owner can inspect synced sources, manage settings/mode, and test source-backed answers in an embedded dashboard chat.
4. Private theme preview ready: hosted backend and widget work on a verified unpublished copy of the current live theme.
5. Limited live beta ready: support handoff, rollback, guardrails, and monitoring are proven.

Do not confuse credential dry-runs, fake data, or a static mock with a real demo.

## Admin Dashboard Rule

Every build must include a protected admin dashboard before storefront launch. The dashboard is the chatbot control plane; the storefront widget is only the customer-facing surface.

The dashboard must let the store owner:

- see chatbot health and current mode: `off`, `preview`, or `live`
- trigger Shopify sync and see last sync status
- inspect source counts and source records for products, collections, pages, and policies
- verify active-product-only, published-page-only, and collection-product visibility filters
- configure assistant behavior, support routing, answer style, allowed origins, and storefront appearance when supported
- manage product, collection, page, manual knowledge, and merchant-authored offer controls
- show conversations, support handoff records, basic analytics, and install/rollback values
- test shopper questions in an embedded chat preview using the same backend, synced knowledge, model, retrieval, and guardrails as the storefront widget
- see source labels or snippets for test answers
- run risky-question tests for discounts, inventory, order lookup, delivery promises, warranties, policy exceptions, and unsupported claims
- use a fast disable or rollback path

Read `references/admin-dashboard-control-plane.md` before building or judging the dashboard.

## Empty Project Rule

If the target repo has no real chatbot implementation yet, do not improvise a thin mock. Build from a concrete scaffold with backend, protected dashboard, widget, Shopify install assets, env placeholders, local commands, and acceptance tests.

Read `references/empty-project-scaffold.md` before creating files in an empty repo, a Shopify-theme-only repo, or any repo without backend, dashboard, and widget surfaces.

## Private Real-Store Demo Rule

The first demo the user sees must be useful and credible. It should use the user's real Shopify products, collections, pages, and policies plus a real server-side AI model. It must not be a fake-data chatbot that only looks like a chatbot.

The private demo should include:

- a protected dashboard with an embedded test chat
- real synced products, collections, pages, and policies from the user's store
- real model-generated answers through the backend
- responsive desktop and mobile layout
- assistant/user message bubbles
- loading, error, and unavailable states
- product cards in the customer preview and clearly separated admin-only source inspection when answers are backed by store data
- support handoff action when the bot does not know
- dashboard-level private demo labeling outside the customer preview chat, without making the UI feel fake

Do not show fake or sample data to the member as the chatbot demo. If credentials are not ready, run only an internal connectivity test and label it clearly as not the demo.

Read `references/private-real-store-demo.md` before building or judging the demo UI.

## Beginner-Friendly Working Style

- Explain each risky step in plain English.
- Give one safe next command when the user is blocked.
- Inspect the real repo before advising.
- Reuse existing setup when the user already has it. Verify existing projects, buckets, keys, Shopify apps, Theme Access, snippets, deployments, and env values before proposing to recreate or replace them.
- Warn before installs, deploys, theme pushes, secret changes, migrations, deletes, or live customer-facing changes.
- Before deploys, Shopify mutations, or theme pushes, read `deploy.md` or `DEPLOY.md` when present, run `git status --short`, list uncommitted work, and ask whether it should be included before excluding it.
- Keep `.env` files ignored and never ask the learner to paste secrets into chat.

## Admin Token Handoff Rule

When the chatbot includes a protected admin dashboard, tell the user exactly where the admin token can be found after setup without revealing the token value.

Never print the token value in chat, commit it, place it in docs, screenshots, browser JavaScript, Liquid, frontend code, source JSON, or logs.

Usually the token belongs in an ignored local env file, depending on repo convention, such as `.env.admin.local`, `.env.local`, `local.env`, or another project-specific ignored env file. Identify the exact file path and key name, such as `CHATBOT_ADMIN_TOKEN` or `ADMIN_TOKEN`.

If Secret Manager or another hosted secret system is used, include the hosted secret name and project/location, but still do not reveal the value.

If a setup script generates the token, it must save the token into an ignored local env file or hosted secret store and print only the path/key name or secret name, never the token value.

The final readiness or handoff report must include:

- dashboard URL
- token file path
- token env key name
- hosted secret name and project/location when applicable
- safe copy-to-clipboard command when appropriate, without echoing the token value into chat
- reminder not to paste, commit, or screenshot the token

## Brand Name Rule

If the store URL, repo name, or old project name differs from the active store brand, visible chatbot, dashboard, widget, greeting, and support copy should use the active brand name. The old name may remain in technical URLs, repo names, service names, buckets, historical infrastructure, or internal identifiers unless the user requests a rename.

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

## Customer-Facing Polish Rule

The storefront widget must feel like a real customer service assistant, not a developer test harness.

For shopper-facing chat:

- Do not expose developer or testing language such as "verified knowledge", "retrieval", "sources", "preview", model/provider names, API keys, internal route names, stack traces, config names, or "private preview".
- Use warm, concise, specific, helpful default copy. Example: "Hi, I can help with products, sizing, shipping, and returns."
- Use a normal typing indicator, preferably three animated dots, instead of status text such as "checking stored knowledge".
- Do not render source/debug panels in the shopper widget. Source visibility belongs in protected admin/testing surfaces.
- Suggested prompt buttons must fit cleanly on desktop and mobile without clipping.
- Input placeholders must be short enough to fit on mobile, such as "Ask a question".
- Preserve conversation state when a shopper clicks an internal product, collection, page, or policy link and the page reloads behind the widget.
- Floating launchers or panels may use subtle glass/translucent treatment only when readability and contrast remain strong.

## Link Safety And Navigation Rule

All customer-facing links generated by the backend or rendered by the widget must be public storefront links.

Implement link handling so:

- Absolute and relative URLs strip preview tokens, theme preview params, admin tokens, generic token/key params, and other non-customer query values.
- Shopper-safe query params such as variant IDs are preserved.
- Product, collection, page, and policy names in assistant answers are clickable when a customer-facing URL is available.
- Policy links resolve to public storefront policy pages whenever possible, not checkout, admin, preview, or private URLs.
- Storefront chat links generally navigate in the same tab while preserving chat state.
- Admin source-review links may open in a new tab.

## Assistant Prompt And Response Quality Rule

The model prompt should positively define the bot as a customer-facing shopping and support assistant.

The prompt and fallback behavior must:

- Instruct the model to use only customer-visible store content without mentioning internal context, retrieval, sources, or system rules to shoppers.
- Recommend from available products for product-choice questions such as "Which product should I start with?", "best for a first-time buyer", "recommend", "compare", or "gift" instead of refusing because there is no single perfect answer.
- Keep all guardrail responses natural and customer-facing.
- Never expose provider names, missing-key messages, stack traces, config names, private preview details, or other internal failure details to shoppers.
- Use friendly model-disabled or model-failure fallbacks that route to support.

## Retrieval And Ranking Rule

Recommendation-style prompts should prioritize product and collection records over policy or page records.

Examples include:

- "Which product should I start with?"
- "What is best for a first-time buyer?"
- "What do you recommend?"
- "Can you compare these?"
- "What would be a good gift?"

Keep safety constraints in place: do not invent prices, discounts, live inventory, delivery dates, warranty terms, policy exceptions, order status, or regulated claims. Retrieval tests should verify product-first ranking for recommendation-style queries.

## Implementation Order

1. Inspect the project and current files.
2. Configure or verify a real AI model key server-side.
3. Keep `.env` ignored and examples placeholder-only.
4. Build backend health and chat endpoints.
5. Configure or verify read-only Shopify Admin/API access server-side.
6. Sync real products, collections, pages, and policies.
7. Add retrieval and commerce guardrails.
8. Add link safety, customer-facing copy, friendly fallbacks, safe Markdown/link rendering, and product-first retrieval for recommendation prompts.
9. Build the protected admin dashboard with source inspection, settings, mode/status, embedded test chat, and customer-preview parity with the storefront chat.
10. Test real store questions, recommendation questions, risky questions, link rendering, and mobile layout in the dashboard.
11. Copy the current live Shopify theme into a fresh unpublished preview theme, verify the copy, then add a thin widget or snippet that calls only the backend.
12. Before deploy or theme work, read the target chatbot repo's `deploy.md` or `DEPLOY.md` if present, run `git status --short`, list uncommitted work, and ask whether it should be included before excluding it from deploy.
13. Deploy only after dashboard, private test chat, private preview, hosted preview, and hosted smoke checks pass when applicable.

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
- `references/empty-project-scaffold.md` before scaffolding a new chatbot project or filling in a repo without backend/dashboard/widget code.
- `references/private-real-store-demo.md` before creating or reviewing the private real-store demo UI.
- `references/admin-dashboard-control-plane.md` before creating or reviewing the admin dashboard, source inspection, mode controls, or dashboard test chat.
- `references/shopify-connection.md` before asking for Shopify access, scopes, or store data.
- `references/widget-install-and-launch.md` before touching Shopify theme files, deployment, launch, rollback, or live enablement.

## Pre-Launch Checks

Before calling the chatbot ready for a real store, verify:

- protected dashboard real-store demo still works
- protected dashboard works and does not expose secrets
- dashboard test chat uses the real backend, synced knowledge, model, retrieval, and guardrails
- dashboard shows products, collections, pages, policies, sync status, source filters, and mode
- dashboard navigation reaches setup, settings, sources, product controls, offers, test chat, conversations, support, analytics, and install/rollback sections
- hosted backend works, if applicable
- health endpoint works
- Shopify sync has real retrievable data
- smoke tests confirm synced products are active only
- smoke tests confirm synced pages are published only
- smoke tests confirm collection product mentions are filtered through active products
- smoke tests or browser checks confirm Markdown renders cleanly in assistant messages
- smoke tests confirm Markdown links render without double-escaping
- smoke tests confirm missing Shopify policy scopes are surfaced as warnings/failures rather than hidden
- smoke tests confirm absolute and relative URLs strip preview, custom preview, admin, token, key, and non-customer query params while preserving shopper-safe params such as variant IDs
- smoke tests confirm public storefront policy URL fallback works
- retrieval tests confirm product-first ranking for recommendation-style prompts
- server-side AI model calls work
- dashboard acceptance gate is complete: real product count, collection/page/policy counts, synced policy/source names, dashboard URL, model call verification, source filter verification, and pass/fail results for at least five real or risky questions
- dashboard test chat matches storefront chat shape, rendering, loading state, product cards, links, and guardrails
- dashboard source records open the underlying customer-facing source in a new tab
- product promotion uses product cards, product controls, merchant-only notes, and configured merchant offers only
- admin dashboard token location is handed off without exposing the token value
- source live theme name and ID are reported
- copied preview theme name and ID are reported
- storefront verification screenshots come from the current real storefront, not a stale theme
- desktop and mobile checks pass on the copied preview theme
- mobile layout has no clipped suggested prompts, no clipped input placeholder, and no horizontal overflow
- storefront widget preserves conversation state after clicking customer-facing internal links that reload the page
- storefront widget does not render source/debug blocks or developer/testing language
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
- copying and verifying the current live theme before installing the widget
- using targeted pushes with no-delete behavior
- providing rollback
- getting explicit approval

## Secrets Rule

Never ask the learner to paste secrets into chat. Tell them the `.env` key or secret-manager entry to fill themselves.
