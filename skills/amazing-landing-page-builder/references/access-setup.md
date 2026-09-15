# Access Setup

Use this reference when Theme Access, Shopify CLI, a development theme, Shopify Dev Dashboard app credentials, Admin API scopes, or access verification are missing or uncertain.

The goal is to get enough verified access to truly build, install, preview, and test a landing page on an existing Shopify store.

## Local Desktop Setup

When guiding a member before their first local task, start with folder selection: have them create an empty store folder in File Explorer or Finder if none exists, create/select a local desktop project pointing directly to it, and select that project on the Work tab before sending the setup prompt. They do not need to initialize Git or create a store GitHub repository themselves. Once running, verify the actual current folder before initializing files; a project display name alone does not prove the path.

For desktop Work or Codex, verify access to the selected store folder, local commands, this complete skill folder, and a real browser. A cloud task opened in a desktop window does not establish local access. If a capability is unavailable, identify it and guide the member to enable it.

Use the selected store folder. For an empty folder, create local Git history on `main` and ignore `.env`, token caches and temporary QA files before creating them. Create a placeholder-only `.env.example`. The store does not need a GitHub repository. During a fresh setup test, do not import credentials or helpers from backups or sibling stores. Record verified store identity, theme IDs, targeted deployment and rollback in a short local `deploy.md`.

Check Git, Node/npm and Shopify CLI. Check Python and dependencies only when the chosen helper needs them. Reuse working installations. Within authorized setup, install missing tools through official supported installers/package sources and verify execution afterward. The member handles interactive operating-system approvals. Do not silently upgrade working tools or use `npx @latest` during read-only verification. Use the installed `shopify` command, resolving any required version change during setup. If tools already exist, report that missing-tool installation was not exercised.

Verify browser access against the actual signed-in Shopify Admin and storefront. Guide browser/plugin connection if unavailable; screenshot extensions do not provide browser control. Within the user-authorized setup, complete app installation and required permission-approval clicks when available tools permit, including Theme Access and the merchant-owned app. Do not hand these steps back solely because Shopify labels them permissions. Installing the skill alone does not authorize store changes: use the active task's setup scope, verify the app/store and requested permissions, and ask before materially expanding that scope. Request member intervention only for a concrete tool or authentication boundary, such as sign-in, MFA or secure secret entry that the agent cannot perform. State the exact screen, action and reason help is needed; avoid vague phrases such as "your permission-approval step." Keep secrets in a local ignored file or supported secure credential store. Keep secret-entry screens out of captured evidence. The official Shopify connector is not required for the local CLI and owner-app path.

Installing tools, creating apps/passwords and creating preview themes are setup mutations, not read-only preflight. Explain the next setup action accurately and keep store changes within the requested scope.

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
5. Send the password link to the intended recipient and report the actual recipient address and store name without exposing the link.
6. Find the new Theme Access email in that recipient's inbox; check spam/junk if needed. Open the store-specific message and follow its actual invitation/password-view action. Do not invent a button name such as Accept when it has not been observed.
7. Save the resulting password locally as `SHOPIFY_CLI_THEME_TOKEN` in the selected store's ignored `.env` or approved secret store.

Prefer completing this email step for the member when the active setup authorizes it and an email connector or signed-in browser is available. Inspect actual capabilities; do not assume local Work has inbox access. Read only the relevant setup message, verify the intended store and recipient, and do not send or change unrelated mail. Treat the password link itself as sensitive.

Automatic retrieval and local credential saving are the default within authorized setup when the tools support them. Do not require the member to copy secrets solely because credentials are involved, or because no tool is named direct-to-secret-file. Inspect the actual browser, computer-use, clipboard and local-file capabilities and their restrictions. A supported in-process transfer or supported copy/paste flow can be sufficient if it avoids exposing the value in returned output or captures. Never invent an API, bypass a disabled capability, or use an alternate automation channel to evade a tool restriction.

Where a supported transfer path exists, verify it with harmless dummy text before opening a one-time link. Then retrieve and save the credential automatically into the exact store's ignored destination, preserving other fields; return only redacted status and authenticate to verify success. Apply the same approach to the merchant-app secret. Do not equate a writable file with end-to-end transfer capability. If no supported path exists, name the inspected capability and specific limitation rather than assuming manual entry is required.

Before opening a one-time password link, establish how its result can be transferred securely into the local credential store. Use a supported secure transfer that does not print secrets or sensitive links into chat, screenshots, tool output, logs or tracked files. Email access alone does not prove secure credential transfer is available. If that boundary cannot be met, navigate to the non-secret instruction step and give the member exact manual directions instead of consuming the one-time link.

A manual handoff must state: the recipient inbox to open; how to identify the store's Theme Access email (observed sender/subject when available); the observed link/button or a clearly conditional description; the exact local file path; the `SHOPIFY_CLI_THEME_TOKEN` field to fill; and to save locally and reply only Done. Explain why the agent needs help. Do not merely say waiting for credentials. The Dev Dashboard app secret is separate: identify its settings screen and `SHOPIFY_CLIENT_SECRET` field separately. If the email/link is missing or expired, inspect Theme Access and guide the supported resend/new-password action within the same setup scope; do not revoke unrelated credentials.

### Verified example: browser and file access in one JavaScript session

