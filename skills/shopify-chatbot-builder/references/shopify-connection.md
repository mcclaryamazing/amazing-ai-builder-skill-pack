# Shopify Connection

Connect Shopify read-only data before the user-facing demo. The private demo needs real product, page, and policy data to be useful.

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

Start read-only and request only what the demo needs:

| Scope | Use |
| --- | --- |
| `read_products` | Products and variants |
| `read_content` | Store content where supported |
| `read_online_store_pages` | Online store pages when page sync is enabled |
| `read_legal_policies` | Shopify legal policies through `ShopPolicy` |

Legal policies require `read_legal_policies`. If policy sync returns a scope/access error, do not silently treat the demo as complete. Either request/approve the missing read-only scope or clearly fall back to published policy pages, and surface the warning in `/health` and `/api/knowledge`.

Add only when needed:

- `read_files` for Shopify-hosted files used as knowledge sources
- metafield read scopes only when metafields are part of the chatbot knowledge plan
- `read_inventory` only when live inventory answers are explicitly in scope and safe
- `read_themes` for theme inspection
- `read_orders` for verified order lookup
- `read_all_orders` only with strong justification

Avoid order lookup in the first version unless authentication, privacy wording, and backend verification are implemented.

For new apps, prefer Shopify Dev Dashboard app setup. Reuse an existing app when safe and sufficient. Do not send members down stale private-app or legacy setup paths.

## Theme Access Setup

Use Theme Access when the chatbot needs theme files for snippets, public JavaScript, CSS, render hooks, or widget installation.

Plain-English flow:

1. Confirm the user has store owner, staff, or collaborator permissions for theme work.
2. Install the Shopify Theme Access app if it is not already installed.
3. Open `Apps > Theme Access`.
4. Click `Create password` or `Create theme password`.
5. Save the password locally as `SHOPIFY_CLI_THEME_TOKEN` in `.env` or the approved secret store.
6. Never paste the password into chat.

Installing Theme Access is not enough; a theme password must be created. Theme Access password links are one-time-view and can expire. Reuse an existing working Theme Access password when safe instead of creating duplicates.

## Dev Dashboard App Setup

Use a Shopify Dev Dashboard app for backend Admin API access to products, variants, collections, pages, policies, files, metafields, discounts when needed, and optional order lookup.

Plain-English flow:

1. Open `https://dev.shopify.com/dashboard`.
2. Create or reuse an app for this store.
3. Create a version.
4. Add only the scopes needed for the chatbot.
5. Release the version.
6. Install the app on the target store.
7. Copy Client ID and Secret into local `.env` as `SHOPIFY_CLIENT_ID` and `SHOPIFY_CLIENT_SECRET`.
8. Never paste the secret into chat.

If scopes change later, release a new app version and approve updated data access in Shopify Admin. Releasing a version alone does not update granted scopes.

## Verification

Credential dry-run only proves values are present. It is not real store sync.

Before the private demo, verify real Shopify data is retrievable by the backend and visible to chatbot retrieval:

- products query uses active-only filtering and synced product records report `ACTIVE`
- products and variants
- collections
- collection product mentions are filtered through already-synced active products or omitted
- page query uses published-only filtering and synced page records are published
- pages
- policy sync works through `read_legal_policies`, or the app clearly reports the missing scope and uses published policy pages only
- policies
- support path
- health/knowledge endpoints report configured scopes/status without exposing secrets

If real data is not synced yet, do not present the chatbot as the demo. Treat any fake-data version as a temporary plumbing smoke test.
