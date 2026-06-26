# Install For Codex

Codex skills are folders with a `SKILL.md` file. This pack contains:

```text
skills/shopify-chatbot-builder
skills/shopify-landing-page-builder
```

## Install From GitHub

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

## Manual Fallback

From this repo root:

```powershell
$target = "$env:USERPROFILE\.codex\skills"
New-Item -ItemType Directory -Force $target
Copy-Item -Recurse -Force .\skills\shopify-chatbot-builder $target
Copy-Item -Recurse -Force .\skills\shopify-landing-page-builder $target
```

## Verify

Ask Codex:

```text
What Amazing Shopify AI builder skills can you see?
```

## Start Chatbot Work

Open Codex in the Shopify site repo, then paste:

```text
Use the shopify-chatbot-builder skill.

I want to build a private AI chatbot for this live Shopify store. Inspect this repo first, show me the Shopify Chatbot Build Progress tracker, and guide me like a new user.

Build this dashboard-first. Create a protected admin dashboard/control plane with source inspection, mode/status controls, Shopify sync status, source counts for products/collections/pages/policies, and an embedded dashboard test chat using my real Shopify data and a real server-side AI model before installing anything on my storefront. Ask me what setup I already have, verify and reuse it when safe, and do not ask me to paste secrets into chat.

Make the customer-facing widget polished and safe by default: no developer/testing language, no shopper-visible source/debug panels, friendly fallbacks, clean Markdown links, product-first recommendations, public storefront links with preview/admin/token params stripped, mobile-safe prompts/placeholders, chat state preserved when shoppers follow internal links, and bounded sanitized recent history sent to the backend so follow-up questions continue naturally.
```

## Start Landing Page Work

Open Codex in the Shopify site repo, then paste:

```text
Use the shopify-landing-page-builder skill.

I want to create a high-converting Shopify landing page for this store. Inspect this repo first, show me the Shopify Landing Page Build Progress tracker, and guide me like a new user.

Start in Fast Draft Mode unless the page needs deeper strategy. Ask only for the product, audience, offer, traffic source, proof/assets, claims, and CTA path that materially change the page. Use labeled assumptions and verification placeholders instead of inventing facts. Create a Shopify-ready DTC design package before touching theme files, then build and preview the page safely using real Shopify theme files, exact image placeholders or Shopify Files images, and a rollback path.
```
