# Source Guide Index

The full original framework is preserved unchanged in [source-landing-page-design-guide-v2.md](source-landing-page-design-guide-v2.md) (3,086 lines). Use it as a targeted design-example library alongside the maintained references. When choosing a category's art direction, a component layout or a shopping interaction, consult the matching section below if a concrete example will help. Do not load the whole file routinely.

## Current Rules Take Precedence

SKILL.md and the maintained builder references govern task scope, defaults, copy, archetypes, QA, wireframe review, imagery and Shopify release. This archive retains historical implementation ownership and broad generator instructions for context, not as active commands. It does not require a standalone design, audit or rewrite to onboard a store or deploy, nor switch implementation to another skill. Use [dtc-qa-rubric.md](dtc-qa-rubric.md) for the current score and revision thresholds; do not combine different rubric versions. The current rubric also explains the retired condensed rubric differences. Preserve the source unchanged so the line references below remain accurate.

Archived offers, ratings, certifications, prices and sample copy are illustrative, not merchant facts. Do not import its mandatory proof stacks, minimum FAQs, automatic verification placeholders, fixed section template, older scoring blockers or implementation ownership. Apply the current finished-copy rule and select only useful patterns. Long-form, routing, image-approval and release decisions remain owned by current references.

## Targeted Design Examples

These ranges add detail to the maintained guidance; they are options, not required page elements.

| Design decision | Archived lines | Apply through |
| --- | --- | --- |
| Hero image direction by product type | 836-851 | `dtc-category-packs.md`, `dtc-visual-copy-system.md` |
| Mechanism layout: split, cards, contrasting band or annotation | 1216-1252 | `dtc-components.md` |
| Review presentation: fit fields, usage context and customer media | 1424-1472 | `dtc-components.md` |
| Cross-sell placement by buying stage | 1474-1513 | `dtc-components.md` |
| Sticky CTA timing and restraint | 1557-1600 | `dtc-components.md` |
| Category art direction and image ideas | 1606-2145; use the specific category range below | `dtc-category-packs.md` |

Read only the selected range, assess its usefulness for the actual product and brand, then return to the maintained workflow. Do not treat an example's optional feature as a missing requirement.

## Top-Level Sections

```text
1: DTC Landing Page Generation Guide for AI Designers / Codex
3: Purpose
22: Core Generation Philosophy
79: Required Input Contract
188: Derived Strategy Fields
222: Archetype Selection Rules
247: Global Page Structure
282: Core Archetype Blueprints
788: Hero Section Generator Rules
893: Offer Architecture
966: Proof Architecture
1052: Section Blueprint Library
1602: Category-Specific Generation Rules
2147: Marketing Framework Selection
2193: Visual Design System Rules
2286: Copywriting Rules
2400: Codex Output Contract
2534: Implementation Guidance for Codex
2643: Landing Page QA Scoring Rubric
2704: Anti-Pattern Checklist
2762: Final Codex Instruction Block
2913: Recommended Default Page Specs by Scenario
3065: The Highest-Leverage Rule
```

## Archetype Blueprint Lines

```text
286: Advertorial / Listicle
332: Educational Direct-Response Page
371: Bundle Builder
436: Quiz Funnel
496: Offer Page
560: Collection Splitter / Category Page
630: Subscription Funnel
698: Lead Capture Page
757: Direct-Response PDP
```

## Section Blueprint Lines

```text
1056: PromoBar
1086: HeroBuyBox
1135: ProofStrip
1174: ValuePropGrid
1216: MechanismSection
1254: ComparisonTable
1306: HowItWorks
1353: IngredientOrMaterialPanel
1391: UGCGallery
1424: ReviewSummary
1474: CrossSellRail
1515: FAQAccordion
1557: StickyCTA
```

## Category Lines

```text
1606: Apparel
1674: Food, Beverage, and Supplements
1743: Beauty and Personal Care
1812: Home, Furniture, Cookware, and Decor
1885: Pet and Baby
1955: Wellness, Electronics, and Recovery Tech
2025: Outdoor Gear and Utility Products
2092: Custom / Print / Configurable Goods
```

## Useful Searches

```powershell
rg -n "Archetype|Hero|Offer|Proof|QA|Anti-Pattern" references/source-landing-page-design-guide-v2.md
rg -n "apparel|supplements|beauty|home|pet|wellness|outdoor|custom" references/source-landing-page-design-guide-v2.md
rg -n "Do not invent|CTA|sticky|FAQ|claim" references/source-landing-page-design-guide-v2.md
rg -n "Meta|cold_prospecting|AIDA|problem_solution_proof_offer|PDP eligibility" references/source-landing-page-design-guide-v2.md
```
