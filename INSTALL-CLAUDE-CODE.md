# Install For Claude Code

Claude Code skill or instruction behavior may differ by version and workspace setup. Treat this pack as a portable instruction set: each folder under `skills/` contains a `SKILL.md` file that can be copied into the location your Claude Code setup uses for custom skills, project instructions, or reusable prompts.

## Ask Claude Code To Install Or Import

```text
Install or import the reusable skill from this GitHub repo:
https://github.com/<owner>/amazing-ai-builder-skill-pack

The skill lives under skills/shopify-chatbot-builder. If your current Claude Code version cannot install skills directly from GitHub, tell me which manual copy step or prompt fallback I should use.
```

Claude Code behavior may vary by version. If it supports skill installation from GitHub, this should be the easiest learner path. If it does not, use the manual approach below.

## Manual Approach

1. Copy the `skills/` folder into the skill/instructions location supported by your Claude Code setup.
2. Start a new Claude Code session in your chatbot project folder.
3. Explicitly name the skill you want it to use.

Example:

```text
Use the shopify-chatbot-builder skill from the Amazing Shopify Chatbot Skill Pack.

I want to build and install a private AI chatbot for my Shopify store. Show me the progress tracker and start with a polished local demo. Do not connect Shopify or touch my theme yet.
```

## If Your Claude Code Version Does Not Support Skills

Use the prompt fallbacks:

- [PROMPT-FALLBACKS.md](PROMPT-FALLBACKS.md)
- [prompts/01-plan-my-shopify-chatbot.md](prompts/01-plan-my-shopify-chatbot.md)
- [prompts/02-build-my-shopify-chatbot.md](prompts/02-build-my-shopify-chatbot.md)
- [prompts/03-connect-my-shopify-store.md](prompts/03-connect-my-shopify-store.md)
- [prompts/04-test-my-chatbot-safety.md](prompts/04-test-my-chatbot-safety.md)
- [prompts/05-fix-my-chatbot-error.md](prompts/05-fix-my-chatbot-error.md)
- [prompts/06-review-my-chatbot-before-launch.md](prompts/06-review-my-chatbot-before-launch.md)

## Verify

Ask:

```text
List the Amazing Shopify Chatbot instruction you can access. If you cannot access it as a skill, tell me which prompt fallback I should paste instead.
```
