# Shopify Implementation

Use this reference before creating or changing Shopify theme files, page templates, Shopify Files images, product/variant/cart wiring, metadata, or local implementation previews.

## Core Rule

Prefer real Shopify theme files over pasting a large page into a Custom Liquid section. Large Custom Liquid paste-ins can truncate, lose CSS/JS, or render under theme defaults.

Default file pattern:

```text
sections/<landing-page>.liquid
assets/<landing-page>.css
assets/<landing-page>.js
templates/page.<template-suffix>.json
```

Load assets from the section:

```liquid
{{ 'landing-page.css' | asset_url | stylesheet_tag }}
<script src="{{ 'landing-page.js' | asset_url }}" defer></script>
```

Use a schema preset so the section appears in the Shopify Theme Editor.

## Build Workflow

1. Read the approved DTC design spec.
2. If the spec is missing essential copy, layout, image, offer, product-reference, or copy-strategy details, ask for those details or create a compact spec before coding.
3. Read the store's site/theme knowledge base when one exists.
4. Build and test locally first when the repo supports it.
5. Split markup, CSS, JS, and template files cleanly.
6. Scope all CSS under a unique wrapper and, when needed, a body/template class.
7. Use exact image placeholders until final images exist.
8. Upload final merchant-facing images to Shopify Files and reference them with `file_url`.
9. Wire CTAs to the actual next step.
10. Verify in desktop and mobile before launch.

The target Shopify theme is the delivery surface, not the creative ceiling. Do not flatten the approved design around theme defaults unless a hard implementation constraint requires it. Document any deviation.

## Shopify Files And Images

Use Shopify Files for merchant-facing landing-page images:

```text
hero images
product and package images
lifestyle images
gallery images
offer and bundle images
comparison/proof images
page-specific brand or social-preview imagery
```

Reference them with `file_url`:

```liquid
<img src="{{ 'hero-shot.jpg' | file_url }}" alt="..." width="1200" height="1500">
```

Use theme `asset_url` only for CSS, JS, fonts, small icons, and code-owned decoration.

For final images:

- use simple lowercase filenames when possible
- optimize images to the display size
- include meaningful `alt`, explicit `width`, and explicit `height`
- verify live rendered HTML contains `/files/<filename>`, not `/assets/<filename>`
- make meaningful product, gallery, hero, lifestyle, offer, proof, and kit images click-to-zoom by default unless decorative or too small to inspect

## Placeholder Standard

When final images are missing, render visible placeholders exactly where final images will live. Preserve the final desktop/mobile position, aspect ratio, size behavior, crop behavior, alignment, and spacing.

Visible placeholder content should be:

```text
IMAGE: <SLOT-ID>
ASPECT RATIO: <RATIO> | SIZE: <WIDTH> X <HEIGHT> PX
Description: <final image description/crop notes>
```

Use a dashed inner frame, transparent overlay treatment, camera icon, and no opaque text panel behind the placeholder copy. Do not display marketing-style placeholder headlines, Image Studio labels, internal implementation notes, or instructions such as "no random placeholder" inside the frame.

## Theme-Bleed Checks

Base themes may restyle bare elements. Detect the actual theme behavior before hardcoding fixes.

Watch for:

```text
section margins that open gaps
img width rules that balloon logos or icons
h1/h2 text-transform or inherited low-contrast colors
global link hover/focus styles overriding CTA states
footer/header styles missing on standalone pages
floating app widgets bleeding into the campaign page
```

Reset only inside the landing-page scope or template body class.

For every light and dark section, set heading, body, eyebrow, CTA, badge, card, and placeholder colors inside the landing-page scope. Do not rely on inherited theme colors.

## Product And Checkout Wiring

Resolve product and variant assumptions before wiring the page. When Admin credentials are available, verify products through Admin GraphQL. In Liquid, resolve the storefront purchase variant from live product data:

```liquid
{% assign landing_product = all_products['product-handle'] %}
{% assign landing_variant = landing_product.selected_or_first_available_variant %}
```

For a direct purchase CTA, use a real add-to-cart form:

```liquid
{% if landing_variant %}
  <form class="landing-form" action="{{ routes.cart_add_url }}" method="post">
    <input type="hidden" name="id" value="{{ landing_variant.id }}">
    <input type="hidden" name="quantity" value="1">
    <input type="hidden" name="return_to" value="/checkout">
    <button class="button button-primary" type="submit"{% unless landing_variant.available %} disabled{% endunless %}>
      {% if landing_variant.available %}Add to Cart{% else %}Sold Out{% endif %}
    </button>
  </form>
{% else %}
  <a class="button button-primary" href="/products/product-handle">View Product</a>
{% endif %}
```

Keep top-of-page CTAs as anchor links to the purchase module unless the user wants every button to submit to cart.

CTA wiring patterns:

```text
Single product: add-to-cart form or anchored buy box
Variant/size/flavor selection: selectors before add-to-cart
Bundle offer: exact parent variant or bundle builder state
Quiz funnel: quiz start and results path
Lead capture: form submission and privacy text
Collection splitter: segment-specific collection links
Custom goods: customization or upload flow
Verification offer: eligibility flow
```

## Page Creation And Metadata

Create a JSON page template:

```json
{
  "sections": {
    "main": {
      "type": "landing-page"
    }
  },
  "order": ["main"]
}
```

Name it `templates/page.<template-suffix>.json`. The suffix is what Admin GraphQL passes as `templateSuffix` when creating or updating the Shopify Page.

Set page metadata as part of every landing-page install:

- Page title: clear and offer-aware
- Body: short HTML summary, even if the custom template does not visibly render it
- SEO title: concise, accurate, and compelling
- Meta description: benefit-driven and accurate
- Open Graph/Twitter preview tags for campaign pages
- Social preview image, ideally purpose-built at `1200 x 630`

Verify both Admin values and live rendered HTML. Shopify may briefly serve stale head tags; retry with cache-busting before assuming failure.

## Accessibility, Performance, And UX

Use:

```text
semantic HTML
real buttons for actions
accessible accordions
focus-visible states
reserved image dimensions
mobile-first layout
sticky CTA safe-area padding
compressed images
lazy loading below-fold images
minimal JavaScript
```

Avoid:

```text
non-clickable CTA-looking elements
text embedded in images
layout shifts from unreserved image space
content-blocking overlays
sticky bars that hide forms or legal copy
fake product data
unverified claims
```

For side-by-side offer cards, make the cards flex columns and put the form/button area at `margin-top: auto` so buttons align even when copy lengths differ.

Do not gate the above-the-fold hero behind a scroll-reveal IntersectionObserver. The first viewport must paint immediately.

## Local And Browser QA

Before presenting an implemented page as ready, verify:

```text
approved spec is recognizable in the build
section sequence and copy match the spec
hero product, promise, offer, proof cue, and CTA are clear
CTA actions match the actual response path
image placeholders/final images preserve exact slots
all merchant-facing final images use Shopify Files and file_url
desktop layout works
mobile layout works
no horizontal overflow
text is readable in every section
no mojibake or encoding artifacts
FAQ and interactive controls work
sticky CTA appears only where intended
metadata and social preview tags are correct
meaningful final images support zoom when included
checkout/add-to-cart path works without placing an order
```

For storefront pages with lazy loading, reveal animations, counters, or sticky CTA observers, scroll from top to bottom and back before final screenshots or conclusions.
