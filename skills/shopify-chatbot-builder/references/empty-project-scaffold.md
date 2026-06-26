# Empty Project Scaffold

Use this when the target repo has no working chatbot yet. Prefer the repo's existing stack if it already has one; otherwise scaffold a simple single-store app with separate backend, protected dashboard, storefront widget, and Shopify theme install files.

## Core Rule

Do not stop at a demo page. A complete single-store chatbot project needs:

- server-side AI model calls
- server-side Shopify Admin access
- persistent synced store knowledge
- protected admin dashboard
- dashboard test chat
- thin storefront widget
- request-time conversation context shared by storefront and dashboard chat
- customer-facing link sanitizer shared by backend responses and widget rendering
- Shopify install assets
- local tests and launch checks

If the repo is empty or only contains a Shopify theme, first propose the scaffold and show the user what files will be created.

## Default File Shape

Adapt names to the existing repo, but preserve these responsibilities:

```text
apps/api/                 backend, admin APIs, storefront chat APIs
apps/dashboard/           protected merchant dashboard
packages/widget/          customer-facing widget bundle
shopify/snippets/         Liquid snippet or app block render hook
shopify/assets/           public loader JS/CSS when theme-hosted
.env.example              placeholder-only env keys
deploy.md or DEPLOY.md    project-specific build/deploy guide when missing
README.md                 local run and verification commands
```

For smaller repos, the same responsibilities may live under `api/`, `dashboard/`, `widget/`, and `shopify/`.

## Minimum Backend Contracts

Create backend routes equivalent to:

- `GET /health`: backend, model, Shopify, database/storage, sync, widget readiness, mode, and source counts without secrets
- `POST /api/admin/sync`: protected Shopify sync action
- `GET /api/admin/sync/status`: last sync status, timestamp, counts, warnings, and applied source filters
- `GET /api/admin/sources`: protected source browser for products, collections, pages, policies, and manual knowledge
- `GET/PUT /api/admin/settings`: assistant name, greeting, mode, support path, allowed origins, answer style, max products, and appearance values
- `GET/PUT /api/admin/products/*`: product include/exclude, boost, badge, merchant-only notes, and product-promotion controls
- `GET/PUT /api/admin/pages/*` and `GET/PUT /api/admin/collections/*`: source controls and merchant notes
- `GET/POST/PUT/DELETE /api/admin/knowledge`: manual merchant-authored knowledge
- `GET/POST/PUT/DELETE /api/admin/offers`: merchant-created offers/discount codes only
- `GET /api/admin/conversations`: shopper transcript browser
- `GET/PUT /api/admin/support`: support handoff queue or handoff log
- `GET /api/admin/analytics`: basic counts for conversations, handoffs, widget opens, product clicks, add-to-cart, offer clicks, and unanswered questions when available
- `POST /api/admin/test-chat`: protected dashboard test chat using the same chat service as the storefront widget
- `GET /api/storefront/config`: public widget config only
- `POST /api/chat`: public storefront chat route with production origin checks and bounded sanitized recent history support

If the first version skips a route, mark the related dashboard area blocked and do not call the build complete.

The shared chat service should include:

- a customer-facing assistant prompt that uses only customer-visible store content without mentioning internal context, retrieval, sources, or system rules to shoppers
- request-time conversation context from a sanitized recent transcript, used for both retrieval and model prompting
- a prompt instruction to continue naturally, answer follow-ups from recent context, avoid repeating itself, and avoid fresh greetings unless the shopper is actually greeting it
- product-first retrieval for recommendation-style prompts such as "Which product should I start with?", "best for a first-time buyer", "recommend", "compare", and "gift"
- friendly guardrail and failure responses that never expose provider names, missing-key messages, stack traces, config names, private-preview details, or internal route names
- safe public URL generation for products, collections, pages, and policies

Sanitize incoming history server-side: keep only expected `user` and `assistant` roles, accept common text fields such as `text` or `content`, normalize whitespace, drop empty/unknown records, cap turn count, and cap text length per turn.

## Persistence

Use the simplest durable store that fits the repo:

- SQLite is acceptable for a local/private first build.
- Postgres or the hosting provider's database is better for hosted/live use.
- JSON files are acceptable only for a short local prototype and must not be treated as launch-ready for a sales-generating store.

Persist at least:

- settings and mode
- Shopify connection metadata without secrets
- synced products, variants, collections, pages, policies, and source-filter metadata
- manual knowledge entries
- product/page/collection controls
- merchant offers
- conversations and messages
- support handoff records
- analytics/events when enabled

## Environment Keys

Create `.env.example` with placeholder values only:

