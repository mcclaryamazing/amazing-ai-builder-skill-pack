# Install For Codex

Codex skills are folders with a `SKILL.md` file. This pack contains one skill:

```text
skills/shopify-chatbot-builder
```

## Install From GitHub

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

## Manual Fallback

From this repo root:

```powershell
$target = "$env:USERPROFILE\.codex\skills"
New-Item -ItemType Directory -Force $target
Copy-Item -Recurse -Force .\skills\shopify-chatbot-builder $target
```

## Verify

Ask Codex:

```text
What Amazing Shopify Chatbot skill can you see?
```

Then start inside the Shopify site repo:

```text
Use the shopify-chatbot-builder skill.

I want to build a private AI chatbot for this live Shopify store. Inspect this repo first, show me the Shopify Chatbot Build Progress tracker, and guide me like a new user.

Create a private demo using my real Shopify products, pages, policies, and a real server-side AI model before installing anything on my storefront. Ask me what setup I already have, verify and reuse it when safe, and do not ask me to paste secrets into chat.
```
