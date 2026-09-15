# DTC Archetypes

Use this reference when choosing or validating the landing-page model, section sequence, and confidence label.

## Decision Tree

Start with a long-form, substantive, transparent `advertorial_listicle`. Default missing traffic to `meta_paid_social` and `cold_prospecting`. Evaluate relevant specialized response paths (lead capture, personalization, subscription, configurable bundles, collection choice or offers) as candidates, not automatic overrides. A discount, subscription or available selector can be a module within the listicle. Override only for a compelling documented functional or strategic reason.

A PDP is eligible only for explicitly identified retargeting traffic. Consider it last, after the long-form listicle and relevant specialized destinations, and select it only when a documented comparison clearly shows it is the strongest fit. Search, Shopping, product awareness, existing-customer status, a discount, subscription, configuration or a named SKU does not independently qualify. PDP variants and hybrids follow this same gate.

Choose destination and persuasion architecture separately. Keep `advertorial_listicle` first and `pdp_direct_response` last in enumerations. AIDA, problem-solution-proof-offer, problem-agitate-solve, mechanism-first, demonstration-first and comparison-first adapt the chosen destination to the ad and remaining belief gap. Category guidance supplies content within that destination. `offer_first_pdp`, `subscription_forward_pdp`, `long_form_pdp` and customization PDPs are variants of `pdp_direct_response`, not eligibility exceptions.

## Archetype Matrix

```text
advertorial_listicle:
  default for cold Meta prospecting; especially strong for problem reframing, curiosity, unfamiliar categories, commodity disruption, and non-obvious value
  sequence: AdvertorialHeader, MessageMatchedHero, NumberedReasons, ProductReveal, MechanismSection, ProofNearClaims, OfferAndPurchasePath, Testimonials, RiskReversal, FAQAccordion, FinalCTA, StickyCTAWhenUseful, Footer

educational_direct_response:
  best when the ad's mechanism, demonstration, comparison, proof, or offer calls for a more direct educational continuation than the default listicle
  sequence: MessageMatchedHero, ProblemOrDesireFraming, ProductReveal, MechanismOrDifferentiation, ProofNearClaims, OfferAndPurchasePath, ComparisonOrObjectionHandling, RiskReversal, FAQAccordion, FinalCTA, StickyCTAWhenUseful, Footer

offer_page:
  best for discount, free gift, free trial, BOGO, campaign promo, sample offer
  sequence: PromoBar, OfferHero, ProofCue, OfferCards, HowItWorks, ValueProps, TermsFAQ, FinalCTA, EmailCapture, Footer

subscription_funnel:
  best for consumables or recurring routines where plan signup is the economic goal
  sequence: PromoBar, MessageMatchedSubscriptionHero, WhatYouGet, MechanismSection, ProofNearClaims, ValuePerUse, SubscriptionToggleAndPlanSelection, ComparisonTable, Reviews, Guarantee, FAQAccordion, StickyCTA, Footer

bundle_builder:
  best for multi-item kits, boxes, routines, packs, or configurable consumables
  sequence: PromoBar, MessageMatchedBundleHero, BundleValueAndMechanism, ProofNearClaims, HowItWorks, BundleBuilder, OfferStack, Reviews, FAQAccordion, StickyCTA, Footer

quiz_funnel:
  best when user state changes the correct recommendation
  sequence: QuizHero, ProofStrip, WhyQuizMatters, ProductEducation, ComparisonTable, Testimonials, FounderOrExpertProof, FAQAccordion, StickyQuizCTA, Footer

collection_splitter:
  best for broad assortment, apparel collections, home collections, gift guides, audience/category paths
  sequence: CollectionHero, AudienceTabs, ProductGrid, ProductCardProof, FitOrUseEducation, ShopTheLook, ReviewsOrUGC, FAQAccordion, EmailCapture, Footer

lead_capture_page:
  best for email/SMS, sample, sweepstakes, waitlist, or low-friction trial
  sequence: LeadHero, ProofCue, OfferOrSampleCards, HowItWorks, FAQAccordion, EmailCapture, SecondaryCommerceBridge, Footer

pdp_direct_response:
  eligible only for explicit retargeting; select last only when it clearly wins the comparison
  sequence: PromoBar, Header, HeroBuyBox, ProofStrip, ValuePropGrid, MechanismSection, OfferStack/ProductSelection, ComparisonTable, UGCGallery, ReviewSummary, FAQAccordion, FinalCTA, StickyCTA, Footer
```

Narrative subscription and bundle heroes continue the ad and establish product value before asking for a plan or bundle selection. They are not renamed commerce-first buy boxes. Embed controls where the persuasion supports them; a PDP-style opening remains subject to the same retargeting-only, last-choice gate.

## Archetype Rules

PDP direct-response:

- make the first screen shoppable
- include price/selector or clear anchor to the buy module
- keep proof near CTA
- include objection handling and final CTA
- avoid generic homepage structure for ad traffic
- require explicitly identified retargeting and a documented last-choice comparison that PDP clearly wins
- do not treat a named product, single SKU, premium price, or configurable product as sufficient eligibility by itself

Educational direct-response:

- continue the ad's exact hook and reason for the click
- identify the product soon enough to preserve trust
- close the remaining belief gap with the matching persuasion architecture
- keep the offer and response path visible without forcing a commerce-first buy box
- use problem-solution-proof-offer as the fallback when no other architecture has a stronger rationale
- avoid hiding commercial intent or delaying the product reveal artificially

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

- use as the default for cold Meta prospecting
- make brand ownership or sponsorship transparent; never imply independent publisher coverage
- identify the product early enough to preserve trust
- use only as many numbered reasons as the evidence supports
- make every reason add product truth, useful education, mechanism, comparison, demonstration, or proof
- keep the offer and response path accessible, especially on mobile
- avoid unsupported claims, filler reasons, clickbait, or excessive preamble

Lead capture:

- keep the form short
- disclose offer/prize/sample terms
- show what happens after capture
- include a secondary commerce bridge when useful

## Scenario Guidance

- Cold Meta, Search, Shopping, product-aware or existing-customer traffic without explicit retargeting: retain the long-form listicle unless a compelling non-PDP destination rationale exists.
- Mechanism/demonstration/comparison hooks: adapt the listicle's argument, or justify an educational destination.
- Subscription, bundle, personalization, category selection, trial or lead-capture tasks: compare the appropriate specialized destination with the listicle; product type alone does not force the switch.
- Explicit retargeting: compare the listicle and relevant specialized destinations first, then PDP last; document why it clearly wins if selected.

## Confidence Label

The confidence labels describe design confidence, not measured performance. Use `validated_pattern` only with relevant observed performance evidence for the destination and persuasion combination; otherwise use `first_draft_to_test`. Do not award this label to a PDP merely because PDPs are common or the brief names one product.

Use `first_draft_to_test` when:

- category is sparse or ambiguous
- brand proof is weak
- offer is unverified
- product has claim-sensitive copy
- page depends on high-cost incentives, celebrity/founder authority, or claims the brand has not substantiated
