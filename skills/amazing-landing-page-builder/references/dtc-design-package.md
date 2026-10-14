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
Why act now, if there is a real reason?
What would make the purchase feel clear and credible?
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

Follow the Full Design Process in `../SKILL.md`: default to substantive long form, develop important reasons beyond benefit summaries, preserve purposeful reinforcement, and remove only irrelevant or purposeless repetition. Plan depth using known product facts, supported explanations, available evidence and meaningful objections; do not invent claims to make the page longer. Relevant performance evidence and a recorded rationale are required for an overall short-form departure, not individual editorial cuts. No word count or reason quota applies.

Start from verified product, audience, offer and traffic context. Ask only material missing questions; otherwise label assumptions. Use all relevant design references and produce complete strategy, copy, section sequence, image direction and QA. Deeper product, claim or audience research is useful when evidence is weak; fresh external brand exemplars are not mandatory.

A PDP is eligible only for explicitly identified retargeting traffic. Consider it last, after the long-form listicle and relevant specialized destinations, and select it only when a documented comparison clearly shows it is the strongest fit. Search, Shopping, product awareness, existing-customer status, a discount, subscription, configuration or a named SKU does not independently qualify. PDP variants and hybrids follow this same gate.

## Wireframe And Image Approval

The first design deliverable is an actual rendered, reviewable full-page desktop/mobile wireframe artifact (for example local HTML), with substantive finished page copy and exclusively image placeholders, even when existing images are available. A JSON spec or slot list alone does not suffice. Define the ideal image for every slot from its persuasive purpose, not from the asset inventory: subject/action, product truth, composition, placement, aspect ratio, target pixel dimensions, desktop/mobile crop and safe areas, alt text and planned filename. Existing product information may inform factual accuracy; do not select, generate or insert final imagery yet.

Internally review the rendered desktop/mobile wireframe against the strategy and QA rubric, resolve findings, then present it for approval before selecting, generating or inserting final imagery. Explicit end-to-end authorization may waive this conversational pause; record that authorization, but still create the wireframe artifact and complete its internal review before imagery work. Otherwise stop at this approval gate. Afterward, propose existing images only when they fit the approved ideal slot; explain the fit or gap and generate/source replacements when needed. Do not redesign ideal slots to accommodate convenient assets.

## Ask, Infer, Or Omit

Ask before drafting only when the missing answer changes the page in a material way and the page cannot progress honestly by omitting that detail.

Ask when missing:

- actual product or product category
- primary conversion goal
- real CTA path when selection, quiz, bundle, customization, verification, or lead capture may be required
- offer terms when a real discount, urgency, guarantee, financing, free shipping, or gift must appear in the proposed copy or determine the purchase path
- a specific unresolved boundary for a material claim that must appear in the proposed page and cannot be resolved from available facts
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
- proof need: assess what would help belief for new brands, premium products, claim-heavy products, subscriptions, and regulated categories; absence of optional proof does not require a page placeholder
- sticky CTA: enabled for long paid-traffic pages, high-AOV products, quiz funnels, offer pages, and mobile-first pages

Use a separate specification/evidence note only for a missing fact that materially affects proposed published copy or an honest purchase decision. These prompts are never rendered page copy; omit or truthfully rewrite unsupported statements under the Customer-Facing Copy Gate in SKILL.md. Do not carry a checklist of nonessential gaps into the handoff:

```text
[Confirm current offer terms]
[Verify guarantee terms]
[Confirm shipping threshold]
[Substantiate material claim used in proposed copy]
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
- assumptions: inferred defaults and material facts needing merchant verification for proposed copy or purchase
- derived_strategy: education need, proof need, risk reversal need, comparison need, CTA mode, offer strength, claim sensitivity, sticky CTA need, listicle-default status, listicle override rationale, PDP eligibility, and PDP eligibility rationale
- copy_strategy_packet: product-desire answer without the discount or bonus, any promotion-led opening rationale, audience desire/awareness, factual research, big idea, hook, mechanism, claim-to-proof mapping, offer, response path, brand voice, explicit headline_bank and section-level application of the copywriting principles
- message_family_routes, when multiple ads are supplied: source ads, shared promise, remaining belief gap, destination or distinct opening, and routing rationale; follow dtc-derived-strategy.md
- strategy: ad angle, click motivation, work already completed by the ad, remaining belief gap, ad/message match, promise, positioning, big idea, mechanism, rejected alternatives, offer stack, proof stack, CTA strategy, response path
- shopify_handoff: template type, implementation owner, fidelity instruction, theme chrome preference
- visual direction: style, colors, typography, section rhythm
- sections: IDs, components, copy, props, CTAs, proof, mobile notes, image slots
- image_production_plan: ideal specifications for every slot; final asset choices only after the image approval gate
- material claim and offer verification notes where the proposed copy or purchase path depends on them
- metadata_direction: SEO title, meta description, social preview copy, image direction
- QA checklist: score with evidence from the actual spec/wireframe, material blockers, revision notes
- wireframe: reviewable desktop/mobile artifact, internal review findings and image-gate approval or explicit end-to-end waiver
- copy_length: substantive long-form development plan, including underdeveloped reasons and purposeful reinforcement; evidence and rationale for an overall short-form departure, not for removing irrelevant or purposeless repetition

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
Material claims are supported near the claim or rewritten within verified facts.
Actual merchant risk-reversal terms are accurate and easy to find when relevant.
Major objections are answered.
The mobile purchase path is obvious.
Image slots are exact enough to build.
Every image in the first wireframe is an exact placeholder, including slots with existing assets.
Metadata matches the page promise.
Unsupported material claims are removed or accurately qualified in customer copy.
Shopify implementation has enough detail to build without redesigning the page.
```
