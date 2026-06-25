# Shopify Connection

Connect Shopify only after the polished local demo works.

If the user already has Shopify access or credentials set up, verify and reuse them. Do not create a new custom app, Admin token, Theme Access password, or Shopify CLI workflow unless the existing setup is missing, unsafe, or insufficient.

## Two Access Rails

Keep these separate:

1. Storefront/theme access for Liquid snippets, public JavaScript, CSS, render hooks, and widget installation.
2. Backend Admin API access for products, variants, collections, pages, policies, files, metafields, discounts when needed, and optional order lookup.

The browser widget must never contain Shopify Admin tokens, client secrets, LLM keys, database URLs, service account credentials, or private dashboard tokens.

## Values To Collect

Ask for non-secret values in chat:

- `.myshopify.com` domain
- public storefront domain
- support email or contact page
- policy page URLs
- whether Theme Access, Shopify CLI, or both are available
- whether order lookup is in scope

For secrets, tell the user the exact `.env` key or secret-manager entry to fill locally. Do not ask them to paste secret values into chat.

## Existing Access

When the user says access already exists:

1. Ask which access rail it belongs to: theme/storefront files or backend Admin API data.
2. Verify the non-secret identifiers, such as store domain, app name, available scopes, theme ID, and configured env variable names.
3. Use read-only checks where available, such as Shopify CLI status, a dry-run credential check, or an app-scope inspection.
4. Point the project at the existing values instead of creating duplicates.
5. Ask before rotating tokens, creating a new app, changing scopes, or replacing Theme Access credentials.

If the existing access is overbroad, stale, or not enough for the next step, explain the gap and propose the smallest change.

## Scope Guidance

Start read-only:

- `read_products`
- `read_content`
- `read_online_store_pages` when page sync is enabled

Add only when needed:

- `read_themes` for theme inspection
- `read_orders` for verified order lookup
- `read_all_orders` only with strong justification

Avoid order lookup in the first version unless authentication, privacy wording, and backend verification are implemented.

## Verification

Credential dry-run only proves values are present. It is not real store sync.

Before launch, verify real Shopify data is retrievable by the backend and visible to chatbot retrieval:

- products and variants
- collections
- pages
- policies
- support path

If real data is not synced yet, clearly label the project as demo-only.
