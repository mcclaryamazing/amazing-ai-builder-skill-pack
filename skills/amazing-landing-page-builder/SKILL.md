---
name: amazing-landing-page-builder
description: "Design, audit, rewrite copy for, build, and safely launch DTC Shopify landing pages. Use for standalone conversion strategy, headlines, page copy, desktop/mobile wireframes and audits, or a guided Shopify theme implementation and launch. Includes advertorial/listicle, offer, bundle, quiz, subscription, collection, lead-capture and eligible PDP work."
---

# Amazing Landing Page Builder

## Startup version check

Before substantive work, follow `references/skill-updates.md`. Stable update key: `shopify-landing-page-builder`. Check the repository this installation came from, automatically update a verified unmodified copy, and obtain explicit approval before a rename.


Use this as the single entrypoint for DTC landing-page strategy, design, audits, copy rewrites and Shopify implementation. Match the workflow to the requested deliverable; a design or audit request does not authorize a store build or launch. For an end-to-end build, guide the member through strategy, design, Shopify implementation, QA and launch.

## Requested Scope

- **Full build:** use both phases below, a visible progress tracker and the relevant access, implementation and release gates.
- **Standalone design or wireframe:** produce the complete DTC design package and rendered placeholder-only desktop/mobile wireframe, including independent review. End with the design deliverable and any implementation handoff; do not require Shopify credentials, app installation, theme setup or deployment.
- **Audit:** inspect the supplied copy, artifacts or page, use the relevant strategy/category/copy guidance and current QA rubric, and return evidence-backed findings and prioritized corrections. Remain read-only unless edits are requested. State what could not be inspected; do not create a replacement wireframe or claim live QA when only copy was supplied.
- **Copy rewrite or headline work:** preserve the requested page/section boundary and actual offer. Return finished copy and relevant headline alternatives, with separate factual questions only when essential; use the strategy/copy references without forcing a full-page design package, wireframe, onboarding or launch.

The full-design, wireframe, progress and completion requirements below apply to full builds and standalone page designs. For audits and limited copy work, apply only the requirements relevant to that deliverable. Read implementation/access/launch references only when that work is in scope. Current entrypoint and maintained references govern. Use the targeted design-example routes in `references/source-guide-index.md` when selecting category art direction, component layouts or shopping interactions; open only the relevant archived section, not the entire guide. Historical workflow, scoring and mandatory-content instructions do not override the current rules.

Internally, treat the work as two phases:

```text
Phase 1: DTC design package
Phase 2: Shopify implementation and launch
```

The DTC design package is the creative and conversion source of truth. Shopify implementation should reproduce it faithfully in real theme files, documenting any deviation caused by a hard Shopify, product-data, compliance, asset, or access constraint.

## Local Execution Readiness

For full-workflow onboarding, use the complete storefront access profile in `references/access-setup.md`, including product and discount writes. A setup-only test limits actions, not the agreed app capability. Keep authorization for actual store mutations separate from granted permissions.

For authorized access setup or Shopify implementation in a new store folder or unverified environment, read `references/access-setup.md` first. This skill bundles its own design and Shopify references; separate DTC and storefront-ops skills are not required. Establish actual local file, command and browser access, rather than inferring capability from the assistant model name or a shared Codex runtime label.

## First Response Contract

For full builds and standalone page designs, in the first response:

1. Inspect the current folder before advising.
2. State where the user is in the landing-page journey.
3. Show a visible progress tracker limited to the requested scope; a standalone design ends at the reviewed wireframe.
4. Explain the immediate goal in plain English.
5. Ask only for inputs that materially affect the page or next safe action.

Use a tracker like:

