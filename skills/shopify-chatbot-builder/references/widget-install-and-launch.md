# Widget Install And Launch

Touch Shopify theme files only after the private real-store demo works.

If the user already has hosting, storage, theme access, snippets, or widget assets set up, verify and reuse them. Do not recreate hosting projects, storage buckets, deployment services, Shopify snippets, theme credentials, or widget assets just because the workflow reaches that stage.

## Safe Widget Pattern

Prefer:

- small Liquid snippet
- public loader JavaScript
- optional CSS asset
- one render hook near `</body>`
- public endpoint/config metafields
- development theme first

Avoid large Custom Liquid blocks and broad global theme edits unless there is a clear reason.

## Theme Workflow

Before pushing or editing theme files:

1. Confirm target store and theme.
2. Prefer a development theme.
3. Ask whether a snippet, render hook, widget asset, or Theme Access setup already exists.
4. Pull or read current theme files.
5. Inspect existing snippets, assets, and layout.
6. Reuse existing working files when they match the project.
7. Show exact intended changes.
8. Confirm no secrets in Liquid or public JavaScript.
9. Use targeted push when possible.
10. Use no-delete behavior when possible.
11. Verify desktop and mobile.
12. Provide rollback or disable steps.

Example push shape:

```powershell
shopify theme push `
  --store your-store.myshopify.com `
  --theme <development-theme-id> `
  --only layout/theme.liquid `
  --only snippets/<snippet>.liquid `
  --only assets/<loader>.js `
  --only assets/<styles>.css `
  --nodelete
```

If the render hook was added through Shopify Admin, do not push `layout/theme.liquid`.

## Launch Review

Before any deploy, read the target chatbot repo's `deploy.md` or `DEPLOY.md` if one exists.

Before live enablement, verify:

- private real-store demo still works
- hosted backend health endpoint works
- existing hosting, storage, deployment, database, or secret-manager resources have been verified when reused
- real Shopify sync works
- server-side AI model calls work
- private demo acceptance gate passed
- widget loads only where intended
- widget calls the intended backend endpoint
- support handoff works
- no secrets appear in frontend code, Liquid, metafields, logs, docs, screenshots, or commits
- risky unsupported questions are refused or handed off
- mobile layout works
- disable path works
- rollback path is clear

Before enabling the live theme, show:

- development theme ID and live theme ID
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
