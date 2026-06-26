# Admin Dashboard Control Plane

Build the dashboard before storefront launch. The dashboard is the merchant control plane for the chatbot; the storefront widget is a thin customer-facing surface.

## Core Rule

The dashboard must be protected. Do not expose admin APIs, raw source inspection, sync controls, mode switches, or configuration writes without admin authorization.

For a one-store chatbot, keep the dashboard single-store by default. Do not add tenant switching unless the project actually needs multiple stores.

## Minimum Dashboard

The dashboard must include:

- health and readiness status for backend, Shopify, model, sync, and storefront widget
- current chatbot mode: `off`, `preview`, or `live`
- a fast disable path, preferably a backend mode switch that hides/refuses the widget without editing theme files
- Shopify sync action and last sync result
- source counts for products, collections, pages, and policies
- source browser or tables showing exactly what customer-visible content the bot can use
- visibility filter evidence: active products only, published pages only, and collection product references filtered through active synced products
- embedded dashboard test chat that calls the same backend chat path or same chat service used by the storefront widget
- customer preview chat that matches the storefront chat shape, rendering rules, product cards, Markdown/link behavior, loading state, and guardrails
- source labels, source snippets, or product/source cards for dashboard test answers
- source/debug inspection clearly separated from the customer preview chat
- risky-question test prompts and visible pass/fail outcomes
- support routing or handoff settings
- no secrets in browser JavaScript, HTML, logs, screenshots, source JSON, or dashboard responses

## Complete Single-Store Dashboard Gate

For a sales-generating single-store build, the dashboard is not complete until the store owner can reach protected pages or sections for:

- overview: health/readiness, mode, fast disable, source counts, last sync, warnings
- setup: store connection, AI model status, support path, allowed origins, widget/install values
- assistant settings: assistant name, greeting, approved model, system prompt, answer style, support email/path, max products, and storefront appearance
- sources: products, collections, pages, policies, manual knowledge, eligibility filters, and source snippets
- product controls: included/excluded, boost, badge, merchant-only notes, status, price display, availability/inventory freshness labels, and product cards
- page and collection controls: included/excluded, purpose, boost, merchant-only notes, product count, and description status
- manual knowledge entries: title, answer/content, keywords, enabled flag, boost, edit/delete flow
- offers: merchant-created offers/discount codes, enable/disable, conditions, and apply links; the model may mention only configured offers
- test chat: source-backed dashboard chat, risky-question prompts, source labels/cards, and pass/fail status
- conversations: shopper transcripts and page context
- support: human-handoff requests, statuses, internal notes, mailto/CRM handoff, or an explicit handoff log
- analytics: conversations, messages, handoffs, widget opens, product clicks, add-to-cart, offer clicks, and unanswered-question counts when available
- install: backend URL, widget URL, snippet/render line, target theme, disable, and rollback instructions

Do not count backend-only work. APIs, database tables, scripts, or React components count only when they are wired into protected dashboard navigation and browser-verified at desktop and mobile widths.

Proactive triggers are recommended when the seller wants proactive promotion. If included, triggers must be merchant-authored teaser messages with enable/disable, URL targeting, priority, timing, and frequency controls. Do not let an AI model invent proactive offers or urgency.

## Mode Semantics

Use clear mode behavior:

- `off`: storefront widget is hidden or refuses all public shopper chat; dashboard remains available for setup and testing.
- `preview`: dashboard test chat works and development-theme or explicitly allowed preview origins may use the widget; public live storefront traffic remains disabled.
- `live`: only the intended public storefront origins can use the widget, and the dashboard shows the store is customer-facing.

The fastest disable path should switch mode to `off` without requiring a Shopify theme edit.

Explain these modes in plain store-owner language. Prefer labels such as "Assistant service", "AI replies", "Store content", "Customer Preview", "Launch Controls", and "Storefront Visibility" over infrastructure jargon.

## Test Chat Requirements

