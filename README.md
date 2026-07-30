# Amazing AI Builder Skill Pack

This repo contains installable Codex skills for Amazing.com members building
practical AI-assisted Shopify growth tools and researching Amazon product
opportunities.

## Skills

- `shopify-chatbot-builder` - dashboard-first workflow for building, testing, installing, and launching a private one-store Shopify AI chatbot.
- `shopify-landing-page-builder` - guided workflow for designing, building, testing, and safely launching a high-converting DTC Shopify landing page.
- `shopify-site-builder` - guided workflow for planning, building, testing, and safely launching a consistent Shopify site across homepage, product pages, collections, content pages, navigation, and shared theme systems.
- `amazon-opportunity-explorer` - guided workflow for mining Amazon Product Opportunity Explorer, shortlisting niches, validating product concepts, and producing evidence-separated reports.

## What The Skills Do

The chatbot skill guides Codex through a safe, practical path:

1. Inspect the member's Shopify site repo.
2. Verify or configure a real AI model key server-side.
3. Connect read-only Shopify product, page, collection, and policy data.
4. Build a protected admin dashboard/control plane with source inspection, mode controls, sync status, and embedded test chat.
5. Use the dashboard test chat as the real private demo with the same backend, model, retrieval, and guardrails the widget will use.
6. Polish the customer-facing chat so it sounds like a real shopping/support assistant, never a developer test harness.
7. Verify safe link handling, product-first recommendations, clean Markdown rendering, source/debug separation, mobile layout, support handoff, conversations, analytics, and risky-question behavior.
8. Install the thin storefront widget on a copied preview theme only after the dashboard acceptance gate passes.
9. Launch only after approval, hosted smoke checks when applicable, rollback, and disable paths are clear.

The chatbot skill is designed to replicate a polished Shopify chatbot build pattern:

- shopper chat uses warm, concise copy, normal typing indicators, mobile-safe prompts/placeholders, and friendly fallbacks
- shopper chat never exposes "retrieval", "sources", provider names, internal routes, API keys, stack traces, preview tokens, or source/debug panels
- dashboard source inspection remains available, but it is separated from the customer preview chat
- storefront and dashboard chat both send bounded, sanitized recent history to the backend so follow-up questions work in context
- product, collection, page, and policy names become clickable when public storefront URLs are available
- customer-facing links strip preview/admin/token/key params while preserving shopper-safe params such as variant IDs
- recommendation-style questions prioritize product and collection records over policy/page records without inventing prices, discounts, inventory, delivery dates, or claims

The landing-page skill guides Codex through the full DTC page path. It defaults to Fast Draft Mode for members who want to answer a few questions and get a strong first version, while still supporting Guided Strategy Mode and Deep Conversion Mode when the offer, proof, claims, category, or funnel path needs more rigor:

1. Understand the product, audience, offer, and traffic source.
2. Inspect the Shopify repo, theme setup, and launch constraints.
3. Create a Shopify-ready DTC strategy, copy package, section sequence, and exact image-slot plan using assumptions/placeholders when speed is preferred.
4. Approve claims, offer, product wiring, page structure, and image plan.
5. Build the page in real Shopify theme files.
6. Add Shopify Files imagery, metadata, and purchase wiring.
7. QA desktop, mobile, interactions, accessibility basics, and checkout path.
8. Preview on a development theme or private page.
9. Launch only after approval, rollback, and monitoring are clear.

The site-builder skill guides Codex through a full Shopify storefront path. It defaults to Fast Site Draft Mode for members who want a practical first site plan quickly, while still supporting Guided Site Strategy Mode and Deep Storefront Build Mode for larger rebuilds, SEO-sensitive stores, high-risk catalogs, or multi-template launches:

1. Understand the store, catalog, brand, goals, and must-have pages.
2. Inspect the Shopify repo, theme setup, deploy constraints, git status, Theme Access, and Admin API access.
3. Create a site map, navigation plan, conversion strategy, and page-template plan.
4. Define the shared theme system, reusable sections, and exact image-slot plan.
5. Approve homepage, PDP, collection, content-page, navigation, and store-data changes.
6. Build the site in real Shopify theme files.
7. Add or update products, collections, pages, menus, metadata, and Shopify Files.
8. QA desktop, mobile, accessibility basics, interactions, performance, SEO, product forms, filters, cart, and checkout path.
9. Preview on a development or copied theme.
10. Launch only after approval, rollback, and monitoring are clear.

The Amazon opportunity skill guides Codex through an account-portable research
path:

1. Confirm the current user's authorized Seller Central account, marketplace,
   constraints, and research scope.
2. Mine Product Opportunity Explorer and capture the Amazon evidence actually
   shown.
3. Rank no more than five promising niches unless the user asks for more.
4. Turn the strongest niches into concrete, validation-ready product concepts.
5. Ask for approval immediately before submitting a concept to Validate a New
   Product Idea.
6. Keep Amazon findings, agent calculations, unknowns, and recommendations
   clearly separated.
7. Produce a traceable report that excludes failed simulations from
   data-driven rankings.

## Member Readiness Checklist

