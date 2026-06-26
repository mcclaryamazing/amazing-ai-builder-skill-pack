# DTC QA Rubric

Use this reference before approving the design package for Shopify implementation, or when a draft feels weak, generic, risky, or overlong.

## Conversion Readiness Score

Score the design package out of 100:

```json
{
  "ad_scent": 10,
  "hero_clarity": 15,
  "offer_clarity": 10,
  "cta_quality": 10,
  "proof_strength": 10,
  "education_quality": 10,
  "objection_handling": 10,
  "mobile_ux": 10,
  "visual_hierarchy": 10,
  "claim_hygiene": 5
}
```

Use a compact user-facing score in Fast Draft Mode. Use detailed scoring in Deep Conversion Mode or when the draft is weak.

## Revision Rules

Revise before Shopify implementation when:

- total score is under 80
- hero clarity is under 12
- CTA quality is under 8
- proof strength is under 7 for a new or lesser-known brand
- claim hygiene is under 5
- mobile UX is under 8

Fixes:

- low hero clarity: rewrite hero around product, promise, proof, offer, and exact CTA
- low CTA quality: fix label and purchase path
- weak proof: add real proof or placeholders, risk reversal, mechanism, and review/UGC needs
- weak claim hygiene: remove, soften, or flag unsupported claims
- weak mobile UX: simplify sections, improve scanability, and add or fix sticky CTA

## Design Review Gate

Confirm:

- selected mode is clear
- assumptions are labeled
- confidence label is present
- one clear product-specific big idea exists
- archetype matches traffic and conversion goal
- hero matches ad promise when one exists
- product is instantly understandable
- offer is clear
- CTA matches the actual next step
- proof is near the claim it supports
- risk reversal is visible
- major objections are answered
- mobile purchase path is obvious
- image slots are exact enough to build
- missing images have exact placeholders
- metadata matches the page promise
- unsupported claims are removed, softened, or flagged
- Shopify implementation has enough detail to build without redesigning

## Strategic Anti-Patterns

Avoid:

- generic homepage for specific ad traffic
- hero that does not repeat ad promise
- brand mission before product clarity
- unclear or hidden offer
- CTA that does not match next action
- no proof above the fold
- no risk reversal
- no FAQ
- no final CTA recap
- too many navigation exits
- cross-sells distracting from primary conversion
- comparison table before price

## Design Anti-Patterns

Avoid:

- low-contrast CTA
- too many competing colors
- sparse minimalist page with low persuasion density
- dense text without visual breaks
- unclear product imagery
- no mobile sticky CTA on long pages
- sticky CTA blocking important content
- product cards missing price or action

## Copy Anti-Patterns

Avoid:

- vague benefit language
- unsupported best claims
- fake urgency
- unverified clinical or medical claims
- unclear subscription terms
- unclear discount math
- no objection handling
- generic FAQs

## Category Anti-Patterns

Avoid:

- apparel without fit guidance
- supplements without ingredient transparency
- beauty without usage/result explanation
- home goods without dimensions, care, or shipping clarity
- pet/baby without safety reassurance
- tech/wellness without warranty, financing, or setup clarity
- collection pages without segmentation
- quiz pages where the quiz does not add value
- custom products without sample/design support

## Shopify Handoff Gate

Before implementation, the design package must include:

- approved or placeholder-safe copy
- section sequence
- component responsibilities
- exact CTA paths
- product, variant, bundle, quiz, form, cart, or checkout assumptions
- exact image slots and placeholder text
- metadata direction
- compliance notes
- score or punch list

Do not let Shopify implementation redesign the page unless a hard Shopify, product-data, compliance, asset, or access constraint requires it.
