---
name: amazon-opportunity-explorer
description: Mine Amazon Seller Central Product Opportunity Explorer for product opportunities, turn promising niches into testable product concepts, submit concepts to Amazon's Validate a New Product Idea tool, and produce an evidence-separated validation report. Use for Opportunity Explorer research, niche mining, product shortlisting, Amazon product validation, competitor and feature-gap analysis, or comparing several Amazon product ideas.
---

# Amazon Opportunity Explorer

Use Amazon's own marketplace evidence to move from a broad category to a
shortlist, then use **Validate a New Product Idea** to pressure-test the best
concepts. Keep Amazon's findings separate from analysis and recommendations.

## Operating rules

- Work from the user's visible Seller Central data, supplied exports, or
  screenshots. Do not substitute remembered or public web data for
  account-specific Amazon evidence.
- Use only the Seller Central account and marketplace the current user has
  authorized for this task. Never assume a prior account, seller identity, or
  marketplace, and do not persist account names, seller IDs, email addresses,
  or results from the current user's task in the skill.
- Never invent a value that Amazon does not expose. Mark unavailable fields as
  `Not available`.
- Label estimates read from charts as approximate.
- Preserve the marketplace, date, niche name, search terms, ASINs, prices, and
  units exactly as shown.
- Record the research date and reject screenshots or exports whose marketplace,
  date, labels, or units are too incomplete to support the requested conclusion.
- Distinguish three evidence layers:
  1. **Amazon data**
  2. **Agent calculation or interpretation**
  3. **Unknown or requiring verification**
- Do not describe a failed simulation as validated.
- Treat health, safety, performance, certification, purity, testing, and
  professional-endorsement claims as evidence-dependent.
- Ask for approval before saving, publishing, contacting suppliers, or making
  another consequential external change. Show the final concept and ask for
  approval immediately before submitting it to Amazon.

## Choose the workflow

Use the narrowest workflow that satisfies the request:

- **Mine only:** Explore niches and return a ranked shortlist.
- **Validate only:** Submit already-defined concepts to Validate a New Product
  Idea and report Amazon's findings.
- **End to end:** Mine, shortlist, define concepts, validate, compare, and
  recommend next actions.
- **Analyze supplied data:** Skip browser work and analyze the user's exports,
  screenshots, or prior reports.

## Phase 1: Define the search

Collect only the inputs that change the research:

- Marketplace
- Starting category, product, or customer problem
- Available launch budget
- Target selling-price range
- Margin or ROI requirement, when provided
- Size, weight, compliance, seasonality, or operational constraints
- Existing advantages such as supplier access, patents, audience, or expertise

If the user has not supplied hard thresholds, do not invent a rigid pass/fail
formula. Rank comparatively and state the assumptions. When the user requests
multiple ideas without defining the grain, default to distinct niches rather
than cosmetic variants of one product.

## Phase 2: Mine Product Opportunity Explorer

### Start broad

1. Open **Product Opportunity Explorer** in Seller Central.
2. Search the user's seed term or browse the most relevant category.
3. Open promising niche detail pages rather than judging only from the result
   list.
4. Capture the metrics Amazon actually exposes for each niche.

### Capture the evidence

Record, when available:

- Niche or opportunity name
- Category and marketplace
- Top customer search terms
- Search volume, click activity, or growth direction
- Product count and brand concentration
- Price range and typical price
- Ratings, review counts, and review themes
- Customer needs, loves, and complaints
- Seasonality or trend pattern
- Return, out-of-stock, or other operational signals
- Leading products and ASINs

Do not force every opportunity into the same fields when Amazon exposes
different data. Preserve the visible source evidence first.

### Shortlist

Score opportunities comparatively on:

1. Demand strength
2. Competition and concentration
3. Evidence of unmet customer need
4. Differentiation potential
5. Price and margin plausibility
6. Product-development complexity
7. Compliance and claims risk
8. Fit with the user's assets and budget

Return a shortlist of no more than five opportunities unless the user asks for
more. For each, state:

- Why it advanced
- The strongest supporting Amazon evidence
- The biggest risk
- The cheapest next step that would reduce uncertainty

