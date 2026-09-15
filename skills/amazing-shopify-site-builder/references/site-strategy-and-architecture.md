# Site Strategy And Architecture

Use this reference before producing or reviewing the full-site blueprint, site map, navigation, template plan, content model, shared theme system, or implementation scope.

## Core Philosophy

Default to:

```text
clear store promise + shoppable paths + consistent templates
```

The site should answer:

```text
What does this brand sell?
Who is it for?
Why should I trust it?
Where do I start?
Which product or collection is right for me?
What happens if I buy?
```

Do not turn a full site into one giant landing page. The homepage orients and merchandises, PDPs close product-specific demand, collections help shoppers choose, and content pages build trust, support, or SEO.

## Operating Modes

### Fast Site Draft Mode

Use it when the user asks for a Shopify site, full store, homepage plus products/collections, site build, site refresh, or consistent theme and has not explicitly requested a deeper strategy process.

In Fast Site Draft Mode:

1. Start from the request, repo, Shopify context, visible storefront, catalog, assets, and existing theme truth.
2. Ask at most 1-3 questions before drafting.
3. Ask only when the missing answer materially changes site architecture, navigation, template priority, product/collection structure, claim/compliance boundaries, Shopify build path, or launch safety.
4. Otherwise infer a conservative default and label it as an assumption.
5. Use verification placeholders instead of inventing facts.
6. Default device priority to `mobile_first`.
7. Default style to the current brand/theme unless the user asks for a redesign.
8. Include `data_needed_from_merchant` for missing facts that matter before launch.

### Guided Site Strategy Mode

Use it when offer positioning, homepage role, collection architecture, navigation, category education, proof strategy, or content priorities are unclear.

Ask a compact intake only for facts not already available:

1. What is the main business goal for this site build?
2. What are the primary product categories or collections?
3. Who is the first-priority buyer?
4. What should the homepage make shoppers do next?
5. What pages must exist at launch?
6. What proof, policies, claims, guarantees, and assets are verified?

### Deep Storefront Build Mode

Use it when:

- the user explicitly asks for a full rebuild, site architecture, migration, SEO refresh, or best-possible storefront
- the catalog is large, high-AOV, regulated, technical, subscription, custom, or proof-sensitive
- the site needs multiple product/collection templates or structured content
- the work changes navigation, menus, product data, collection merchandising, redirects, or shared theme files
- launch risk is high because paid traffic, active sales, SEO rankings, or wholesale/retail operations depend on the store

## Ask, Infer, Or Placeholder Rules

Ask before drafting only when the missing answer changes the site materially.

Ask when missing:

- active brand or store name
- catalog shape or required products/collections
- homepage goal
- required launch pages
- required navigation items
- real product/variant/collection data source
- offer terms displayed as real discounts, urgency, guarantees, financing, free shipping, or free gifts
- compliance boundaries for health, safety, sustainability, clinical, financial, superiority, or competitor claims
- required Shopify target, theme, access, or implementation path

Infer when missing:

- device priority: `mobile_first`
- homepage role: orient brand, feature top collections, lead to best products, and build trust
- PDP role: make product, price, variants, media, proof, specs, FAQ, and add-to-cart obvious
- collection role: help shoppers choose through sorting, filters, product cards, and light education
- content-page role: trust, support, education, SEO, or policy clarity

Use placeholders when missing facts would otherwise be fabricated:

```text
[Confirm current offer terms]
[Insert verified review count]
[Add real testimonial]
[Verify guarantee terms]
[Confirm shipping threshold]
[Substantiate claim before launch]
[Confirm collection membership]
[Confirm product variant and price]
```

Never invent review counts, testimonials, prices, discounts, guarantee terms, shipping terms, certifications, clinical/testing claims, expert endorsements, urgency, scarcity, customer counts, before/after outcomes, awards, inventory, or SEO performance.

## Blueprint Output

Produce a structured `ShopifySiteBlueprint` or equivalent with:

- metadata: brand, store, selected mode, launch scope, target theme, primary goals
- assumptions: inferred defaults and facts needing merchant/legal verification
- site_map: homepage, collections, product templates, content pages, blog/articles, cart, campaign pages, and out-of-scope surfaces
- navigation: header, footer, collection paths, utility links, search/account/cart behavior, and mobile nav notes
- template_strategy: index, product templates, collection templates, page templates, blog/article templates, cart sections, campaign page exceptions
- conversion_strategy: homepage job, PDP job, collection job, content-page job, proof/risk-reversal plan, merchandising plan
- theme_system: colors, type, spacing, buttons, cards, forms, badges, product cards, image ratios, motion, icons, and accessibility notes
- section_library: reusable section names, purpose, props/settings, data dependencies, and which templates use them
- data_plan: products, variants, collections, pages, menus, redirects, files, metafields/metaobjects, discounts, publications, and metadata
- image_plan: exact image slots, ratios, target dimensions, crop behavior, planned Shopify Files filenames, alt text, zoom recommendation
- implementation_plan: file paths, Admin API mutations, preview theme, validation steps, and rollback path
- QA_plan: desktop/mobile, accessibility, performance, SEO/social, product forms, filters, cart, checkout path, and normal-page regression checks

## Architecture Review Gate

Before implementation, confirm:

```text
The selected mode is clear.
Assumptions are labeled.
The site map covers required pages.
Navigation supports the buyer journey.
Homepage role is not doing every job.
PDP templates preserve product purchase behavior.
Collection templates preserve discovery behavior.
Content pages have a purpose.
Shared theme system can be reused across surfaces.
Image slots are exact enough to build.
Metadata and social preview direction are clear.
Unsupported claims are removed, softened, or flagged.
Shopify implementation has enough detail to build without redesigning the site.
```
