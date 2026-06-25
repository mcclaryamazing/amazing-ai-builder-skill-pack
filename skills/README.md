# Skills Catalog

This folder contains the single skill in the Amazing Shopify Chatbot Skill Pack.

Each skill is self-contained in its own folder with a `SKILL.md` file. When installing from GitHub, point Codex, Claude Code, or another skill-aware agent at this repo and tell it the skill lives under `skills/`.

## Skill List

| Skill | Use When | Install Path |
| --- | --- | --- |
| [shopify-chatbot-builder](shopify-chatbot-builder/SKILL.md) | A Shopify seller wants a coding agent to guide the full path: build a polished local chatbot demo, connect Shopify, sync store knowledge, install the widget, test safety, launch, and know the rollback path. | `skills/shopify-chatbot-builder` |

## Suggested Install Prompt

```text
Install the skill from this GitHub repo:
https://github.com/<owner>/amazing-ai-builder-skill-pack

The skill lives under:
- skills/shopify-chatbot-builder
```

## Recommended Workflow

Start with:

```text
Use the shopify-chatbot-builder skill. Help me build and install a private Shopify chatbot for my store. Show me where I am in the process and start with a polished local demo.
```

The skill should keep a visible progress tracker so the learner always knows what stage they are in and what comes next.
