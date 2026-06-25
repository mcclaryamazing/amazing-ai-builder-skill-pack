# Amazing Shopify Chatbot Skill Pack

This repo contains one Codex skill for Amazing.com members who want to build a real AI chatbot for a live Shopify store.

The skill guides Codex through a safe, practical path:

1. Inspect the member's Shopify site repo.
2. Verify or configure a real AI model key server-side.
3. Connect read-only Shopify product, page, collection, and policy data.
4. Build a private real-store chatbot demo before installing anything on the storefront.
5. Test answer quality, refusals, support handoff, desktop, and mobile.
6. Install the widget on a development theme.
7. Launch only after approval, rollback, and disable paths are clear.

## Skill

- `shopify-chatbot-builder` - the full guided workflow for building, testing, installing, and launching a private one-store Shopify AI chatbot.

## Member Readiness Checklist

Before starting, the member should have or be able to get:

- access to the Shopify site repo
- Shopify store owner, staff, collaborator, or Theme Access permissions
- permission to create or use a Shopify app with read-only Admin API scopes
- an AI provider account and server-side API key
- support contact path, such as a contact page or support email
- store policy pages for shipping, returns/refunds, privacy, terms, and warranty when available
- a development theme or permission to create one
- a place to store secrets, such as `.env`, Secret Manager, or another secure secret store

Secrets must never be pasted into chat, committed to the repo, or placed in Liquid, public JavaScript, metafields, screenshots, or docs.

## Install In Codex

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

## Start In A Shopify Site Repo

Open Codex in the Shopify site repo, then paste:

```text
Use the shopify-chatbot-builder skill.

I want to build a private AI chatbot for this live Shopify store. Inspect this repo first, show me the Shopify Chatbot Build Progress tracker, and guide me like a new user.

Create a private demo using my real Shopify products, pages, policies, and a real server-side AI model before installing anything on my storefront. Ask me what setup I already have, verify and reuse it when safe, and do not ask me to paste secrets into chat.
```

## Validation

Run:

```powershell
.\scripts\validate-skill-pack.ps1
```