The dashboard preview chat is the real private demo. It must:

- use real synced Shopify knowledge, not sample data
- call the real backend model path, not static replies
- preserve short conversation history when testing follow-up questions
- render safe Markdown or force plain text so raw `**`, raw bullet syntax, or broken links are not visible
- render Markdown links without double-escaping
- match the storefront widget's message shape, product cards, link behavior, loading state, and guardrails
- use a normal typing indicator, preferably three animated dots, rather than internal status text
- avoid customer-facing developer language such as "retrieval", "sources", "verified knowledge", model/provider names, route names, or config names inside the preview chat
- show source labels/cards for backed answers only in admin-only source inspection or a clearly separated source-review area
- refuse or route to support for unsupported claims
- test at least these scenarios before storefront install:
  - real product recommendation
  - real policy question
  - discount request
  - live inventory question
  - order lookup/status question

## Source Inspection Rules

The dashboard must make source eligibility obvious:

- Products: show only synced active products as answerable/recommendable by default. If non-active records are ever visible for audit, label them excluded and never send them to retrieval.
- Pages: show only published pages as answerable by default. If unpublished records are visible for audit, label them excluded and never send them to retrieval.
- Collections: do not let collection records leak draft or archived product titles. Use active synced product handles for any collection product references.
- Policies: show which legal/policy records were synced and warn when expected policy coverage is missing.
- Manual knowledge: distinguish merchant-authored manual entries from Shopify-synced records.
- Source records should link to the underlying customer-facing product, collection, page, or policy URL when available, and these admin source-review links may open in a new tab.
- Source links must use public storefront URLs with preview tokens, admin tokens, generic token/key params, and other non-customer query values stripped.

## Safety And Auth

- Keep Shopify Admin credentials, model keys, preview tokens, and dashboard admin tokens backend-only.
- Protect admin routes separately from storefront routes.
- All `/api/admin/*` routes must reject unauthenticated requests.
- The protected dashboard URL must require auth before showing source data, sync controls, settings, support requests, conversations, analytics, or install values.
- When an admin dashboard token exists, the handoff must tell the user the dashboard URL, ignored env file path, token env key name, and hosted secret name/project/location when applicable, without revealing the token value.
- Generated admin tokens must be saved directly into an ignored local env file such as `.env.admin.local`, `.env.local`, `local.env`, or a repo-specific ignored env file, or into a hosted secret store. Setup scripts may print only the path/key name or secret name.
- Never expose an admin token in chat, docs, screenshots, browser JavaScript, Liquid, frontend code, source JSON, committed files, or logs.
- Public storefront config should expose only what the widget needs.
- Public chat routes must enforce allowed origins in production.
- Dashboard source JSON should be considered admin data even when it contains only customer-visible content.
- Do not enable order lookup unless authentication, privacy boundaries, and explicit order-access flows are designed.

## Acceptance Gate

Do not install or enable the storefront widget until the dashboard shows:

- backend, Shopify, and model are configured
- real source counts for products, collections, pages, and policies
- latest sync status and timestamp
- source filters for active products, published pages, and collection product references
- source browser works without exposing secrets
- dashboard test chat produces model-backed answers with source labels
- raw Markdown is not visible in the test chat
- Markdown links render without double-escaping
- customer preview chat does not show source/debug blocks or developer/testing language
- dashboard source records open customer-facing source URLs in a new tab
- dashboard test chat matches the storefront chat shape, rendering, loading state, product cards, links, and guardrails
- recommendation-style queries prioritize product and collection records over policy or page records
- product promotion works through product cards, product controls, merchant notes, and configured offers only
- conversations, support handoff records, and basic analytics are visible in protected dashboard screens
- dashboard features are reachable through navigation and verified in a browser
- admin dashboard token location has been handed off by file path/key name or hosted secret name without exposing the token value
- risky-question tests pass
- mode is `off` or `preview`
- disable/rollback instructions are visible or documented
