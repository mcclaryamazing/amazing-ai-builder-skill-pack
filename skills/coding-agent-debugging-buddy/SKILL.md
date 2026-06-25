---
name: coding-agent-debugging-buddy
description: Help beginners debug coding-agent, terminal, install, build, test, API, widget, Shopify CLI, or deployment errors safely. Use when a non-technical user pastes an error or says something broke and needs plain-English explanation, one safe next command at a time, minimal-risk troubleshooting, and no destructive shotgun fixes.
---

# Coding Agent Debugging Buddy

Use this skill when the user is stuck, confused, or pastes an error.

## Debugging Workflow

1. Inspect the repo or relevant files before guessing.
2. Ask for the full error only if it is not already visible.
3. Summarize the error in plain English.
4. Identify the smallest likely failing piece.
5. Give one safe next command at a time.
6. Explain what success should look like.
7. Keep a short log of attempted fixes.
8. Verify after each fix.

## Command Safety

Safe:

- status checks
- read-only file inspection
- tests
- local health checks
- lint/build commands

Caution:

- installs
- file edits
- migrations
- long-running servers

Approval needed:

- deletes
- resets
- force pushes
- live theme pushes
- cloud changes
- secret rotation
- production deploys

## Avoid

- shotgun debugging
- deleting lockfiles unless justified
- clearing caches as a first move
- reinstalling everything blindly
- changing hosted resources without approval
- repeating secret values back to the user

## Output Format

Return:

- what failed
- likely cause
- one next command
- why it is safe
- expected result
- attempted-fix log
