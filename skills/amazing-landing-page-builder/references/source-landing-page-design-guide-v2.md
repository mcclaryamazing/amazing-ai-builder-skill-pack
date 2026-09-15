# DTC Landing Page Generation Guide for AI Designers / Codex

## Purpose

This guide instructs an AI landing page generator to create a conversion-oriented DTC landing page for a given:

* Brand  
* Product or product group  
* Offer  
* Traffic source  
* Category  
* Proof inventory  
* Visual identity  
* Conversion goal

The generator’s job is to produce a landing page that feels like **premium ecommerce** but persuades like **direct response**.

The page should be shoppable, clear, proof-backed, mobile-first, and built from reusable DTC design patterns observed across strong vetted exemplars.

---

# 1\. Core Generation Philosophy

## 1.1 The default pattern

Unless the user states otherwise, assume cold-prospecting traffic from Meta paid social and default to:

```
message-matched Meta continuation + transparent listicle by default + visible response path
```

This means the page should continue the ad's hook, resolve why the visitor clicked, and complete the persuasion the ad did not have room to finish. Keep action available when useful, but never use a PDP opening for traffic not explicitly identified as retargeting.

Do **not** default to a generic brand homepage.

Do **not** default to a PDP merely because the brief names a specific product. Default to a transparent, brand-owned listicle for cold Meta traffic, but do not pad it with filler reasons, hide the product artificially, or imply independent publisher coverage.

Do **not** create a beautiful sparse brand page that lacks purchase clarity, offer clarity, proof, or objection handling.

## 1.2 The guiding principle

Every generated page should answer these questions quickly:

```
What is this?
Why should I care?
Why this brand/product?
Why now?
Why is it safe to try?
What do I do next?
```

## 1.3 Strategic caution

Use language such as:

```
commonly observed among strong exemplars
appears to be a reusable pattern
likely valuable for DTC page design
conversion-oriented
high-intent-friendly
```

Avoid unsupported language such as:

```
proven to convert
guaranteed to increase conversion
statistically validated
highest-converting
best-performing
```

Unless actual conversion data, spend, CPA, CTR, CVR, or A/B test results are provided.

---

# 2\. Required Input Contract

Codex should expect input in this approximate shape.

```json
{
  "brand": {
    "name": "Brand Name",
    "category": "apparel | food_supplements | beauty_personal_care | home | pet | wellness | electronics | outdoor_gear | coffee_beverage | other_dtc",
    "positioning": "Short brand positioning",
    "voice": "premium | playful | clinical | irreverent | minimalist | outdoorsy | luxury | friendly | expert-led",
    "visual_identity": {
      "colors": ["#000000", "#FFFFFF"],
      "fonts": {
        "heading": "optional",
        "body": "optional"
      },
      "style_keywords": ["minimalist_clean", "editorial_magazine"]
    },
    "trust_level": "new | growing | established"
  },
  "product": {
    "name": "Product name",
    "type": "single_sku | configurable_sku | bundle | collection | subscription | quiz_personalized | lead_capture_offer",
    "price": "$89",
    "compare_at_price": "$129",
    "aov_level": "low | medium | high",
    "selection_complexity": "none | size | color | flavor | plan | quiz | bundle_builder | compatibility",
    "primary_benefits": [
      "Benefit 1",
      "Benefit 2",
      "Benefit 3"
    ],
    "mechanism": "Why/how the product works",
    "ingredients_or_materials": ["Material or ingredient"],
    "use_cases": ["Use case 1", "Use case 2"],
    "objections": ["Too expensive", "Will it fit?", "Can I cancel?"],
    "claims_requiring_substantiation": [
      "Clinical claim",
      "Sustainability claim",
      "Comparison claim"
    ]
  },
  "offer": {
    "primary_offer": "20% off first order",
    "offer_type": "discount_percent | discount_dollar | bundle_discount | free_shipping | free_gift | free_trial | bogo | subscription_discount | financing | sample | sweepstakes | none",
    "urgency": "Ends tonight | Limited time | Evergreen | None",
    "risk_reversal": "30-day money-back guarantee",
    "shipping": "Free shipping over $75",
    "financing": "Shop Pay / Affirm / Afterpay",
    "subscription": {
      "available": true,
      "discount": "20%",
      "default_selected": false,
      "cancel_policy": "Cancel anytime"
    },
    "bundle_or_aov_lever": "Buy 3 save 20%",
    "free_gift": "Free starter kit",
    "trial": "30-day trial"
  },
  "traffic": {
    "source": "meta_paid_social | google_search | google_shopping | influencer | email | organic | direct",
    "campaign_stage": "cold_prospecting | warm_engagement | retargeting | existing_customer",
    "temperature": "cold | warm | hot",
    "ad_promise": "The exact promise/hook from the ad",
    "ad_angle": "problem | curiosity | aspiration | mechanism | demonstration | comparison | offer | proof",
    "ad_job_completed": ["attention", "problem_recognition"],
    "click_motivation": "Why the visitor left the feed",
    "audience": "Target audience",
    "awareness_level": "unaware | problem_aware | solution_aware | product_aware | brand_aware"
  },
  "proof_inventory": {
    "star_rating": "4.8",
    "review_count": "12000",
    "testimonials": [
      {
        "quote": "Short testimonial",
        "name": "Customer",
        "metadata": "Verified buyer"
      }
    ],
    "ugc_assets": ["image1.jpg", "video1.mp4"],
    "press_logos": ["Forbes", "GQ"],
    "certifications": ["NSF", "OEKO-TEX"],
    "clinical_or_testing": ["Study result or test"],
    "expert_endorsements": ["Expert name"],
    "customer_count": "100,000+ customers",
    "guarantee": "30-day guarantee",
    "founder_story": "Optional founder credibility"
  },
  "assets": {
    "product_images": ["hero-product.png"],
    "lifestyle_images": ["lifestyle.jpg"],
    "ugc_images": ["ugc1.jpg"],
    "videos": ["demo.mp4"],
    "icons": ["shipping.svg", "returns.svg"]
  },
  "constraints": {
    "must_include": ["CTA", "FAQ", "reviews"],
    "must_avoid": ["fake urgency", "medical claims"],
    "compliance_sensitive": true,
    "platform": "shopify | custom_react | nextjs | webflow",
    "mobile_first": true
  }
}
```

---

# 3\. Derived Strategy Fields

Before generating the page, Codex should derive the following:

```json
{
  "derived_strategy": {
    "traffic_source": "meta_paid_social",
    "campaign_stage": "cold_prospecting",
    "recommended_archetype": "advertorial_listicle",
    "default_archetype_status": "retained | overridden",
    "default_override_rationale": "Required when the cold Meta listicle default is overridden",
    "persuasion_architecture": "problem_solution_proof_offer",
    "archetype_rationale": "Why this destination continues the ad and matches awareness",
    "rejected_archetypes": ["Alternative and reason rejected"],
    "pdp_eligibility": "eligible | not_eligible",
    "pdp_eligibility_rationale": "Explicit retargeting evidence and last-choice comparison, or missing requirement",
    "education_need": "low | medium | high",
    "proof_need": "low | medium | high",
    "risk_reversal_need": "low | medium | high",
    "comparison_need": "none | helpful | essential",
    "cta_mode": "direct_purchase | selection | quiz_start | offer_claim | lead_capture | verification",
    "offer_stack_strength": "weak | adequate | strong",
    "claim_sensitivity": "low | medium | high",
    "mobile_sticky_cta": "yes | no",
    "primary_conversion_goal": "purchase | quiz_completion | subscription_start | lead_capture | collection_click | verification"
  }
}
```

Use these derived fields to determine the page structure.

---

# 4\. Archetype Selection Rules

Choose destination and persuasion architecture separately. Keep listicle first and PDP last.