```text
APP_ENV=development
PUBLIC_STORE_DOMAIN=
SHOPIFY_SHOP_DOMAIN=
SHOPIFY_ADMIN_ACCESS_TOKEN=
SHOPIFY_API_VERSION=
AI_PROVIDER=
AI_MODEL=
AI_API_KEY=
DATABASE_URL=
DASHBOARD_AUTH_SECRET=
ALLOWED_STOREFRONT_ORIGINS=
SUPPORT_EMAIL=
WIDGET_PUBLIC_URL=
```

Tell the user which local values to fill. Never ask them to paste the secret values into chat.

## Dashboard Pages

A complete first seller version should expose protected, reachable dashboard pages or sections for:

- Overview: health/readiness, mode, fast disable, source counts, last sync, warnings
- Setup: store connection, AI model status, support path, allowed origins, widget/install values
- Sources: product, collection, page, policy, and manual knowledge browser
- Products: include/exclude, boost, merchant notes, badge, and promoted product behavior
- Offers: merchant-authored offers/discount codes with enable/disable
- Test Chat: dashboard test chat with source labels/cards and risky-question prompts
- Conversations: shopper transcripts and page context
- Support: handoff queue or explicit CRM/mail handoff log
- Analytics: basic usage, handoff, product-click, offer-click, and unanswered-question counts
- Install: backend URL, widget URL, snippet/render line, target theme, disable, and rollback instructions

Do not count a backend route or unused React component as done until the store owner can reach it in the dashboard navigation and it has been checked in a browser.

## Widget Contracts

The widget should:

- load from a small snippet or public loader
- call only backend storefront routes
- never contain model keys, Admin API tokens, dashboard tokens, database URLs, or service credentials
- receive only public config such as title, greeting, color, enabled/mode, endpoint, and non-secret store context
- send page/product/collection/cart context when available
- send a bounded, sanitized recent transcript with every chat request; visual transcript persistence alone is not enough
- render product cards and safe Markdown
- render Markdown links without double-escaping
- make product, collection, page, and policy names clickable when a customer-facing URL exists
- strip preview tokens, theme preview params, admin tokens, generic token/key params, and other non-customer query values from absolute and relative customer-facing links while preserving shopper-safe params such as variant IDs
- resolve policy links to public storefront policy pages whenever possible
- navigate customer-facing links in the same tab by default and preserve chat state across internal page reloads
- include preserved chat state in the next backend request after internal navigation
- use warm, concise copy, mobile-safe prompt buttons and placeholders, and a normal typing indicator
- never show source/debug panels or developer/testing language in the shopper widget
- support handoff and unavailable states
- respect mode: hidden/refused when off, preview-only when preview, public only when live

## Local Commands

Use repo-appropriate commands, but create equivalents for:

```powershell
# backend
python -m compileall apps/api/src
python -m pytest apps/api/tests

# dashboard
pnpm --filter dashboard build

# widget
pnpm --filter widget test
pnpm --filter widget build
```

If these exact commands do not match the stack, write the actual commands into the repo README or deploy guide.

## Empty-Repo Acceptance Gate

Before moving to Shopify theme work, verify:

- `.env.example` exists and contains placeholders only
- `.env` or secret-manager values are ignored
- backend health route runs locally
- protected admin routes reject unauthenticated requests
- storefront chat/config routes do not require dashboard secrets
- Shopify sync retrieves real products, collections, pages, and policies or reports exact missing scopes
- source filters are visible
- dashboard navigation reaches all required pages
- dashboard test chat uses the same chat service as the widget
- storefront and dashboard chat requests include bounded sanitized recent history in the same shape
- backend sanitization drops unknown roles, empty turns, and overlong content before retrieval or prompting
- dashboard test chat matches storefront chat shape, product cards, Markdown/link behavior, loading state, and guardrails
- source/debug UI is separated from the customer preview chat
- source records open customer-facing source URLs in a new tab
- product cards, merchant offers, support handoff, conversations, and basic analytics are visible in the dashboard
- no raw Markdown appears in chat messages
- Markdown links render without double-escaping
- absolute and relative URL token stripping works, including custom preview parameters
- public storefront policy URL fallback works
- product-first retrieval works for recommendation-style prompts
- shopper widget does not render source/debug blocks or developer/testing language
- conversation state persists after clicking a customer-facing internal link
- conversation state is included in the next backend request after internal navigation
- follow-up questions use recent shopper context in retrieval and do not restart with a fresh greeting
- mobile layout has no clipped prompts, no clipped input placeholder, and no horizontal overflow
- risky-question tests pass
- widget bundle builds and calls only backend endpoints
- deploy/theme guide and rollback path exist
