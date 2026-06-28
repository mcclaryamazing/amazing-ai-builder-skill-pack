# Start Here

This pack helps Amazing.com members use Codex to build useful Shopify growth assets for a live store.

## Choose A Skill

- Use `shopify-chatbot-builder` to build a protected chatbot dashboard and real-store test chat first, polish the customer-facing assistant experience, then install and launch the thin storefront widget safely.
- Use `shopify-landing-page-builder` to create a DTC landing page strategy, build it in real Shopify theme files, preview it, and launch with rollback. It can start with a quick Fast Draft intake or go deeper when strategy risk is high.
- Use `shopify-site-builder` to plan, build, preview, and safely launch a consistent Shopify site across homepage, product pages, collections, content pages, navigation, and shared theme systems.

## Install

Paste this into Codex:

```text
Use the skill-installer skill.
Install from this GitHub repo:
https://github.com/mcclaryamazing/amazing-ai-builder-skill-pack

The skill folders are:
- skills/shopify-chatbot-builder
- skills/shopify-landing-page-builder
- skills/shopify-site-builder

After installing, tell me how to verify all three skills are available.
```

Restart or refresh Codex if needed.

## Before You Start

For a Fast Draft landing-page strategy, you can start with only the product, likely buyer, offer if any, primary CTA, and whatever proof/assets are available. Codex should label assumptions and placeholders instead of making you complete a long intake.

Before building, previewing, launching, or mutating Shopify state, have these ready or know who can provide them:

- Shopify site repo access
- Shopify store owner, staff, collaborator, or Theme Access permissions
- permission to create or use a Shopify app with the required Admin API scopes
- development theme access
- safe local or hosted secret storage for `.env` values and deployment secrets

For chatbot builds, also gather:

- AI provider account and server-side API key
- support contact page or support email
- shipping, returns/refunds, privacy, terms, and warranty policy pages when available

For landing-page builds, also gather:

- product, audience, traffic source, offer, and primary CTA when available
- verified prices, discounts, shipping, guarantee, urgency, reviews, certifications, and claims support before launch
- available product, lifestyle, proof, UGC, logo, and packaging assets
- product, variant, bundle, quiz, lead-form, cart, or checkout assumptions

For full-site builds, also gather:

- brand, catalog, audience, site goal, and must-have pages when available
- main collections, product-template needs, navigation assumptions, and content-page needs
- available brand, product, collection, lifestyle, proof, guide, and social-preview assets
- verified products, variants, collections, policies, shipping, discount, guarantee, and claim support before launch

Do not paste secrets into chat. Codex should tell you which local field to fill.

## Start A Chatbot Build

Open Codex in the Shopify site repo, then paste:

```text
Use the shopify-chatbot-builder skill.

I want to build a private AI chatbot for this live Shopify store. Inspect this repo first, show me the Shopify Chatbot Build Progress tracker, and guide me like a new user.

Build this dashboard-first. Create a protected admin dashboard/control plane with source inspection, mode/status controls, Shopify sync status, source counts for products/collections/pages/policies, and an embedded dashboard test chat using my real Shopify data and a real server-side AI model before installing anything on my storefront. Ask me what setup I already have, verify and reuse it when safe, and do not ask me to paste secrets into chat.

Make the storefront widget customer-ready: warm concise copy, normal typing indicator, no developer/testing language, no shopper-visible source/debug panels, clean Markdown links, safe public storefront URLs, product-first recommendations, mobile-safe prompts and placeholder text, friendly support fallback, chat state preserved when shoppers click internal links, and bounded sanitized recent history sent to the backend so follow-up questions continue naturally.
```

## Start A Landing Page Build

Open Codex in the Shopify site repo, then paste:

```text
Use the shopify-landing-page-builder skill.

I want to create a high-converting Shopify landing page for this store. Inspect this repo first, show me the Shopify Landing Page Build Progress tracker, and guide me like a new user.

Start in Fast Draft Mode unless the page needs deeper strategy. Ask only for the product, audience, offer, traffic source, proof/assets, claims, and CTA path that materially change the page. Use labeled assumptions and verification placeholders instead of inventing facts. Create a Shopify-ready DTC design package before touching theme files, then build and preview the page safely using real Shopify theme files, exact image placeholders or Shopify Files images, and a rollback path.
```

## Start A Site Build

Open Codex in the Shopify site repo, then paste:

```text
Use the shopify-site-builder skill.

I want to build or rebuild a consistent Shopify site across homepage, product pages, collections, and content pages. Inspect this repo first, show me the Shopify Site Build Progress tracker, and guide me like a new user.

Start in Fast Site Draft Mode unless the site needs deeper strategy. Ask only for the brand, catalog, audience, must-have pages, navigation, proof/assets, claims, and launch constraints that materially change the site. Use labeled assumptions and verification placeholders instead of inventing facts. Create a Shopify-ready site blueprint before broad theme work, then build and preview safely using real Shopify theme files, Theme Access, Admin API access when needed, Shopify Files images, and a rollback path.
```

## Safety

- Do not put Admin API tokens, client secrets, Theme Access passwords, or AI provider keys in frontend code.
- Do not expose provider names, internal routes, retrieval/source/debug language, preview tokens, stack traces, or config names in customer-facing chatbot copy.
- Do not show source/debug panels in the shopper widget; keep source inspection in the protected dashboard.
- Do not let chatbot links expose preview, admin, token, key, or other non-customer query params.
- Do not rely on visual transcript memory alone; the storefront widget and dashboard test chat must send bounded sanitized recent history to the backend for follow-up questions.
- Do not push to a live Shopify theme without a reviewed change list, targeted no-delete push plan, and rollback path.
- Do not deploy or mutate Shopify state before reading the target repo's `deploy.md` or `DEPLOY.md` if present.
- If there is uncommitted work in the target repo, Codex should list it and ask whether it should be included before deploying.
- Do not start a full-site build without a site blueprint covering homepage, PDPs, collections, content pages, navigation, shared theme system, data changes, QA, and rollback.