```
DEFAULT traffic = meta_paid_social / cold_prospecting unless explicitly different
DEFAULT destination = substantive long-form advertorial_listicle
First consider embedding required selectors, offers, subscription, quiz or form controls.
Override the listicle only for a compelling documented functional or strategic reason.
Category, product type, promotion and available assets do not decide the destination.
IF explicitly identified retargeting:
    consider pdp_direct_response last, after listicle and justified alternatives
    select only if PDP clearly wins the documented comparison
ELSE:
    PDP is ineligible
```

A PDP is eligible only for explicitly identified retargeting. Consider it last after the long-form listicle and justified alternatives; select it only if it clearly wins a documented comparison. Search/Shopping, product awareness, existing customers, subscriptions, discounts, configurable products, and ad-completed persuasion do not independently qualify. Do not infer retargeting.

Hybrids are canonical variants, not exemptions: offer_first_pdp, subscription_forward_pdp, and long_form_pdp all map to pdp_direct_response and require the same gate. Controls within a listicle do not make it a PDP.

Default to substantive long-form copy. Every reason and section must advance education, mechanism, proof, objections, or offer clarity; do not pad or impose a minimum word count. Shorter copy requires relevant performance data and an explicit rationale explaining its applicability. This is a design default, not a claim long copy always converts better; never invent results.

---

# 5\. Global Page Structure

Most cold Meta pages should follow this strategic arc, adapted to the ad angle and chosen archetype:

```
1. Promo / trust / announcement bar
2. Navigation or minimal landing-page header
3. Message-matched opening that continues the ad promise and click reason
4. Curiosity resolution, problem/desire framing, or immediate demonstration
5. Product reveal and mechanism or differentiating truth
6. Proof placed next to the claims it supports
7. Offer, product selection, and clear response path
8. Comparison, objection handling, and risk reversal
9. UGC / testimonials / reviews
10. FAQ
11. Final CTA recap
12. Email/SMS capture
13. Footer
14. Mobile sticky CTA, if useful
```

Not every page needs every section. But every page should include:

```
hero clarity
CTA clarity
offer clarity
proof
objection handling
risk reduction
mobile conversion access
```

---

# 6\. Core Archetype Blueprints

The situations below describe candidate uses after the routing decision, not automatic overrides. Keep the long-form listicle unless a compelling reason is recorded. Discounts, subscription terms and selectors can remain inside it.

## 6.1 Advertorial / Listicle

Use as the default for cold Meta prospecting, including an unclear brief. It is especially useful for:

```
problem-unaware audiences
curiosity or mistake hooks
products needing reframing
commodity disruption
unfamiliar categories
premium products with non-obvious value
before/after problem contrast
```

Recommended sequence:

```
AdvertorialHeader
MessageMatchedHero
NumberedReasonsSection
SolutionAndProductReveal
MechanismExplanation
ProofNearClaims
OfferAndPurchasePath
Testimonials
RiskReversal
FAQAccordion
FinalCTA
Footer
StickyCTAWhenUseful
```

Common frameworks:

```
“6 Reasons Why” when six substantive reasons exist
“Why customers are switching” when verified evidence supports it
“The smarter way to...”
“Stop using X. Use Y instead.” when the comparison is fair
“Problem → reasons → mechanism → proof → offer”
```

Avoid hiding the product too long, clickbait, thin proof, filler reasons, weak purchase access, and designs that falsely imply independent publisher endorsement. Make sponsorship or brand ownership transparent, identify the product early enough to preserve trust, and keep the offer or response path accessible.

---

## 6.2 Educational Direct-Response Page

Use when the ad's mechanism, demonstration, comparison, proof, or offer calls for a more direct educational continuation than the default listicle.

Problem-solution-proof-offer sequence:

```
MessageMatchedHero
ProblemRecognition
ProblemCostOrFailedOldWay
SolutionAndProductReveal
MechanismExplanation
ProofNearClaims
OfferAndPurchasePath
ComparisonOrObjectionHandling
RiskReversal
FAQAccordion
FinalCTA
Footer
StickyCTAWhenUseful
```

AIDA sequence:

```
AttentionHookFromAd
InterestThroughProblemDesireOrDiscovery
DesireThroughMechanismDemonstrationAndProof
ActionThroughOfferRiskReversalAndCTA
FAQAccordion
FinalCTA
Footer
StickyCTAWhenUseful
```

The opening should identify the product soon enough to preserve trust. Education-first does not mean hiding the commercial intent or delaying the product reveal artificially.

---

## 6.3 Bundle Builder

Use for:

```
flavor packs
multi-box consumables
kits
sets
routine builders
subscription starter packs
high-AOV bundles
```

Recommended sequence:

```
PromoBar
BundleBuilderHero
ProgressSelector
SubscriptionToggle
ProofStrip
ValuePropGrid
UGCGallery
ComparisonTable
FAQAccordion
ReviewFeed
StickyOrderSummary
Footer
```

Required mechanics:

```
show bundle progress, e.g. 0/6 selected
show live price
show savings
show free gift if applicable
show one-time vs subscribe option
disable or soften CTA until bundle is complete
show persistent order summary on desktop and sticky CTA on mobile
```

Reusable patterns:

```
“Build Your Box”
“Choose 6”
“Most Popular”
“Subscribe & Save”
“Free Gift Included”
“Happiness Guarantee”
```

Avoid:

```
unclear completion state
hidden savings math
too many product choices without category tabs
subscription default without clear terms
```

---

## 6.4 Quiz Funnel

Use for:

```
personalized pet food
skincare
supplements
sleep/recovery
style/fit
shade matching
compatibility-based products
```

Recommended sequence:

```
PromoBar
QuizHero
ProofStrip
WhyQuizMatters
ProductEducation
ComparisonTable
IngredientOrMechanismSection
HowItWorks
Testimonials
OfferValueDefense
FounderOrExpertProof
FAQAccordion
FinalQuizCTA
Footer
StickyQuizCTA
```

Hero requirements:

```
clear personalized outcome
quiz CTA
proof near CTA
offer cue
low-friction time estimate if true
```

CTA examples:

```
Find Your Recipe
Take the Quiz
Get Matched
Find Your Routine
Build My Plan
```

Quiz must feel necessary, not gimmicky.

Use quiz when it reduces risk or complexity. Do not use quiz when a simple selector would be faster.

---

## 6.5 Offer Page

Use for:

```
20% off campaign
free gift with purchase
free trial
BOGO
holiday sale
special pricing
sample pack
retargeting promo
```

Recommended sequence:

```
PromoBar
OfferHero
ProductOrPlanSelector
ValuePropGrid
ProofStrip
OfferStack
GuaranteeSection
FAQAccordion
FinalCTA
Footer
StickyCTA
```

Hero requirements:

```
repeat the exact offer
state who it is for
show product clearly
include CTA above the fold
include risk reducer
avoid over-storytelling
```

Offer page conversion logic:

```
specific incentive first
then product choice
then proof
then guarantee
then FAQ
```

Avoid:

```
leading with broad brand mission when ad promised a discount
hiding promo code
unclear eligibility
fake countdowns
weak product context for cold audiences
```

---

## 6.6 Collection Splitter / Category Page

Use for:

```
large assortments
apparel collections
rugs
bedding
business cards
promotional products
collabs
seasonal drops
gift guides
broad paid social traffic
```

Recommended sequence:

```
PromoBar
CollectionHero
AudienceOrCategoryTabs
FilterableProductGrid
ProductCardProof
BestsellerFallbackRail
CategoryEducationBlock
TrustStrip
FAQAccordion
EmailCapture
Footer
StickyPromoOrCTA
```

Product cards should include:

```
image
product name
price
compare-at price if relevant
discount badge
star rating if available
swatches
quick add or select options
badges such as New, Best Seller, Selling Fast
```

Use splitter cards for:

