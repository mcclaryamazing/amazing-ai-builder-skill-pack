# Install For Claude Code

Claude Code skill or instruction behavior may differ by version and workspace setup. Treat this pack as a portable instruction set: each folder under `skills/` contains a `SKILL.md` file that can be copied into the location your Claude Code setup uses for custom skills, project instructions, or reusable prompts.

## Recommended: Ask Claude Code To Install From GitHub

After this repo is published to GitHub, try the GitHub URL workflow first:

```text
Install or import the reusable skills from this GitHub repo:
https://github.com/<owner>/amazing-ai-builder-skill-pack

The skills live under the skills/ directory. If your current Claude Code version cannot install skills directly from GitHub, tell me which manual copy step or prompt fallback I should use.
```

Claude Code behavior may vary by version. If it supports skill installation from GitHub, this should be the easiest learner path. If it does not, use the manual approach below.

## Manual Approach

1. Copy the `skills/` folder into the skill/instructions location supported by your Claude Code setup.
2. Open a new Claude Code session in your project.
3. Explicitly name the skill you want it to use.

Example:

```text
Use the shopify-ai-chatbot-builder skill from the Amazing AI Builder Skill Pack.
Help me plan a private one-store Shopify chatbot. Start with a local demo and do not connect Shopify yet.
```

## If Your Claude Code Version Does Not Support Skills

Use the prompt fallbacks:

- [PROMPT-FALLBACKS.md](PROMPT-FALLBACKS.md)
- [prompts/01-start-a-new-ai-tool-project.md](prompts/01-start-a-new-ai-tool-project.md)
- [prompts/02-build-my-shopify-chatbot.md](prompts/02-build-my-shopify-chatbot.md)

Paste the relevant prompt into Claude Code.

## Verification Prompt

```text
List the Amazing AI Builder instructions you can access. If you cannot access them as skills, tell me which prompt fallback I should paste instead.
```

## Safety Reminder

Do not paste API keys, Shopify Admin tokens, database URLs, service account files, or customer private data into Claude Code. Ask it where to put the values locally or in a secret manager.
