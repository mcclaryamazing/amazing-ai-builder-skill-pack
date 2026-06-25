# Skills Catalog

This folder contains the eight skills in the Amazing AI Builder Skill Pack.

Each skill is self-contained in its own folder with a `SKILL.md` file. When installing from GitHub, point Codex, Claude Code, or another skill-aware agent at this repo and tell it the skills live under `skills/`.

## Skill List

| Skill | Use When | Install Path |
| --- | --- | --- |
| [ai-business-app-project-planner](ai-business-app-project-planner/SKILL.md) | A founder or operator has an AI tool idea and needs help turning it into a clear business outcome, scope, data plan, risks, phased build plan, and implementation prompts. | `skills/ai-business-app-project-planner` |
| [non-technical-founder-coding-coach](non-technical-founder-coding-coach/SKILL.md) | A non-technical user needs plain-English guidance through code changes, terminal output, setup steps, risks, and next actions. | `skills/non-technical-founder-coding-coach` |
| [shopify-ai-chatbot-builder](shopify-ai-chatbot-builder/SKILL.md) | Building, adapting, testing, or launching a private one-store Shopify AI chatbot with safe local demo, backend API, store data, guardrails, and deployment prep. | `skills/shopify-ai-chatbot-builder` |
| [shopify-access-and-data-sync](shopify-access-and-data-sync/SKILL.md) | Setting up Shopify access, Theme Access, Admin API scopes, custom app tokens, backend-only data ingestion, read-only sync, or secret-safe Shopify configuration. | `skills/shopify-access-and-data-sync` |
| [shopify-theme-widget-installer](shopify-theme-widget-installer/SKILL.md) | Adding or improving Shopify storefront widgets, Liquid snippets, loader JavaScript, CSS assets, render hooks, CLI pushes, verification, and rollback plans. | `skills/shopify-theme-widget-installer` |
| [commerce-ai-guardrail-tester](commerce-ai-guardrail-tester/SKILL.md) | Testing ecommerce AI answers for hallucinated claims, unsupported promises, unsafe product/policy statements, weak refusals, or missing support handoff. | `skills/commerce-ai-guardrail-tester` |
| [coding-agent-debugging-buddy](coding-agent-debugging-buddy/SKILL.md) | A beginner pastes an error or says something broke and needs safe debugging for terminal, install, build, test, API, widget, Shopify CLI, or deployment issues. | `skills/coding-agent-debugging-buddy` |
| [launch-readiness-reviewer](launch-readiness-reviewer/SKILL.md) | Reviewing whether an AI tool is ready for local testing, private preview, limited live beta, or broader launch. | `skills/launch-readiness-reviewer` |

## Suggested Install Prompt

```text
Install all skills from this GitHub repo:
https://github.com/<owner>/amazing-ai-builder-skill-pack

The skills live under the skills/ directory. Please install these eight skill folders:
- skills/ai-business-app-project-planner
- skills/non-technical-founder-coding-coach
- skills/shopify-ai-chatbot-builder
- skills/shopify-access-and-data-sync
- skills/shopify-theme-widget-installer
- skills/commerce-ai-guardrail-tester
- skills/coding-agent-debugging-buddy
- skills/launch-readiness-reviewer
```

## Pack Workflow

For a beginner Shopify chatbot build, the usual flow is:

1. `ai-business-app-project-planner`
2. `non-technical-founder-coding-coach`
3. `shopify-ai-chatbot-builder`
4. `shopify-access-and-data-sync`
5. `shopify-theme-widget-installer`
6. `commerce-ai-guardrail-tester`
7. `coding-agent-debugging-buddy`
8. `launch-readiness-reviewer`

Use only the skills that fit the current task. The pack is designed to be modular, so an agent can install all eight skills but invoke them one at a time as needed.