```
Shop Women / Shop Men
Shop by Size
Shop by Finish
Shop by Fabric
Shop by Use Case
Shop Starter Kits
Shop Best Sellers
```

Avoid:

```
sending specific product ad traffic to a generic collection without repeating the product hook
too many filters above the value promise
no proof for lesser-known brands
```

---

## 6.7 Subscription Funnel

Use for:

```
consumables
pet boxes
supplements
coffee
meal replacements
wellness routines
recurring replenishment
```

Recommended sequence:

```
PromoBar
SubscriptionHero
WhatYouGet
PlanSelector
HowItWorks
ValueProps
SubscriptionEconomics
ProofStack
VarietyOrCustomizationSection
CancelAnytimeSection
GuaranteeSection
FAQAccordion
FinalCTA
Footer
StickyCTA
```

Must answer:

```
What do I get?
How often?
What does it cost?
What happens after the first month?
Can I cancel?
Is shipping included?
Is the first order different from future orders?
Why subscribe instead of buying once?
```

Strong subscription offer stack:

```
subscription discount
free shipping
free gift/starter kit
cancel anytime
guarantee
value per use/serving
```

Avoid:

```
unclear recurring terms
first-order incentive that hides future price
subscription selected by default without transparent copy
```

---

## 6.8 Lead Capture Page

Use for:

```
newsletter signup
sample pack
sweepstakes
giveaway
waitlist
SMS capture
eligibility verification
```

Recommended sequence:

```
LeadHero
ValuePropRow
FormBlock
HowItWorks
ProofOrTrust
SecondaryCommerceBridge
FAQAccordion
Footer
```

Lead capture form should include:

```
single clear incentive
minimal fields
privacy/legal copy
clear CTA
fallback commerce link if relevant
```

CTA examples:

```
Sign Up
Get My Sample
Enter Now
Verify With ID.me
Join the Waitlist
Claim My Discount
```

Avoid:

```
asking for too much information too early
unclear prize/offer terms
hiding legal terms for sweepstakes
no next step after capture
```

---

## 6.9 Direct-Response PDP

A PDP is eligible only for explicitly identified retargeting. Consider it last after the long-form listicle and justified alternatives; select it only if it clearly wins a documented comparison. Search/Shopping, product awareness, existing customers, subscriptions, discounts, configurable products, and ad-completed persuasion do not independently qualify. Do not infer retargeting.

Recommended sequence:

```
PromoBar
Header
HeroBuyBox
ProofStrip
ValuePropGrid
ProductMechanismSection
FeatureDetailSections
ComparisonTable or DifferentiationSection
UGCGallery
ReviewSummary
CrossSellRail
FAQAccordion
FinalCTA
EmailCapture
Footer
StickyCTA
```

Hero should include the product image or gallery, product name, benefit-led headline, verified proof, price, offer mechanics, selectors, primary CTA, and shipping, returns, or guarantee microcopy.

Avoid vague `Learn More`, buried selectors, forcing users to scroll back to buy, or treating eligibility as an automatic selection.

---

# 7\. Hero Section Generator Rules

The hero is the highest-leverage section. It should usually contain:

```
specific promise
product comprehension
proof cue
offer cue
CTA
risk reducer
```

## 7.1 Hero copy formula

Use this structure:

```
Eyebrow: offer, audience, or category cue
Headline: specific outcome or transformation
Subheadline: mechanism + who it is for + why it matters
Proof row: rating, review count, press, certification, customer count
CTA: exact next action
Microcopy: shipping, guarantee, returns, cancel anytime, secure checkout
```

Example structure:

```
Eyebrow:
Memorial Day Bundle · Save 35%

Headline:
Cleaner cookware for everyday meals

Subheadline:
A nonstick ceramic-coated cookware set designed for easy cooking, fast cleanup, and a calmer kitchen.

Proof row:
★★★★★ 76,000+ reviews · Free shipping · 30-day returns

CTA:
Add to Cart · $445

Microcopy:
Ships free · Easy returns · No PTFE, PFOA, or PFAS claims require verification
```

## 7.2 Hero visual selection

Choose hero visual based on product type:

| Product type | Hero visual pattern |
| :---- | :---- |
| Simple SKU | Product-on-white |
| Apparel | Product/model gallery with size/fit context |
| Beauty result product | Lifestyle/result imagery plus product |
| Food/supplement | Product packshot plus ingredient/serving cue |
| Pet | Pet/owner lifestyle plus product |
| Home/furniture | Product-on-white plus lifestyle room scene |
| Outdoor/gear | Product-on-white plus in-use environment |
| Quiz | Friendly lifestyle or problem-state visual |
| Advertorial | Problem contrast or lifestyle pain point |
| Offer page | Product \+ offer graphic or campaign visual |

## 7.3 CTA selection algorithm

Use the CTA that reflects the real next step.

```
IF size must be selected:
    CTA = "Select Size"

IF flavor/variant must be selected:
    CTA = "Choose Flavors" or "Choose a Pack"

IF bundle must be completed:
    CTA = "Build Your Bundle" or "Add to Cart" only after completion

IF quiz is required:
    CTA = "Take the Quiz" or "Find Your [Result]"

IF product is directly purchasable:
    CTA = "Add to Cart" or "Add to Bag"

IF product is customized:
    CTA = "Customize" or "Start Designing"

IF trial is the offer:
    CTA = "Try [Product] Free"

IF verification is required:
    CTA = "Verify Eligibility"

IF collection page:
    CTA = "Shop [Category]" or segment-specific CTAs

IF lead capture:
    CTA = "Sign Up", "Get My Sample", or "Enter Now"
```

Avoid mismatched CTAs. Do not use “Buy Now” if the user still needs to choose size, flavor, formula, color, bundle items, or plan.

---

# 8\. Offer Architecture

Strong DTC pages use an offer stack, not a lonely discount.

## 8.1 Offer stack model

Codex should construct the offer from five layers:

```json
{
  "primary_incentive": "20% off first order",
  "aov_lever": "Buy 3 save 20%",
  "friction_reducer": "Free shipping over $75",
  "risk_reversal": "30-day money-back guarantee",
  "urgency_or_reason_now": "Limited-time launch offer"
}
```

## 8.2 Offer display rules

Display the offer in these places:

```
promo bar
hero/buy box
product card or plan selector
sticky CTA if used
mid-page offer recap
final CTA section
FAQ if terms are important
```

## 8.3 Offer pattern by product type

| Product type | Best-fit offer mechanics |
| :---- | :---- |
| Apparel basics | Bundle discount, free shipping, first-order discount |
| Supplements | Subscription discount, starter kit, money-back guarantee |
| Beauty | Bundle sets, free shipping, routine discount, shade help |
| Home/furniture | Sale price, financing, warranty, free shipping, returns |
| Pet subscription | Free gift, first box discount, cancel anytime, guarantee |
| Outdoor gear | Free shipping, warranty, bundle add-ons, financing |
| Lead capture | Sample, sweepstakes, first-order discount |
| Premium electronics/wellness | Free trial, financing, HSA/FSA if valid, warranty |

## 8.4 Offer integrity rules

Do not invent:

```
discounts
review counts
certifications
clinical claims
guarantees
urgency
free shipping
free gifts
financing
subscription savings
```

If missing, use placeholders:

```
[Insert verified review count]
[Insert current shipping threshold]
[Confirm guarantee terms]
[Verify clinical claim]
```

---

# 9\. Proof Architecture

## 9.1 Proof stack hierarchy

Use the best available proof in this order:

```
1. Purchase-adjacent proof
   star rating, review count, guarantee, shipping/returns

2. Human proof
   testimonials, UGC, before/after, fit data, customer photos

3. Authority proof
   press, experts, founder, athletes, partners, certifications

4. Technical proof
   ingredients, materials, specs, clinical/testing, comparison data

5. Risk proof
   money-back guarantee, trial, warranty, secure checkout, free returns
```

