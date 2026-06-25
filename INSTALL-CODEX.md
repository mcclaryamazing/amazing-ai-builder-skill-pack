# Install For Codex

Codex skills are folders with a `SKILL.md` file. This pack includes one Shopify chatbot skill folder under `skills/`.

Codex installations can vary. If your Codex setup uses a different skills directory, use that directory instead of the examples below.

## Easiest Path: Ask Codex To Install From GitHub

After this repo is published to GitHub, paste the repo URL into Codex and ask it to install the skill.

```text
Use the skill-installer skill.
Install the skill from this GitHub repo:
https://github.com/<owner>/amazing-ai-builder-skill-pack

The skill is in:
- skills/shopify-chatbot-builder

After installing, tell me how to verify the skill is available.
```

Codex may use a GitHub skill installer, a download flow, or git checkout depending on its current tooling and repository visibility. Private repos may require the user's existing GitHub credentials.

## Manual Fallback: Copy Into Your Codex Skills Folder

From this repo root:

```powershell
$target = "$env:USERPROFILE\.codex\skills"
New-Item -ItemType Directory -Force $target
Copy-Item -Recurse -Force .\skills\* $target
```

From this skill-pack repo root, that copies:

```text
skills/shopify-chatbot-builder
```

## Verify

Restart or refresh Codex if your setup requires it, then ask:

```text
What Amazing Shopify Chatbot skill can you see?
```

Then try:

```text
Use the shopify-chatbot-builder skill. Help me build and install a private Shopify chatbot. Show me the progress tracker and start with a polished local demo before connecting Shopify.
```

If the skill is not detected, use [PROMPT-FALLBACKS.md](PROMPT-FALLBACKS.md).

## If Codex Does Not Detect The Skills

1. Confirm each skill folder contains `SKILL.md`.
2. Confirm the folder name matches the `name:` in front matter.
3. Restart or refresh the Codex session.
4. Use the exact skill name in your prompt.
5. Use a fallback prompt if needed.
