# DTC Derived Strategy

Use this reference before writing final copy or selecting sections. The goal is to turn partial inputs into a useful landing-page strategy without forcing a long interview.

## Non-Negotiables

- Do not invent facts.
- Unless the user states otherwise, assume `meta_paid_social` and `cold_prospecting`, state the assumption, and treat the visitor as having low or unexpressed commercial intent before the ad interrupted their feed.
- Use placeholders for missing proof, offer terms, prices, guarantees, shipping, certifications, claims, testimonials, or urgency.
- Flag health, clinical, safety, sustainability, financial, performance, medical, regulatory, superiority, and competitor-comparison claims.
- Design mobile-first.
- Match CTA labels to the real next step.
- Continue the ad promise in the hero when an ad or campaign promise exists.
- Put proof close to the claim it supports.
- Use real urgency only.
- Continue the ad's hook and reason for the click before expecting product-level purchase intent.
- Preserve visible purchase access when useful, but do not force every cold-traffic opening into a PDP buy box.
- Keep premium pages dense with product clarity, offer clarity, proof, specs, objections, and an appropriate response path.

## Intake Fields

Extract or infer:

```json
{
  "brand": "name, category, voice, trust level, positioning",
  "product": "name, type, price, variants, mechanism, benefits, objections",
  "offer": "discount, bundle, free shipping, gift, guarantee, urgency, eligibility",
  "traffic": "source, campaign stage, temperature, ad angle, ad promise, click motivation, work already completed by the ad, audience, awareness level",
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
  "traffic_source": "meta_paid_social",
  "campaign_stage": "cold_prospecting",
  "recommended_archetype": "advertorial_listicle",
  "default_archetype_status": "retained | overridden",
  "default_override_rationale": "Required when the cold Meta listicle default is overridden",
  "persuasion_architecture": "AIDA | problem_solution_proof_offer | problem_agitate_solve | mechanism_first | demonstration_first | comparison_first",
  "rejected_alternatives": [],
  "pdp_eligibility": "eligible | not_eligible",
  "pdp_eligibility_rationale": "Explicit retargeting evidence and last-choice comparison or missing requirement",
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

Use `validated_pattern` only with relevant observed performance evidence for the destination and persuasion combination. Otherwise use `first_draft_to_test`, especially where material assumptions or proof gaps remain. Category or archetype popularity is not performance validation.

## Destination And Persuasion Selection

Choose the destination archetype and persuasion architecture separately.

For cold Meta prospecting, default the destination to a transparent, brand-owned `advertorial_listicle`. Choose the persuasion architecture separately so the listicle continues the ad and closes the remaining belief gap. When the brief is unclear, use a substantive reason-based `problem_solution_proof_offer` argument.

Override the listicle only when the response path requires a quiz, collection splitter, bundle builder, subscription funnel, offer page, or lead-capture page; the user explicitly requests another format; the ad's mechanism, demonstration, comparison, proof, or offer calls for a more direct continuation; or the strict retargeting-only, last-choice PDP gate is satisfied. Record whether the default was retained or overridden and give a specific rationale for every override. Without test data, describe another route as a stronger strategic fit rather than claiming it will perform better.

Use:

- `AIDA` for aspiration, discovery, launch novelty, or a strong attention hook that must build desire.
- `problem_solution_proof_offer` for a clear pain or job, a credible solution, substantiating proof, and a concrete offer.
- `problem_agitate_solve` for truthful problem reframing that does not shame or exaggerate.
- `mechanism_first` when the distinctive reason the product works caused the click.
- `demonstration_first` when the ad showed an observable result that the page should explain and substantiate.
- `comparison_first` when the click came from a contrast with the old way or an alternative.

A PDP is eligible only for explicitly identified retargeting traffic. Consider it last, after the long-form listicle and relevant specialized destinations, and select it only when a documented comparison clearly shows it is the strongest fit. Search, Shopping, product awareness, existing-customer status, a discount, subscription, configuration or a named SKU does not independently qualify. PDP variants and hybrids follow this same gate.

## Multiple Ads And Message Families

When multiple ads or campaign hooks are supplied, group them by the promise and click motivation they share (for example problem, curiosity, aspiration, mechanism, demonstration, comparison, offer or proof). Map the actual source ads to each family, then record its remaining belief gap and destination or opening. Ads with materially different promises need different pages or distinct opening sections; do not collapse unrelated angles into one generic hero. Shared proof and offer sections can remain common when accurate.

Apply the same archetype and PDP eligibility rules to each route. A routing recommendation does not authorize creating extra pages or changing ads: when implementation is limited to one page, design the requested route and identify the other route needs in the handoff.

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
  "traffic_source": "meta_paid_social",
  "campaign_stage": "cold_prospecting",
  "ad_angle": "problem | curiosity | aspiration | mechanism | demonstration | comparison | offer | proof",
  "ad_job_completed": ["What the ad already established"],
  "click_motivation": "Why the visitor left the feed",
  "remaining_belief_gap": "What the page must make believable",
  "persuasion_architecture": "Selected copy sequence and why",
  "audience": "Who is most motivated to buy now",
  "awareness_level": "unaware | problem_aware | solution_aware | product_aware | brand_aware",
  "customer_problem": "Specific pain, desire, job, or moment",
  "big_idea": "One concrete organizing product truth",
  "mechanism": "Why the product can deliver the promise",
  "primary_hook": "Benefit, curiosity, proof, identity, comparison, or offer hook",
  "transformation": "Before/after change to make believable",
  "proof_needed": ["Proof required for strongest claims"],
  "offer_logic": "Why action now makes sense",
  "response_path": "Actual CTA and next step",
  "headline_bank": [{"headline": "Product-specific alternative", "angle": "Meaningfully different hook", "message_family": "Relevant ad family, if supplied", "proof_needed": "Supporting fact or verification placeholder"}],
  "claim_verification_notes": ["Unresolved claims and the evidence needed"]
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

## Research Depth And Copy Length

Default to long-form, substantive copy: develop each reason with product-specific explanation, mechanism, proof and objections; use scannable sections without stripping the argument. Shorter copy requires relevant performance evidence and a recorded rationale for this product, audience, traffic and offer. This is a design policy, not a claim that long copy always converts better; do not impose a minimum word count or add filler.

Deepen research for unclear positioning, weak proof, complex offers, claim sensitivity or QA failures within the same full-design process. Do not require fresh brand exemplars.