## 9.2 Proof placement

Place proof at multiple scroll depths:

```
Hero:
    quick trust cue

Early page:
    proof strip or value prop row

Mid page:
    mechanism proof, certifications, press, comparison

Late page:
    testimonials, reviews, UGC, FAQ, guarantee

Final CTA:
    risk reversal and shipping reminder
```

## 9.3 Proof rules by brand trust level

### New or lesser-known brand

Needs more proof:

```
UGC
reviews
testimonials
guarantee
founder/expert story
certifications
specific product education
```

### Established brand

Can use lighter proof, but still needs:

```
review count or customer count
trust strip
clear guarantee/returns
category-specific reassurance
```

### Premium-priced brand

Must justify value with:

```
mechanism
materials/ingredients
comparison
warranty/guarantee
financing if applicable
deep reviews
```

---

# 10\. Section Blueprint Library

Codex should generate pages from reusable components.

## 10.1 `PromoBar`

Purpose:

```
Announce offer, shipping, urgency, or trust.
```

Props:

```json
{
  "message": "Save 25% for a limited time",
  "secondary_message": "Free shipping over $75",
  "cta_label": "Shop Now",
  "urgency": "Ends Tonight",
  "is_sticky": true
}
```

Rules:

```
Use one clear message.
Avoid multiple competing promo bars unless absolutely necessary.
Urgency must be real.
```

---

## 10.2 `HeroBuyBox`

A PDP opening using this component requires explicitly identified retargeting and a last-choice winning comparison. Purchase controls elsewhere in another archetype do not change its opening or waive that gate.

Purpose:

```
Convert ready buyers and orient everyone else.
```

Props:

```json
{
  "eyebrow": "Limited-time bundle",
  "headline": "The easiest way to upgrade your daily routine",
  "subheadline": "A short product-specific explanation.",
  "media": {
    "type": "gallery",
    "items": ["product.jpg", "lifestyle.jpg"]
  },
  "proof": {
    "rating": "4.8",
    "review_count": "12,000+",
    "badges": ["Free shipping", "30-day guarantee"]
  },
  "price": "$89",
  "compare_at_price": "$129",
  "selectors": ["size", "color"],
  "offer_callout": "Save 30%",
  "cta": {
    "label": "Select Size",
    "action": "select_variant"
  },
  "microcopy": "Free shipping · Easy returns · Secure checkout"
}
```

Rules:

```
Product must be visually understandable.
CTA must match real next step.
Proof should appear near CTA.
Do not bury price or offer.
```

---

## 10.3 `ProofStrip`

Purpose:

```
Reduce bounce and build instant credibility.
```

Props:

```json
{
  "items": [
    {
      "type": "rating",
      "label": "4.8 stars from 12,000+ reviews"
    },
    {
      "type": "shipping",
      "label": "Free shipping over $75"
    },
    {
      "type": "guarantee",
      "label": "30-day money-back guarantee"
    }
  ]
}
```

Rules:

```
Use 3–5 proof points.
Keep each proof point short.
Use icons only if they improve scan speed.
```

---

## 10.4 `ValuePropGrid`

Purpose:

```
Translate benefits into fast-scannable cards.
```

Props:

```json
{
  "headline": "Why customers switch",
  "items": [
    {
      "title": "Better fit",
      "body": "Designed to reduce bunching and improve everyday comfort.",
      "icon": "fit.svg"
    },
    {
      "title": "Easy care",
      "body": "Machine washable and built for repeated use.",
      "icon": "wash.svg"
    },
    {
      "title": "Risk-free",
      "body": "Try it with free returns.",
      "icon": "returns.svg"
    }
  ]
}
```

Rules:

```
Use 3 or 4 cards.
Make each card a reason to believe, not a generic adjective.
```

---

## 10.5 `MechanismSection`

Purpose:

```
Explain why the product works or why it is different.
```

Props:

```json
{
  "headline": "What makes it different",
  "subheadline": "The proprietary fabric, ingredient, design, or technology behind the benefit.",
  "layout": "image_left_text_right | cards | dark_band | annotated_visual",
  "claims": [
    {
      "claim": "30% larger",
      "support": "Requires substantiation"
    }
  ]
}
```

Best for:

```
supplements
beauty
home goods
outdoor gear
wellness tech
baby/pet products
premium apparel fabrics
```

---

## 10.6 `ComparisonTable`

Purpose:

```
Help users understand why this product is better, safer, easier, or worth more.
```

Props:

```json
{
  "headline": "How we compare",
  "columns": ["Brand Product", "Conventional Option", "Premium Competitor"],
  "rows": [
    {
      "feature": "Free shipping",
      "brand": true,
      "competitor_1": false,
      "competitor_2": true
    },
    {
      "feature": "Machine washable",
      "brand": true,
      "competitor_1": false,
      "competitor_2": false
    }
  ],
  "highlight_column": "Brand Product"
}
```

Use when:

```
product is premium-priced
category is confusing
there are multiple product tiers
there is a meaningful “us vs them” story
buyers need help choosing
```

Avoid when:

```
comparison claims cannot be supported
table creates fake superiority
product is too simple and low-consideration
```

---

## 10.7 `HowItWorks`

Purpose:

```
Reduce process anxiety.
```

Props:

```json
{
  "headline": "How it works",
  "steps": [
    {
      "number": "1",
      "title": "Choose your plan",
      "body": "Pick the option that fits your routine."
    },
    {
      "number": "2",
      "title": "Get it delivered",
      "body": "Your order ships directly to your door."
    },
    {
      "number": "3",
      "title": "Adjust anytime",
      "body": "Change, pause, or cancel when needed."
    }
  ]
}
```

Best for:

```
subscriptions
quiz funnels
custom products
baby/pet products
setup-heavy products
free samples
lead capture
```

---

## 10.8 `IngredientOrMaterialPanel`

Purpose:

```
Build trust through transparency.
```

Props:

```json
{
  "headline": "Inside the formula",
  "items": [
    {
      "name": "Ingredient/material",
      "benefit": "What it does",
      "proof": "Certification, sourcing, or testing if available"
    }
  ],
  "compliance_note": "Verify all ingredient/material claims before publishing."
}
```

Best for:

```
supplements
food/beverage
beauty
baby care
home goods
apparel fabric
outdoor gear materials
```

---

## 10.9 `UGCGallery`

Purpose:

```
Make the product feel real, used, and socially validated.
```

Props:

```json
{
  "headline": "Loved in real life",
  "items": [
    {
      "type": "image",
      "src": "ugc1.jpg",
      "caption": "Verified customer"
    }
  ]
}
```

Rules:

```
Use UGC after product education or before reviews.
Do not use fake UGC.
For beauty/results categories, avoid unsupported before/after claims.
```

---

## 10.10 `ReviewSummary`

Purpose:

```
Reduce cognitive load from many reviews.
```

Props:

```json
{
  "headline": "What customers are saying",
  "rating": "4.8",
  "review_count": "12,000+",
  "summary_bullets": [
    "Customers mention soft feel",
    "Customers like the fit",
    "Customers appreciate easy returns"
  ],
  "featured_reviews": [
    {
      "quote": "Short customer quote",
      "name": "Verified buyer",
      "metadata": "Size M · 5'10\""
    }
  ]
}
```

For apparel, include fit metadata when available:

```
height
weight
usual size
purchased size
fit scale
```

For high-AOV products, include:

```
verified buyer badge
usage context
photo/video reviews
```

---

## 10.11 `CrossSellRail`

Purpose:

```
Increase AOV or prevent dead ends.
```

Props:

```json
{
  "headline": "Complete the routine",
  "items": [
    {
      "name": "Related product",
      "price": "$29",
      "image": "related.jpg",
      "cta": "Add"
    }
  ]
}
```

