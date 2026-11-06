# DTC Visual And Copy System

Use this reference when choosing visual direction, design tokens, headline patterns, CTA microcopy, FAQ topics, and reusable copy modules.

Write finished copy that makes the buyer want the product and see why it matters now. Lead with a specific practical benefit and its emotional payoff, identify the product and offer promptly, and show what makes the result possible. Apply [conversion-copy.md](conversion-copy.md) and, for listicles, [listicle-playbook.md](listicle-playbook.md).

## Marketing Framework

Unless the user states otherwise, write for Meta paid-social cold prospecting. Continue the ad's hook and reason for the click, then choose the persuasion architecture that closes the remaining belief gap.

Default cold-Meta listicle argument:

```text
Transparent Advertorial Header
Message-Matched N Reasons Headline
Opening Scene or Desired Outcome, Named Product and Its Role
Early CTA to the Actual Offer
Substantive Numbered Reasons with Relevant Visuals and Available Proof
Offer, Selection and Purchase Path
Remaining Purchase Questions and Final CTA
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
- high-AOV tech: explain the mechanism and use the strongest available demonstration or customer detail
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

Turn the seller's product details into moments the buyer can picture. Show the immediate practical change and why it matters emotionally. For example, a lantern with a hanging hook can leave both hands free while you reset a breaker. That scene makes the design useful in a way a label like “hanging hook” cannot. Use a plausible imagined scene when it makes the benefit vivid. Frame the scene once and let it unfold naturally.

Use concrete wording for the seller's actual offer. These examples illustrate form:

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

- listicle outcome: `[N] Reasons [Product] Makes [Specific Task] Easier`
- listicle situation: `[N] Reasons to Keep [Product] Ready for [Recognizable Moment]`
- listicle gift or package: `[N] Reasons [Bundle] Belongs in [Buyer’s Routine or Gift Occasion]`
- product outcome: `The [product] built for [specific outcome]`
- problem/solution: `Finally, [solution] without [common frustration]`
- premium mechanism: `Powered by [mechanism], designed for [benefit]`
- offer: `Get [product] today and save [discount]`
- quiz: `Find the right [product/result] for your [need]`
- collection: `Shop [category] made for [use case/audience]`
- subscription: `Your [routine/product] delivered every [cadence]`
- custom product: `Create [product] that looks and feels like [desired outcome]`

Every listicle's visible main headline must say the number and “Reasons” and tell readers why the list matters. Match the number to the distinct numbered reasons in the finished page, including after cuts. Name the product in the hero or opening before the reasons.

## Headline Bank Output

Include an explicit `headline_bank` in full copy strategy packets and headline-development deliverables. Offer a small set of product-specific alternatives that vary the idea, such as a meaningful benefit, recognizable scene, identity, mechanism, offer or comparison. Identify each angle and its ad/message-family fit when applicable. Recommend the opening that best earns attention and leads into this product's argument. For a narrow rewrite, keep alternatives within the requested section and scope.

## CTA Microcopy

Name the actual action and package. If the first button scrolls to a choice, say “Choose Your [Product] Bundle” or “See [Product] Options.” If the button adds the chosen bundle to cart, name that action. Use concise terms near the CTA when they help the buyer choose, such as the seller's actual shipping threshold, delivery window or return period. A timely use, a recurring annoyance or the benefit of being ready can give the buyer a reason to act even at full price.

## FAQ Generation

Resolve the major buying objection where it arises. Use FAQs for remaining questions a buyer would reasonably ask. Give the direct answer, the relevant condition and what it means for the buyer. If the page creates a misleading implication, fix the passage or visual that creates it. Leave out defensive FAQs about implications the page never raises and skip the section when it adds nothing.

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
- the seller's return, trial or guarantee terms when they help the decision
- bundle value breakdown
- complete the routine/look/setup
- the technical details
- made to grow or built to last

## Copy Depth And Image Sequence

Apply the copy-depth guidance in `../SKILL.md`: develop a substantive long-form argument. Deepen important reasons with concrete moments, the consequence of sticking with the current approach, practical product detail, available proof and meaningful objections. Use descriptive headings and readable paragraphs. Preserve purposeful reinforcement and cut repetition that serves no purpose. If the decision calls for an overall short page, give a concise rationale based on the buyer, ad, product and offer. Let the argument set the length.

Use the ideal visual direction to specify placeholder slots first. Do not select or insert existing images, or generate new ones, before the wireframe artifact is internally reviewed and the image approval gate in dtc-design-package.md is satisfied.

## Master Copywriter Principles In The Brand's Voice

Apply these complementary principles in the brand's own voice.

- Schwartz: identify the buyer's existing desire, awareness and beliefs; connect the product to that desire and close the remaining belief gap. Awareness guides explanation, not automatic PDP eligibility or shorter copy.
- Ogilvy: organize the seller's product details, differentiation and offer around one memorable idea specific to the buyer and brand.
- Halbert: choose the motivated audience, make the real offer worthwhile and earn attention with a hook that matters to that person now.
- Hopkins and Bencivenga: give the reader a concrete reason why the product delivers. Use construction, an explanation, a demonstration or a customer experience where it makes the argument stronger.
- Caples: write clear, benefit-led headlines using useful novelty or truthful curiosity. When testing alternatives, vary meaningful angles rather than adjectives; do not claim a winner without data.
- Sugarman: make each sentence and section earn the next through concrete detail, logical transitions and resolved open loops. Remove purposeless repetition and throat-clearing while preserving useful depth and deliberate reinforcement.
- Edwards: connect the person's situation and problem to an attainable aspiration, solution, supported transformation, offer and clear response. Do not shame the buyer or exaggerate outcomes.

Use the same compact conversion brief from `dtc-design-package.md` to guide the hero, reasons, objections and CTA. Apply these principles in the actual copy; do not create another strategy packet or a per-principle explanation inventory.

During wireframe review, read the opening as a buyer who just clicked the ad and skim the headings as someone deciding whether to keep reading. Ask whether the message gives a specific reason to want this product and act, whether the buyer can picture the payoff, whether each reason advances the decision and whether the offer is easy to choose. Revise generic or overqualified copy and keep material offer conditions clear. Record concrete findings and fixes.
