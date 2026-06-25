# Access Setup

Use this reference when Theme Access, Shopify CLI, a development theme, Shopify Dev Dashboard app credentials, Admin API scopes, or access verification are missing or uncertain.

The goal is to get enough verified access to truly build, install, preview, and test a landing page on an existing Shopify store.

## First Ask What Exists

Before creating anything, ask what the user already has:

```text
Do you already have any of these set up for this store?
- Theme Access password or Shopify CLI theme access
- a development theme or duplicate theme for previewing
- a Shopify Dev Dashboard app installed on this store
- Client ID and Client Secret saved in this repo's .env or secret manager
- known Admin API scopes for products, pages, files, discounts, publications, or themes
```

Verify and reuse existing setup when it is safe. Do not create duplicate apps, duplicate Theme Access passwords, or extra development themes unless the existing setup is missing, unsafe, inaccessible, or insufficient.

Never ask the user to paste secrets into chat. Tell them the exact `.env` variable to fill locally.

## Access Rails

Keep the two rails separate:

```text
Theme rail:
  Shopify Theme Access app + Shopify CLI
  Used for sections, snippets, assets, templates, layouts, and theme code.

Admin API rail:
  Shopify Dev Dashboard app + Admin GraphQL client credentials
  Used for pages, products, variants, Shopify Files, discounts, metadata, publications, menus, redirects, metafields, and metaobjects.
```

Do not use a Theme Access password as an Admin API token. Do not put Admin credentials, client secrets, Theme Access passwords, or access tokens in Liquid, public JavaScript, docs, screenshots, or chat.

## Required Local Values

The target Shopify site repo should have placeholder-only examples like:

```text
SHOPIFY_SHOP_DOMAIN=your-store.myshopify.com
SHOPIFY_API_VERSION=2026-04
SHOPIFY_CLIENT_ID=
SHOPIFY_CLIENT_SECRET=
SHOPIFY_CLI_THEME_TOKEN=
```

Use the `*.myshopify.com` domain for automation, not only the public storefront domain.

## Theme Access Setup

Theme Access is needed to push and pull theme files with Shopify CLI.

Guide the user:

1. Open Shopify Admin for the store.
2. Install the Shopify Theme Access app if it is not already installed.
3. Open `Apps > Theme Access`.
4. Click `Create password` or `Create theme password`.
5. Send the password link to the developer email.
6. Open the emailed link once.
7. Save the password locally as `SHOPIFY_CLI_THEME_TOKEN` in `.env` or the approved secret store.

Important notes:

```text
Installing Theme Access is not enough; a theme password must be created.
The password link expires or becomes unusable after it is viewed.
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

If this fails, check the store domain, password value, Theme Access app status, staff/collaborator permissions, and whether the password link expired.

## Development Theme Setup

A development theme or duplicate preview theme is strongly preferred before live launch.

Options:

```text
Use an existing development/preview theme if one is already available.
Duplicate the live theme in Shopify Admin when the user has permission.
Create a new development theme only when that matches the store's workflow.
```

After Theme Access works, list themes and identify:

```text
live theme name and ID
development or preview theme name and ID
whether --allow-live would be required for the intended push
```

Do not push to the live theme until the design, files, exact paths, git status, rollback, and approval are all clear.

## Dev Dashboard App Setup

The Admin API rail is needed for Shopify Pages, Shopify Files uploads, product/variant verification, metadata, discounts, publications, and other store data.

Guide the user:

1. Open `https://dev.shopify.com/dashboard`.
2. Create an app or select the existing app for this store.
3. Create a version.
4. For API-only apps with no embedded UI, use `https://shopify.dev/apps/default-app-home` as the app URL.
5. Add the smallest scope set needed for the landing page workflow.
6. Release the version.
7. Install the app on the target store.
8. Copy Client ID and Secret into local `.env` as `SHOPIFY_CLIENT_ID` and `SHOPIFY_CLIENT_SECRET`.

If scopes change later, release a new app version and approve updated data access in Shopify Admin. Releasing a version alone may not update the installed app's granted scopes.

## Scope Guidance

Use the smallest scope set needed. Common landing-page work may need:

```text
read_online_store_pages
write_online_store_pages
read_products
write_products
read_files
write_files
read_publications
write_publications
read_themes
write_themes
```

Add only when the work requires it:

```text
read_discounts / write_discounts for discount codes or automatic discounts
read_inventory / write_inventory / read_locations for inventory-aware modules
read_content / write_content for broader content work
read_online_store_navigation / write_online_store_navigation for menus or redirects
read_metaobject_definitions / write_metaobject_definitions / read_metaobjects / write_metaobjects for structured content
read_customers / write_customers only when customer data workflows are explicitly required
```

Avoid order, draft order, market, checkout, and protected customer data scopes unless the landing-page project specifically requires them and the privacy/access implications are understood.

## Admin API Verification

Use a repo script when available. If the repo does not have one, create a small verifier that:

```text
reads .env without printing secrets
requests a short-lived client-credentials access token
calls Admin GraphQL
prints shop name/domain
prints granted scopes
never prints secrets or access tokens
```

Verify scopes with:

```graphql
query CurrentAppScopes {
  currentAppInstallation {
    accessScopes {
      handle
    }
  }
}
```

Also verify the operations the landing page needs, such as page create/update, product/variant lookup, Shopify Files upload, discount creation, or publication changes.

## Setup Done Signals

Access setup is ready when:

```text
SHOPIFY_SHOP_DOMAIN is known
Theme Access token is stored locally and theme list works
live theme ID is known
development/preview theme ID is known or the user approved a live-theme path
Dev Dashboard app is installed on the target store
Client ID and Secret are stored locally
Admin API scope verification succeeds
needed GraphQL operations are available
no secrets were pasted into chat or committed
```

Only after these done signals should Codex build, push, create pages, upload Shopify Files, or mutate products/discounts/publications.
