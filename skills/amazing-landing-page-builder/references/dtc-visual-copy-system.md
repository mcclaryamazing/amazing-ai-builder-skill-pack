# DTC Visual And Copy System

Use this reference when choosing visual direction, design tokens, headline patterns, CTA microcopy, FAQ topics, and reusable copy modules.

Write finished copy for the buyer: lead with the practical benefit and why it matters to them, identify the product and actual offer promptly, then explain the mechanism and relevant available reason to believe. Treat inferred emotional motivations as hypotheses, not research findings. Essential missing facts belong in separate notes, not customer copy.

## Marketing Framework

Unless the user states otherwise, write for Meta paid-social cold prospecting. Continue the ad's hook and reason for the click, then choose the persuasion architecture that closes the remaining belief gap.

Default cold-Meta listicle argument:

```text
Transparent Advertorial Header
Message-Matched Hook
Problem or Desired Outcome
Substantive Numbered Reasons
Early Solution and Product Reveal
Proof Near Claims
Offer and Response Path
Risk Reversal When Relevant And Available
Objection Handling and Final CTA
```

Build product desire before promotional preference under `../SKILL.md`; record why the reader would want the product without the discount or bonus. This is a reason-based listicle organized by problem-solution-proof-offer. Use it when no other persuasion architecture has a stronger rationale. Product specificity does not justify PDP copy by itself. Do not invent a publisher identity or disguise the page's brand ownership.

Choose emphasis by the ad angle and click reason:

- aspiration, discovery, or launch novelty: AIDA
- clear pain or job: problem-solution-proof-offer
- truthful problem reframing: problem-agitate-solve
- distinctive reason the product works: mechanism-first
- observable result shown by the ad: demonstration-first
- contrast with an old way or alternative: comparison-first

The following are persuasion and module suggestions within the selected destination, not automatic archetype overrides. The long-form listicle default and retargeting-only, last-choice PDP gate still apply:

- premium product: problem, mechanism, proof, offer
- promotion-led opening: only when explicitly requested or the supplied campaign establishes the promotion as the click reason; a discount in the brief alone does not justify this emphasis
- personalized product: quiz funnel
- commodity disruption: us-vs-them comparison
- high-AOV tech: educational mechanism plus proof stack
- new product launch: AIDA plus comparison
- broad collection: collection splitter plus merchandising
- custom product: quality uncertainty, sample/design help, customization CTA

## Visual Styles

Common directions:

- `clinical_premium`
- `editorial_minimalist`
- `playful_cpg`
- `premium_dark`
- `outdoorsy_natural`
- `ugc_raw`
- `brand_specific`

Style mapping:

- premium apparel: minimalist editorial
- supplements: clinical premium
- snacks/cereal: playful CPG
- beauty: editorial premium
- beauty tech: clinical luxury
- home goods: warm minimalist
- furniture: premium neutral editorial
- pet: friendly playful premium
- outdoor gear: technical minimalist
- wellness electronics: premium dark plus clinical
- lead capture/giveaway: high-contrast campaign design
- custom print/configurable: premium tactile editorial

## Design DNA

Consider these design practices when they fit the brand and page:

- neutral base canvas
- one dominant CTA accent color
- alternating section contrast
- product-on-white imagery for clarity
- lifestyle imagery for aspiration
- UGC for believability
- high-contrast buttons
- large mobile tap targets
- reserved image space to prevent layout shift

Avoid:

- low-contrast CTA
- too many accent colors
- text embedded in images
- dense unbroken paragraphs
- generic stock imagery
- empty minimalist sections
- unstructured product grids

## Design Token Template

Use a compact token set in the design package:

```json
{
  "colors": {
    "background": "#FFFFFF",
    "surface": "#F7F4EF",
    "text": "#111111",
    "muted_text": "#666666",
    "primary_cta": "#111111",
    "primary_cta_text": "#FFFFFF",
    "accent": "#F4C542"
  },
  "typography": {
    "heading_style": "serif_editorial | bold_sans | condensed_sans | clinical_sans",
    "body_style": "clean_sans",
    "button_style": "pill | square | rounded"
  },
  "spacing": {
    "section_padding_desktop": "72px",
    "section_padding_mobile": "40px"
  }
}
```

Adjust tokens to match the store's real brand and theme.

## Copy Rules

Prefer specific copy grounded in verified facts; the lines below illustrate form, not facts to reuse:

```text
Save 25% on your first order
Choose your 6-box bundle
Free shipping over $75
30-day money-back guarantee
Designed for wide feet
$2.65 per meal
```

Avoid vague copy:

```text
Better products for better living
Premium quality you'll love
Shop our amazing collection
Transform your life
```

Use the parts that help a section do its job; no fixed stack is required:

- eyebrow
- headline
- supporting subheadline
- distinct bullets or cards when they make the point easier to scan
- CTA or proof cue when appropriate

## Headline Patterns

Use:

- product outcome: `The [product] built for [specific outcome]`
- problem/solution: `Finally, [solution] without [common frustration]`
- premium mechanism: `Powered by [mechanism], designed for [benefit]`
- offer: `Get [product] today and save [discount]`
- quiz: `Find the right [product/result] for your [need]`
- collection: `Shop [category] made for [use case/audience]`
- subscription: `Your [routine/product] delivered every [cadence]`
- custom product: `Create [product] that looks and feels like [desired outcome]`

