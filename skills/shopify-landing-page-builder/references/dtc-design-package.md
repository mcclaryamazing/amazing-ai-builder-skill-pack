# DTC Design Package

Use this reference before producing or reviewing the strategy, copy, section sequence, image-slot plan, metadata direction, or final Shopify-ready design spec.

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

Every page needs hero clarity, CTA clarity, offer clarity, proof, objection handling, risk reduction, and mobile conversion access.

Do not promise patterns are guaranteed to convert unless the user provides actual conversion data. Use language like conversion-oriented, commonly observed among strong exemplars, or likely valuable.

## Intake Fields

Extract or infer:

```json
{
  "brand": "Name, category, voice, trust level, positioning",
  "product": "Name, type, price, variants, primary benefits, mechanism, objections",
  "offer": "Discount, bundle, free shipping, free gift, guarantee, urgency, eligibility",
  "traffic": "Source, temperature, ad promise, awareness level",
  "proof": "Reviews, UGC, press, certifications, founder/expert proof, guarantee",
  "assets": "Existing product, lifestyle, UGC, packaging, logo, and social images",
  "constraints": "Compliance, claims to avoid, platform, must-include sections",
  "response_path": "Purchase, size/flavor selection, bundle, quiz, lead capture, verification, or collection click"
}
```

Ask only for missing information that would materially change the page. Use verification placeholders for facts that are unavailable.

## Archetype Decision Tree

```text
IF primary goal is email/SMS capture, sample request, giveaway, waitlist, or eligibility:
    use lead_capture_page
ELSE IF the product requires personalization before purchase:
    use quiz_funnel
ELSE IF the hook is a free trial, special discount, free gift, BOGO, or campaign promo:
    use offer_page
ELSE IF the product is a kit, pack, routine, box, or configurable consumable:
    use bundle_builder
ELSE IF the product is subscription-first:
    use subscription_funnel
ELSE IF traffic must choose a category, audience, segment, finish, or collection:
    use collection_splitter
ELSE IF cold traffic needs education or reframing before product selection:
    use advertorial_listicle
ELSE:
    use pdp_direct_response
```

Default to `pdp_direct_response` for product-specific or unclear DTC traffic.

## Copy Strategy Packet

Create this before writing final page copy:

```json
{
  "audience": "Who is most motivated to buy now",
  "awareness_level": "problem_aware | solution_aware | product_aware | brand_aware",
  "customer_problem": "Specific pain, desire, job, or moment",
  "big_idea": "One concrete organizing product truth",
  "mechanism": "Why the product can deliver the promise",
  "primary_hook": "Benefit, curiosity, proof, identity, comparison, or offer hook",
  "transformation": "Before/after change to make believable",
  "proof_needed": ["Proof required for strongest claims"],
  "offer_logic": "Why action now makes sense",
  "response_path": "Actual CTA and next step"
}
```

A strong big idea is concrete, product-specific, easy to understand, visual enough to remember, tied to a real product truth, and supportable by proof, mechanism, or offer logic. Reject generic big ideas that could fit a competitor unchanged.

## Recommended Section Sequences

Most pages should follow this strategic arc:

```text
1. Promo / trust / announcement bar
2. Navigation or minimal landing-page header
3. Hero with product, promise, proof, offer, and CTA
4. Immediate proof or value-prop strip
5. Product mechanism / feature education
6. Offer reinforcement or product selection
7. Comparison / differentiation / objection handling
8. UGC / testimonials / reviews
9. Cross-sell / bundle / subscription / collection recovery
10. FAQ
11. Final CTA recap
12. Email/SMS capture when useful
13. Footer
14. Mobile sticky CTA when useful
```

Common components:

```text
PromoBar
Header
HeroBuyBox
ProofStrip
ValuePropGrid
MechanismSection
IngredientOrMaterialPanel
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

## Hero And CTA Rules

Hero formula:

```text
Eyebrow: offer, audience, or category cue
Headline: specific outcome or transformation
Subheadline: mechanism + who it is for + why it matters
Proof row: rating, review count, press, certification, customer count, or placeholder
CTA: exact next action
Microcopy: shipping, guarantee, returns, cancel anytime, secure checkout, or placeholder
```

CTA selection:

```text
IF size must be selected: Select Size
IF flavor/variant must be selected: Choose Flavors or Choose a Pack
IF bundle must be completed: Build Your Bundle
IF quiz is required: Take the Quiz or Find Your [Result]
IF directly purchasable: Add to Cart or Add to Bag
IF customized: Customize, Start Designing, or Upload Your Design
IF trial offer: Try [Product] Free
IF verification required: Verify Eligibility
IF collection page: Shop [Category] or segment-specific CTAs
IF lead capture: Sign Up, Get My Sample, or Enter Now
```

Do not use `Buy Now` if the customer still needs to choose size, flavor, formula, color, bundle items, or plan.

## Offer And Proof Architecture

Construct offers from five layers:

```json
{
  "primary_incentive": "20% off first order",
  "aov_lever": "Buy 3 save 20%",
  "friction_reducer": "Free shipping over $75",
  "risk_reversal": "30-day money-back guarantee",
  "urgency_or_reason_now": "Limited-time launch offer"
}
```

Display the offer in the promo bar, hero/buy box, product card or plan selector, sticky CTA, mid-page recap, final CTA, and FAQ if terms matter.

Proof hierarchy:

```text
Purchase-adjacent proof: star rating, review count, guarantee, shipping/returns
Human proof: testimonials, UGC, before/after, fit data, customer photos
Authority proof: press, experts, founder, partners, certifications
Technical proof: ingredients, materials, specs, testing, comparison data
Risk proof: money-back guarantee, trial, warranty, secure checkout, free returns
```

Place proof close to the claim it supports.

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
  "image_studio_ratio": "4:5",
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

## Category Cautions

- Apparel: include fit, size selection, fabric, model context, returns/exchanges, swatches when relevant.
- Food, beverage, supplements: include ingredients, taste/flavors, cadence, subscription economics, safety/compliance notes, reviews, guarantee; flag health and clinical claims.
- Beauty and personal care: include routine fit, usage, ingredient rationale, shade/formula selection, result proof; avoid unsupported result claims.
- Home, furniture, cookware, decor: include dimensions, materials, room context, shipping/delivery, returns, warranty, care, financing if valid.
- Pet and baby: emphasize safety, fit, ingredients/materials, expert/certification proof when available; be conservative with claims.
- Wellness, electronics, recovery tech: explain mechanism, setup, specs, warranty, trial/returns, financing, clinical/testing proof when available.
- Outdoor gear: include use cases, durability, materials, specs, environment fit, warranty, in-use imagery.
- Custom or configurable goods: explain customization, preview/proofing, shipping timeline, minimum order, materials, examples, support.

## Design Spec Output

Produce a structured `ShopifyLandingPageDesignSpec` or equivalent with:

- metadata: brand, product, category, archetype, primary goal, traffic source, awareness level
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
