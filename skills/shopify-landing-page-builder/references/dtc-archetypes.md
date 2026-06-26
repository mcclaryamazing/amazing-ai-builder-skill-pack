# DTC Archetypes

Use this reference when choosing or validating the landing-page model, section sequence, and confidence label.

## Decision Tree

```text
IF primary goal is email/SMS capture, sample request, giveaway, waitlist, or eligibility:
    use lead_capture_page
ELSE IF the product requires personalization before purchase:
    use quiz_funnel
ELSE IF the hook is a free trial, special discount, free gift, BOGO, or campaign promo:
    use offer_page
ELSE IF the product is a kit, pack, routine, box, or configurable consumable:
    use bundle_builder or pdp_direct_response with bundle module
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

## Archetype Matrix

```text
pdp_direct_response:
  best for single product, configurable product, product-aware traffic, premium products needing proof
  sequence: PromoBar, Header, HeroBuyBox, ProofStrip, ValuePropGrid, MechanismSection, OfferStack/ProductSelection, ComparisonTable, UGCGallery, ReviewSummary, FAQAccordion, FinalCTA, StickyCTA, Footer

offer_page:
  best for discount, free gift, free trial, BOGO, campaign promo, sample offer
  sequence: PromoBar, OfferHero, ProofCue, OfferCards, HowItWorks, ValueProps, TermsFAQ, FinalCTA, EmailCapture, Footer

subscription_funnel:
  best for consumables or recurring routines where plan signup is the economic goal
  sequence: PromoBar, HeroBuyBox, SubscriptionToggle, WhatYouGet, MechanismSection, ValuePerUse, ComparisonTable, Reviews, Guarantee, FAQAccordion, StickyCTA, Footer

bundle_builder:
  best for multi-item kits, boxes, routines, packs, or configurable consumables
  sequence: PromoBar, HeroBuyBox, BundleBuilder, OfferStack, HowItWorks, ValueProps, Reviews, FAQAccordion, StickyCTA, Footer

quiz_funnel:
  best when user state changes the correct recommendation
  sequence: QuizHero, ProofStrip, WhyQuizMatters, ProductEducation, ComparisonTable, Testimonials, FounderOrExpertProof, FAQAccordion, StickyQuizCTA, Footer

collection_splitter:
  best for broad assortment, apparel collections, home collections, gift guides, audience/category paths
  sequence: CollectionHero, AudienceTabs, ProductGrid, ProductCardProof, FitOrUseEducation, ShopTheLook, ReviewsOrUGC, FAQAccordion, EmailCapture, Footer

advertorial_listicle:
  best for cold traffic that needs reframing before purchase intent exists
  sequence: ProblemAgitationHero, CredibilityCue, NumberedReasons, MechanismSection, ProofInsert, OfferBlock, Testimonials, Guarantee, FAQAccordion, FinalCTA

lead_capture_page:
  best for email/SMS, sample, sweepstakes, waitlist, or low-friction trial
  sequence: LeadHero, ProofCue, OfferOrSampleCards, HowItWorks, FAQAccordion, EmailCapture, SecondaryCommerceBridge, Footer
```

## Archetype Rules

PDP direct-response:

- make the first screen shoppable
- include price/selector or clear anchor to the buy module
- keep proof near CTA
- include objection handling and final CTA
- avoid generic homepage structure for ad traffic

Offer page:

- show offer terms early and repeat them near conversion points
- use urgency only when real
- include offer terms in FAQ when terms matter
- avoid hiding the actual product behind promo language

Subscription funnel:

- state cadence, first-order price, future price, savings, cancellation, and commitment truth
- show value per use or per serving where helpful
- include risk reversal and subscription FAQ
- avoid unclear future pricing

Bundle builder:

- show bundle progress, selected items, live price or savings, and persistent order summary
- disable or soften the primary CTA until the required bundle state is complete
- avoid asking users to build before they understand the bundle value

Quiz funnel:

- use only when the quiz reduces complexity or risk
- explain why the quiz improves the result
- keep quiz CTA persistent on mobile
- avoid quiz funnels when a simple selector would be faster

Collection splitter:

- preserve ad scent with audience, use-case, or category paths
- make product cards actionable with price and CTA
- avoid dumping users into an unstructured grid

Advertorial/listicle:

- use when education must precede product selection
- move from problem to mechanism to proof to offer
- avoid unsupported claims or excessive preamble

Lead capture:

- keep the form short
- disclose offer/prize/sample terms
- show what happens after capture
- include a secondary commerce bridge when useful

## Scenario Shortcuts

- product-specific paid social: `pdp_direct_response`
- cold unfamiliar product: `advertorial_listicle` or educational PDP
- consumable subscription: `subscription_funnel`
- personalized product: `quiz_funnel`
- apparel collection: `collection_splitter`
- high-ticket home/furniture/wellness tech: long-form PDP
- sample or low-friction trial: `offer_page` or `lead_capture_page`
- custom/configurable product: customization PDP or collection splitter

## Confidence Label

Use `validated_pattern` when the archetype/category combination follows strong common PDP, collection, offer, or subscription patterns and has enough proof.

Use `first_draft_to_test` when:

- archetype is quiz, advertorial, lead capture, or standalone bundle builder
- category is sparse or ambiguous
- brand proof is weak
- offer is unverified
- product has claim-sensitive copy
- page depends on high-cost incentives, celebrity/founder authority, or claims the brand has not substantiated
