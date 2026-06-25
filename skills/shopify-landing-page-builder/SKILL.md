---
name: shopify-landing-page-builder
description: "Design, build, test, install, and safely launch high-converting DTC Shopify landing pages with Codex. Use this single guided beginner skill for the full process: store/repo inspection, offer and audience intake, conversion strategy, DTC landing page design spec, copy strategy, exact image-slot plan, Shopify theme-file implementation, Shopify Files imagery, product/variant/cart wiring, page metadata, desktop/mobile QA, launch approval, rollback, and plain-English progress tracking."
---

# Shopify Landing Page Builder

Use this as the one skill for helping a member create a custom Shopify landing page from beginning to end. The member should not need to know separate agent-internal specialties. Walk them through strategy, design, Shopify implementation, QA, and launch in one guided path.

Internally, treat the work as two phases:

```text
Phase 1: DTC design package
Phase 2: Shopify implementation and launch
```

The DTC design package is the creative and conversion source of truth. Shopify implementation should reproduce it faithfully in real theme files, documenting any deviation caused by a hard Shopify, product-data, compliance, asset, or access constraint.

## First Response Contract

In the first response:

1. Inspect the current folder before advising.
2. State where the user is in the landing-page journey.
3. Show a visible progress tracker.
4. Explain the immediate goal in plain English.
5. Ask only for inputs that materially affect the page or next safe action.

Use a tracker like:

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

Update the tracker after meaningful progress. Use `update_plan` when available, but still explain the user's stage in normal language.

Read `references/guided-progress.md` when you need done signals or progress wording.

## Default Landing Page System

Default to:

- one Shopify store and one primary landing-page goal
- a mobile-first, shoppable, proof-backed DTC page
- a DTC design spec before theme implementation
- exact image placeholders when final images are not ready
- real Shopify theme files, not a large Custom Liquid paste-in
- Shopify Files for merchant-facing product, hero, lifestyle, proof, offer, and social-preview images
- backend/Admin API or Shopify CLI automation only after access is verified
- development theme or private preview before live launch
- launch only after QA, approval, and rollback are clear

Do not create a generic homepage unless the user specifically asks for one. For unclear product-specific DTC traffic, default to a direct-response PDP-style landing page.

## Readiness Ladder

1. Brief ready: product, audience, offer, traffic source, primary CTA, proof, assets, and claim boundaries are known or explicitly marked as placeholders.
2. Strategy ready: page archetype, big idea, copy strategy, section sequence, offer stack, proof stack, CTA mode, metadata direction, and image-slot plan are drafted.
3. Design approved: offer, claims, page structure, product wiring assumptions, and image plan are approved or clearly labeled for verification.
4. Build ready: target repo, deploy guide, git status, theme access, Admin API access, theme ID, and implementation path are known.
5. Private preview ready: the page works on a development theme or private URL with desktop/mobile QA.
6. Launch ready: live changes are scoped, reversible, approved, and verified.

Do not call a page ready for Shopify implementation until the design package is good enough to build without redesigning the page.

## Beginner-Friendly Working Style

- Explain each risky step in plain English.
- Give one safe next command when the user is blocked.
- Inspect the real repo before advising.
- Reuse existing setup when the user already has it. Verify existing themes, apps, credentials, products, Shopify Files, deployment paths, and docs before proposing replacements.
- Warn before installs, theme pushes, Admin API mutations, product changes, discount changes, metadata changes, deploys, deletes, or live customer-facing changes.
- Keep `.env` files ignored and never ask the learner to paste secrets into chat.
- Use placeholders for missing facts instead of inventing review counts, guarantees, discounts, urgency, certifications, testimonials, clinical claims, shipping terms, or inventory.

## Design Phase Rules

Read `references/dtc-design-package.md` before producing the strategy/spec.

Create a Shopify-bound design package that includes:

- recommended archetype and rationale
- audience, awareness level, traffic source, ad/message match, and primary conversion goal
- copy strategy with one concrete product-specific big idea
- section-by-section sequence with copy, CTAs, offer/proof logic, and mobile notes
- claim verification notes and placeholders for unverified claims
- exact image-slot plan with role, placement, aspect ratio, target dimensions, crop behavior, planned Shopify Files filename, alt text, and zoom recommendation
- SEO/browser title, meta description, social preview copy, and social preview image direction
- QA score or punch list
- handoff note that Shopify implementation must reproduce the approved spec faithfully