Use after:

```
hero for simple add-ons
education for routine building
reviews for recovery merchandising
```

Avoid:

```
distracting before the primary product is understood
too many cross-sells above the primary CTA
```

---

## 10.12 `FAQAccordion`

Purpose:

```
Handle objections near the end of the page.
```

FAQ categories by product type:

```
shipping
returns
guarantee
sizing
ingredients/materials
subscription cancellation
how to use
cleaning/care
compatibility
safety
delivery timing
trial terms
warranty
```

Props:

```json
{
  "headline": "Questions? We’ve got answers.",
  "items": [
    {
      "question": "How does shipping work?",
      "answer": "Use verified shipping terms."
    }
  ]
}
```

---

## 10.13 `StickyCTA`

Purpose:

```
Keep conversion access available during long mobile scrolls.
```

Props:

```json
{
  "enabled": true,
  "mobile_first": true,
  "content": {
    "product_name": "Product Name",
    "price": "$89",
    "selected_variant": "Size M",
    "cta_label": "Add to Cart",
    "trust_microcopy": "Free shipping · 30-day returns"
  }
}
```

Use when:

```
long PDP
offer page
bundle builder
quiz funnel
high-AOV product
mobile traffic
```

Avoid when:

```
it covers content
it duplicates too many controls
it creates pressure before product clarity
```

---

# 11\. Category-Specific Generation Rules

Category packs adapt copy, proof, visual slots and controls within the selected archetype. They never override routing or authorize a buy-box opening. Every PDP variant remains subject to explicit retargeting and the last-choice comparison.

## 11.1 Apparel

Primary buyer frictions:

```
fit
size
feel
returns
quality
styling
color choice
```

Recommended hero:

```
product/model gallery
visible rating
size selector
fit guidance
clear price
Select Size CTA
shipping/returns microcopy
```

Recommended sections:

```
Fit/Feel feature grid
Fabric or material section
Shop the Look
Comparison of styles
Reviews with fit metadata
UGC/lifestyle gallery
FAQ: sizing, returns, care
```

Offer patterns:

```
bundle discount
multi-buy pricing
free shipping threshold
first-order discount
```

Visual patterns:

```
minimalist clean
editorial photography
white/neutral canvas
black or dark CTA
swatches
```

Avoid:

```
direct Add to Cart before size selection
low-quality photography
no fit guidance
reviews without fit context
```

---

## 11.2 Food, Beverage, and Supplements

Primary buyer frictions:

```
taste
habit fit
ingredient trust
price per serving
subscription terms
health/claim credibility
```

Recommended hero:

```
product packshot
serving/use visual
rating/review count
subscription savings if relevant
free gift/starter kit if available
Get Started / Choose Flavors CTA
```

Recommended sections:

```
Ingredient transparency
Science or formulation explanation
Comparison vs alternatives
Value per serving
How to use
Subscription benefits
Taste guarantee
Reviews/UGC
FAQ: ingredients, allergens, cancellation, shipping
```

Offer patterns:

```
subscription discount
free starter kit
free shipping
money-back guarantee
bundle discount
first-order discount
```

Visual patterns:

```
clinical-premium for supplements
playful colorful for snacks/cereal
ingredient macro imagery
clear product cards
```

Avoid:

```
unverified health claims
unclear subscription pricing
generic “healthy” copy
no taste reassurance
```

---

## 11.3 Beauty and Personal Care

Primary buyer frictions:

```
will it work for me
shade/skin match
routine fit
safety
ingredients
results
```

Recommended hero:

```
result-led lifestyle image
product image
rating/review count
shade or routine help
Add to Bag / Take Quiz CTA
free shipping/returns
```

Recommended sections:

```
Benefits
How to use
Ingredients
Before/after if compliant
Clinical or user results if verified
UGC gallery
Routine-building cross-sells
Reviews
FAQ: shade, skin type, returns
```

Offer patterns:

```
bundle sets
free shipping
routine discount
first-order discount
quiz/shade finder
```

Visual patterns:

```
editorial magazine
soft neutrals
premium typography
black CTAs
result photography
```

Avoid:

```
unsupported before/after claims
too much founder reliance without proof
unclear shade selection
weak product education
```

---

## 11.4 Home, Furniture, Cookware, and Décor

Primary buyer frictions:

```
price
fit/dimensions
shipping
returns
cleaning
durability
material safety
style compatibility
```

Recommended hero:

```
product-on-white plus lifestyle context
price/discount
configuration controls
reviews
financing if high AOV
Add to Cart with price
shipping/returns/guarantee line
```

Recommended sections:

```
Material/spec education
Dimensions
Lifestyle use cases
Comparison table
Care/cleaning section
Warranty/returns
UGC/reviews
Cross-sells/accessories
FAQ
```

Offer patterns:

```
bundle savings
seasonal sale
free shipping
financing
warranty
return guarantee
```

Visual patterns:

```
warm neutrals
editorial home imagery
serif headings
clean product cards
muted CTA with one strong accent
```

Avoid:

```
no dimensions
no shipping clarity
weak return reassurance
style-heavy page with no operational confidence
```

---

## 11.5 Pet and Baby

Primary buyer frictions:

```
safety
effectiveness
convenience
subscription terms
fit/size/stage
trust
health claims
```

Recommended hero:

```
warm lifestyle image
clear product/offer
expert/vet/parent proof if available
rating/review count
Get Started / Choose Size / Find Recipe CTA
guarantee or free shipping
```

Recommended sections:

```
How it works
Safety/ingredient proof
Stage or size explanation
Comparison
Subscription or plan logic
UGC/testimonials
Founder/expert proof
FAQ
Guarantee
```

Offer patterns:

```
free gift
first-order discount
subscription savings
free shipping
money-back guarantee
bundle supply
```

Visual patterns:

```
friendly premium
soft colors
rounded cards
warm photography
clean clinical cues for safety
```

Avoid:

```
unsupported medical/health claims
unclear subscription future pricing
too much cuteness without safety proof
```

---

## 11.6 Wellness, Electronics, and Recovery Tech

Primary buyer frictions:

```
price
credibility
setup
daily usage
app/device value
warranty
financing
health claims
```

Recommended hero:

```
premium lifestyle or device render
specific outcome
financing/trial if available
proof cue
Shop Now / Try Free CTA
```

Recommended sections:

```
How it works
Science/results
Use cases
App or ecosystem explanation
Comparison table
Specs
Financing/trial/warranty
Reviews
FAQ
```

Offer patterns:

```
free trial
financing
warranty
HSA/FSA if valid
free shipping
money-back guarantee
```

Visual patterns:

```
premium dark
clinical minimal
stat cards
device/app UI imagery
cinematic lifestyle
```

Avoid:

```
technical jargon without benefit translation
regulated claims without substantiation
high price without financing or risk reversal
```

---

## 11.7 Outdoor Gear and Utility Products

Primary buyer frictions:

```
durability
technical specs
price
use-case fit
warranty
shipping
compatibility
```

Recommended hero:

```
product-on-white
specific utility promise
review proof
price
Add to Cart CTA
trust strip
```

Recommended sections:

```
Feature tiles
Annotated product image
In-use lifestyle section
Specs
Comparison
FAQ
Reviews with use cases
Accessory cross-sells
```

Offer patterns:

```
free shipping
warranty
bundle discounts
financing for high AOV
```

Visual patterns:

```
minimalist technical
black/white/gray
outdoor lifestyle photography
blue/teal/orange CTA accents
```

Avoid:

```
feature list without use-case explanation
no specs
no durability proof
weak warranty visibility
```

---

## 11.8 Custom / Print / Configurable Goods

Primary buyer frictions:

```
quality uncertainty
customization effort
design confidence
shipping timing
proof of final result
```

Recommended hero:

```
premium product photography
customization CTA
starting price
sample or design help offer
trust cue
```

