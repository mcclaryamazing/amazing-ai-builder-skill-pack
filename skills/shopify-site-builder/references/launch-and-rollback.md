# Launch And Rollback

Use this reference before theme pushes, Admin API mutations, live preview, final QA, launch approval, disable paths, or rollback planning.

## Safety Pass

Before any deploy, theme push, or Admin API mutation in the target Shopify repo:

1. Read `deploy.md` or `DEPLOY.md` if present.
2. Run `git status --short`.
3. Review uncommitted work. Treat current-task changes as in scope for build, test, commit, deploy, and authorized Shopify mutations. Ask only about pre-existing, unrelated, or uncertain work.
4. Never print `.env` values, Theme Access passwords, client secrets, Admin tokens, or access tokens.
5. Use Shopify Theme Access plus Shopify CLI for theme files.
6. Use Shopify Dev Dashboard app plus Admin GraphQL for pages, products, collections, files, discounts, publications, navigation, redirects, metafields, metaobjects, and other store data.
7. Use targeted theme pushes with `--nodelete` and explicit `--only` paths.
8. Pull back changed theme files after every push when possible and verify remote code.
9. Use real browser QA for live storefront verification.
10. Do not place real test orders.

If uncommitted work exists, do not assume it should be excluded from deployment. Excluding dirty work can remove deployed functionality that has not yet been committed.

## Targeted Theme Push

Always push the smallest intended file set:

```powershell
npx -y @shopify/cli@latest theme push `
  --store your-store.myshopify.com `
  --theme 123456789 `
  --path .\shopify-site-upload `
  --nodelete `
  --allow-live `
  --password "$token" `
  --only "templates/index.json" `
  --only "templates/product.custom.json" `
  --only "templates/collection.custom.json" `
  --only "sections/site-hero.liquid" `
  --only "snippets/site-product-card.liquid" `
  --only "assets/site-system.css"
```

Rules:

```text
Use --nodelete.
Use --only.
Use the real theme ID.
Use --allow-live only after the safety pass.
Do not full-sync the live theme unless explicitly approved and reconfirmed.
Never print the token.
```

## Pull-Back Verification

After pushing, pull the same files into a verification folder and inspect them:

```powershell
npx -y @shopify/cli@latest theme pull `
  --store your-store.myshopify.com `
  --theme 123456789 `
  --path .\shopify-site-verify `
  --password "$token" `
  --nodelete `
  --only "templates/index.json" `
  --only "templates/product.custom.json" `
  --only "templates/collection.custom.json" `
  --only "sections/site-hero.liquid" `
  --only "snippets/site-product-card.liquid" `
  --only "assets/site-system.css" `
  --force
```

Create the pull-back target directory before running `theme pull` if the CLI requires it.

## Admin API Mutation Review

Before running Admin API mutations, show:

```text
mutation purpose
target store
target IDs or handles
fields being changed
previous values when known
expected new values
rollback value or disable path
required scopes
```

Always inspect `userErrors`. Do not report success until the mutation response and follow-up query confirm the change.

## Live Preview Approval

Before live preview or launch, show:

- store domain
- development/copied preview theme ID and live theme ID
- exact files to be changed
- exact Admin API mutations to run, if any
- confirmation that no secrets are in files
- product, variant, collection, page, menu, redirect, metafield/metaobject, or discount IDs/handles being changed
- disable switch or fastest disable path
- rollback steps

Ask for explicit approval before enabling full-site changes on a live theme or changing live store data.

## Final QA Checklist

Before calling work complete:

```text
deploy docs read
git status checked
uncommitted work reviewed; only pre-existing, unrelated, or uncertain work requires a scope decision before deploy
theme push used --nodelete and --only
pull-back confirms remote code
Admin API mutations have no userErrors
homepage works
product template works
collection template works
standard page works
navigation and menus work
cart or cart drawer works when affected
checkout path works without placing an order
images load from Shopify Files
CSS and JS load from theme assets
metadata and social tags are correct
structured data/schema is preserved where relevant
redirects work when URLs changed
mobile layout works
desktop layout works
no horizontal overflow
text is readable
header/footer/app chrome is correct
meaningful image zoom works
filters/sorting/pagination work
sticky/floating elements do not block controls
normal pages still work after shared changes
test cart state is restored
rollback or disable path is documented
```

Before final screenshots, scroll changed pages from top to bottom and back to top to trigger lazy-loaded images, reveal animations, counters, sticky elements, and intersection observers.

## Disable And Rollback

Prefer at least one fast disable path:

```text
switch changed templates back to previous templates
restore previous theme files from git or pull-back backup
remove or disable a new section from template JSON
revert navigation/menu changes
unpublish or revert changed pages
restore previous product/collection status, template, or metadata
disable discount codes or automatic discounts
restore redirects or handles
pause ads or redirect campaign traffic
```

For theme files, keep previous local files or git commits available. For Admin API mutations, record previous handles, templates, statuses, publication state, metadata, menu items, redirects, metafields/metaobjects, discount status, and product/collection membership before changing them when possible.

## Common Launch Fixes

```text
Unstyled page:
  Confirm CSS exists in theme assets and the section/layout loads it with asset_url | stylesheet_tag.

Missing images:
  Confirm exact Shopify Files filenames and file_url references.

Section unavailable in Theme Editor:
  Confirm the section has valid schema and presets/settings.

Product form breaks:
  Restore the theme's product form structure and variant input behavior.

Collection filters disappear:
  Restore the theme's filter/sort snippets or section settings.

Header/footer disappeared everywhere:
  Undo global section hiding and use template-specific conditions only when approved.

Checkout goes to cart:
  Confirm hidden return_to is /checkout when direct checkout is intended.

Metadata stale:
  Pull back theme file, verify Admin values, use cache-busted or preview URLs.

Blank screenshot bands:
  Scroll through the page before recapturing.
```
