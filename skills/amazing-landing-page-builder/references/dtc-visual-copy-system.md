# DTC Visual And Copy System

Use this reference when choosing visual direction, design tokens, headline patterns, CTA microcopy, FAQ topics, and reusable copy modules.

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
Risk Reversal
Objection Handling and Final CTA
```

This is a reason-based listicle organized by problem-solution-proof-offer. Use it when no other persuasion architecture has a stronger rationale. Product specificity does not justify PDP copy by itself. Do not invent a publisher identity or disguise the page's brand ownership.

Choose emphasis by the ad angle and click reason:

- aspiration, discovery, or launch novelty: AIDA
- clear pain or job: problem-solution-proof-offer
- truthful problem reframing: problem-agitate-solve
- distinctive reason the product works: mechanism-first
- observable result shown by the ad: demonstration-first
- contrast with an old way or alternative: comparison-first

The following are persuasion and module suggestions within the selected destination, not automatic archetype overrides. The long-form listicle default and retargeting-only, last-choice PDP gate still apply:

- premium product: problem, mechanism, proof, offer
- discount campaign: offer-first promo
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

Use:

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

Prefer specific copy:

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

Each section should usually include:

- eyebrow
- headline
- supporting subheadline
- 2-4 bullets/cards
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

Add reassurance near high-friction CTAs:

- free shipping over verified threshold
- returns or guarantee terms
- cancel anytime
- ships in verified timeframe
- secure checkout
- HSA/FSA eligible only if valid
- try risk-free
- warranty included

When unverified, record placeholders in the separate specification/evidence checklist, never in rendered copy. Omit or truthfully rewrite the unsupported promise under the Customer-Facing Copy Gate in SKILL.md:

```text
[Confirm shipping threshold]
[Verify guarantee terms]
[Confirm cancellation terms]
```

## FAQ Generation

Generate FAQs from objections, not generic filler.

Minimum FAQ topics to consider:

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

Default to long-form, substantive copy: develop each reason with product-specific explanation, mechanism, proof and objections; use scannable sections without stripping the argument. Shorter copy requires relevant performance evidence and a recorded rationale for this product, audience, traffic and offer. This is a design policy, not a claim that long copy always converts better; do not impose a minimum word count or add filler.

Use the ideal visual direction to specify placeholder slots first. Do not select or insert existing images, or generate new ones, before the wireframe artifact is internally reviewed and the image approval gate in dtc-design-package.md is satisfied.

## Master Copywriter Principles In The Brand's Voice

Apply these complementary principles, not any writer's voice or source text. They guide reasoning; they do not guarantee conversion or change the archetype, long-copy or wireframe gates.

- Schwartz: identify the buyer's existing desire, awareness and beliefs; connect the product to that desire and close the remaining belief gap. Awareness guides explanation, not automatic PDP eligibility or shorter copy.
- Ogilvy: research product facts, mechanism, differentiators, objections and proof; organize the page around one concrete, memorable, supportable big idea while preserving brand character.
- Halbert: choose the motivated audience, make the real offer worthwhile, then earn attention with a specific truthful hook. Resolve curiosity and never fabricate scarcity.
- Hopkins and Bencivenga: give important promises a credible reason why; place relevant human, technical, authority or offer evidence beside claims. Missing support requires a verification placeholder or softer wording.
- Caples: write clear, benefit-led headlines using useful novelty or truthful curiosity. When testing alternatives, vary meaningful angles rather than adjectives; do not claim a winner without data.
- Sugarman: make each sentence and section earn the next through concrete detail, logical transitions and resolved open loops. Remove repetition and throat-clearing without reducing the substantive long-form argument.
- Edwards: connect the person's situation and problem to an attainable aspiration, solution, supported transformation, offer and clear response. Do not shame the buyer or exaggerate outcomes.

Before full copy, produce a copy strategy packet with audience desire/awareness, verified product research, big idea, hook, ad promise and remaining belief gap, mechanism, claim-to-proof mapping, offer logic, actual response path and brand voice. Map those decisions to the hero and key numbered reasons, proof blocks, objections and CTA. Include a concise application note citing specific copy passages; listing the writers' names is not evidence of application.

During wireframe QA, challenge whether the opening continues the ad, the big idea could fit a competitor unchanged, each major promise has support or a placeholder, reasons build belief without repetition, the offer is clear and the response is actionable. Record concrete findings and revisions in the same evidence-based QA. No separate copywriting skill or fresh external brand exemplar is required.
