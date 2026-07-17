---
name: shopify-site-builder
description: "Plan, build, test, and safely launch a consistent Shopify storefront site with Codex. Use for guided full-site Shopify work involving homepage, product/PDP templates, collection templates, content pages, navigation, theme system, reusable sections, Shopify Files imagery, products/collections/pages data, Theme Access, Dev Dashboard Admin API access, QA, approval, rollback, and progress tracking."
---

# Shopify Site Builder

Use this as the one skill for helping a member build or rebuild a full Shopify site, not only one campaign page. The member should not need to know separate agent-internal specialties. Walk them through site strategy, theme system, surface planning, implementation, QA, and launch in one guided path.

Use `shopify-landing-page-builder` instead when the project is only a single DTC/campaign landing page. Use this skill when the work spans multiple storefront surfaces or when consistency across homepage, PDPs, collections, and content pages matters.

## First Response Contract

In the first response:

1. Inspect the current folder before advising.
2. State where the user is in the full-site journey.
3. Show a visible progress tracker.
4. Explain the immediate goal in plain English.
5. Ask only for inputs that materially affect the site plan or next safe action.

Use a tracker like:

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

Update the tracker after meaningful progress. Use `update_plan` when available, but still explain the user's stage in normal language.

Read `references/guided-progress.md` when you need done signals or progress wording.

## Default Site System

Default to:

- one Shopify store and one coherent storefront system
- Fast Site Draft Mode unless the user asks for deeper planning or the project risk requires it
- a site blueprint before broad theme implementation
- real Shopify theme files, not large Custom Liquid paste-ins
- a shared theme system for colors, type, spacing, buttons, cards, forms, product cards, and image behavior
- reusable sections and templates for homepage, product/PDP, collection, standard page, blog/article, cart, and campaign surfaces when relevant
- Shopify Files for merchant-facing product, lifestyle, category, proof, brand, and social-preview images
- Theme Access plus Shopify CLI for theme files
- Shopify Dev Dashboard app plus Admin GraphQL client credentials for products, collections, files, pages, menus, redirects, metadata, discounts, publications, metafields, and metaobjects
- development theme or copied-current-live-theme preview before live launch
- targeted no-delete theme pushes and explicit approval before live customer-facing changes

## Site Mode Options

Offer depth without forcing a long interview.

```text
Fast Site Draft Mode:
  Use for users who want a practical first site plan and build path quickly.
  Cover the highest-leverage inputs: brand, catalog, audiences, homepage goal, main collections, PDP needs, content pages, navigation, proof/assets, and launch constraints.
  Ask at most 1-3 missing-answer questions before drafting; infer or placeholder the rest.

Guided Site Strategy Mode:
  Use when positioning, catalog architecture, navigation, collection structure, page priority, or proof strategy is unclear.
  Draft a stronger blueprint before build approval.

Deep Storefront Build Mode:
  Use for rebuilds, multi-template launches, high-AOV or claim-sensitive catalogs, subscription/custom/quiz flows, large catalogs, migrations, SEO-sensitive work, or when the user asks for the best possible site.
  Apply full template, data, image, QA, launch, and rollback rigor.
```

Do not block a first draft for missing facts unless the missing fact controls legal/compliance risk, product/variant wiring, price/offer truth, access, deploy safety, or live launch scope.

## Readiness Ladder

1. Store brief ready: brand, catalog shape, audiences, goals, required pages, proof/assets, and constraints are known or explicitly marked as placeholders.
2. Site blueprint ready: site map, navigation, template strategy, reusable sections, content model, image plan, and SEO direction are drafted.
3. Build ready: target repo, deploy guide, git status, Theme Access, Admin API access, theme ID, implementation path, and preview plan are known.
4. Surface ready: homepage, PDP, collection, content-page, cart/checkout-adjacent, and navigation changes are implemented or intentionally out of scope.
5. Preview ready: the site works on a development or copied preview theme with desktop/mobile QA.
6. Launch ready: live changes are scoped, reversible, approved, monitored, and documented.

## Beginner-Friendly Working Style

- Explain each risky step in plain English.
- Give one safe next command when the user is blocked.
- Inspect the real repo before advising.
- Reuse existing setup when the user already has it. Verify existing themes, apps, credentials, products, collections, pages, Shopify Files, menus, deployment paths, and docs before proposing replacements.
- Warn before installs, theme pushes, Admin API mutations, product changes, collection changes, menu changes, discount changes, metadata changes, deploys, deletes, or live customer-facing changes.
- Keep `.env` files ignored and never ask the learner to paste secrets into chat.
- Use placeholders for missing facts instead of inventing review counts, guarantees, discounts, urgency, certifications, testimonials, clinical claims, shipping terms, inventory, or SEO claims.

## Planning Phase Rules

Read `references/site-strategy-and-architecture.md` before producing the site blueprint.

Create a Shopify-bound site blueprint that includes:

