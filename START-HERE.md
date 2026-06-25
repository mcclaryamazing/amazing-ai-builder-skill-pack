# Start Here

This pack is for one job: building and installing a private AI chatbot on a Shopify store.

## Install The Skill

If the pack is published on GitHub, the easiest path is to ask your coding agent to install the skill from the repo URL:

```text
Install the skill from this GitHub repo:
https://github.com/<owner>/amazing-ai-builder-skill-pack

The skill lives under skills/shopify-chatbot-builder.
```

If the skill installs correctly, start with:

```text
Use the shopify-chatbot-builder skill. Help me build and install a private chatbot for my Shopify store. Show me where I am in the process and start with a polished local demo.
```

If the skill does not install cleanly, use the prompt fallbacks:

- [PROMPT-FALLBACKS.md](PROMPT-FALLBACKS.md)

## Beginner Path

1. Install the skill for your coding agent.
2. Start with `shopify-chatbot-builder`.
3. Build a polished local demo with sample products and policies.
4. Connect Shopify store data only after the local demo works.
5. Install the storefront chat widget on a development theme before touching the live theme.
6. Test unsupported product, price, discount, inventory, shipping, returns, warranty, and order-status questions.
7. Review readiness before private preview or live launch.

## What Not To Do First

- Do not paste API keys or Shopify tokens into chat.
- Do not put secrets in frontend widget code.
- Do not push to a live Shopify theme before reviewing the exact files.
- Do not enable order lookup until authentication and privacy are designed.
- Do not build a multi-store SaaS unless you explicitly want that.

## First Prompt To Try

```text
Use the shopify-chatbot-builder skill.

I want to build my own AI chatbot for my Shopify store. Please inspect this folder, explain what exists, show me the progress tracker, and help me get to a polished first local demo before we connect Shopify or touch a theme.
```
