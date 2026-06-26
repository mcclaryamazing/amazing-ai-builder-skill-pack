# Guided Progress

Use a visible progress tracker throughout the project. The user should always know what step they are on, what just changed, and what comes next.

## Standard Tracker

```text
Shopify Landing Page Build Progress
[ ] 1. Understand the product, audience, offer, and traffic source
[ ] 2. Inspect the Shopify repo, theme setup, and launch constraints
[ ] 3. Create the DTC strategy and copy package
[ ] 4. Approve the page structure, claims, offer, product wiring, and image plan
[ ] 5. Build the Shopify page in real theme files
[ ] 6. Add products, images, metadata, and purchase wiring
[ ] 7. QA desktop, mobile, accessibility, interactions, and checkout path
[ ] 8. Preview on a development theme or private page
[ ] 9. Launch only after approval, rollback, and monitoring are clear
```

## Stage Done Signals

1. Product, audience, offer, and traffic source: the agent knows, has inferred, or has explicitly placeholdered the product/category, buyer, traffic source, ad or campaign promise, primary CTA, proof inventory, available assets, brand constraints, and claim-sensitive areas. In Fast Draft Mode, this step can be complete with labeled assumptions and `data_needed_from_merchant` rather than a long intake.
2. Repo and theme setup: the target repo, deploy guide, git status, Theme Access path, Shopify CLI verification, development theme, Dev Dashboard app, Admin API access path, target theme, and store-specific risks are known.
3. DTC strategy and copy package: the archetype, big idea, copy strategy, section sequence, offer stack, proof stack, CTA mode, metadata direction, and exact image-slot plan are drafted.
4. Approval gate: the user or owner has approved the offer, claims, page structure, product wiring assumptions, and image plan, or the remaining unknowns are clearly labeled as launch blockers.
5. Shopify build: the page exists in real theme files, usually section, CSS, JS, and JSON template files, with scoped styling and no large Custom Liquid paste-in.
6. Products, images, metadata, and wiring: CTAs point to the intended product, variant, bundle, quiz, lead form, cart, or checkout path; merchant-facing images use Shopify Files; metadata is page-specific.
7. QA: desktop, mobile, accessibility basics, image slots, text readability, interactions, sticky CTA, console, metadata, and checkout path are checked without placing a real order.
8. Preview: the user can review the page on a development theme, preview URL, or private page with the intended images or exact placeholders.
9. Launch: live changes are approved, scoped, reversible, monitored, and documented.

## Communication Pattern

After completing a stage, say:

```text
Step 3 of 9 is complete. You now have a Shopify-ready DTC design package with the page strategy, copy, section order, CTA plan, and exact image slots. Next we will approve the claims, offer, product wiring, and image plan before touching Shopify theme files.
```

When blocked, say what is blocking progress and give one safe next command or question.

At each stage, ask whether the user already has relevant setup. Reuse verified existing resources instead of recreating them. Examples include a Shopify site repo, Theme Access, Shopify CLI login, development theme, Dev Dashboard app, client credentials, products, variants, discounts, Shopify Files images, landing-page templates, deployment service, or existing preview theme.

If Theme Access, Shopify CLI, a development theme, Dev Dashboard app credentials, or Admin API scopes are missing or uncertain, load `references/access-setup.md` and guide the user through setup before implementation.
