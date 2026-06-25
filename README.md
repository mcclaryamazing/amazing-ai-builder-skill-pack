# Amazing Shopify AI Builder Skill Pack

This repo contains installable Codex skills for Amazing.com members building practical AI-assisted Shopify growth tools.

## Skills

- `shopify-chatbot-builder` - guided workflow for building, testing, installing, and launching a private one-store Shopify AI chatbot.
- `shopify-landing-page-builder` - guided workflow for designing, building, testing, and safely launching a high-converting DTC Shopify landing page.

## What The Skills Do

The chatbot skill guides Codex through a safe, practical path:

1. Inspect the member's Shopify site repo.
2. Verify or configure a real AI model key server-side.
3. Connect read-only Shopify product, page, collection, and policy data.
4. Build a private real-store chatbot demo before installing anything on the storefront.
5. Test answer quality, refusals, support handoff, desktop, and mobile.
6. Install the widget on a development theme.
7. Launch only after approval, rollback, and disable paths are clear.

The landing-page skill guides Codex through the full DTC page path:

1. Understand the product, audience, offer, and traffic source.
2. Inspect the Shopify repo, theme setup, and launch constraints.
3. Create a DTC strategy, copy package, section sequence, and exact image-slot plan.
4. Approve claims, offer, product wiring, page structure, and image plan.
5. Build the page in real Shopify theme files.
6. Add Shopify Files imagery, metadata, and purchase wiring.
7. QA desktop, mobile, interactions, accessibility basics, and checkout path.
8. Preview on a development theme or private page.
9. Launch only after approval, rollback, and monitoring are clear.

## Member Readiness Checklist

Before starting, the member should have or be able to get:

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

- product, offer, audience, and traffic-source details
- available product, lifestyle, proof, UGC, logo, or packaging assets
- product/variant/bundle/quiz/lead-form assumptions
- verified proof, claim support, guarantee, shipping, discount, and urgency details

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

After installing, tell me how to verify both skills are available.
```

Restart or refresh Codex if needed.

## Start A Shopify Chatbot Build

Open Codex in the Shopify site repo, then paste:

```text
Use the shopify-chatbot-builder skill.

I want to build a private AI chatbot for this live Shopify store. Inspect this repo first, show me the Shopify Chatbot Build Progress tracker, and guide me like a new user.

Create a private demo using my real Shopify products, pages, policies, and a real server-side AI model before installing anything on my storefront. Ask me what setup I already have, verify and reuse it when safe, and do not ask me to paste secrets into chat.
```

## Start A Shopify Landing Page Build

Open Codex in the Shopify site repo, then paste:

```text
Use the shopify-landing-page-builder skill.

I want to create a high-converting Shopify landing page for this store. Inspect this repo first, show me the Shopify Landing Page Build Progress tracker, and guide me like a new user.

Start with the product, audience, offer, traffic source, proof, claims, assets, and CTA path. Create a Shopify-ready DTC design package before touching theme files, then build and preview the page safely using real Shopify theme files, exact image placeholders or Shopify Files images, and a rollback path.
```

## Validation

Run:

```powershell
.\scripts\validate-skill-pack.ps1
```
