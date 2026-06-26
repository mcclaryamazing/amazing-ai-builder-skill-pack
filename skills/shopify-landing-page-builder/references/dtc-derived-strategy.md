# DTC Derived Strategy

Use this reference before writing final copy or selecting sections. The goal is to turn partial inputs into a useful landing-page strategy without forcing a long interview.

## Non-Negotiables

- Do not invent facts.
- Use placeholders for missing proof, offer terms, prices, guarantees, shipping, certifications, claims, testimonials, or urgency.
- Flag health, clinical, safety, sustainability, financial, performance, medical, regulatory, superiority, and competitor-comparison claims.
- Design mobile-first.
- Match CTA labels to the real next step.
- Continue the ad promise in the hero when an ad or campaign promise exists.
- Put proof close to the claim it supports.
- Use real urgency only.
- Keep premium pages dense with product clarity, offer clarity, proof, specs, objections, and purchase access.

## Intake Fields

Extract or infer:

```json
{
  "brand": "name, category, voice, trust level, positioning",
  "product": "name, type, price, variants, mechanism, benefits, objections",
  "offer": "discount, bundle, free shipping, gift, guarantee, urgency, eligibility",
  "traffic": "source, temperature, ad promise, audience, awareness level",
  "proof": "reviews, UGC, press, certifications, testing, founder/expert, guarantee",
  "assets": "product, lifestyle, UGC, packaging, logo, and social images",
  "constraints": "compliance, claims to avoid, platform, required sections",
  "response_path": "purchase, variant selection, bundle, quiz, lead capture, verification, customization, or collection click"
}
```

Ask only for missing fields that materially change the page. Otherwise infer, label the assumption, and continue.

## Derived Strategy Fields

Include these in every design package:

```json
{
  "recommended_archetype": "",
  "confidence_label": "validated_pattern | first_draft_to_test",
  "education_need": "low | medium | high",
  "proof_need": "low | medium | high",
  "risk_reversal_need": "low | medium | high",
  "comparison_need": "none | helpful | essential",
  "cta_mode": "direct_purchase | selection | quiz_start | offer_claim | lead_capture | verification | customization",
  "offer_stack_strength": "weak | adequate | strong",
  "claim_sensitivity": "low | medium | high",
  "mobile_sticky_cta": true
}
```

Use `validated_pattern` for dominant PDP, collection, offer, and subscription patterns with enough proof and a clear offer. Use `first_draft_to_test` for quiz, advertorial, lead capture, standalone bundle builder, sparse proof, unverified offers, ambiguous categories, or claim-sensitive copy.

## Need Scores

Education need:

- low: familiar product, low price, simple SKU, clear category
- medium: premium price, material/ingredient differentiation, meaningful variants, new brand
- high: regulated category, high-AOV product, technical product, subscription, quiz, customization, new mechanism, unfamiliar product behavior

Proof need:

- low: established brand, simple product, low claims, low price
- medium: growing brand, mid price, moderate claims, common product with differentiation
- high: new brand, high price, health/safety claims, baby/pet/wellness, technical product, subscription, new mechanism, strong superiority claims

Risk reversal need:

- low: low-cost impulse purchase
- medium: apparel sizing, beauty shade/results, food taste, home decor fit
- high: high-AOV, subscription, health/wellness, furniture, electronics, baby/pet safety, custom products

Comparison need:

- none: simple low-consideration product with no meaningful comparison story
- helpful: premium price, multiple variants, competing materials, or hard-to-understand value
- essential: category disruption, superiority claims, subscription value defense, or plan/tier comparison

## CTA Mode

Use:

- `direct_purchase` when product and variant are resolved
- `selection` for size, color, flavor, pack, formula, plan, shade, or compatibility
- `quiz_start` when recommendation requires personalization
- `offer_claim` when the page exists to claim a discount, trial, or gift
- `lead_capture` for email, SMS, sample, sweepstakes, or waitlist
- `verification` for eligibility or identity gates
- `customization` for designed, configured, uploaded, or personalized goods

Never use `Buy Now` if the user must first choose size, flavor, formula, color, bundle items, plan, compatibility, eligibility, or quiz answers.

## Copy Strategy Packet

Create this before final page copy:

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

A strong big idea is concrete, product-specific, visual enough to remember, tied to a real product truth, and supportable by proof, mechanism, or offer logic. Reject generic big ideas that could fit a competitor unchanged.

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

Proof layers:

- volume: star rating, review count, customers served
- human: testimonials, UGC, before/after where compliant, fit data
- authority: press, experts, founder, partners, certifications
- technical: ingredients, materials, specs, testing, comparison data
- risk: money-back guarantee, trial, warranty, secure checkout, free returns

Place proof close to the claims it supports.

## Upgrade Signals

Recommend Guided Strategy Mode when the page can be drafted but the offer, audience, traffic promise, proof stack, or positioning is vague.

Recommend Deep Conversion Mode when product risk, claim sensitivity, weak proof, high price, complex offer, quiz/subscription/bundle/customization logic, or QA score under 80 makes the Fast Draft likely underpowered.
