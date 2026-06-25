# Start Here

This pack has one job: help an Amazing.com member use Codex to build a real, valuable Shopify chatbot for a live store.

## Install

Paste this into Codex:

```text
Use the skill-installer skill.
Install the skill from this GitHub repo:
https://github.com/mcclaryamazing/amazing-ai-builder-skill-pack

The skill is in:
- skills/shopify-chatbot-builder

After installing, tell me how to verify the skill is available.
```

Restart or refresh Codex if needed.

## Before You Start

Have these ready or know who can provide them:

- Shopify site repo access
- Shopify store owner, staff, collaborator, or Theme Access permissions
- permission to create or use a Shopify app with read-only Admin API scopes
- AI provider account and server-side API key
- support contact page or support email
- shipping, returns/refunds, privacy, terms, and warranty policy pages when available
- development theme access
- safe local or hosted secret storage for `.env` values and deployment secrets

Do not paste secrets into chat. Codex should tell you which local field to fill.

## Start In The Shopify Site Repo

Open Codex in the Shopify site repo, then paste:

```text
Use the shopify-chatbot-builder skill.

I want to build a private AI chatbot for this live Shopify store. Inspect this repo first, show me the Shopify Chatbot Build Progress tracker, and guide me like a new user.

Create a private demo using my real Shopify products, pages, policies, and a real server-side AI model before installing anything on my storefront. Ask me what setup I already have, verify and reuse it when safe, and do not ask me to paste secrets into chat.
```

## Safety

- Do not install anything on the live storefront until the private real-store demo passes.
- Do not put Admin API tokens or AI provider keys in frontend code.
- Do not enable order lookup unless authentication, privacy, and backend verification are designed.
- Do not push to a live Shopify theme without a reviewed change list and rollback path.
