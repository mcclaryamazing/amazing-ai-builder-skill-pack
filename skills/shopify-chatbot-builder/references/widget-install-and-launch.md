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
- development theme first

Avoid large Custom Liquid blocks and broad global theme edits unless there is a clear reason.

## Theme Workflow

Before pushing or editing theme files:

1. Confirm target store and theme.
2. Prefer a development theme.
3. Read the target repo's `deploy.md` or `DEPLOY.md` if one exists.
4. Run `git status --short` in every repo being touched.
5. If uncommitted work exists, list it and ask whether it should be included before excluding it from deploy or theme work.
6. Ask whether a snippet, render hook, widget asset, or Theme Access setup already exists.
7. Pull or read current theme files.
8. Inspect existing snippets, assets, and layout.
9. Reuse existing working files when they match the project.
10. Show exact intended changes.
11. Confirm no secrets in Liquid or public JavaScript.
12. Use targeted push when possible.
13. Use no-delete behavior when possible.
14. Verify desktop and mobile.
15. Provide rollback or disable steps.

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

Before any deploy or Shopify mutation, run `git status --short` in the target repo and any theme repo. If there is uncommitted work, list the files and ask whether that work should be included before deploying, excluding, overwriting, or pushing around it.

Before live enablement, verify:

- protected dashboard and embedded real-store test chat still work
- hosted backend health endpoint works
- existing hosting, storage, deployment, database, or secret-manager resources have been verified when reused
- real Shopify sync works
- server-side AI model calls work
- dashboard acceptance gate passed
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
