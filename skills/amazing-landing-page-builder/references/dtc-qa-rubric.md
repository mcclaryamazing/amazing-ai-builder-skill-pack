# DTC QA Rubric

Use this reference before approving the design package for Shopify implementation, or when a draft feels weak, generic, risky, or unnecessarily repetitive.

## Current Rubric And Precedence

This file owns the maintained 100-point score and revision thresholds for the builder. Use it consistently; do not mix in the retired DTC condensed rubric, which allocated 10 points to traffic-stage/route fit, 10 to hero clarity and 5 to visual hierarchy. Here hero clarity remains 15 and visual hierarchy 10; traffic-stage/route fit is a mandatory design-review gate rather than extra points. Copy quality is evaluated with concrete passage evidence under the relevant criteria and the independent conversion review.

The preserved full source is optional archival context. Its historical workflow, scoring or readiness language cannot waive current scope, claim, archetype, wireframe, independent-review, image-approval or deployment gates. A total score never overrides a failed mandatory gate. For a partial audit, score only inspectable criteria and state missing evidence; do not represent an uninspected page as passing out of 100.

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

For every criterion, cite concrete evidence in the actual copy, section or rendered wireframe; explain deductions that matter to the buyer. The numbers above are maxima, not prefilled passing scores. Re-score after revisions. A total alone is not proof of readiness or performance. Score proof strength and claim hygiene as diagnostic criteria, not automatic blockers: a new brand can have little third-party proof and still present a persuasive, truthful page. Assess how well available product facts, explanation and evidence support the actual argument; do not deduct for absent optional reviews, certifications, guarantees or FAQ sections, then recreate those requirements through the total-score threshold.

## Revision Rules

Revise before Shopify implementation when:

- total score is under 80
- hero clarity is under 12
- CTA quality is under 8
- mobile UX is under 8
- a material customer-facing claim lacks support or a purchase detail is inaccurate or unclear

Fixes:

- low hero clarity: rewrite hero around product, supportable promise, actual offer, and exact CTA; use a proof cue when one is available and relevant
- low CTA quality: fix label and purchase path
- weak proof: use relevant evidence that actually exists, explain the product mechanism, and revise claims that demand unavailable support
- weak claim hygiene: remove or accurately qualify unsupported material claims in customer copy; record evidence needed only for claims retained for later use
- weak mobile UX: simplify sections, improve scanability, and add or fix sticky CTA

## Design Review Gate

The Customer-Facing Copy Gate in SKILL.md is mandatory: complete and record the rendered copy sweep in final-wireframe-review.md. Seller notes or verification requests exposed outside prescribed image placeholders fail acceptance regardless of score. Necessary buyer guidance, accessibility and seller-supplied or approved disclosures remain. Record only material unresolved facts affecting proposed published copy or an honest purchase decision as launch blockers in separate notes; omit nonessential gaps.

Confirm:

- design rationale is clear
- assumptions are labeled
- traffic source and campaign stage are explicit; absent contrary input, they are Meta paid social and cold prospecting
- confidence label is present
- one clear product-specific big idea exists
- destination archetype matches traffic and conversion goal
- the cold Meta listicle default is retained or overridden with a concrete strategic or functional rationale
- opening continues the ad promise and reason for the click when one exists
- persuasion architecture matches the ad angle, awareness level, and work already completed by the ad
- PDP eligibility cites explicit retargeting; any selected PDP clearly wins the recorded comparison as the last choice
- product is instantly understandable
- offer is clear
- CTA matches the actual next step
- material claims have support where they appear, or are rewritten to stay within verified facts
- any actual merchant risk-reversal terms are accurate and easy to find when relevant
- major objections are answered
- mobile purchase path is obvious
- image slots are exact enough to build
- every image in the first wireframe is an exact placeholder
- metadata matches the page promise
- unsupported material claims are removed or accurately qualified in customer copy
- Shopify implementation has enough detail to build without redesigning

## Strategic Anti-Patterns

Avoid:

- generic homepage for specific ad traffic
- hero that does not repeat ad promise
- treating a named product, single SKU, premium price, or common PDP pattern as sufficient reason to choose a PDP
- using a commerce-first PDP opening without explicit retargeting and a clear last-choice comparison win, including a buy box renamed as a subscription or bundle hero
- overriding the cold Meta listicle default without a concrete response-path, user-direction, ad-continuity rationale; never bypass the retargeting-only PDP gate
- padding the default listicle with filler reasons, hiding the product too long, implying independent editorial coverage, or burying the purchase path
- brand mission before product clarity
- unclear or hidden offer
- CTA that does not match next action
- unsupported proof cues above the fold
- invented risk-reversal terms
- unanswered material purchase questions, whether handled in an FAQ or elsewhere
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
- generic or repetitive passages that add no useful answer

## Category Anti-Patterns

Avoid:

- apparel without fit guidance
- supplements without ingredient transparency
- beauty without usage/result explanation
- home goods missing dimensions, care or shipping information necessary for the actual purchase decision
- pet/baby copy leaving a relevant safety or suitability question unanswered
- tech/wellness copy leaving setup or actual warranty/financing terms unclear when those details affect the decision; do not require an offer the merchant does not provide
- collection pages without segmentation
- quiz pages where the quiz does not add value
- custom products that leave the actual customization process unclear or hide useful available sample/design support

## Shopify Handoff Gate

Before implementation, the design package must include:

- finished customer-facing copy, with material unresolved facts recorded separately
- section sequence
- component responsibilities
- exact CTA paths
- product, variant, bundle, quiz, form, cart, or checkout assumptions
- exact image slots and placeholder text
- metadata direction
- material claim and offer verification notes when needed
- score or punch list

Do not let Shopify implementation redesign the page unless a hard Shopify, product-data, compliance, asset, or access constraint requires it.

## Wireframe Acceptance

The final step before user delivery is the independent conversion review and remediation in `final-wireframe-review.md`. Supply `dtc-visual-copy-system.md` for master-copywriter guidance and the relevant bundled DTC framework references. Resolve and verify accepted findings before marking this gate complete; a passing rubric score does not substitute for this review.

Require the reviewable desktop/mobile wireframe with full substantive copy and placeholders in every image slot, even when assets exist. Verify ideal purpose, description, aspect ratio, pixel dimensions and mobile crop. Record internal review findings and fixes. Record user approval before final image selection/generation/insertion, or the explicit end-to-end authorization waiving only that pause. Existing images must fit the approved ideal. Prune repetitive or irrelevant passages without performance evidence; require relevant performance evidence and rationale only for an overall short-form page choice. There is no minimum word count or filler requirement.

Copy review must cite how the strategy packet applies the master-copywriter principles from dtc-visual-copy-system.md to actual hero, reasons, available proof, offer and CTA passages. Reject name-dropping without application, unsupported material claims and generic big ideas.
