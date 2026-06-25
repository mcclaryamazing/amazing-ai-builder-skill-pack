# Amazing AI Builder Skill Pack

This repo is a distributable skill pack for helping non-technical business owners use Codex or Claude Code to plan, build, test, debug, and safely launch AI tools.

The pack was extracted from the Shopify AI chatbot starter repo, but it is not a finished chatbot app. It is a reusable set of agent instructions, install notes, examples, and prompt fallbacks.

## Who This Is For

- Shopify sellers and operators who understand their business but are new to coding.
- Builders using Codex, Claude Code, or another AI coding agent as the developer.
- Teams that want local demos, safety guardrails, and launch reviews before live changes.

## What It Teaches The Agent

- Plan a minimum viable AI business tool before coding.
- Explain work in plain English for a non-technical founder.
- Build a private one-store Shopify AI chatbot pattern safely.
- Keep secrets server-side.
- Separate Shopify theme access from backend Shopify data access.
- Install storefront widgets without damaging live themes.
- Test commerce AI answers for hallucinated claims.
- Debug one careful step at a time.
- Review launch readiness conservatively.

## Skills

- `ai-business-app-project-planner` - turn an AI tool idea into a scoped build plan.
- `non-technical-founder-coding-coach` - help the agent explain coding work without overwhelming the owner.
- `shopify-ai-chatbot-builder` - flagship one-store Shopify chatbot workflow.
- `shopify-access-and-data-sync` - safe Shopify access, scopes, and backend data ingestion.
- `shopify-theme-widget-installer` - safe snippet/widget install workflow.
- `commerce-ai-guardrail-tester` - ecommerce hallucination and handoff tests.
- `coding-agent-debugging-buddy` - step-by-step debugging help for beginners.
- `launch-readiness-reviewer` - conservative launch readiness classification.

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
Install all skills from this GitHub repo:
https://github.com/<owner>/amazing-ai-builder-skill-pack

The skills live under the skills/ directory. After installing, tell me how to verify they are available.
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
