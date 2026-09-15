# Theme System And Implementation

Use this reference before creating or changing Shopify theme files, reusable sections, snippets, CSS/JS assets, products, collections, pages, menus, images, metadata, or purchase wiring.

## Core Rule

Prefer real Shopify theme files over large Custom Liquid paste-ins.

Full-site work should build a reusable system:

```text
templates/index.json
templates/product.<suffix>.json
templates/collection.<suffix>.json
templates/page.<suffix>.json
sections/<surface-or-module>.liquid
snippets/<shared-component>.liquid
assets/<site-system>.css
assets/<surface-or-interaction>.js
```

Do not full-sync a theme unless the user explicitly requests and reconfirms a whole-theme operation. Use targeted `--nodelete --only` pushes.

## Build Workflow

1. Read the approved site blueprint.
2. Read the store's theme knowledge base when one exists.
3. If the blueprint is missing essential navigation, template, product, collection, page, image, data, or launch-scope details, ask for those details or create a compact blueprint before coding.
4. Build and test locally first when the repo supports it.
5. Identify shared theme tokens and existing design primitives before adding new ones.
6. Split reusable markup into sections/snippets and shared styles into a site CSS asset when that matches the theme.
7. Preserve Shopify-native behavior for product forms, variants, filters, sorting, pagination, cart, checkout, app blocks, and theme settings.
8. Use exact image placeholders until final images exist.
9. Upload final merchant-facing images to Shopify Files and reference them with `file_url`.
10. Verify every changed surface in desktop and mobile before launch.

## Theme System

Define or reuse:

```text
colors
typography
spacing scale
section rhythm
button styles
links and focus states
cards
forms and selects
badges and trust signals
product cards
media galleries
image ratios and crop rules
icons and decorative assets
accordion/FAQ behavior
sticky/floating elements
```

Use the existing theme's design tokens and settings when they are good enough. Add new scoped tokens only when the theme lacks what the approved blueprint needs.

Avoid styling page sections as nested decorative cards. Keep operational Shopify surfaces clear, scannable, and consistent.

## Shopify Files And Images

Use Shopify Files for merchant-facing images:

```text
hero and brand images
product and packaging images
collection/category images
lifestyle images
proof, UGC, press, and testimonial images
guide/article images
offer and bundle images
social-preview images
```

Reference them with `file_url`:

```liquid
<img src="{{ 'collection-outdoor-gear.jpg' | file_url }}" alt="Outdoor gear arranged for a weekend trip" width="1200" height="800">
```

Use theme `asset_url` only for CSS, JS, fonts, small icons, and code-owned decoration.

For final images:

- use simple lowercase filenames when possible
- optimize images to display size
- include meaningful `alt`, explicit `width`, and explicit `height`
- verify live rendered HTML contains `/files/<filename>`, not `/assets/<filename>`
- make meaningful product, gallery, lifestyle, proof, and collection images click-to-zoom when useful for inspection

## Placeholder Standard

When final images are missing, render visible placeholders exactly where final images will live. Preserve final desktop/mobile position, aspect ratio, size behavior, crop behavior, alignment, and spacing.

Visible placeholder content should be:

```text
IMAGE: <SLOT-ID>
ASPECT RATIO: <RATIO> | SIZE: <WIDTH> X <HEIGHT> PX
Description: <final image description/crop notes>
```

Use a dashed inner frame, transparent overlay treatment, camera icon, and no opaque text panel behind the placeholder copy.

## Store Data Changes

For Admin API work, verify scopes and schema availability before changing store data.

Common areas:

```text
products and variants
product media
collections and collection membership
pages and page templates
menus and navigation
URL redirects
Shopify Files
metafields and metaobjects
discounts and automatic discounts
publications
inventory and locations
```

Always inspect `userErrors` after mutations and record changed IDs/handles for rollback.

## Metadata And SEO

For every launch surface, plan:

```text
browser title
meta description
canonical behavior
Open Graph title and description when relevant
social preview image when relevant
structured data/schema preservation where present
redirects when URLs change
internal links
index/noindex expectations
```

Do not change URL handles casually. If changing a URL, create redirects and verify old paths.

## Theme-Bleed And Regression Checks

Base themes may restyle bare elements. Detect actual theme behavior before hardcoding fixes.

Watch for:

```text
section margins that open gaps
img width rules that balloon logos or icons
h1/h2 transforms or inherited low-contrast colors
global link hover/focus styles overriding CTA states
footer/header styles missing on custom templates
app widgets bleeding into new templates
product-card styles diverging across home/collection/recommendation modules
```

Reset only inside the relevant section scope, template body class, or explicitly approved global theme system.

When changing shared layout, snippets, or assets, verify at least:

```text
homepage
one product page
one collection page
one standard content page
cart or cart drawer when affected
```

## Local And Browser QA

Before presenting an implemented site as ready, verify:

```text
approved blueprint is recognizable in the build
shared theme system is consistent
homepage, PDP, collection, content, and navigation surfaces match scope
image placeholders/final images preserve exact slots
merchant-facing final images use Shopify Files and file_url
desktop layout works
mobile layout works
no horizontal overflow
text is readable in every section
no mojibake or encoding artifacts
FAQ and interactive controls work
product forms and variant selectors work
collection filters, sorting, pagination, and product cards work
cart update and checkout path work without placing an order
metadata and social preview tags are correct
meaningful final images support zoom when included
normal pages still work after shared changes
```

For pages with lazy loading, reveal animations, counters, sticky elements, or observers, scroll from top to bottom and back before final screenshots or conclusions.
