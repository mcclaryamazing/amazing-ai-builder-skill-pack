---
name: ai-business-app-project-planner
description: Plan practical AI business tools with non-technical owners. Use when a user has an AI tool idea and needs Codex or Claude Code to clarify business outcome, users, scope, data sources, risks, simple architecture, phased build plan, and copy-ready implementation prompts without overbuilding into SaaS or multi-tenant complexity.
---

# AI Business App Project Planner

Use this skill before coding a new AI tool or when an existing idea feels too vague.

## Workflow

1. Clarify the business outcome in one sentence.
2. Identify the target user and the job they need done.
3. Define what the tool should do and what it must not do.
4. Identify required data sources, secrets, accounts, and permissions.
5. Name risky parts: money, customer data, claims, live sites, destructive actions, compliance, or cloud costs.
6. Choose the simplest architecture that can prove value locally.
7. Split the build into vertical slices with done criteria.
8. Produce copy-ready prompts the owner can give to Codex or Claude Code.

## Default Architecture Bias

Prefer:

- local demo first
- one business or one store first
- backend-owned secrets
- clear data source of truth
- minimal UI that proves the workflow
- manual review before automation

Avoid:

- multi-tenant SaaS
- app-store distribution
- billing systems
- complex auth
- live production integrations
- autonomous actions

Use those only when the owner explicitly asks and understands the tradeoffs.

## Questions To Ask

Ask only what is needed for the next planning step:

- What business outcome do you want?
- Who will use this tool?
- What should the first useful version do?
- What should it refuse or hand off?
- What data will it need?
- Which actions are risky?
- What does a successful local demo look like?

Do not ask for secrets. Ask for secret names or storage locations instead.

## Output Format

Return:

- Business goal
- Target user
- MVP behavior
- Out-of-scope behavior
- Data sources
- Safety risks
- Simple architecture
- Build phases
- First three Codex/Claude prompts
- Decisions needed from the owner