Recommended sections:

```
Sample pack bridge
How customization works
Design options
Product tiers
Comparison of finishes/materials
Customer examples
FAQ
Guarantee
```

CTA examples:

```
Start Designing
Customize
Get a Sample
Design It For Me
```

Avoid:

```
forcing customization before explaining quality
no sample bridge
no design support path
unclear production/shipping timeline
```

---

# 12\. Marketing Framework Selection

Codex should combine frameworks, not use only one.

## 12.1 Default Meta ad-to-page framework

Unless the user states otherwise, assume cold Meta paid social and use this mental model:

```
Ad Angle and Promise
→ Reason for the Click
→ Persuasion Already Completed by the Ad
→ Remaining Belief Gap
→ Product Mechanism or Differentiating Truth
→ Proof Near Claims
→ Offer and Response Path
→ Objection Handling and Risk Reversal
```

Choose the destination archetype separately from the persuasion architecture. For unclear cold Meta traffic, default to a transparent, brand-owned long-form advertorial/listicle using a reason-based problem-solution-proof-offer argument.

## 12.2 Framework by situation

| Situation | Framework |
| :---- | :---- |
| Cold Meta, problem-led click | Problem → solution → proof → offer |
| Cold Meta, curiosity or reframing click | Transparent advertorial/listicle + problem agitation and resolution |
| Cold Meta, aspiration or discovery click | AIDA + mechanism, demonstration, or comparison |
| Cold Meta, mechanism or demonstration click | Continue the mechanism/demonstration → proof → offer |
| Cold Meta, comparison click | Comparison-first education → proof → offer |
| Explicit retargeting | Listicle and justified alternatives first; PDP last only if it clearly wins |
| Search/Shopping, product-aware, or existing-customer traffic without explicit retargeting | Adapt argument to intent; no PDP eligibility |
| Premium product | Problem → mechanism → proof → offer |
| Discount campaign | Offer-first promo |
| Personalized product | Quiz funnel |
| Commodity disruption | Us-vs-them comparison |
| High-AOV tech | Educational mechanism \+ proof stack |
| New product launch | AIDA \+ comparison |
| Brand-led homepage | Brand story \+ social proof stack |
| Cold traffic advertorial | Problem agitation \+ listicle |
| Broad collection | Collection splitter \+ merchandising |

Available persuasion architectures include AIDA, problem-solution-proof-offer, problem-agitate-solve, mechanism-first, demonstration-first, comparison-first, and offer-first. Select the sequence that continues the ad and closes the visitor's remaining belief gap; do not treat any sequence as a universal psychological law.

---

# 13\. Visual Design System Rules

## 13.1 Dominant visual styles

Common reusable styles:

```
minimalist_clean
editorial_magazine
premium_dark
playful_colorful
clinical_medical
outdoorsy_natural
ugc_raw
```

Select style based on category and brand voice.

## 13.2 Visual style mapping

| Brand/product type | Recommended visual direction |
| :---- | :---- |
| Premium apparel | Minimalist editorial |
| Supplements | Clinical-premium |
| Snacks/cereal | Playful colorful |
| Beauty | Editorial premium |
| Beauty tech | Clinical luxury |
| Home goods | Warm minimalist |
| Furniture | Premium neutral editorial |
| Pet | Friendly playful premium |
| Outdoor gear | Technical minimalist |
| Wellness electronics | Premium dark \+ clinical |
| Lead capture/giveaway | High-contrast campaign design |

## 13.3 Design token guidelines

Codex should define page-level tokens:

```json
{
  "theme": {
    "colors": {
      "background": "#FFFFFF",
      "surface": "#F7F4EF",
      "text": "#111111",
      "muted_text": "#666666",
      "primary_cta": "#111111",
      "primary_cta_text": "#FFFFFF",
      "accent": "#F4C542",
      "success": "#1F7A4D"
    },
    "typography": {
      "heading_style": "serif_editorial | bold_sans | condensed_sans | clinical_sans",
      "body_style": "clean_sans",
      "button_style": "pill | square | rounded"
    },
    "spacing": {
      "section_padding_desktop": "72px",
      "section_padding_mobile": "40px",
      "card_radius": "16px"
    }
  }
}
```

## 13.4 Design rules

Use:

```
clear hierarchy
large product images
high contrast CTA
generous whitespace
rounded cards when appropriate
alternating section backgrounds
mobile-first stacking
sticky CTA for long mobile pages
```

Avoid:

```
low-contrast CTA
too many accent colors
dense text blocks
generic stock imagery
empty minimalist sections
unstructured grids
```

---

# 14\. Copywriting Rules

## 14.1 Copy should be specific

Prefer:

```
“Save 25% on your first order”
“Choose your 6-box bundle”
“Free shipping over $75”
“30-day money-back guarantee”
“Designed for wide feet”
“12-hour leak protection”
```

Avoid:

```
“Better products for better living”
“Premium quality you’ll love”
“Shop our amazing collection”
“Transform your life”
```

## 14.2 Copy hierarchy

Each section should have:

```
eyebrow
headline
supporting subheadline
2–4 bullets or cards
CTA or proof cue when appropriate
```

## 14.3 Headline formulas

Use category-specific formulas.

### Product outcome

```
The [product] built for [specific outcome]
```

### Problem/solution

```
Finally, [solution] without [common frustration]
```

### Premium mechanism

```
Powered by [mechanism], designed for [benefit]
```

### Offer

```
Get [product] today and save [discount]
```

### Quiz

```
Find the right [product/result] for your [need]
```

### Collection

```
Shop [category] made for [use case/audience]
```

### Subscription

```
Your [routine/product] delivered every [cadence]
```

## 14.4 CTA microcopy

Always add microcopy near high-friction CTAs:

```
Free shipping over $75
30-day returns
Cancel anytime
Ships in 1–2 business days
Secure checkout
HSA/FSA eligible, if valid
Try risk-free
```

## 14.5 FAQ generation rules

Generate FAQs from objections, not generic filler.

Minimum FAQ set:

```
Shipping
Returns/guarantee
Sizing/fit or compatibility
How to use
Subscription/cancellation if relevant
Ingredient/material/safety if relevant
Offer terms
```

---

# 15\. Codex Output Contract

Create an actual reviewable desktop/mobile wireframe artifact before final imagery, not only JSON or a slot list. Every image slot must be a visible placeholder, even when suitable assets exist. Describe the ideal image independently of available assets: purpose, composition, aspect ratio, target dimensions, placement, focal point, and mobile crop. Internally review the rendered wireframe and obtain approval before selecting, generating, or inserting final imagery by default. Explicit end-to-end authorization may waive the pause, never the artifact or internal review. The internal DTC skill does not generate final images; hand off to Shopify Storefront Ops.

Codex should generate two outputs:

```
1. LandingPageSpec JSON
2. Rendered desktop/mobile wireframe with image placeholders only
3. Shopify implementation handoff
```

The JSON spec should be the source of truth.

## 15.1 Recommended `LandingPageSpec` shape

