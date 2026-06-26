# DTC Design Package

Use this reference before producing or reviewing the strategy, copy, section sequence, image-slot plan, metadata direction, or final Shopify-ready design spec.

This file is the design-phase router. It keeps the workflow fast by default while pointing to deeper references only when the page needs them.

## Core Philosophy

Default to:

```text
commerce-ready hero + modular persuasion below
```

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
Make the first screen shoppable.
Make the middle persuasive.
Make the final section reassuring.
```

Do not promise patterns are guaranteed to convert unless the user provides real conversion data. Use language like conversion-oriented, commonly observed among strong exemplars, or likely valuable.

## Operating Modes

### Fast Draft Mode

Fast Draft Mode is the default.

Use it when the user asks for a landing page, design package, page draft, Shopify page, section sequence, copy spec, or implementation and has not explicitly requested a deeper strategy process.

In Fast Draft Mode:

1. Start from the request, repo, Shopify context, product data, assets, and visible store truth.
2. Ask at most 1-3 questions before drafting.
3. Ask only when the missing answer would materially change page archetype, primary CTA, offer truth, claim/compliance boundaries, product selection logic, Shopify build path, or launch safety.
4. Otherwise infer a conservative default and label it as an assumption.
5. Use verification placeholders instead of inventing facts.
6. Default unclear product-specific DTC traffic to `pdp_direct_response`.
7. Default missing traffic to `cold_to_warm_paid_social_meta`.
8. Default device priority to `mobile_first`.
9. Default style to `minimalist_clean_with_conversion_density`.
10. Include `data_needed_from_merchant` for all missing facts that matter before launch.

Fast Draft Mode still produces a complete, build-ready design package. It may carry the confidence label `first_draft_to_test` when proof, offer, traffic, or category evidence is thin.

### Guided Strategy Mode

Use Guided Strategy Mode when the user wants help shaping the offer, audience, traffic promise, proof stack, positioning, or page direction before drafting.

Ask a compact intake only for facts not already available from the user, repo, Shopify data, product copy, or assets:

1. What product or offer is this page selling?
2. Who is the primary buyer or traffic audience?
3. Where is the traffic coming from, and what promise did they click?
4. What is the real next action: buy, choose variant, build bundle, take quiz, sign up, verify, or customize?
5. What proof is available: reviews, testimonials, UGC, press, certifications, testing, guarantee, or founder/expert credibility?
6. What claims, guarantees, urgency, discounts, shipping terms, or compliance boundaries must be verified?

After intake, produce the same build-ready design package as Fast Draft Mode, with clearer rationale for archetype, big idea, offer stack, proof stack, CTA strategy, and section sequence.

### Deep Conversion Mode

Use Deep Conversion Mode when:

- the user explicitly asks for a deep conversion strategy, teardown, audit, CRO pass, or best-possible page
- the product is high-AOV, regulated, technical, health/wellness, baby/pet, financial, safety-related, or claim-sensitive
- the offer, proof, or CTA path is complex
- the page depends on subscription, quiz, personalization, bundle building, eligibility, custom products, financing, or comparison claims
- the first draft has weak hero clarity, CTA quality, proof strength, mobile UX, or claim hygiene
- the conversion-readiness score is below 80

Deep Conversion Mode may ask more questions, but only after producing a useful first pass or when the missing information blocks safe claims, purchase wiring, or page structure.

## Ask, Infer, Or Placeholder Rules

Ask before drafting only when the missing answer changes the page in a material way.

Ask when missing:

- actual product or product category
- primary conversion goal
- real CTA path when selection, quiz, bundle, customization, verification, or lead capture may be required
- offer terms displayed as real discounts, urgency, guarantees, financing, free shipping, or free gifts
- compliance boundaries for health, safety, sustainability, clinical, financial, superiority, or competitor claims
- required Shopify target, theme, product, collection, or implementation path

Infer when missing:

- traffic source: default to `cold_to_warm_paid_social_meta`
- page archetype for unclear product traffic: default to `pdp_direct_response`
- device priority: default to `mobile_first`
- style direction: default to `minimalist_clean_with_conversion_density`
- brand trust level: default to `new` unless visible proof shows brand equity
- proof need: stronger for new brands, premium products, claim-heavy products, subscriptions, and regulated categories
- sticky CTA: enabled for long paid-traffic pages, high-AOV products, quiz funnels, offer pages, and mobile-first pages

Use placeholders when missing facts would otherwise be fabricated:

```text
[Confirm current offer terms]
[Insert verified review count]
[Add real testimonial]
[Verify guarantee terms]
[Confirm shipping threshold]
[Substantiate claim before launch]
```

Never invent review counts, testimonials, prices, discounts, guarantee terms, shipping terms, certifications, clinical or testing claims, expert endorsements, urgency, scarcity, customer counts, before/after outcomes, awards, or inventory.

## When To Recommend A Deeper Mode

Recommend Guided Strategy Mode when the page can be drafted, but the offer, audience, traffic promise, proof stack, or positioning is vague enough that strategy choices may be weak.

Recommend Deep Conversion Mode when the current draft is likely risky or underpowered because:

- the product is high-AOV, regulated, technical, unfamiliar, or claim-sensitive
- the brand is new and proof is thin
- the offer is unverified or complex
- the CTA path is more complex than direct purchase
- the page relies on quiz, subscription, bundle, financing, eligibility, or customization logic
- the hero does not clearly communicate product, promise, proof, offer, and next action
- the design is attractive but sparse, proof-light, or not shoppable above the fold
- QA score would be below 80

Phrase the upgrade as an option, not a blocker:

```text
I can keep this in Fast Draft Mode and produce a build-ready first pass now. Given the claim sensitivity, offer complexity, or proof gap here, I recommend a Deep Conversion pass afterward before launch.
```

## Reference Routing

Read only what the current page needs:

- `dtc-derived-strategy.md` for modes, derived strategy labels, CTA mode, proof/education/risk/comparison need, confidence label, and sticky CTA decisions.
- `dtc-archetypes.md` for archetype selection, section sequences, scenario shortcuts, and archetype avoid lists.
- `dtc-category-packs.md` for category-specific frictions, proof needs, offer patterns, and avoid lists.
- `dtc-components.md` for section/component requirements, hero commerce stack, CTA labels, image slots, and placeholders.
- `dtc-visual-copy-system.md` for visual direction, design tokens, headline formulas, CTA microcopy, FAQ topics, and copy modules.
- `dtc-qa-rubric.md` before design approval, before Shopify implementation, or when a draft feels weak, generic, risky, or overlong.

## Design Spec Output

Produce a structured `ShopifyLandingPageDesignSpec` or equivalent with:

- metadata: brand, product, category, selected mode, archetype, confidence label, primary goal, traffic source, awareness level
- assumptions: inferred defaults and facts needing merchant/legal verification
- derived_strategy: education need, proof need, risk reversal need, comparison need, CTA mode, offer strength, claim sensitivity, sticky CTA need
- strategy: ad/message match, promise, positioning, big idea, mechanism, offer stack, proof stack, CTA strategy, response path
- shopify_handoff: template type, implementation owner, fidelity instruction, theme chrome preference
- visual direction: style, colors, typography, section rhythm
- sections: IDs, components, copy, props, CTAs, proof, mobile notes, image slots
- image_production_plan: all missing and final image slots
- compliance: claims to verify and facts not to invent
- metadata_direction: SEO title, meta description, social preview copy, image direction
- QA checklist: score, blockers, revision notes

## Design Review Gate

Before Shopify implementation, confirm:

```text
The selected mode is clear.
Fast Draft assumptions are labeled.
The page has one clear big idea.
The archetype matches the traffic and conversion goal.
The hero repeats the ad or campaign promise when one exists.
The product is instantly understandable.
The offer is clear without rereading.
CTAs match the actual next step.
Proof is close to the claims it supports.
Risk reversal is visible.
Major objections are answered.
The mobile purchase path is obvious.
Image slots are exact enough to build.
Missing images have exact placeholders.
Metadata matches the page promise.
Unsupported claims are removed, softened, or flagged.
Shopify implementation has enough detail to build without redesigning the page.
```
