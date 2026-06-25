# Amazing Shopify Chatbot Skill Pack

This repo is a focused skill pack for helping Shopify sellers and operators use Codex, Claude Code, or another coding agent to build and install a private AI chatbot on one Shopify store.

The pack was extracted from a Shopify AI chatbot starter workflow. It is not a finished chatbot app. It is a reusable set of agent instructions, install notes, examples, and prompt fallbacks for building the app safely.

## Who This Is For

- Shopify sellers who want their own storefront chatbot.
- Operators who are comfortable with their business but new to coding.
- Builders using an AI coding agent as the developer.
- Teams that want local demos, real store data sync, storefront widget installation, and cautious launch checks.

## What It Teaches The Agent

- Build a polished local chatbot demo before touching Shopify.
- Keep provider keys and Shopify Admin credentials server-side.
- Connect products, collections, pages, and policies as chatbot knowledge.
- Install a storefront chat widget without damaging live themes.
- Refuse unsupported ecommerce claims instead of inventing answers.
- Verify support handoff, rollback, and launch readiness before going live.
- Keep the learner oriented with a visible step-by-step progress tracker.

## Skills

- `shopify-chatbot-builder` - one guided skill for the whole Shopify chatbot project: polished local demo, Shopify connection, store sync, storefront widget, safety testing, launch, and rollback.

## Start Here

1. Read [START-HERE.md](START-HERE.md).
2. If this pack is on GitHub, paste the repo URL into Codex or Claude Code and ask it to install the skills.
3. If you need manual install details, use:
   - [INSTALL-CODEX.md](INSTALL-CODEX.md)
   - [INSTALL-CLAUDE-CODE.md](INSTALL-CLAUDE-CODE.md)
4. If installation is confusing, use [PROMPT-FALLBACKS.md](PROMPT-FALLBACKS.md).
5. For the Shopify chatbot pattern, read [examples/shopify-ai-chatbot/README.md](examples/shopify-ai-chatbot/README.md).

## Fast Install Prompt

After this pack is published to GitHub, paste this into Codex or Claude Code and replace the URL:

```text
Install the skill from this GitHub repo:
https://github.com/<owner>/amazing-ai-builder-skill-pack

The skill lives under skills/shopify-chatbot-builder. After installing, tell me how to verify it is available.
```

## Critical Safety Rules

1. Do not paste secrets into chat.
2. Do not commit `.env` files.
3. Do not put Shopify Admin API tokens or AI provider keys in frontend/widget code.
4. Do not make live Shopify theme changes without showing a diff or change summary first.
5. Do not call a chatbot production-ready without testing.
6. Do not let the chatbot invent ecommerce facts.
7. Do not enable order lookup unless authentication, privacy, and backend logic are properly implemented.
8. Do not overbuild into SaaS or multi-tenant unless explicitly requested.
9. Do not assume the learner knows what a terminal, API, deployment, or environment variable is.
10. Do not hide risk behind confident language.

## Validation

Run:

```powershell
.\scripts\validate-skill-pack.ps1
```

The validator checks required files, skill front matter, prompt fallbacks, and common references. It does not call external services.
