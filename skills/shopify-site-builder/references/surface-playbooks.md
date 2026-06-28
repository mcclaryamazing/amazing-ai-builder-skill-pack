# Surface Playbooks

Use this reference when building or reviewing a specific Shopify surface.

## Homepage

Work through `templates/index.json` and homepage sections.

Preserve:

```text
global header and footer
announcement bars
app blocks
theme settings
search/account/cart access
mobile navigation
```

Homepage should usually include:

```text
clear brand/category promise
primary collection or product path
best sellers or featured products
trust/proof
category/collection routing
brand story or differentiator
email/SMS capture when useful
support or policy reassurance
```

Avoid making the homepage a generic mission page before shoppers understand what is sold.

## Product / PDP Templates

Use `templates/product.<suffix>.json` and product-aware sections.

Preserve:

```text
product form
variant selection
price and compare-at price
availability/sold-out state
product media/gallery
quantity selector when present
add-to-cart behavior
dynamic checkout buttons when intentionally used
reviews/app blocks
shipping/returns/risk-reversal content
recommendations/cross-sells
```

PDP should make clear:

```text
what the product is
who it is for
why it is different
price and offer truth
variant choice
proof and objections
specs/materials/ingredients/dimensions when relevant
FAQ and support path
```

Do not replace Shopify product forms with static CTA links unless the approved flow explicitly needs it.

## Collection Templates

Use `templates/collection.<suffix>.json`.

Preserve:

```text
filters
sorting
pagination or infinite scroll
product-card behavior
collection image and copy
collection membership
internal links
empty states
```

Collection should help shoppers choose:

```text
clear collection promise
light buying guide or segmentation
filter/sort affordance
consistent product cards with price/action
badges or merchandising only when truthful
links to relevant guides or comparisons
```

For broad assortments, consider collection splitters or guided routing before a dense grid.

## Standard Pages

Use `templates/page.<suffix>.json` or the theme's standard page template when adequate.

Common pages:

```text
About
FAQ
Contact
Shipping and returns explainer
Warranty
Size guide
Buying guide
Wholesale or B2B
Retail/location page
Landing/campaign page
```

Preserve readable content, metadata, internal links, and support paths. Use custom sections only when the default rich-text template cannot support the page's job.

## Blog And Article Templates

Use blog/article templates when SEO, education, or buying guidance is in scope.

Preserve:

```text
article content readability
author/date behavior when present
featured image
related articles
product or collection calls-to-action
schema where present
internal links
```

Do not overload articles with hard-sell modules before the educational intent is satisfied.

## Cart And Checkout-Adjacent Surfaces

Checkout itself is usually outside theme-file control. For cart/cart drawer work, preserve:

```text
line items
quantity updates
remove item behavior
discount messaging only when true
shipping thresholds only when verified
upsell modules
checkout link
cart AJAX behavior
empty cart state
```

Do not place a real order during testing.

If live cart testing changes cart state, restore the tested variant to its previous quantity and preserve unrelated cart items.

## Campaign Or Landing Pages

When a full site includes campaign pages, use the `shopify-landing-page-builder` skill for the DTC design package if the page needs dedicated offer/audience strategy.

For implementation, preserve this full-site skill's shared theme system unless the approved campaign spec intentionally requires a standalone treatment.

Use `templates/page.<suffix>.json`, scoped section/CSS/JS, Shopify Files images, metadata, and a clear rollback path.

## Surface Review Checklist

For each changed surface, verify:

```text
the surface has a clear job
it matches the approved blueprint
shared styles are consistent
Shopify-native behavior still works
images are final or exact placeholders
copy does not invent claims
metadata is appropriate
desktop and mobile work
no horizontal overflow
interactive states work
normal unaffected surfaces still work
rollback is clear
```
