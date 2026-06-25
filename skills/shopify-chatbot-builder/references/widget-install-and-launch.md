# Widget Install And Launch

Touch Shopify theme files only after the backend works and the widget has been tested locally.

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
3. Pull or read current theme files.
4. Inspect existing snippets, assets, and layout.
5. Show exact intended changes.
6. Confirm no secrets in Liquid or public JavaScript.
7. Use targeted push when possible.
8. Use no-delete behavior when possible.
9. Verify desktop and mobile.
10. Provide rollback or disable steps.

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

Before live enablement, verify:

- local demo still works
- hosted backend health endpoint works
- real Shopify sync works
- widget loads only where intended
- widget calls the intended backend endpoint
- support handoff works
- no secrets appear in frontend code, Liquid, metafields, logs, docs, screenshots, or commits
- risky unsupported questions are refused or handed off
- mobile layout works
- disable path works
- rollback path is clear

## Disable And Rollback

The project should support at least one fast disable path:

- dashboard setting
- Shopify metafield or snippet setting
- environment-controlled backend refusal
- removing the render hook from the theme

Prefer a config switch that disables the widget without deleting theme files.
