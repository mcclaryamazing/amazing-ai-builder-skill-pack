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

Create a private demo using my real Shopify products, pages, policies, and a real server-side AI model before installing anything on my storefront. Ask me what setup I already have, verify and reuse it when safe, and do not ask me to paste secrets into chat.
```

## Start Landing Page Work

Open Codex in the Shopify site repo, then paste:

```text
Use the shopify-landing-page-builder skill.

I want to create a high-converting Shopify landing page for this store. Inspect this repo first, show me the Shopify Landing Page Build Progress tracker, and guide me like a new user.

Start with the product, audience, offer, traffic source, proof, claims, assets, and CTA path. Create a Shopify-ready DTC design package before touching theme files, then build and preview the page safely using real Shopify theme files, exact image placeholders or Shopify Files images, and a rollback path.
```