Do not advance a niche when the evidence is too sparse to assess demand,
competition, and a plausible unmet need. Put it in an **Insufficient evidence**
section instead. A target-price ceiling applies to the proposed concept price;
do not automatically reject a niche merely because some benchmark products sit
above or below that ceiling.

## Phase 3: Create validation-ready concepts

Turn each shortlisted opportunity into a concrete concept. Include:

- Descriptive product title
- Correct category
- Target price
- Intended customer and use case
- Core form factor
- Included components or bundle
- Measurable features
- Proposed differentiation
- Claims or specifications that still require proof

Avoid vague concepts such as “premium,” “high quality,” or “better design”
without explaining the physical or measurable difference.

Before submission, show the exact concept to the user when a missing product
decision would materially change Amazon's comparison.

## Phase 4: Run Validate a New Product Idea

1. Open **Validate a New Product Idea** in Seller Central.
2. Submit one concept at a time.
3. If the tool is unavailable for the account or marketplace, report that
   limitation and stop the validation phase.
4. Wait for Amazon's result and save the simulation when the user has approved
   saving and the interface allows it.
5. Record the exact submitted title, category, target price, and save status.
6. Capture Amazon's insight text and supporting tables without rewriting them
   into stronger claims.

If Amazon does not return the completed report during the current session,
preserve the submission details and clearly mark validation as pending. Do not
fill the wait with invented conclusions. Resume from the saved or returned
report when it becomes available.

If Amazon returns an error:

1. Record the exact error.
2. Make one exact retry when a transient failure is plausible.
3. Make one normalized retry only when formatting is a likely cause, such as
   changing `80 x 80` to `80 by 80 inches`.
4. Stop after the bounded retries. Mark the concept **Amazon report
   unavailable** and do not infer missing validation results.

## Phase 5: Capture the validation evidence

For each successful simulation, collect what Amazon exposes:

- Amazon's overall classification or insight summary
- Feature readiness and missing specifications
- Customer-fit assessment
- Pricing comparison and benchmark average
- Brand-share concentration
- Customer age profile
- Seasonal click or demand pattern
- Similar products, ASINs, prices, ratings, and rating counts
- Feature-by-feature competitive comparison
- Customer loves and complaints
- Amazon's explicit recommendations

Calculate premiums or gaps only from recorded values and show the formula when
the conclusion is material.

## Phase 6: Analyze without blending evidence

After the Amazon findings, add a separately labeled **Opportunity analysis**.
Evaluate:

- Is this a product-form, positioning, bundle, specification, or
  product-improvement opportunity?
- What is genuinely differentiated?
- Which high-impact features are missing or worse?
- Is the proposed price defensible relative to Amazon's benchmarks?
- What must be tested, specified, sourced, or certified?
- Is the niche attractive but the supplied concept weak?
- What would make this a go, conditional test, redesign, or reject?

Do not treat customer-language alignment as proof that the specification is
competitive.

## Outputs

### Mining shortlist

Produce:

1. Search scope and constraints
2. Evidence table
3. Ranked shortlist
4. Risks and missing evidence
5. Recommended concepts for Amazon validation

### Validation report

Use this structure:

1. Title, date, marketplace, source, and simulation count
2. Scope and methodology
3. Executive assessment and overall ranking
4. Portfolio-level conclusions
5. One section per product:
   - Submitted concept
   - Amazon insight summary
   - Market segment
   - Similar products and benchmarks
   - Feature comparison
   - Customer feedback analysis
   - Opportunity analysis
   - Recommendation
6. Failed or unavailable simulations
7. Recommended next actions
8. Decision summary

Read
[references/example-validation-report.md](references/example-validation-report.md)
when the user requests a full multi-product report or wants an example of the
expected detail and evidence separation. Treat its ASINs and benchmark values as
illustrative only; never reuse them as evidence for the current user's account.

## Completion standard

Before finishing, confirm:

- Every numerical conclusion traces to a captured Amazon value.
- Amazon findings and agent analysis use separate headings.
- Failed reports are excluded from data-driven rankings.
- Approximate chart readings are labeled.
- Recommendations identify the next uncertainty-reducing action.
- The final ranking reflects the user's budget and constraints, not demand
  alone.
