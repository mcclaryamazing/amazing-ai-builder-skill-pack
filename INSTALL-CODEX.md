# Install For Codex

Codex skills are folders with a `SKILL.md` file. This pack includes eight skill folders under `skills/`.

Codex installations can vary. If your Codex setup uses a different skills directory, use that directory instead of the examples below.

## Recommended: Install From GitHub URL

After this repo is published to GitHub, the easiest path is to paste the repo URL into Codex and ask it to install the skills.

Use:

```text
Use the skill-installer skill.
Install all skills from this GitHub repo:
https://github.com/<owner>/amazing-ai-builder-skill-pack

The skills are in:
- skills/ai-business-app-project-planner
- skills/non-technical-founder-coding-coach
- skills/shopify-ai-chatbot-builder
- skills/shopify-access-and-data-sync
- skills/shopify-theme-widget-installer
- skills/commerce-ai-guardrail-tester
- skills/coding-agent-debugging-buddy
- skills/launch-readiness-reviewer

After installing, tell me to restart Codex if needed and show me a verification prompt.
```

Codex may use a GitHub skill installer, a download flow, or git checkout depending on its current tooling and repository visibility. Private repos may require the user's existing GitHub credentials.

## Manual Fallback: Copy Into Your Codex Skills Folder

Common Windows path:

```powershell
$target = "$env:USERPROFILE\.codex\skills"
New-Item -ItemType Directory -Force -Path $target
Copy-Item -Recurse -Force .\skills\* $target
```

From this skill-pack repo root, that copies:

```text
skills/ai-business-app-project-planner
skills/non-technical-founder-coding-coach
skills/shopify-ai-chatbot-builder
skills/shopify-access-and-data-sync
skills/shopify-theme-widget-installer
skills/commerce-ai-guardrail-tester
skills/coding-agent-debugging-buddy
skills/launch-readiness-reviewer
```

## Verify

After installing, restart Codex if the installer tells you to. Then start a new Codex session and ask:

```text
What Amazing AI Builder skills can you see?
```

Then try:

```text
Use the shopify-ai-chatbot-builder skill. Help me plan the safest first version of a private chatbot for my Shopify store. Start with a local demo and do not connect to Shopify yet.
```

And:

```text
Use the commerce-ai-guardrail-tester skill. Review my chatbot answers for unsupported claims about price, discounts, inventory, shipping, returns, warranty, safety, and order status.
```

## If Codex Does Not Detect The Skills

1. Confirm each skill folder contains `SKILL.md`.
2. Confirm the folder names are lower-case hyphenated names.
3. Restart Codex or open a new thread.
4. Use the exact skill name in your prompt.
5. If detection still fails, use [PROMPT-FALLBACKS.md](PROMPT-FALLBACKS.md).