For a Fast Draft landing-page strategy, the member can start with only the product, likely buyer, offer if any, primary CTA, and whatever proof/assets are available. Missing launch facts should become labeled assumptions or verification placeholders.

Before building, previewing, launching, or mutating Shopify state, the member should have or be able to get:

- access to the Shopify site repo
- Shopify store owner, staff, collaborator, or Theme Access permissions
- permission to create or use a Shopify app with the required Admin API scopes
- a development theme or permission to create one
- a place to store secrets, such as `.env`, Secret Manager, or another secure secret store

For chatbot work, also have:

- an AI provider account and server-side API key
- support contact path, such as a contact page or support email
- store policy pages for shipping, returns/refunds, privacy, terms, and warranty when available

For landing-page work, also have:

- product, offer, audience, and traffic-source details when available
- available product, lifestyle, proof, UGC, logo, or packaging assets
- product/variant/bundle/quiz/lead-form assumptions
- verified proof, claim support, guarantee, shipping, discount, and urgency details before launch

For full-site builder work, also have:

- brand, catalog, audience, and site-goal details when available
- must-have pages, main collections, product-template needs, and navigation assumptions
- available brand, product, collection, lifestyle, proof, guide, and social-preview assets
- verified products, variants, collections, policies, shipping, discount, guarantee, and claim support before launch

For Amazon opportunity research, have:

- access to Product Opportunity Explorer in the Seller Central account and
  marketplace being researched
- the starting category, product, or customer problem
- launch budget, target price, margin goals, and operational constraints when
  known
- access to Validate a New Product Idea when product-concept validation is
  requested

Secrets must never be pasted into chat, committed to the repo, or placed in Liquid, public JavaScript, metafields, screenshots, or docs.

## Install In Codex

Paste this into Codex:

```text
Use the skill-installer skill.
Install from this GitHub repo:
https://github.com/mcclaryamazing/amazing-ai-builder-skill-pack

The skill folders are:
- skills/shopify-chatbot-builder
- skills/shopify-landing-page-builder
- skills/shopify-site-builder
- skills/amazon-opportunity-explorer

After installing, tell me how to verify all four skills are available.
```

Restart or refresh Codex if needed.

## Start A Shopify Chatbot Build

Open Codex in the Shopify site repo, then paste:

```text
Use the shopify-chatbot-builder skill.

I want to build a private AI chatbot for this live Shopify store. Inspect this repo first, show me the Shopify Chatbot Build Progress tracker, and guide me like a new user.

Build this dashboard-first. Create a protected admin dashboard/control plane with source inspection, mode/status controls, Shopify sync status, source counts for products/collections/pages/policies, and an embedded dashboard test chat using my real Shopify data and a real server-side AI model before installing anything on my storefront. Ask me what setup I already have, verify and reuse it when safe, and do not ask me to paste secrets into chat.

Make the customer-facing widget polished and safe by default: no developer/testing language, no shopper-visible source/debug panels, friendly fallbacks, clean Markdown links, product-first recommendations, public storefront links with preview/admin/token params stripped, mobile-safe prompts/placeholders, chat state preserved when shoppers follow internal links, and bounded sanitized recent history sent to the backend so follow-up questions continue naturally.
```

## Start A Shopify Landing Page Build

Open Codex in the Shopify site repo, then paste:

```text
Use the shopify-landing-page-builder skill.

I want to create a high-converting Shopify landing page for this store. Inspect this repo first, show me the Shopify Landing Page Build Progress tracker, and guide me like a new user.

Start in Fast Draft Mode unless the page needs deeper strategy. Ask only for the product, audience, offer, traffic source, proof/assets, claims, and CTA path that materially change the page. Use labeled assumptions and verification placeholders instead of inventing facts. Create a Shopify-ready DTC design package before touching theme files, then build and preview the page safely using real Shopify theme files, exact image placeholders or Shopify Files images, and a rollback path.
```

## Start A Shopify Site Build

Open Codex in the Shopify site repo, then paste:

```text
Use the shopify-site-builder skill.

I want to build or rebuild a consistent Shopify site across homepage, product pages, collections, and content pages. Inspect this repo first, show me the Shopify Site Build Progress tracker, and guide me like a new user.

Start in Fast Site Draft Mode unless the site needs deeper strategy. Ask only for the brand, catalog, audience, must-have pages, navigation, proof/assets, claims, and launch constraints that materially change the site. Use labeled assumptions and verification placeholders instead of inventing facts. Create a Shopify-ready site blueprint before broad theme work, then build and preview safely using real Shopify theme files, Theme Access, Admin API access when needed, Shopify Files images, and a rollback path.
```

## Start Amazon Opportunity Research

Open Codex while signed in to the Seller Central account you want to research,
then paste:

```text
Use the amazon-opportunity-explorer skill.

Help me research product opportunities using Product Opportunity Explorer in my
currently authorized Amazon Seller Central account. Confirm the marketplace and
my constraints first, use only evidence visible in this account, and keep
Amazon findings separate from your analysis.

Start by mining and ranking up to five niches. Show me each proposed product
concept and ask for approval immediately before submitting it to Validate a New
Product Idea.
```

## Validation

Run:

```powershell
.\scripts\validate-skill-pack.ps1
```
