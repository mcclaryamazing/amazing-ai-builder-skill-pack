# DTC Visual And Copy System

Use this reference when choosing visual direction, design tokens, headline patterns, CTA microcopy, FAQ topics, and reusable copy modules.

## Marketing Framework

Default framework:

```text
Message Match
Problem or Desired Outcome
Product Mechanism
Proof Stack
Offer Stack
CTA
Objection Handling
```

Choose emphasis by situation:

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

Use placeholders when unverified:

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