```text
Shopify Landing Page Build Progress
[ ] 1. Understand the product, audience, offer, and traffic source
[ ] 2. Inspect the Shopify repo, theme setup, and launch constraints
[ ] 3. Create full strategy, copy and placeholder-only wireframe
[ ] 4. Internally review and approve the wireframe before final imagery
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
- one full-design process with long-form substantive copy and a placeholder-only wireframe first
- a mobile-first, shoppable DTC page with a clear product explanation and relevant available proof
- a DTC design spec before theme implementation
- exact image placeholders in every first-wireframe slot, even when assets already exist
- real Shopify theme files, not a large Custom Liquid paste-in
- Shopify Files for merchant-facing product, hero, lifestyle, proof, offer, and social-preview images
- backend/Admin API or Shopify CLI automation only after access is verified
- development theme or private preview before live launch
- launch only after QA, approval, and rollback are clear

Do not create a generic homepage unless the user specifically asks for one.
Unless the user states otherwise, assume Meta paid-social cold prospecting. Treat the visitor as having low or unexpressed commercial intent before the ad interrupted their feed. State the assumption in the strategy output and let the user override it without blocking the first draft.

For the default cold Meta case, use a transparent, brand-owned advertorial/listicle as the destination archetype. Continue the ad's hook, promise, and reason for the click; use substantive numbered reasons, introduce the product early enough to preserve trust, and keep the offer and response path accessible. Use another destination only when a concrete response-path requirement, explicit user direction, or strong ad-message continuity makes it a compellingly stronger fit; PDP still requires explicitly identified retargeting and the last-choice comparison. Record whether the listicle default was retained or overridden and, when overridden, the specific rationale.

Whenever archetypes are enumerated, list `advertorial_listicle` first and `pdp_direct_response` last. Do not let a neutral option list imply PDP priority.

A PDP is eligible only for explicitly identified retargeting traffic. Consider it last, after the long-form listicle and relevant specialized destinations, and select it only when a documented comparison clearly shows it is the strongest fit. Search, Shopping, product awareness, existing-customer status, a discount, subscription, configuration or a named SKU does not independently qualify. PDP variants and hybrids follow this same gate.

## Product Desire Before Promotional Preference

For cold-traffic advertorials/listicles, organize the argument around why the reader would want the product: the relevant problem or existing desire, practical and emotional benefits, how the product helps, and credible reasons to believe it. Before drafting, answer: **"Without the discount or bonus, why would this person still want this product?"** Use that answer to guide the headline and section sequence; label inferred audience motivations as hypotheses in the strategy, not established customer research.

Price, discounts, pack sizes and bonuses normally support that argument. Their presence in the brief does not make them the editorial angle. Lead with a promotion only when the user explicitly requests it or the supplied campaign establishes it as the reason for the click; record that basis in the strategy. This governs persuasive emphasis, not disclosure timing: identify the product early, make material purchase terms clear where needed, and keep the offer and response path accessible.

Each numbered reason must advance a meaningfully different reason to care, believe or choose. Bundle quantities alone are not reasons; explain their practical relevance when grounded in the product and audience context. Do not append a reasons section to an otherwise promotion-led page and call it a product-desire argument.

## Full Design Process

Default to long-form, substantive copy, especially for cold-traffic listicles and advertorials. Develop the argument rather than merely summarizing benefits: a headline and short benefit statement may introduce a reason without adequately developing it. Give useful reasons enough space to build desire, understanding and belief through relevant product details, practical implications, supported explanations, relatable use situations, available evidence and meaningful objections. These are options, not mandatory subsections. Several paragraphs can deepen one benefit without requiring a new benefit or fact in every paragraph.

Limited evidence constrains what can be claimed; it does not automatically require minimal copy. Expand through truthful explanation of known facts, not invented specifications, mechanisms, statistics, testimonials, histories or outcomes. Illustrative situations must not masquerade as actual customer experiences or imply unsupported capabilities.

Distinguish purposeful reinforcement from unnecessary repetition. Repeat a benefit, claim, explanation or purchase detail when its placement serves a specific persuasive or usability purpose: connecting proof to a promise, reinforcing the central idea, supporting scanning, answering a different objection, recapping the argument or helping at a purchase point. Even exact wording may earn its place without a new fact. Ask: **"What does this recurrence accomplish here, and what would the reader lose if it were removed?"** Combine or remove repetition that merely occupies space, interrupts momentum or restates a point without useful purpose; never cut solely because the idea appears elsewhere.

Framework components do not automatically deserve separate sections. Let the useful argument determine length and the number of reasons; do not impose word counts, reason quotas or filler. Choosing an overall short-form design instead of the long-form default still requires relevant performance evidence and a recorded rationale for this product, audience, traffic and offer. This is a design preference, not a claim that long copy always converts better. These depth and reinforcement rules govern the maintained references and any supporting copywriting guidance used in this builder workflow.

Use the complete strategy, copy, section and QA process for every new full-page design. For audits and limited copy work, use the relevant parts without expanding the deliverable. Ask only for missing decisions that materially change the page; keep assumptions and essential factual questions in the specification. Research unresolved product or offer questions when they affect the proposed argument or purchase path. Fresh external brand exemplars are optional, never a prerequisite.

## Wireframe And Image Approval

The first design deliverable is an actual rendered, reviewable full-page desktop/mobile wireframe artifact (for example local HTML), not merely a JSON spec or slot list with substantive page copy and exclusively image placeholders, even when existing images are available. Define the ideal image for every slot from its persuasive purpose, not from the asset inventory: subject/action, product truth, composition, placement, aspect ratio, target pixel dimensions, desktop/mobile crop and safe areas, alt text and planned filename. Existing product information may inform factual accuracy; do not select, generate or insert final imagery yet.

Internally review the rendered desktop/mobile wireframe against the strategy and QA rubric. As the final step before delivering it to the user, run the independent conversion editor and remediation gate in `references/final-wireframe-review.md`; resolve accepted findings and verify the affected rendering before presenting the wireframe for approval. Explicit end-to-end authorization may waive this conversational pause; record that authorization, but still create the wireframe artifact and complete its internal review before imagery work. Otherwise stop at this approval gate. Afterward, propose existing images only when they fit the approved ideal slot; explain the fit or gap and generate/source replacements when needed. Do not redesign ideal slots to accommodate convenient assets.

## Customer-Facing Copy Gate

Deliver persuasive, finished copy. Local preview, standalone HTML and selection-demo requests describe implementation behavior; default to the intended finished customer experience unless a visibly labeled prototype is explicitly requested. Local prototype controls may use the intended purchase-action label with truthful immediate demo feedback, even though the purchase connection is pending; this is a scoped exception to matching the actual next step. Published purchase controls must perform their stated action. Put missing connections and setup instructions in the seller handoff. Use supplied facts confidently and translate features into practical and emotional benefits. Handle factual checks in the background. Include proof modules, terms, certifications, qualifications, FAQs and risk reversal when relevant and available, not to fill mandatory slots. If a missing fact is essential to the proposed page or purchase decision, ask a focused question or flag it briefly outside customer-facing copy; otherwise omit the unsupported statement or write around the gap. Do not invent facts. This operating rule governs the bundled copy guidance and any archived examples; use the available Amazing Copywriter skill when requested or required by project instructions without requiring a separate installation.

Every customer-facing passage must advance or purposefully reinforce desire, understanding, belief or action, resolve a meaningful remaining purchase question, or provide necessary purchase guidance, accessibility or seller-supplied or approved disclosures. Add explanatory microcopy only for a specific ambiguity or material condition that remains after the actual offer presentation; internal verification and information already clear elsewhere do not require another explanation. Keep seller instructions, strategy labels, placement rationale, production notes, review comments and verification requests in separate specification/review documents, never in page copy. The only page exception is the prescribed image-production guidance inside designated image placeholders; do not use them to hide unrelated seller notes.

Disclosure selection and legal adequacy belong to the seller. Preserve supplied or seller-approved disclosures; do not add generic disclaimers, precautionary legal sections or a disclosure checklist to the page by default. Flag a concrete potential gap in the separate seller review notes for their decision; do not treat speculative disclosure concerns as automatic delivery blockers. This does not permit invented claims, misleading omissions or unclear material offer terms.

Unknown claims and terms must not become page text such as "[Confirm shipping terms]" or "[Insert testimonial]". Omit the unsupported statement or rewrite it using available facts. Record only unresolved essential gaps and their specific consequence separately. A gap blocks launch only when it leaves a material statement unsupported in the proposed published page or prevents an honest purchase decision; missing optional proof or unused terms are not blockers. These rules govern placeholder guidance throughout the maintained references and archive.

Before delivery, perform the explicit customer-facing copy sweep in `references/final-wireframe-review.md`; a violation fails acceptance regardless of the total QA score. Apply it to the requested scope for audits and limited copy work without forcing a full wireframe. Recheck the implemented page before launch.

## Readiness Ladder

1. Brief ready: enough product, audience, actual offer, traffic and CTA context is available to draft; relevant proof/assets are inventoried and essential missing facts are noted separately.
2. Strategy ready: page archetype, big idea, copy strategy, section sequence, offer stack, proof stack, CTA mode, metadata direction, and image-slot plan are drafted.
3. Wireframe reviewed: full-copy desktop/mobile artifact uses only image placeholders; internal review is complete. User approval or an explicit end-to-end waiver of the pause is recorded before final imagery. Only unresolved essential gaps under the Customer-Facing Copy Gate remain factual launch blockers.
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
- Keep essential factual questions separate from finished copy, and omit nonessential gaps. Apply the Customer-Facing Copy Gate to the rendered page.

## Design Phase Rules

Read `references/dtc-design-package.md` before producing the strategy/spec.

Produce the full design package and wireframe, using the archetype, category, component, visual/copy and QA references relevant to the product. Use the restored optional design details and targeted archive routes for the selected category/components; adapt them to the brand rather than copying a template. Label assumptions; deepen research where needed.

Create a Shopify-bound design package that includes:

- recommended destination archetype, persuasion architecture, rationale, rejected alternatives, listicle-default status and override rationale, and PDP eligibility decision
- full-design rationale, product-desire answer without the promotion, any promotion-led opening rationale, long-copy development plan and any evidence-supported shorter-copy exception
- audience, awareness level, traffic source, campaign stage, ad angle, click motivation, work already completed by the ad, ad/message match, and primary conversion goal
- derived strategy labels: confidence label, education need, proof need, risk reversal need, comparison need, CTA mode, offer strength, claim sensitivity, and sticky CTA need
- copy strategy packet applying the master-copywriter principles in references/dtc-visual-copy-system.md in the brand's own voice, with one concrete product-specific big idea and an explicit headline bank
- message-family routing when multiple ads are supplied, mapping each materially different promise to its page or opening
- section-by-section sequence with copy, CTAs, offer/proof logic, and mobile notes
- separate notes for unresolved essential factual questions, if any
- exact image-slot plan with role, placement, aspect ratio, target dimensions, crop behavior, planned Shopify Files filename, alt text, and zoom recommendation
- SEO/browser title, meta description, social preview copy, and social preview image direction
- conversion readiness score or punch list
- handoff note that Shopify implementation must reproduce the approved spec faithfully

The hero must make the product, meaningful benefit and next action clear quickly, with the actual offer and relevant proof where useful. The CTA label must match the real next step, such as `Add to Cart`, `Select Size`, `Choose Flavors`, `Build Your Bundle`, `Take the Quiz`, `Customize`, `Verify Eligibility`, or `Get My Sample`.

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

For campaign-only fixed-price bundle parents, keep the products natively
`UNLISTED`, publish them to the intended storefront and every active geographic
Market required by the page's declared traffic countries, and exclude unrelated
app channels. Online Store publication by itself does not prove that checkout
can sell the offer in a target country. Before calling the private preview
ready, verify both Shopify publication representations, MARKET-filtered
publications, `publishedInContext=true` for every target country, and the real
cart-to-checkout path without placing an order.

For the first wireframe, render exact visible placeholders in every image slot, regardless of available assets:

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
3. Review uncommitted work. Treat current-task changes as part of the requested scope and proceed through build, test, commit, deploy, and Shopify mutations without another confirmation. Ask only when changes are pre-existing, unrelated, or of uncertain ownership or scope; never silently discard, revert, or exclude them.
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
- `references/source-guide-index.md` for targeted archived examples while selecting category art direction, component layouts or shopping interactions; consult the matching section when an example helps make the choice concrete. It is not necessary to load the full archive. Current maintained rules take precedence.
- `references/dtc-design-package.md` before creating or reviewing strategy, copy, section sequence, offer/proof architecture, image slots, metadata, or the final design package.
- `references/dtc-derived-strategy.md` when choosing design depth, derived strategy labels, CTA mode, confidence label, sticky CTA need, or additional research guidance.
- `references/dtc-archetypes.md` when selecting or validating advertorial/listicle, educational, offer, subscription, bundle, quiz, collection, lead-capture, or PDP structure.
- `references/dtc-category-packs.md` when the category has specific buying friction such as apparel fit, supplement claims, home dimensions, pet/baby safety, wellness tech proof, outdoor specs, or custom-product confidence.
- `references/dtc-components.md` when shaping sections, component props, sticky CTA behavior, comparison tables, review summaries, cross-sells, or email capture.
- `references/dtc-visual-copy-system.md` when choosing visual direction, design tokens, headline patterns, CTA microcopy, FAQ topics, or copy modules.
- `references/dtc-qa-rubric.md` before approving the design package for Shopify implementation or when a draft feels weak, generic, risky, or unnecessarily repetitive.
- `references/access-setup.md` when Theme Access, Shopify CLI, a development theme, Dev Dashboard app credentials, Admin API scopes, or access verification are missing or uncertain.
- `references/shopify-implementation.md` before creating or changing Shopify theme files, page templates, Shopify Files images, product/variant/cart wiring, metadata, or local implementation previews.
- `references/product-image-production.md` after the wireframe/image approval gate, before final-image reference selection or production. Use the available Fidelity First Product Photography skill; otherwise use the bundled distilled framework.
- `references/launch-and-rollback.md` before theme pushes, Admin API mutations, live preview, final QA, launch approval, disable paths, or rollback.

## Completion Gate

For full builds, verify the applicable items below before calling the landing page complete. A standalone design ends at its reviewed design/wireframe handoff; an audit or copy rewrite ends with its requested findings or copy and relevant verification. Do not report unperformed implementation, deployment or live QA as complete.

Full-build checks:

- the approved DTC design spec is still the source of truth
- any deviation from the spec is documented
- the design rationale is clear and any Assumptions are labeled
- the traffic source and campaign stage are explicit; absent contrary input, they are Meta paid social and cold prospecting
- the opening continues the ad promise and reason for the click when one exists
- the cold Meta listicle default is either retained or overridden with a concrete strategic or functional rationale
- the persuasion architecture matches the ad angle, awareness level, and work already completed by the ad
- a PDP is selected only for explicitly identified retargeting and clearly wins the recorded comparison as the last choice
- derived strategy labels and confidence label are present
- material statements and purchase details actually used on the page are accurate; unresolved essential gaps are fixed or clearly identified, and absent optional proof/terms do not force extra content or block readiness
- the first wireframe uses only exact image placeholders; final Shopify Files assets follow the image approval gate
- product, variant, bundle, quiz, lead form, cart, or checkout path matches the CTA
- metadata and social preview tags are page-specific
- desktop and mobile QA passed
- text is readable, no horizontal overflow, no mojibake, and sticky CTA does not block controls or legal copy
- image zoom works for meaningful final images when included
- normal store pages still work if shared layout/theme files changed
- no secrets are in frontend code, Liquid, metafields, docs, screenshots, logs, or commits
- rollback or fast disable path exists