- selected mode and why it is enough for the current request
- brand position, audiences, catalog structure, conversion goals, and constraints
- site map and navigation plan
- homepage role, section sequence, proof plan, merchandising plan, and content requirements
- product/PDP template plan including product form, variants, media, proof, specs, FAQ, recommendations, and cross-sells
- collection template plan including filtering, sorting, product cards, merchandising, collection copy, and internal links
- content-page/blog/page plan for About, FAQ, contact, policy/support, guides, articles, and other requested pages
- shared theme system and reusable section inventory
- data plan for products, collections, pages, menus, redirects, metafields/metaobjects, metadata, and Shopify Files
- exact image-slot plan with role, placement, aspect ratio, target dimensions, planned Shopify Files filename, alt text, and zoom recommendation
- SEO and social preview direction
- launch blockers, assumptions, and QA punch list

## Implementation Phase Rules

Read `references/theme-system-and-implementation.md` before creating or changing Shopify theme files, products, collections, pages, menus, images, metadata, or purchase wiring.

If Theme Access, Shopify CLI, a development theme, or the Shopify Dev Dashboard Admin API app are missing or unverified, read `references/access-setup.md` before implementation. Guide the user through setup in plain English, reuse existing setup when safe, and never ask them to paste secrets into chat.

Read `references/surface-playbooks.md` for the specific surface being built: homepage, product/PDP, collection, content page, blog/article, cart, or campaign page.

Prefer real theme surfaces:

```text
templates/index.json
templates/product.<suffix>.json
templates/collection.<suffix>.json
templates/page.<suffix>.json
sections/<site-or-surface-section>.liquid
snippets/<shared-component>.liquid
assets/<site-system>.css
assets/<surface-or-interaction>.js
```

Use scoped CSS and preserve Shopify-native behavior. Do not break product forms, variant selection, price/availability display, filters, sorting, pagination, cart updates, checkout links, app blocks, or global theme settings unless the user explicitly approves that change.

## Safety And Launch Rules

Before any deploy, theme push, or Admin API mutation in the target Shopify repo:

1. Read `deploy.md` or `DEPLOY.md` if present.
2. Run `git status --short`.
3. Review uncommitted work. Treat current-task changes as part of the requested scope and proceed through build, test, commit, deploy, and Shopify mutations without another confirmation. Ask only when changes are pre-existing, unrelated, or of uncertain ownership or scope; never silently discard, revert, or exclude them.
4. Never print Theme Access passwords, Shopify CLI tokens, client secrets, Admin tokens, AI keys, or `.env` contents.
5. Use targeted Shopify CLI pushes with `--nodelete` and explicit `--only` paths.
6. Pull back changed theme files after pushes when possible and inspect the remote code.
7. Verify live storefront behavior in a real browser, preferably the user's Chrome session when available.

Read `references/launch-and-rollback.md` before theme pushes, Admin API mutations, live preview, final QA, launch approval, disable paths, or rollback.

Never touch live Shopify theme files without reading current files, showing intended changes, using a development or copied preview theme first when possible, using targeted no-delete pushes, providing rollback, and getting explicit approval.

## References

Read only the reference needed for the current stage:

- `references/guided-progress.md` for the progress tracker, readiness ladder, and done signals.
- `references/site-strategy-and-architecture.md` before creating or reviewing the full-site blueprint, site map, navigation, template plan, content model, or shared theme system.
- `references/access-setup.md` when Theme Access, Shopify CLI, a development theme, Dev Dashboard app credentials, Admin API scopes, or access verification are missing or uncertain.
- `references/theme-system-and-implementation.md` before creating or changing Shopify theme files, reusable sections, snippets, CSS/JS assets, products, collections, pages, menus, images, metadata, or purchase wiring.
- `references/surface-playbooks.md` when building or reviewing homepage, PDP, collection, page, blog/article, cart, or campaign surfaces.
- `references/launch-and-rollback.md` before theme pushes, Admin API mutations, live preview, final QA, launch approval, disable paths, or rollback.

## Completion Gate

Before calling the site complete, verify:

- the approved site blueprint is still the source of truth
- any deviation from the blueprint is documented
- assumptions and launch blockers are labeled
- homepage, PDP, collection, content, navigation, metadata, and cart/checkout-adjacent paths were checked or marked out of scope
- shared theme system and reusable sections are consistent across surfaces
- products, variants, collections, menus, pages, redirects, metafields/metaobjects, metadata, and Shopify Files changes are verified
- claims, proof, offer terms, prices, discounts, guarantees, shipping, and urgency are verified or softened
- missing images use exact placeholders or final Shopify Files assets
- meaningful final images support zoom when useful
- desktop and mobile QA passed
- text is readable, no horizontal overflow, no mojibake, and sticky/floating elements do not block controls or legal copy
- product forms, filters, sorting, pagination, cart updates, and checkout path work without placing a real order
- normal store pages still work if shared layout/theme files changed
- no secrets are in frontend code, Liquid, metafields, docs, screenshots, logs, or commits
- rollback or fast disable path exists