```json
{
  "metadata": {
    "brand_name": "Brand",
    "product_name": "Product",
    "category": "apparel",
    "generated_archetype": "advertorial_listicle",
    "persuasion_architecture": "problem_solution_proof_offer",
    "primary_goal": "purchase",
    "traffic_source": "meta_paid_social",
    "campaign_stage": "cold_prospecting",
    "awareness_level": "problem_aware"
  },
  "strategy": {
    "traffic_assumption": "Cold Meta paid social unless the user specified otherwise",
    "ad_angle": "problem",
    "ad_job_completed": ["attention", "problem recognition"],
    "click_motivation": "Why the visitor left the feed",
    "remaining_belief_gap": "What the page still must establish",
    "ad_message_match": "How the hero repeats the ad promise",
    "archetype_rationale": "Why this destination fits the traffic and remaining persuasion job",
    "default_archetype_status": "retained",
    "default_override_rationale": null,
    "rejected_archetypes": ["pdp_direct_response: no explicitly identified retargeting"],
    "pdp_eligibility": "not_eligible",
    "pdp_eligibility_rationale": "No explicitly identified retargeting",
    "copy_length": "long_form",
    "shorter_copy_evidence_and_rationale": null,
    "primary_promise": "Specific landing page promise",
    "positioning": "Why this product is different",
    "offer_stack": {
      "primary_incentive": "20% off",
      "aov_lever": "Bundle discount",
      "friction_reducer": "Free shipping",
      "risk_reversal": "30-day guarantee",
      "urgency": "Limited time"
    },
    "proof_stack": {
      "hero_proof": ["4.8 stars", "12,000+ reviews"],
      "authority_proof": ["Certification"],
      "human_proof": ["UGC", "testimonials"],
      "risk_proof": ["Guarantee"]
    },
    "cta_strategy": {
      "primary_cta": "Select Size",
      "cta_mode": "selection",
      "sticky_cta": true,
      "secondary_ctas": ["Shop the Look"]
    }
  },
  "theme": {
    "visual_style": ["minimalist_clean", "editorial_magazine"],
    "colors": {
      "background": "#FFFFFF",
      "surface": "#F6F3EE",
      "text": "#111111",
      "primary_cta": "#111111",
      "primary_cta_text": "#FFFFFF",
      "accent": "#D7B56D"
    },
    "typography": {
      "heading": "serif_editorial",
      "body": "clean_sans",
      "buttons": "pill"
    }
  },
  "sections": [
    {
      "id": "promo_bar",
      "component": "PromoBar",
      "priority": "required",
      "props": {
        "message": "Save 20% for a limited time",
        "cta_label": "Shop Now",
        "is_sticky": true
      }
    },
    {
      "id": "hero",
      "component": "AdvertorialHeader",
      "priority": "required",
      "props": {
        "ownership_disclosure": "Brand-owned guide",
        "headline": "A reason-based continuation of the Meta ad promise",
        "subheadline": "Introduce the product category and explain why the numbered argument matters.",
        "cta_label": "See the Reasons",
        "proof": {
          "status": "placeholder",
          "needed": "Strongest verified trust cue"
        }
      }
    }
  ],
  "compliance": {
    "claims_to_verify": [
      "Any clinical, health, sustainability, safety, or comparison claim"
    ],
    "do_not_invent": [
      "review counts",
      "discounts",
      "certifications",
      "guarantees",
      "urgency"
    ]
  },
  "qa_checklist": {
    "hero_repeats_ad_promise": true,
    "cta_matches_next_step": true,
    "proof_near_cta": true,
    "mobile_sticky_cta_present_if_needed": true,
    "faq_handles_objections": true,
    "claims_flagged_for_review": true
  }
}
```

---

# 16\. Implementation Guidance for Codex

This is illustrative prototype architecture, not a requirement to replace Shopify with React. Image paths in example props describe future assets; all first-wireframe slots must remain placeholders. Shopify Storefront Ops owns production implementation.

## 16.1 Recommended component architecture

For a React / Next.js implementation:

```
/components/landing-page/
  PromoBar.tsx
  Header.tsx
  HeroBuyBox.tsx
  ProofStrip.tsx
  ValuePropGrid.tsx
  MechanismSection.tsx
  ComparisonTable.tsx
  HowItWorks.tsx
  IngredientMaterialPanel.tsx
  BundleBuilder.tsx
  SubscriptionToggle.tsx
  UGCGallery.tsx
  ReviewSummary.tsx
  CrossSellRail.tsx
  FAQAccordion.tsx
  FinalCTA.tsx
  StickyCTA.tsx
  EmailCapture.tsx
  Footer.tsx

/data/
  landingPageSpec.ts

/app/
  page.tsx
```

## 16.2 Rendering rule

The page should render from `sections[]`.

Pseudo-logic:

```ts
sections.map(section => {
  switch (section.component) {
    case "PromoBar":
      return <PromoBar {...section.props} />;
    case "AdvertorialHeader":
      return <AdvertorialHeader {...section.props} />;
    case "MessageMatchedHero":
      return <MessageMatchedHero {...section.props} />;
    case "HeroBuyBox":
      return <HeroBuyBox {...section.props} />;
    case "ProofStrip":
      return <ProofStrip {...section.props} />;
    case "ValuePropGrid":
      return <ValuePropGrid {...section.props} />;
    case "ComparisonTable":
      return <ComparisonTable {...section.props} />;
    case "FAQAccordion":
      return <FAQAccordion {...section.props} />;
    default:
      throw new Error(`Implement selected section: ${section.component}`);
  }
});
```

## 16.3 CSS rules

Use:

```
CSS variables for design tokens
mobile-first layout
semantic HTML
accessible buttons
alt text for images
focus states
responsive product gallery
sticky CTA safe-area padding on mobile
```

Avoid:

```
hard-coded unchangeable content
fake product data
non-accessible accordions
CTA buttons without actions
text embedded in images
layout shifts from unreserved image space
```

## 16.4 Performance rules

Prioritize:

```
compressed images
lazy loading below-fold images
no unnecessary animation
minimal JavaScript
server-rendered content when possible
fast mobile LCP
```

---

# 17\. Landing Page QA Scoring Rubric

Codex should score the generated page before finalizing. A score cannot waive explicit retargeting and the last-choice comparison for a PDP, the long-copy evidence requirement, or the actual internally reviewed placeholder-only wireframe.

```json
{
  "conversion_readiness_score": {
    "ad_scent": 0,
    "hero_clarity": 0,
    "offer_clarity": 0,
    "cta_quality": 0,
    "proof_strength": 0,
    "education_quality": 0,
    "objection_handling": 0,
    "mobile_ux": 0,
    "visual_hierarchy": 0,
    "claim_hygiene": 0
  }
}
```

Recommended scoring:

| Criterion | Max points |
| :---- | ----: |
| Ad scent / message match | 10 |
| Hero clarity | 15 |
| Offer clarity | 10 |
| CTA quality | 10 |
| Proof strength | 10 |
| Product education | 10 |
| Objection handling | 10 |
| Mobile UX | 10 |
| Visual hierarchy | 10 |
| Claim hygiene | 5 |
| **Total** | **100** |

Regeneration rules:

```
IF total score < 80:
    revise page

IF hero clarity < 12:
    rewrite hero

IF CTA quality < 8:
    fix CTA and purchase path

IF proof strength < 7 and brand is new:
    add proof placeholders or stronger risk reversal

IF claim hygiene < 5:
    flag claims and remove unsupported language

IF mobile UX < 8:
    simplify sections and add/fix sticky CTA
```

---

# 18\. Anti-Pattern Checklist

Codex must check for these before final output.

## Strategic anti-patterns

```
Generic homepage for specific ad traffic
Hero does not repeat ad promise
Offer is unclear or hidden
CTA does not match next action
No proof above the fold
No risk reversal
No FAQ
No final CTA recap
Too many navigation exits
Cross-sells distract from primary conversion
```

## Design anti-patterns

```
Low contrast CTA
Too many competing colors
Sparse minimalist page with low persuasion density
Dense text without visual breaks
Unclear product imagery
No mobile sticky CTA on long pages
Sticky CTA blocks important content
```

## Copy anti-patterns

```
Vague benefit language
Unsupported “best” claims
Fake urgency
Unverified clinical/medical claims
Unclear subscription terms
Unclear discount math
No objection handling
```

## Category anti-patterns

```
Apparel without fit guidance
Supplements without ingredient transparency
Beauty without usage/result explanation
Home goods without dimensions/care/shipping clarity
Pet/baby without safety reassurance
Tech/wellness without warranty/financing/setup clarity
Collection pages without segmentation
Quiz pages where the quiz does not add value
```

