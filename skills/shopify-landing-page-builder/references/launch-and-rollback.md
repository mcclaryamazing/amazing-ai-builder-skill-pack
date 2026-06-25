# Launch And Rollback

Use this reference before theme pushes, Admin API mutations, live preview, final QA, launch approval, disable paths, or rollback planning.

## Safety Pass

Before any deploy, theme push, or Admin API mutation in the target Shopify repo:

1. Read `deploy.md` or `DEPLOY.md` if present.
2. Run `git status --short`.
3. If there is uncommitted work, list exactly what changed and ask whether it should be included before deploying or mutating Shopify state.
4. Never print `.env` values, Theme Access passwords, client secrets, Admin tokens, or access tokens.
5. Use Shopify Theme Access plus Shopify CLI for theme files.
6. Use Shopify Dev Dashboard app plus Admin GraphQL for pages, products, files, discounts, publications, navigation, redirects, metafields, metaobjects, and other store data.
7. Use targeted theme pushes with `--nodelete` and explicit `--only` paths.
8. Pull back changed theme files after every push when possible and verify remote code.
9. Use real browser QA for live storefront verification.
10. Do not place real test orders.

If uncommitted work exists, do not assume it should be excluded from deployment. Excluding dirty work can remove deployed functionality that has not yet been committed.

## Access Rails

Keep these separate:

```text
Theme rail:
  Shopify Theme Access app + Shopify CLI
  Used for sections, snippets, assets, templates, layouts, and theme code.

Admin API rail:
  Shopify Dev Dashboard app + Admin GraphQL client credentials
  Used for pages, products, files, discounts, metafields, metaobjects, menus, redirects, inventory, and publications.
```

Do not treat a Theme Access password as a general Admin API token. Do not rely on long-lived Admin tokens for new tooling when client credentials are available.

## Targeted Theme Push

Always push the smallest intended file set:

```powershell
npx -y @shopify/cli@latest theme push `
  --store your-store.myshopify.com `
  --theme 123456789 `
  --path .\shopify-landing-page-upload `
  --nodelete `
  --allow-live `
  --password "$token" `
  --only "sections/landing-page.liquid" `
  --only "assets/landing-page.css" `
  --only "assets/landing-page.js" `
  --only "templates/page.landing-page.json"
```

Rules:

```text
Use --nodelete.
Use --only.
Use the real theme ID.
Use --allow-live only after the safety pass.
Do not full-sync the live theme unless explicitly approved.
Never print the token.
```

For live themes, include `--allow-live` only after approval and only with targeted paths.

## Pull-Back Verification

After pushing, pull the same files into a verification folder and inspect them:

```powershell
npx -y @shopify/cli@latest theme pull `
  --store your-store.myshopify.com `
  --theme 123456789 `
  --path .\shopify-verify `
  --password "$token" `
  --nodelete `
  --only "sections/landing-page.liquid" `
  --only "assets/landing-page.css" `
  --only "assets/landing-page.js" `
  --only "templates/page.landing-page.json" `
  --force
```

Create the pull-back target directory before running `theme pull` if the CLI requires it.

## Template-Specific Theme Chrome

If a standalone landing page should not show the normal Shopify header/menu, do not hide the Header section in the Theme Editor. Theme Editor visibility toggles can hide global sections across the site.

Instead, condition the global header render in `layout/theme.liquid` by template suffix:

```liquid
{% unless template.suffix == 'landing-template-suffix' %}
  {% sections 'header-group' %}
{% endunless %}
```

If the original header line differs, preserve it exactly inside the wrapper. Push only `layout/theme.liquid` with `--nodelete` and `--only`, then verify both the landing page and normal pages.

## Live Preview Approval

Before live preview or launch, show:

- store domain
- development theme ID and live theme ID
- exact files to be changed
- exact Admin API mutations to run, if any
- confirmation that no secrets are in the files
- product/variant/bundle/page IDs or handles being changed
- disable switch or fastest disable path
- rollback steps

Ask for explicit approval before enabling a landing page on a live theme or changing live store data.

## Final QA Checklist

Before calling work complete:

```text
deploy docs read
git status checked
uncommitted work reported and inclusion confirmed before deploy
theme push used --nodelete and --only
pull-back confirms remote code
Admin API mutations have no userErrors
template suffix is correct
images load from Shopify Files
CSS and JS load from theme assets
metadata and social tags are correct
CTAs point to correct product, variant, cart, checkout, quiz, form, or collection path
mobile layout works
desktop layout works
no horizontal overflow
text is readable
header/footer/app chrome is correct
meaningful image zoom works
sticky CTA behavior is correct
normal pages still work after layout changes
test cart state is restored
no real order was placed
rollback or disable path is documented
```

Before final screenshots, scroll the live page from top to bottom and back to top to trigger lazy-loaded images, reveal animations, counters, sticky CTAs, and intersection observers.

## Disable And Rollback

Prefer at least one fast disable path:

```text
unpublish the Shopify Page
switch the page to a safe template
remove the landing-page navigation/ad destination
revert the template suffix on the page
remove or disable a landing-page-specific render condition
restore previous theme files from git or pull-back backup
disable campaign/product offer products
disable discount codes or automatic discounts
pause ads or redirect campaign traffic
```

For theme files, keep the previous local file or git commit available. For Admin API mutations, record the previous page handle/template, product status, discount status, metadata values, and publication state before changing them when possible.

## Common Launch Fixes

```text
Unstyled page:
  Confirm CSS exists in theme assets and section loads it with asset_url | stylesheet_tag.

Missing images:
  Confirm exact Shopify Files filenames and file_url references.

Section unavailable in Theme Editor:
  Confirm the section has valid schema and preset.

Header/footer disappeared everywhere:
  Undo global section hiding and use a template.suffix layout condition.

Checkout goes to cart:
  Confirm hidden return_to is /checkout.

Add-to-cart fails:
  Confirm hidden id is a variant ID, not a product ID.

Metadata stale:
  Pull back theme file, verify Admin values, use cache-busted or preview URLs.

Blank screenshot bands:
  Scroll through the page before recapturing.
```
