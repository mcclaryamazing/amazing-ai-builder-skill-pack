# DTC Design Package

Use this reference before producing or reviewing the strategy, copy, section sequence, image-slot plan, metadata direction, or final Shopify-ready design spec.

This file is the design-phase router. It provides one full-design process, with deeper research where the product needs it. For standalone audits or limited copy rewrites, follow the scope contract in SKILL.md: use relevant guidance and return the requested findings or copy without requiring a full spec, wireframe or Shopify setup.

## Core Philosophy

Default to:

```text
message-matched Meta continuation + transparent listicle by default + visible response path
```

Unless the user states otherwise, assume Meta paid-social cold prospecting. The visitor did not begin with a search query and may not have been shopping for the category before the ad interrupted their feed. Continue the ad's hook and close the remaining belief gap before expecting product-level purchase intent.

The page should answer quickly:

```text
What is this?
Why should I care?
Why this brand/product?
Why now?
Why is it safe to try?
What do I do next?
```

The highest-leverage rule:

```text
Make the first screen continue the reason for the click.
Make the middle close the remaining belief gap.
Make the response path obvious and low-friction.
```

Make the first screen directly shoppable when the selected destination and visitor intent justify it. Otherwise keep purchase access visible without forcing every cold-traffic opening into a PDP buy box.

Do not promise patterns are guaranteed to convert unless the user provides real conversion data. Use language like conversion-oriented, commonly observed among strong exemplars, or likely valuable.

## Full Design Process

Default to long-form, substantive copy: develop each reason with product-specific explanation, mechanism, proof and objections; use scannable sections without stripping the argument. Shorter copy requires relevant performance evidence and a recorded rationale for this product, audience, traffic and offer. This is a design policy, not a claim that long copy always converts better; do not impose a minimum word count or add filler.

Start from verified product, audience, offer and traffic context. Ask only material missing questions; otherwise label assumptions. Use all relevant design references and produce complete strategy, copy, section sequence, image direction and QA. Deeper product, claim or audience research is useful when evidence is weak; fresh external brand exemplars are not mandatory.

A PDP is eligible only for explicitly identified retargeting traffic. Consider it last, after the long-form listicle and relevant specialized destinations, and select it only when a documented comparison clearly shows it is the strongest fit. Search, Shopping, product awareness, existing-customer status, a discount, subscription, configuration or a named SKU does not independently qualify. PDP variants and hybrids follow this same gate.

## Wireframe And Image Approval

The first design deliverable is an actual rendered, reviewable full-page desktop/mobile wireframe artifact (for example local HTML), not merely a JSON spec or slot list with substantive page copy and exclusively image placeholders, even when existing images are available. Define the ideal image for every slot from its persuasive purpose, not from the asset inventory: subject/action, product truth, composition, placement, aspect ratio, target pixel dimensions, desktop/mobile crop and safe areas, alt text and planned filename. Existing product information may inform factual accuracy; do not select, generate or insert final imagery yet.

Internally review the rendered desktop/mobile wireframe against the strategy and QA rubric, resolve findings, then present it for approval before selecting, generating or inserting final imagery. Explicit end-to-end authorization may waive this conversational pause; record that authorization, but still create the wireframe artifact and complete its internal review before imagery work. Otherwise stop at this approval gate. Afterward, propose existing images only when they fit the approved ideal slot; explain the fit or gap and generate/source replacements when needed. Do not redesign ideal slots to accommodate convenient assets.

## Ask, Infer, Or Placeholder Rules

Ask before drafting only when the missing answer changes the page in a material way.

Ask when missing:

- actual product or product category
- primary conversion goal
- real CTA path when selection, quiz, bundle, customization, verification, or lead capture may be required
- offer terms displayed as real discounts, urgency, guarantees, financing, free shipping, or free gifts
- compliance boundaries for health, safety, sustainability, clinical, financial, superiority, or competitor claims
- required Shopify target, theme, product, collection, or implementation path only when needed for authorized implementation; these are not prerequisites for standalone design, audit or copy work

Infer when missing:

- traffic source: default to `meta_paid_social`
- campaign stage: default to `cold_prospecting`
- destination and persuasion for unclear cold Meta traffic: default to a transparent, brand-owned `advertorial_listicle` organized as a reason-based `problem_solution_proof_offer` argument
- listicle override: use another destination only for a concrete response-path requirement, explicit user direction, strong ad-message continuity; record a compelling reason and apply the stricter PDP gate
- PDP eligibility: not_eligible unless retargeting is explicitly identified; eligibility is not selection, and PDP must clearly win as the last choice.
- device priority: default to `mobile_first`
- style direction: default to `minimalist_clean_with_conversion_density`
- brand trust level: default to `new` unless visible proof shows brand equity
- proof need: stronger for new brands, premium products, claim-heavy products, subscriptions, and regulated categories
- sticky CTA: enabled for long paid-traffic pages, high-AOV products, quiz funnels, offer pages, and mobile-first pages

