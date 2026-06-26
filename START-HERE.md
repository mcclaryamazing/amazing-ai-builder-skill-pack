# Start Here

This pack helps Amazing.com members use Codex to build useful Shopify growth assets for a live store.

## Choose A Skill

- Use `shopify-chatbot-builder` to build a protected chatbot dashboard and real-store test chat first, polish the customer-facing assistant experience, then install and launch the thin storefront widget safely.
- Use `shopify-landing-page-builder` to create a DTC landing page strategy, build it in real Shopify theme files, preview it, and launch with rollback.

## Install

Paste this into Codex:

```text
Use the skill-installer skill.
Install from this GitHub repo:
https://github.com/mcclaryamazing/amazing-ai-builder-skill-pack

The skill folders are:
- skills/shopify-chatbot-builder
- skills/shopify-landing-page-builder

After installing, tell me how to verify both skills are available.
```

Restart or refresh Codex if needed.

## Before You Start

Have these ready or know who can provide them:

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

- product, audience, traffic source, offer, and primary CTA
- verified prices, discounts, shipping, guarantee, urgency, reviews, certifications, and claims support
- available product, lifestyle, proof, UGC, logo, and packaging assets
- product, variant, bundle, quiz, lead-form, cart, or checkout assumptions

Do not paste secrets into chat. Codex should tell you which local field to fill.

## Start A Chatbot Build

Open Codex in the Shopify site repo, then paste:

```text
Use the shopify-chatbot-builder skill.

I want to build a private AI chatbot for this live Shopify store. Inspect this repo first, show me the Shopify Chatbot Build Progress tracker, and guide me like a new user.

Build this dashboard-first. Create a protected admin dashboard/control plane with source inspection, mode/status controls, Shopify sync status, source counts for products/collections/pages/policies, and an embedded dashboard test chat using my real Shopify data and a real server-side AI model before installing anything on my storefront. Ask me what setup I already have, verify and reuse it when safe, and do not ask me to paste secrets into chat.

Make the storefront widget customer-ready: warm concise copy, normal typing indicator, no developer/testing language, no shopper-visible source/debug panels, clean Markdown links, safe public storefront URLs, product-first recommendations, mobile-safe prompts and placeholder text, friendly support fallback, and chat state preserved when shoppers click internal links.
```

## Start A Landing Page Build

Open Codex in the Shopify site repo, then paste:

```text
Use the shopify-landing-page-builder skill.

I want to create a high-converting Shopify landing page for this store. Inspect this repo first, show me the Shopify Landing Page Build Progress tracker, and guide me like a new user.

Start with the product, audience, offer, traffic source, proof, claims, assets, and CTA path. Create a Shopify-ready DTC design package before touching theme files, then build and preview the page safely using real Shopify theme files, exact image placeholders or Shopify Files images, and a rollback path.
```

## Safety

- Do not put Admin API tokens, client secrets, Theme Access passwords, or AI provider keys in frontend code.
- Do not expose provider names, internal routes, retrieval/source/debug language, preview tokens, stack traces, or config names in customer-facing chatbot copy.
- Do not show source/debug panels in the shopper widget; keep source inspection in the protected dashboard.
- Do not let chatbot links expose preview, admin, token, key, or other non-customer query params.
- Do not push to a live Shopify theme without a reviewed change list, targeted no-delete push plan, and rollback path.
- Do not deploy or mutate Shopify state before reading the target repo's `deploy.md` or `DEPLOY.md` if present.
- If there is uncommitted work in the target repo, Codex should list it and ask whether it should be included before deploying.