A local desktop Work onboarding test successfully used the supported Chrome browser runtime and `node:fs/promises` in the same persistent JavaScript tool session. This is a suggested capability pattern, not a requirement for every environment. Read the current browser runtime's documentation and use only the APIs available in that session; do not copy a versioned installation path or store/tab IDs from another machine.

1. Import the permitted local filesystem API and test writing/reading harmless text in the store's ignored temporary directory. Return only a boolean result.
2. Initialize the supported Chrome runtime. The tested runtime exposed `browser.tabs.get`, `tab.clipboard.readText/writeText`, and `tab.playwright` controls. Check those actual capabilities first. Test clipboard-to-file transfer with harmless text and restore the previous clipboard without printing it.
3. In the verified merchant app's settings, click the observed **Copy client secret to clipboard** control. Read the clipboard into a runtime variable and write it directly into `SHOPIFY_CLIENT_SECRET` in the ignored `.env`, preserving other fields. Return only saved/not-saved status. Clear the credential clipboard and runtime references afterward.
4. Locate the confirmed Theme Access email, obtain its **Get password** link into a runtime variable, and verify its destination against the expected Shopify service without printing the sensitive URL. Navigate with that variable. The tested page required a separate **Show password** button; use the controls actually present.
5. The tested session obtained the revealed password from a DOM snapshot held only in memory, then wrote it directly into `SHOPIFY_CLI_THEME_TOKEN` with the filesystem API. It did not emit the raw snapshot or pass the password through a new model-visible command. Inspect the current page structure to identify exactly one credential; do not depend on a hardcoded token prefix. Emit only boolean status, discard secret-bearing variables, and close the reveal page after saving. A snapshot API that automatically returns sensitive content to the conversation is unsuitable for this method.
6. Verify Admin and theme authentication using the saved file without printing values. Remove the harmless probe file. Report verified access, not the credentials or reveal URL.

This method succeeded because browser data and file writing stayed inside one tool execution environment. A missing specially named secret-storage tool did not prevent it. If the installed runtime does not support the same operations, inspect other permitted capabilities before requesting the precise manual handoff above.

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

shopify theme list `
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

Client credentials require a merchant-owned store and an app in the same Shopify organization. Verify that relationship first. Each merchant creates their own app; never reuse Amazing's or another merchant's credentials. Collaborator access alone does not establish eligibility. For `shop_not_permitted`, check ownership and the supported authentication path instead of adding scopes or repeatedly refreshing tokens. Consult current Shopify authentication documentation if this owned-store path is not available.

The Admin API rail is needed for Shopify Pages, Shopify Files uploads, product/variant verification, metadata, discounts, publications, and other store data.

Guide the user:

1. Open `https://dev.shopify.com/dashboard`.
2. Create an app or select the existing app for this store.
3. Create a version.
4. For API-only apps with no embedded UI, use `https://shopify.dev/apps/default-app-home` as the app URL.
5. Add the complete storefront baseline in Scope Guidance unless the member explicitly selected a narrower workflow.
6. Release the version.
7. Install the app on the target store.
8. Copy Client ID and Secret into local `.env` as `SHOPIFY_CLIENT_ID` and `SHOPIFY_CLIENT_SECRET`.

If scopes change later, release a new app version and approve updated data access in Shopify Admin. Releasing a version alone may not update the installed app's granted scopes.

## Scope Guidance

For installation of this complete storefront workflow, request the baseline below upfront. Choose permissions for the capability the member is installing, not just today's read-only preflight. A setup-only stopping point limits mutations; it does not reduce the agreed access profile to product reads. If the member explicitly requests a narrower workflow, explain the resulting limitations and use that smaller profile.

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

This baseline covers products/variants/pricing/collections and campaign bundles, discount codes and automatic discounts, images and Shopify Files, pages/content/metadata, product publications, inventory reads/writes and location reads, navigation/redirects, structured content, and theme API access. Theme-file deployment and publishing still use the separately verified Theme Access plus CLI path; Admin theme scopes alone do not prove those operations are permitted. Metafield permissions follow their owner resource. Market eligibility for offers must still be verified rather than inferred from publication scopes.

Customer data, orders/order history, reports, draft orders, fulfillments, market administration, checkout settings, and Shopify Functions-specific permissions are not part of this baseline. Add only for an explicitly requested workflow that requires them, subject to Shopify eligibility. Do not copy unrelated permissions from another merchant's app. Check current Shopify scope/API availability when configuring; report unavailable or restricted permissions rather than claiming full readiness.

For an existing installation, verify the exact app and store, preserve existing access unless removal is authorized, add missing baseline scopes to a new version of that same app, release it, and complete Shopify's updated-access approval within authorized setup. Reuse credentials; do not recreate the app or Theme Access password unnecessarily. Obtain a fresh access token and re-query `currentAppInstallation.accessScopes`, comparing requested versus granted scopes and reporting any gap. Do not silently trim a verifier's expected scope set to make it pass.

Granting these permissions does not authorize arbitrary store changes. During access setup, verify identity, grants and read operations without creating test products/discounts or changing live content. Actual mutations and publication follow the user's approved build/release scope. Distinguish granted permissions from write operations actually tested.

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

Respect the token response's expiry and obtain a fresh token when needed. Keep token caches local and ignored. Distinguish expiry from wrong organization/store and missing granted scopes. Successful authentication does not prove permission for every requested operation.

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

Only after these done signals should the agent push files or mutate pages, products, discounts, files or publications. Local design can proceed while unrelated setup is pending.
