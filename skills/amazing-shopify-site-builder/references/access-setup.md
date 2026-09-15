# Shopify Access Setup

Use this reference when Theme Access, Shopify CLI, a development or copied preview theme, Shopify Dev Dashboard app credentials, Admin API scopes, or access verification are missing or uncertain.

## Reuse Before Recreate

Ask whether the store already has:

- Shopify site repo
- `.env` or approved secret store
- Theme Access password or Shopify CLI theme access
- development theme or copied preview theme
- Shopify Dev Dashboard app installed on this store
- Client ID and Secret stored locally
- known Admin API scopes for products, collections, pages, files, menus, redirects, discounts, publications, metafields, metaobjects, or themes

Verify and reuse existing setup when safe. Do not create duplicate apps, duplicate Theme Access passwords, extra development themes, or broader scopes unless existing setup is missing, unsafe, inaccessible, or insufficient.

## Two Access Rails

Keep these separate:

```text
Theme rail:
  Shopify Theme Access app + Shopify CLI
  Used for sections, snippets, assets, templates, layouts, and theme code.

Admin API rail:
  Shopify Dev Dashboard app + Admin GraphQL client credentials
  Used for pages, products, collections, files, discounts, metafields, metaobjects, menus, redirects, inventory, and publications.
```

Do not use a Theme Access password as an Admin API token. Do not put Admin credentials, client secrets, Theme Access passwords, or access tokens in Liquid, public JavaScript, docs, screenshots, or chat.

## Expected Local Env Keys

Use the target repo's existing convention when present. Otherwise use:

```text
SHOPIFY_SHOP_DOMAIN=your-store.myshopify.com
SHOPIFY_API_VERSION=2026-04
SHOPIFY_CLIENT_ID=
SHOPIFY_CLIENT_SECRET=
SHOPIFY_CLI_THEME_TOKEN=
```

The `.myshopify.com` domain is the automation domain. The public domain is still useful for QA and customer-facing links.

## Theme Access Setup

Theme Access is needed to push and pull theme files with Shopify CLI.

Plain-English flow:

1. Confirm the user has store owner, staff, or collaborator permissions for theme work.
2. Install the Shopify Theme Access app if it is not already installed.
3. Open `Apps > Theme Access`.
4. Click `Create password` or `Create theme password`.
5. Send the password link to the person who will run the theme commands.
6. Save the password locally as `SHOPIFY_CLI_THEME_TOKEN` in `.env` or the approved secret store.
7. Never paste the password into chat.

Operational notes:

```text
Installing Theme Access is not enough; a theme password must be created.
Theme Access password links expire and are one-time-view.
Deleting a Theme Access password revokes access.
Theme Access usually requires store owner access, staff access with theme and permission-management rights, or collaborator access with theme rights.
```

Verify without printing the token:

```powershell
$envText = Get-Content .env -Raw
$tokenLine = ($envText -split "`r?`n") | Where-Object { $_ -match '^\s*SHOPIFY_CLI_THEME_TOKEN\s*=' } | Select-Object -First 1
$token = ($tokenLine -replace '^\s*SHOPIFY_CLI_THEME_TOKEN\s*=\s*', '').Trim().Trim('"').Trim("'")

npx -y @shopify/cli@latest theme list `
  --store your-store.myshopify.com `
  --password "$token"
```

## Preview Theme Strategy

For full-site work, prefer a development theme or a fresh unpublished copy of the current live theme.

Use a copied-current-live theme when the work must preview against the real current storefront. Do not use a random old development theme unless it has been verified to match the live theme.

Record:

```text
live theme name and ID
preview theme name and ID
copy/creation method
critical files verified
preview URL
known differences from live
```

## Dev Dashboard App Setup

The Admin API rail is needed for Shopify Pages, products, variants, collections, Shopify Files uploads, menus, redirects, metafields/metaobjects, metadata, discounts, publications, and inventory.

Plain-English flow:

1. Open `https://dev.shopify.com/dashboard`.
2. Create or reuse an app for this store.
3. Create a version.
4. For an API-only app with no embedded UI, use `https://shopify.dev/apps/default-app-home` as the app URL when needed.
5. Add only the needed scopes.
6. Release the version.
7. Install the app on the target store.
8. Copy Client ID and Secret into local `.env` as `SHOPIFY_CLIENT_ID` and `SHOPIFY_CLIENT_SECRET`.
9. Never paste the secret into chat.

If scopes change later, create and release a new app version and approve the updated data access in Shopify Admin. Releasing a version alone does not update granted scopes.

## Baseline Scope Groups

Use the smallest scope set needed. For full-site automation, common groups are:

```text
read_content
write_content
read_discounts
write_discounts
read_files
write_files
read_inventory
write_inventory
read_locations
read_metaobject_definitions
write_metaobject_definitions
read_metaobjects
write_metaobjects
read_online_store_navigation
write_online_store_navigation
read_online_store_pages
write_online_store_pages
read_products
write_products
read_publications
write_publications
read_themes
write_themes
```

Only add customer/order/draft-order/market/checkout/protected-customer-data scopes when the specific site work requires them and the privacy/approval path is clear.

## Admin API Verification

Verify the app can get a short-lived token and query Admin GraphQL without printing secrets or tokens.

If the target repo already has a verifier script, reuse it. If no verifier exists, create a tiny local script that reads `.env`, requests a client-credentials token, runs the scope query below, prints only shop identity and granted scopes, and never prints Client Secret or access tokens.

Minimum verification query:

```graphql
query CurrentAppScopes {
  shop {
    name
    myshopifyDomain
  }
  currentAppInstallation {
    accessScopes {
      handle
    }
  }
}
```

If scopes are missing, check store domain, app install state, released app version, Shopify Admin approval, and whether `.env` contains credentials from the correct app.

## Access Ready Gate

Before implementation, confirm:

```text
Theme Access token is stored locally and theme list works
target live and preview theme IDs are known
Dev Dashboard app is installed on the target store when Admin API mutations are needed
Client ID and Secret are stored locally
Admin API scope verification succeeds
no secrets were pasted into chat, docs, screenshots, Liquid, or frontend JavaScript
```
