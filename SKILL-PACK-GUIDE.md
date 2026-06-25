# Skill Pack Guide

## How The Skills Work Together

Use the skills as a workflow:

1. `ai-business-app-project-planner` turns the idea into a build plan.
2. `non-technical-founder-coding-coach` keeps the experience understandable.
3. `shopify-ai-chatbot-builder` guides the one-store chatbot architecture.
4. `shopify-access-and-data-sync` handles Shopify access safely.
5. `shopify-theme-widget-installer` handles theme/widget work safely.
6. `commerce-ai-guardrail-tester` checks answer safety.
7. `coding-agent-debugging-buddy` helps recover from errors.
8. `launch-readiness-reviewer` decides whether the project is ready for the next stage.

## Default Build Pattern

For a Shopify chatbot, default to:

```text
Shopify storefront widget
  -> backend chat API
  -> retrieval over synced Shopify/store knowledge
  -> LLM response with commerce guardrails
  -> human support handoff when uncertain
```

Use a private one-store architecture by default. Do not introduce OAuth distribution, marketplace packaging, multi-store billing, or multi-tenant SaaS unless the owner explicitly asks for it.

## Readiness Ladder

- Local demo ready: sample data, health endpoint, chat endpoint, and safety refusals work locally.
- Shopify credentials configured: backend credential dry-run passes.
- Real store knowledge synced: products, collections, pages, and policies are actually available to retrieval.
- Private preview ready: hosted backend/widget works on a development theme.
- Limited live beta ready: guardrails, rollback, support handoff, and monitoring are in place.
- Broader launch ready: real data, privacy, reliability, and support process have been reviewed.

## Owner-Agent Division

The owner decides:

- business goal
- target customer
- store-specific policies
- acceptable risks
- support handoff process
- launch timing

The coding agent handles:

- repo inspection
- implementation plan
- code changes
- local commands
- test execution
- risk callouts
- rollback plan

## Always Keep Secrets Out Of Chat

The agent should name where secrets go, such as `.env` or a secret manager, but it should not ask the learner to paste values into chat.
