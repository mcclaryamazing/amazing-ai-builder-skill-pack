---
name: shopify-theme-widget-installer
description: Safely install or improve a Shopify storefront widget or Liquid snippet. Use when adding chat widgets, snippet files, loader JavaScript, CSS assets, render hooks, metafields, Shopify CLI pushes, Theme Access workflows, desktop/mobile verification, or rollback plans without damaging live themes.
---

# Shopify Theme Widget Installer

Use this skill when the task touches Shopify theme files or storefront widget installation.

## Safe Install Pattern

Prefer:

- small Liquid snippet
- public loader JavaScript
- optional CSS asset
- one render hook near `</body>`
- public endpoint/config metafields

Avoid large Custom Liquid blocks and broad global theme edits unless there is a clear reason.

## Required Workflow

1. Confirm target store and theme.
2. Prefer a development theme.
3. Pull or read current theme files before editing.
4. Inspect existing snippets/assets/layout.
5. Show exact intended changes before pushing.
6. Confirm no secrets in Liquid or public JavaScript.
7. Use targeted push when possible.
8. Use no-delete behavior when possible.
9. Verify desktop and mobile.
10. Provide rollback or disable steps.

## Push Shape

Use explicit store and theme:

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

Adjust file names to the project. If the render hook was added through Shopify Admin, do not push `layout/theme.liquid`.

## Browser-Side Safety

Widget code may include:

- public backend endpoint
- enabled flag
- title/color/copy
- safe storefront context

Widget code must not include:

- LLM keys
- Shopify Admin tokens
- client secrets
- database URLs
- service account credentials

## Verification

Check:

- widget appears only where intended
- widget calls the backend endpoint
- support handoff works
- mobile layout is usable
- disable path works
- rollback is clear