---

# 19\. Final Codex Instruction Block

Use this as the operating prompt for the AI landing page generator.

```
You are generating a DTC landing page for a specific brand, product, offer, and traffic source. Unless the user states otherwise, assume cold-prospecting traffic from Meta paid social.

Your goal is to create a conversion-oriented landing page spec and implementation that feels like premium ecommerce and persuades like direct response.

Do not create a generic homepage unless the input explicitly requires a brand homepage. For the default cold Meta case, use a transparent, brand-owned long-form advertorial/listicle with a reason-based problem-solution-proof-offer argument. Override only for a compelling documented reason; categories and commerce mechanics are not automatic overrides. Every PDP variant requires explicitly identified retargeting and a last-choice winning comparison. Do not select a PDP merely because the brief names a specific product.

First, analyze the input and derive:
- normalized category
- product type
- buyer awareness level
- ad angle and exact promise
- why the visitor clicked
- persuasion already completed by the ad
- remaining belief gap
- traffic temperature
- campaign stage
- primary conversion goal
- recommended funnel archetype
- persuasion architecture
- rejected alternatives
- PDP eligibility and rationale
- education need
- proof need
- comparison need
- offer stack
- CTA mode
- mobile sticky CTA need
- claim sensitivity

Then select one archetype. Keep the default first and PDP last in any enumeration:
- advertorial_listicle
- educational_direct_response
- bundle_builder
- quiz_funnel
- offer_page
- collection_splitter
- subscription_funnel
- lead_capture_page
- pdp_direct_response

Select one persuasion architecture:
- aida
- problem_solution_proof_offer
- problem_agitate_solve
- mechanism_first
- demonstration_first
- comparison_first
- offer_first

A PDP is eligible only for explicitly identified retargeting. Consider it last after the long-form listicle and justified alternatives; select it only if it clearly wins a documented comparison. Search/Shopping, product awareness, existing customers, subscriptions, discounts, configurable products, and ad-completed persuasion do not independently qualify. Do not infer retargeting.

Build the page using modular sections:
- PromoBar
- Header
- HeroBuyBox or archetype-specific hero
- ProofStrip
- ValuePropGrid
- MechanismSection
- IngredientOrMaterialPanel
- HowItWorks
- ComparisonTable
- OfferStack
- SubscriptionToggle
- BundleBuilder
- UGCGallery
- ReviewSummary
- CrossSellRail
- FAQAccordion
- FinalCTA
- EmailCapture
- Footer
- StickyCTA

The hero must include:
- specific promise
- product comprehension
- proof cue
- offer cue if relevant
- primary CTA
- trust microcopy

The CTA must match the real next action:
- Add to Cart for direct purchase
- Select Size for apparel sizing
- Choose Flavors or Choose a Pack for consumables
- Build Your Bundle for configurable bundles
- Find Your Recipe / Take the Quiz for quiz funnels
- Start Designing / Customize for custom products
- Try Free for free-trial offers
- Verify Eligibility for eligibility offers
- Sign Up / Get My Sample for lead capture

Use an offer stack:
- primary incentive
- AOV lever
- friction reducer
- risk reversal
- urgency/reason-now if real

Use a proof stack:
- rating/review count
- testimonials/UGC
- authority proof
- technical proof
- guarantee/risk proof

Do not invent:
- review counts
- testimonials
- discounts
- guarantees
- clinical claims
- certifications
- expert endorsements
- urgency
- shipping terms

If something is missing, create a placeholder and flag it for merchant/legal verification.

Make the page mobile-first:
- large readable hero
- compact scannable sections
- sticky CTA when useful
- no content-blocking overlays
- fast-loading images
- accessible buttons and accordions

Default to substantive long-form copy. Every reason and section must advance education, mechanism, proof, objections, or offer clarity; do not pad or impose a minimum word count. Shorter copy requires relevant performance data and an explicit rationale explaining its applicability. This is a design default, not a claim long copy always converts better; never invent results.

Create an actual reviewable desktop/mobile wireframe artifact before final imagery, not only JSON or a slot list. Every image slot must be a visible placeholder, even when suitable assets exist. Describe the ideal image independently of available assets: purpose, composition, aspect ratio, target dimensions, placement, focal point, and mobile crop. Internally review the rendered wireframe and obtain approval before selecting, generating, or inserting final imagery by default. Explicit end-to-end authorization may waive the pause, never the artifact or internal review. The internal DTC skill does not generate final images; hand off to Shopify Storefront Ops.

Before finalizing, run a QA pass:
- Does the hero match the ad promise?
- Is the product instantly understandable?
- Is the offer clear?
- Is proof near the CTA?
- Does the CTA match the actual next step?
- Are objections handled?
- Are subscription terms clear?
- Are claims flagged for verification?
- Is the mobile path easy?
- Is there a final CTA recap?
```

---

# 20\. Recommended Default Page Specs by Scenario

## 20.1 Cold Meta paid-social prospecting

Use:

```
transparent advertorial_listicle + reason-based problem_solution_proof_offer
```

Sequence:

```
AdvertorialHeader
MessageMatchedHero
NumberedReasons
SolutionAndProductReveal
MechanismExplanation
ProofNearClaims
OfferAndPurchasePath
ComparisonOrObjectionHandling
RiskReversal
FAQAccordion
FinalCTA
Footer
StickyCTAWhenUseful
```

## 20.2 Cold Meta curiosity or reframing traffic

Use:

```
transparent advertorial_listicle
```

Sequence:

```
ProblemAgitationHero
CredibilityCue
NumberedReasons
MechanismSection
ProofInsert
OfferBlock
Testimonials
Guarantee
FAQ
FinalCTA
```

## 20.3 Consumable subscription product

Use:

```
advertorial_listicle with subscription explanation and plan controls
```

Sequence:

```
AdvertorialHeader
MessageMatchedHero
NumberedReasons
MechanismAndProof
SubscriptionToggle
WhatYouGet
IngredientOrMechanismSection
ValuePerUseSection
ComparisonTable
Reviews
Guarantee
FAQ
StickyCTA
```

## 20.4 Personalized product

Use:

```
quiz_funnel
```

Sequence:

```
QuizHero
ProofStrip
WhyQuizMatters
ProductEducation
ComparisonTable
Testimonials
FounderOrExpertProof
FAQ
StickyQuizCTA
```

## 20.5 Apparel collection

Use:

```
collection_splitter
```

Sequence:

```
CollectionHero
AudienceTabs
ProductGrid
ProductCardProof
FitOrFabricEducation
ShopTheLook
ReviewsOrUGC
FAQ
EmailCapture
```

## 20.6 High-ticket home/furniture/wellness tech

For default cold Meta prospecting, use:

```
transparent advertorial_listicle + mechanism_first
```

Use long_form_pdp only as a pdp_direct_response variant with explicit retargeting and a last-choice winning comparison.

Sequence:

```
AdvertorialHeader
MessageMatchedHero
FinancingRiskStrip
SolutionAndProductReveal
FeatureMechanism
LifestyleUseCases
SpecsOrDimensions
ComparisonTable
ReviewsUGC
OfferAndPurchasePath
WarrantyGuarantee
FAQ
FinalCTA
StickyCTA
```

---

# 21\. The Highest-Leverage Rule

When the generator is unsure, use this rule:

```
Continue the ad on the first screen.
Resolve the click reason before assuming purchase intent.
Keep the response path visible while the page earns belief.
Make the final section reassuring.
```

That means:

```
Opening = message match + curiosity resolution + product comprehension
Middle = mechanism + education + proof + comparison
End = FAQ + guarantee + final CTA
```

The best generated DTC pages should not feel like ads pasted onto ecommerce pages.

They should feel like purpose-built buying experiences.  
