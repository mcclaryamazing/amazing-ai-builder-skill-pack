# Widget Install And Launch

Touch Shopify theme files only after the protected dashboard and embedded real-store test chat work.

If the user already has hosting, storage, theme access, snippets, or widget assets set up, verify and reuse them. Do not recreate hosting projects, storage buckets, deployment services, Shopify snippets, theme credentials, or widget assets just because the workflow reaches that stage.

## Safe Widget Pattern

Prefer:

- small Liquid snippet
- public loader JavaScript
- optional CSS asset
- one render hook near `</body>`
- public endpoint/config metafields
- fresh copied preview theme first

Avoid large Custom Liquid blocks and broad global theme edits unless there is a clear reason.

## Customer-Facing Widget Polish

The storefront widget should feel like a finished customer service assistant.

Require:

- warm, concise, specific default copy
- short mobile-safe placeholder text, such as "Ask a question"
- suggested prompt buttons that do not clip on desktop or mobile
- a normal typing indicator, preferably three animated dots
- no source/debug panels in the shopper widget
- no developer or testing language such as "retrieval", "sources", "verified knowledge", "preview", provider/model names, API keys, internal route names, config names, stack traces, or private-preview details
- friendly unavailable and model-failure messages that route to support
- chat state persistence when a shopper follows an internal product, collection, page, or policy link and the page reloads behind the widget
- bounded sanitized recent transcript sent with each chat request so follow-ups work after navigation and page reloads
- subtle glass/translucent launcher or panel styling only when readability and contrast remain strong

Visual transcript persistence alone is not enough. The backend must receive recent sanitized turns, or the assistant will treat each message as a new standalone request.

## Link Safety And Navigation

All shopper-visible links must resolve to customer-facing storefront destinations.

Implement and test a shared URL sanitizer for backend-generated and frontend-rendered links:

- Strip preview tokens, theme preview params, admin tokens, generic token/key params, and other non-customer query values.
- Support both absolute and relative URLs.
- Preserve normal shopper-safe params such as variant IDs.
- Resolve policy links to public storefront policy pages whenever possible, not checkout, admin, preview, or private URLs.
- Make product, collection, page, and policy names clickable when a customer-facing URL is available.
- Navigate storefront chat links in the same tab by default, while preserving chat state.
- Open admin source-review links in a new tab when useful.

## Current Live Theme Copy First

Before installing or verifying the storefront widget, create or use a fresh unpublished copy of the current live theme for accurate preview and testing.

Do not use a random old development theme, stale Dawn theme, or previously modified preview theme unless it has been verified to match the current live storefront.

Workflow:

1. Identify the current live theme by name and ID.
2. Create a fresh unpublished copy of that exact live theme.
3. Verify the copied theme contains critical files such as `layout/theme.liquid` and `config/settings_schema.json`.
4. Browser-check the copied theme preview and confirm it is the real current storefront using title, H1, brand content, screenshots, and desktop/mobile layout signals.
5. Install the chatbot only on that copied preview theme.
6. Use targeted theme pushes with no-delete behavior for chatbot files.
7. Keep the live theme untouched until the user explicitly approves live launch.

Shopify CLI theme duplication can sometimes create a broken or incomplete copy. If the duplicate is broken, incomplete, or does not match the current storefront, propose this fallback:

1. Pull the full current live theme into a temporary local folder.
2. Push that full pulled copy as a new unpublished theme.
3. Verify the new unpublished theme in a browser.
4. Install only the chatbot files on that copied theme.

The fallback full-theme pull/push is a broader theme operation and requires explicit user approval before running.

## Theme Workflow

Before pushing or editing theme files:

1. Confirm target store and theme.
2. Identify the current live theme name and ID.
3. Create or verify a fresh unpublished copy of the current live theme, and record the copied preview theme name and ID.
4. Verify the copied preview theme matches the current live storefront in a browser before installing chatbot files.
5. Read the target repo's `deploy.md` or `DEPLOY.md` if one exists.
6. Run `git status --short` in every repo being touched.
7. If uncommitted work exists, list it and ask whether it should be included before excluding it from deploy or theme work.
8. Ask whether a snippet, render hook, widget asset, or Theme Access setup already exists.
9. Pull or read current theme files.
10. Inspect existing snippets, assets, and layout.
11. Reuse existing working files when they match the project.
12. Show exact intended changes.
13. Confirm no secrets in Liquid or public JavaScript.
14. Use targeted push when possible.
15. Use no-delete behavior when possible.
16. Verify desktop and mobile.
17. Provide rollback or disable steps.

