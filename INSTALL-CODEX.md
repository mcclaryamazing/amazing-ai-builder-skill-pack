# Install For Codex

Codex skills are folders with a `SKILL.md` file. This pack contains:

```text
skills/shopify-chatbot-builder
skills/shopify-landing-page-builder
skills/shopify-site-builder
skills/amazon-opportunity-explorer
skills/consumer-brand-copywriting
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
- skills/shopify-site-builder
- skills/amazon-opportunity-explorer
- skills/consumer-brand-copywriting

After installing, tell me how to verify all five skills are available.
```

Restart or refresh Codex if needed.

## Manual Fallback

From this repo root:

```powershell
$target = "$env:USERPROFILE\.codex\skills"
New-Item -ItemType Directory -Force $target
Copy-Item -Recurse -Force .\skills\shopify-chatbot-builder $target
Copy-Item -Recurse -Force .\skills\shopify-landing-page-builder $target
Copy-Item -Recurse -Force .\skills\shopify-site-builder $target
Copy-Item -Recurse -Force .\skills\amazon-opportunity-explorer $target
Copy-Item -Recurse -Force .\skills\consumer-brand-copywriting $target
```

## Verify

Ask Codex:

```text
What Amazing AI Builder skills can you see?
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

## Start Site Builder Work

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

## Start Consumer-Brand Copywriting

Open Codex with your product facts and brand materials available, then paste:

```text
Use the consumer-brand-copywriting skill.

Create conversion-focused copy for my consumer brand. Start from the supplied
product facts, audience, offer, proof, traffic source, and brand voice. Do not
invent claims, testimonials, guarantees, pricing, shipping terms, urgency, or
certifications. Mark anything missing for verification and deliver finished,
channel-appropriate copy with clear benefits, proof, objections, and CTAs.
```