Use these placeholders only in the separate specification/evidence checklist when missing facts would otherwise be fabricated. They are not rendered page copy; omit or truthfully rewrite unsupported statements under the Customer-Facing Copy Gate in SKILL.md:

```text
[Confirm current offer terms]
[Insert verified review count]
[Add real testimonial]
[Verify guarantee terms]
[Confirm shipping threshold]
[Substantiate claim before launch]
```

Never invent review counts, testimonials, prices, discounts, guarantee terms, shipping terms, certifications, clinical or testing claims, expert endorsements, urgency, scarcity, customer counts, before/after outcomes, awards, or inventory.

## Deeper Research

Investigate unclear positioning, weak proof, complex offers, claim sensitivity, unfamiliar mechanisms and purchase-path uncertainty as needed within the same full-design process. Additional research is not a shortcut around wireframe review or a reason to require external brand examples.

## Reference Routing

Read only what the current page needs:

- `dtc-derived-strategy.md` for derived strategy labels, CTA mode, proof/education/risk/comparison need, confidence label, and sticky CTA decisions.
- `dtc-archetypes.md` for archetype selection, section sequences, scenario shortcuts, and archetype avoid lists.
- `dtc-category-packs.md` for category-specific frictions, proof needs, offer patterns, and avoid lists.
- `dtc-components.md` for section/component requirements, hero commerce stack, CTA labels, image slots, and placeholders.
- `dtc-visual-copy-system.md` for visual direction, design tokens, headline formulas, CTA microcopy, FAQ topics, and copy modules.
- `dtc-qa-rubric.md` before design approval, before Shopify implementation, or when a draft feels weak, generic, risky, or unnecessarily repetitive.

## Design Spec Output

Produce a structured `ShopifyLandingPageDesignSpec` or equivalent with:

- metadata: brand, product, category, design rationale, destination archetype, persuasion architecture, confidence label, primary goal, traffic source, campaign stage, awareness level
- assumptions: inferred defaults and facts needing merchant/legal verification
- derived_strategy: education need, proof need, risk reversal need, comparison need, CTA mode, offer strength, claim sensitivity, sticky CTA need, listicle-default status, listicle override rationale, PDP eligibility, and PDP eligibility rationale
- copy_strategy_packet: audience desire/awareness, factual research, big idea, hook, mechanism, claim-to-proof mapping, offer, response path, brand voice, explicit headline_bank and section-level application of the copywriting principles
- message_family_routes, when multiple ads are supplied: source ads, shared promise, remaining belief gap, destination or distinct opening, and routing rationale; follow dtc-derived-strategy.md
- strategy: ad angle, click motivation, work already completed by the ad, remaining belief gap, ad/message match, promise, positioning, big idea, mechanism, rejected alternatives, offer stack, proof stack, CTA strategy, response path
- shopify_handoff: template type, implementation owner, fidelity instruction, theme chrome preference
- visual direction: style, colors, typography, section rhythm
- sections: IDs, components, copy, props, CTAs, proof, mobile notes, image slots
- image_production_plan: ideal specifications for every slot; final asset choices only after the image approval gate
- compliance: claims to verify and facts not to invent
- metadata_direction: SEO title, meta description, social preview copy, image direction
- QA checklist: score with evidence from the actual spec/wireframe, blockers, revision notes
- wireframe: reviewable desktop/mobile artifact, internal review findings and image-gate approval or explicit end-to-end waiver
- copy_length: long-form default or relevant performance evidence and rationale for shorter copy

## Design Review Gate

Before Shopify implementation, confirm:

```text
The design rationale is clear.
Assumptions are labeled.
The page has one clear big idea.
The traffic source and campaign stage are explicit; absent contrary input, they are Meta paid social and cold prospecting.
The destination archetype matches the traffic and conversion goal.
The cold Meta listicle default is either retained or overridden with a concrete strategic or functional rationale.
The opening continues the ad or campaign promise and reason for the click when one exists.
The persuasion architecture matches the ad angle, awareness level, and work already completed by the ad.
A PDP is selected only for explicitly identified retargeting and clearly wins the recorded comparison as the last choice.
The product is instantly understandable.
The offer is clear without rereading.
CTAs match the actual next step.
Proof is close to the claims it supports.
Risk reversal is visible.
Major objections are answered.
The mobile purchase path is obvious.
Image slots are exact enough to build.
Every image in the first wireframe is an exact placeholder, including slots with existing assets.
Metadata matches the page promise.
Unsupported claims are removed, softened, or flagged.
Shopify implementation has enough detail to build without redesigning the page.
```