## Headline Bank Output

Include an explicit `headline_bank` in full copy strategy packets and headline-development deliverables. Offer a small useful set of product-specific alternatives across meaningful benefit, mechanism, sensory proof, offer, identity, curiosity or comparison angles. Identify each angle, its ad/message-family fit when applicable, and the evidence needed for its promise. Recommend an opening with a strategic rationale; do not claim a winning headline without performance data. For a narrow rewrite, keep alternatives within the requested section and scope.

## CTA Microcopy

Use relevant, verified reassurance near a CTA when it answers a likely hesitation:

- free shipping over verified threshold
- returns or guarantee terms
- cancel anytime
- ships in verified timeframe
- secure checkout
- HSA/FSA eligible only if valid
- try risk-free
- warranty included

When a fact essential to the offer or action is unverified, record a focused question in the separate specification/evidence notes. Otherwise omit or truthfully rewrite the unsupported promise. Never show these questions in rendered copy:

```text
[Confirm shipping threshold]
[Verify guarantee terms]
[Confirm cancellation terms]
```

## FAQ Generation

Use FAQs for plausible, purchase-relevant questions still insufficiently answered by the page. Prefer customer evidence; otherwise use grounded product judgment. Do not invent concerns or repeat clear offer information to fill a section. There is no minimum count; omit the FAQ when it adds nothing.

Consider only topics a buyer is likely to need for this product and offer:

- shipping
- returns or guarantee
- sizing/fit or compatibility
- how to use
- subscription/cancellation if relevant
- ingredients/materials/safety if relevant
- offer terms
- warranty or trial terms if relevant
- customization/production timing if relevant

## Copy Modules

Reuse modules when they fit the product:

- why it's different
- how it works
- what's included
- compare us vs. them
- which one is right for you
- the problem we're solving
- what customers are saying
- risk-free for X days when verified
- bundle value breakdown
- complete the routine/look/setup
- the technical details
- made to grow or built to last

## Copy Depth And Image Sequence

Apply the Full Design Process in `../SKILL.md`: develop a substantive long-form argument rather than a collection of benefit summaries. Deepen important reasons with truthful detail, explanation, available evidence and meaningful objections; preserve purposeful reinforcement and remove irrelevant or purposeless repetition. Short paragraphs and scannable headings support a long argument; they do not impose short sections or a short page. An overall short-form departure requires relevant performance evidence and a recorded rationale. Do not impose word counts or invent claims to fill space.

Use the ideal visual direction to specify placeholder slots first. Do not select or insert existing images, or generate new ones, before the wireframe artifact is internally reviewed and the image approval gate in dtc-design-package.md is satisfied.

## Master Copywriter Principles In The Brand's Voice

Apply these complementary principles, not any writer's voice or source text. They guide reasoning; they do not guarantee conversion or change the archetype, long-copy or wireframe gates.

- Schwartz: identify the buyer's existing desire, awareness and beliefs; connect the product to that desire and close the remaining belief gap. Awareness guides explanation, not automatic PDP eligibility or shorter copy.
- Ogilvy: research product facts, mechanism, differentiators, objections and proof; organize the page around one concrete, memorable, supportable big idea while preserving brand character.
- Halbert: choose the motivated audience, make the real offer worthwhile, then earn attention with a specific truthful hook. Resolve curiosity and never fabricate scarcity.
- Hopkins and Bencivenga: give important promises a credible reason why using relevant available human, technical, authority, or offer evidence. Soften or omit an unsupported promise; record an essential unanswered factual question separately.
- Caples: write clear, benefit-led headlines using useful novelty or truthful curiosity. When testing alternatives, vary meaningful angles rather than adjectives; do not claim a winner without data.
- Sugarman: make each sentence and section earn the next through concrete detail, logical transitions and resolved open loops. Remove purposeless repetition and throat-clearing while preserving useful depth and deliberate reinforcement.
- Edwards: connect the person's situation and problem to an attainable aspiration, solution, supported transformation, offer and clear response. Do not shame the buyer or exaggerate outcomes.

Before full copy, produce a concise copy strategy packet covering audience desire and awareness, verified product and offer facts, big idea, ad promise and remaining belief gap, relevant mechanism and proof, actual response path, and brand voice. Map these choices to the hero, key reasons, objections, and CTA. Explain how specific copy passages apply the principles; listing writers' names is not evidence of application. Make the actual purchase terms clear even when no risk-reversal offer exists.

During wireframe QA, challenge whether the opening continues the ad, the big idea could fit a competitor unchanged, each major promise has support or is truthfully qualified, reasons develop desire and belief beyond summaries, repeated ideas serve a specific local purpose, the actual offer is clear, and the response is actionable. Check that the copy leads with a meaningful benefit, reaches the emotional reason to care, and uses available evidence or explanation to make the promise believable. Record concrete findings and revisions in the same evidence-based QA. These embedded principles are sufficient for the builder workflow; no separate copywriting skill installation or fresh external brand exemplar is required.
