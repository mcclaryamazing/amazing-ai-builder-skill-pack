# Guided Progress

Use a visible progress tracker throughout the project. The user should always know what step they are on, what just changed, and what comes next.

## Standard Tracker

```text
Shopify Site Build Progress
[ ] 1. Understand the store, catalog, brand, goals, and must-have pages
[ ] 2. Inspect the repo, theme, deploy guide, git status, access, and constraints
[ ] 3. Create the site map, conversion strategy, and page-template plan
[ ] 4. Define the shared theme system, reusable sections, and image plan
[ ] 5. Approve homepage, PDP, collection, content-page, navigation, and data changes
[ ] 6. Build the site surfaces in real Shopify theme files
[ ] 7. Add or update products, collections, pages, menus, metadata, and Shopify Files
[ ] 8. QA desktop, mobile, accessibility, interactions, performance, SEO, and checkout path
[ ] 9. Preview on a development or copied theme and get approval
[ ] 10. Launch only after rollback, monitoring, and live-change approval are clear
```

## Stage Done Signals

1. Store and catalog: brand, audiences, catalog shape, primary goals, must-have pages, proof/assets, constraints, and claim-sensitive areas are known, inferred, or placeholdered.
2. Repo, theme, and access: target repo, deploy guide, git status, Theme Access path, Shopify CLI verification, development/copied theme, Dev Dashboard app, Admin API access path, target theme, and store-specific risks are known.
3. Site blueprint: site map, navigation, homepage plan, PDP plan, collection plan, content-page plan, conversion strategy, metadata direction, and data model are drafted.
4. Theme system: colors, typography, spacing, buttons, cards, forms, product-card rules, section library, image-slot plan, and shared interaction patterns are drafted.
5. Approval gate: the user or owner has approved visible surface changes, data mutations, claims, navigation, product/collection assumptions, and image plan, or remaining unknowns are labeled as launch blockers.
6. Shopify build: intended surfaces exist in real theme files with scoped styling, reusable sections/snippets, and no large Custom Liquid paste-in.
7. Store data and assets: products, collections, pages, menus, redirects, metafields/metaobjects, metadata, and Shopify Files images are created or updated as approved.
8. QA: desktop, mobile, accessibility basics, performance basics, image slots, text readability, interactions, console, metadata, products, collections, cart, and checkout path are checked without placing a real order.
9. Preview: the user can review the site on a development theme, copied preview theme, or private URL with intended images or exact placeholders.
10. Launch: live changes are approved, scoped, reversible, monitored, and documented.

## Communication Pattern

After completing a stage, say:

```text
Step 3 of 10 is complete. You now have a Shopify site blueprint with the site map, page-template plan, navigation direction, and conversion priorities. Next we will define the shared theme system and reusable sections before touching broad theme files.
```

When blocked, say what is blocking progress and give one safe next command or question.

At each stage, ask whether the user already has relevant setup. Reuse verified resources instead of recreating them. Examples include a Shopify site repo, Theme Access, Shopify CLI login, development theme, Dev Dashboard app, client credentials, products, variants, collections, pages, menus, Shopify Files images, metafields, metaobjects, deployment service, or existing preview theme.

If Theme Access, Shopify CLI, a development theme, Dev Dashboard app credentials, or Admin API scopes are missing or uncertain, load `references/access-setup.md` and guide the user through setup before implementation.