The hero must make the product, promise, proof cue, offer, and next action clear quickly. The CTA label must match the real next step, such as `Add to Cart`, `Select Size`, `Choose Flavors`, `Build Your Bundle`, `Take the Quiz`, `Customize`, `Verify Eligibility`, or `Get My Sample`.

## Implementation Phase Rules

Read `references/shopify-implementation.md` before creating or changing Shopify files, products, pages, images, metadata, or purchase wiring.

If Theme Access, Shopify CLI, a development theme, or the Shopify Dev Dashboard Admin API app are missing or unverified, read `references/access-setup.md` before implementation. Guide the user through setup in plain English, reuse existing setup when safe, and never ask them to paste secrets into chat.

Prefer this structure:

```text
sections/<landing-page>.liquid
assets/<landing-page>.css
assets/<landing-page>.js
templates/page.<template-suffix>.json
```

Use scoped CSS under a unique wrapper. Do not redesign around theme defaults. Detect and neutralize theme bleed only inside the landing-page scope.

Use Shopify Files and `file_url` for merchant-facing landing-page images. Use theme `asset_url` for CSS, JS, fonts, small icons, and code-owned decoration.

When final images are missing, render exact visible placeholders in the final image slots:

```text
IMAGE: <SLOT-ID>
ASPECT RATIO: <RATIO> | SIZE: <WIDTH> X <HEIGHT> PX
Description: <final image description/crop notes>
```

Placeholders should preserve the final slot's desktop/mobile layout, aspect ratio, alignment, crop behavior, and spacing.

## Safety And Launch Rules

Before any deploy, theme push, or Admin API mutation in the target Shopify repo:

1. Read `deploy.md` or `DEPLOY.md` if present.
2. Run `git status --short`.
3. If there is uncommitted work, list exactly what changed and ask whether it should be included before deploying or mutating Shopify state.
4. Never print Theme Access passwords, Shopify CLI tokens, client secrets, Admin tokens, AI keys, or `.env` contents.
5. Use targeted Shopify CLI pushes with `--nodelete` and explicit `--only` paths.
6. Pull back changed theme files after pushes when possible and inspect the remote code.
7. Verify live storefront behavior in a real browser, preferably the user's Chrome session when available.

Read `references/launch-and-rollback.md` before live theme work, final QA, launch approval, or rollback planning.

Never touch live Shopify theme files without:

- reading current files
- showing intended changes
- using a development theme first when possible
- using targeted no-delete pushes
- providing rollback
- getting explicit approval

## References

Read only the reference needed for the current stage:

- `references/guided-progress.md` for the progress tracker, readiness ladder, and done signals.
- `references/dtc-design-package.md` before creating or reviewing strategy, copy, section sequence, offer/proof architecture, image slots, metadata, or the final design package.
- `references/access-setup.md` when Theme Access, Shopify CLI, a development theme, Dev Dashboard app credentials, Admin API scopes, or access verification are missing or uncertain.
- `references/shopify-implementation.md` before creating or changing Shopify theme files, page templates, Shopify Files images, product/variant/cart wiring, metadata, or local implementation previews.
- `references/launch-and-rollback.md` before theme pushes, Admin API mutations, live preview, final QA, launch approval, disable paths, or rollback.

## Completion Gate

Before calling the landing page complete, verify:

- the approved DTC design spec is still the source of truth
- any deviation from the spec is documented
- claims, proof, offer terms, prices, discounts, guarantees, shipping, and urgency are verified or softened
- missing images use exact placeholders or final Shopify Files assets
- product, variant, bundle, quiz, lead form, cart, or checkout path matches the CTA
- metadata and social preview tags are page-specific
- desktop and mobile QA passed
- text is readable, no horizontal overflow, no mojibake, and sticky CTA does not block controls or legal copy
- image zoom works for meaningful final images when included
- normal store pages still work if shared layout/theme files changed
- no secrets are in frontend code, Liquid, metafields, docs, screenshots, logs, or commits
- rollback or fast disable path exists