Example push shape:

```powershell
shopify theme push `
  --store your-store.myshopify.com `
  --theme <copied-preview-theme-id> `
  --only layout/theme.liquid `
  --only snippets/<snippet>.liquid `
  --only assets/<loader>.js `
  --only assets/<styles>.css `
  --nodelete
```

If the render hook was added through Shopify Admin, do not push `layout/theme.liquid`.

## Launch Review

Before any deploy, read the target chatbot repo's `deploy.md` or `DEPLOY.md` if one exists.

Before any deploy or Shopify mutation, run `git status --short` in the target repo and any theme repo. If there is uncommitted work, list the files and ask whether that work should be included before deploying, excluding, overwriting, or pushing around it.

Before live enablement, verify:

- protected dashboard and embedded real-store test chat still work
- protected dashboard does not expose secrets and reaches setup, settings, sources, product controls, offers, test chat, conversations, support, analytics, and install/rollback sections when those surfaces exist
- dashboard shows product, collection, page, and policy counts, sync status, source filters, current mode, synced policy/source names, model-call verification, and pass/fail results for at least five real or risky questions
- dashboard test chat uses the real backend, synced knowledge, model, retrieval, and guardrails
- dashboard test chat matches storefront chat shape, rendering, loading state, product cards, links, and guardrails
- dashboard source records open the customer-facing source in a new tab when a public URL exists
- admin dashboard token location has been handed off without exposing the token value
- hosted backend health endpoint works
- existing hosting, storage, deployment, database, or secret-manager resources have been verified when reused
- real Shopify sync works
- synced products are active only
- synced pages are published only
- collection product mentions are filtered through active products
- missing Shopify policy scopes are surfaced as warnings or failures rather than hidden
- server-side AI model calls work
- dashboard acceptance gate passed
- source live theme name and ID are recorded
- copied preview theme name and ID are recorded
- copied preview theme contains critical files such as `layout/theme.liquid` and `config/settings_schema.json`
- storefront verification screenshots are from the current real storefront, not a stale theme
- widget loads only where intended
- widget calls the intended backend endpoint
- support handoff works
- no secrets appear in frontend code, Liquid, metafields, logs, docs, screenshots, or commits
- risky unsupported questions are refused or handed off
- product promotions use product cards, product controls, merchant-only notes, and configured merchant offers only
- mobile layout works
- desktop preview layout works
- customer-facing links strip preview, custom preview, admin, token, and key params for absolute and relative URLs while preserving shopper-safe params such as variant IDs
- policy links resolve to public storefront policy pages when possible
- product, collection, page, and policy names in answers are clickable when customer-facing URLs exist
- Markdown links render without double-escaping
- shopper widget does not show source/debug blocks or developer/testing language
- suggested prompts, input placeholder, and panel layout do not clip or overflow on mobile
- internal link navigation preserves conversation state after the page reloads
- the next chat request after internal navigation sends bounded sanitized recent history to the backend
- follow-up questions use recent context and do not restart with a fresh welcome/greeting
- disable path works
- rollback path is clear
- privacy expectations are clear
- order lookup is disabled unless authentication, privacy, and backend logic are implemented
- hosted smoke tests pass when a hosted backend or hosted widget asset is in use
- hosted runtime mode is verified after deploy if mode is persisted outside environment variables, and reset to `preview` or `off` as required by the deploy guide
- live theme remains untouched unless the user explicitly approves live launch

Before enabling the live theme, show:

- source live theme name and ID
- copied preview theme name and ID
- exact files to be changed
- confirmation that no secrets are in the files
- disable switch or fastest disable path
- rollback steps

Ask for explicit approval before enabling the widget on a live theme.

## Disable And Rollback

The project should support at least one fast disable path:

- dashboard setting
- Shopify metafield or snippet setting
- environment-controlled backend refusal
- removing the render hook from the theme

Prefer a config switch that disables the widget without deleting theme files.
