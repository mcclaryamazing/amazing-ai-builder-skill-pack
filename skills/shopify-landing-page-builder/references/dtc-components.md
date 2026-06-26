# DTC Components

Use this reference when shaping the section sequence, component responsibilities, CTA system, sticky CTA, comparison table, review summary, cross-sells, email capture, or image slots.

## Canonical Scaffold

Start from this scaffold and tailor by archetype:

```text
PromoBar
Header
HeroBuyBox
ProofStrip
ValuePropGrid
MechanismSection
IngredientOrMaterialPanel
DimensionOrAnatomyDiagram
HowItWorks
ComparisonTable
OfferStack
SubscriptionToggle
BundleBuilder
UGCGallery
ReviewSummary
CrossSellRail
FAQAccordion
FinalCTA
EmailCapture
Footer
StickyCTA
```

Lead with product, not brand mission. Show price before comparison tables. Place FAQ near the bottom as objection cleanup. Include a non-buyer exit ramp when useful. On long pages, include sticky CTA or final offer recap.

## Hero Commerce Stack

The hero is a compressed buy box, not a billboard.

Include:

- product/category or offer eyebrow
- specific outcome or transformation headline
- mechanism plus audience subheadline
- product visual or gallery
- proof row: rating, review count, press, certification, customer count, guarantee, or placeholder
- offer cue when relevant
- price or selector when relevant
- exact CTA
- reassurance microcopy: shipping, guarantee, returns, cancel anytime, secure checkout, warranty, or placeholder

For unknown brands, do not show a proof-light hero. Add proof placeholders or visible risk reversal.

## CTA Matrix

Use:

- `Add to Cart` or `Add to Bag` only when product/variant is resolved
- `Select Size` when size must be selected
- `Choose Flavors` or `Choose a Pack` for consumables or pack selection
- `Build Your Bundle` for required bundles
- `Take the Quiz` or `Find Your Match` for quiz funnels
- `Customize`, `Start Designing`, or `Upload Your Design` for custom goods
- `Try Free` for verified free-trial offers
- `Verify Eligibility` for eligibility flows
- `Sign Up`, `Get My Sample`, or `Join the Waitlist` for lead capture
- price-anchored CTAs such as `Add to Cart - $89` for high-AOV or configurable products when accurate

## Component Cards

PromoBar:

- purpose: announce offer, shipping, urgency, or trust
- rules: one clear message, real urgency only, avoid competing bars

Header:

- purpose: brand recognition and minimal navigation
- rules: keep paid landing-page navigation minimal; allow category navigation for collection pages

HeroBuyBox:

- purpose: orient skeptical buyers and convert ready buyers
- rules: product understandable, proof near CTA, offer and price not buried, CTA matches real next step

ProofStrip:

- purpose: reduce bounce and build instant credibility
- rules: use 3-5 short proof points; prefer varied proof types; use placeholders when proof is missing

ValuePropGrid:

- purpose: translate benefits into fast-scannable reasons to believe
- rules: use 3-4 cards; avoid generic adjectives; tie each item to a buyer friction

MechanismSection:

- purpose: explain why the product works or why it is different
- rules: best for premium, technical, ingredient/material, wellness, baby/pet, outdoor, and custom products

IngredientOrMaterialPanel:

- purpose: build trust through transparency
- rules: name each ingredient/material, explain user benefit, flag all substantiation needs

DimensionOrAnatomyDiagram:

- purpose: visualize dimensions, layers, compatibility, setup, or hidden mechanisms
- rules: use for home, furniture, baby gear, outdoor gear, electronics, wellness tech, and custom products

HowItWorks:

- purpose: reduce process anxiety
- rules: use for subscriptions, quiz funnels, custom products, setup-heavy products, lead capture, and samples

ComparisonTable:

- purpose: defend value or clarify differentiation
- rules: show price first, use for premium/confusing/category-disruptive products, avoid unsupported competitor claims

OfferStack:

- purpose: make the reason to act clear
- rules: include primary incentive, AOV lever, friction reducer, risk reversal, and real urgency or reason-now when available

SubscriptionToggle:

- purpose: show one-time vs subscription value honestly
- rules: disclose cadence, first-order price, future price, cancellation terms, and savings math

BundleBuilder:

- purpose: help users build a valid multi-item order
- rules: show progress, selected items, price/savings, and a persistent order summary

UGCGallery:

- purpose: make the product feel real and used
- rules: use real UGC only; avoid unsupported before/after claims

ReviewSummary:

- purpose: reduce cognitive load from many reviews
- rules: summarize themes, include real review counts, include fit metadata for apparel and usage context for high-AOV products

CrossSellRail:

- purpose: increase AOV or prevent dead ends
- rules: do not distract before the primary product is understood; keep product cards priced and actionable

FAQAccordion:

- purpose: handle objections near the end
- rules: generate from real objections, not generic filler

FinalCTA:

- purpose: recap product, offer, proof, and risk reversal before footer
- rules: do not force users to scroll back to hero to convert

EmailCapture:

- purpose: create a non-buyer exit ramp
- rules: keep it late unless lead capture is primary; explain what the user receives

StickyCTA:

- purpose: keep conversion access available during long mobile scrolls
- rules: include product/offer, price or selected variant when useful, CTA, and one trust cue; do not cover content

## Image Slot Standard

Do not generate final images by default. Specify every image slot precisely enough for Shopify implementation and later image production:

```json
{
  "slot_id": "hero-product-lifestyle",
  "role": "hero image",
  "section": "hero",
  "desktop_placement": "right column, full height of hero content",
  "mobile_placement": "above headline, full-width",
  "aspect_ratio": "4:5",
  "target_dimensions": "1200 x 1500 px",
  "alignment": "center center",
  "crop_behavior": "cover with product and face/hands inside safe area",
  "description": "Final image description and crop notes",
  "planned_shopify_files_filename": "hero-product-lifestyle.jpg",
  "alt_text": "Descriptive alt text",
  "zoom": true
}
```

Visible placeholder content in the Shopify build should be limited to:

```text
IMAGE: <SLOT-ID>
ASPECT RATIO: <RATIO> | SIZE: <WIDTH> X <HEIGHT> PX
Description: <final image description/crop notes>
```

Do not display internal implementation notes, marketing placeholder headlines, or image-generation instructions inside the image frame.
