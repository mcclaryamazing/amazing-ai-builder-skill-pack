---
name: shopify-access-and-data-sync
description: Guide safe Shopify access setup and data sync for AI tools. Use when configuring Theme Access, Shopify CLI, Admin API scopes, Dev Dashboard client credentials, custom app Admin tokens, backend-only data ingestion, read-only sync, or secret-safe Shopify setup for a private AI tool.
---

# Shopify Access And Data Sync

Use two separate rails. Keep them mentally and technically separate.

## Rail 1: Theme And Storefront File Access

Use for:

- Liquid snippets
- theme assets
- widget loader JavaScript
- CSS
- render hooks
- safe theme installation

Possible tools:

- Shopify Theme Access
- Shopify CLI
- development theme pull/push workflow

Safety behavior:

- Pull or read current theme files before editing.
- Show exact intended files before pushing.
- Prefer `--only` and `--nodelete`.
- Prefer development themes before live themes.
- Do not full-sync a live theme by accident.

## Rail 2: Backend-Only Shopify Data/API Access

Use for:

- products and variants
- collections
- pages
- policies
- files
- metafields
- discounts when explicitly needed
- backend storage and retrieval
- optional verified order lookup

Credential styles:

- Preferred: Shopify Dev Dashboard app with `SHOPIFY_CLIENT_ID` and `SHOPIFY_CLIENT_SECRET`.
- Simpler fallback: custom app Admin API token in `SHOPIFY_ADMIN_ACCESS_TOKEN`.

Both must stay server-side.

## Scope Guidance

Start read-only:

- `read_products`
- `read_content`
- `read_online_store_pages` when page sync is enabled

Add only when needed:

- `read_themes` for theme inspection
- `read_orders` for verified order lookup
- `read_all_orders` only with strong justification

## Never Do

- Do not ask the learner to paste Admin API tokens into chat.
- Do not put Admin API credentials in Liquid, browser JavaScript, metafields, public widget config, docs, screenshots, or commits.
- Do not add sensitive scopes without explaining why.
- Do not enable order lookup without authentication, privacy, and backend logic.

## Verification

Use dry-run checks for configuration readiness, then clearly state that real sync still requires actual Shopify reads and retrievable stored knowledge.
