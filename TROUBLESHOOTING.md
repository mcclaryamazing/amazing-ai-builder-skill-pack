# Troubleshooting

## The Skill Is Not Detected

1. Confirm the skill folder contains `SKILL.md`.
2. Confirm `SKILL.md` begins with YAML front matter containing `name` and `description`.
3. Restart the coding agent or open a new session.
4. Invoke the skill by exact name.
5. Use [PROMPT-FALLBACKS.md](PROMPT-FALLBACKS.md) if detection still fails.

## The Agent Is Asking For Secrets In Chat

Stop and paste:

```text
Do not ask me to paste secrets into chat. Tell me the exact local .env field or secret-manager entry to fill myself, and continue without seeing the secret value.
```

## The Agent Wants To Change A Live Shopify Theme

Stop and paste:

```text
Before touching a live Shopify theme, inspect the current files, show the exact intended changes, explain rollback, and ask for explicit approval. Prefer a development theme and targeted push.
```

## The Agent Says The Chatbot Is Ready Too Quickly

Ask for a launch-readiness review:

```text
Use the launch-readiness-reviewer skill or the launch prompt fallback. Classify readiness conservatively and list what still needs testing.
```

## Terminal Errors

Use `coding-agent-debugging-buddy` or the error-fixing prompt. Ask for one safe next command at a time.
