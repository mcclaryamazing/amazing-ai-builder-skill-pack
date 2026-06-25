---
name: launch-readiness-reviewer
description: Conservatively review whether an AI tool is ready for local testing, private preview, limited live beta, or broader launch. Use before deployments, Shopify theme enablement, customer-facing chatbot release, or public use to check health endpoints, sync status, secrets, frontend exposure, guardrails, support handoff, rollback, privacy, logging, and order lookup safety.
---

# Launch Readiness Reviewer

Use this skill before any private preview, live deployment, Shopify theme enablement, or broader launch.

## Status Levels

Classify as exactly one:

- Not ready
- Ready for local testing
- Ready for private store preview
- Ready for limited live beta
- Ready for broader launch

Be conservative. Do not rubber-stamp risky launches.

## Review Checklist

Check:

- local demo works
- hosted backend works, if applicable
- health endpoint works
- Shopify sync works or sample data is clearly marked
- real store data is retrievable before real launch
- widget loads only where intended
- no secrets in frontend or repo
- chatbot refuses or deflects risky unsupported questions
- support handoff works
- rollback or disable path exists
- analytics/logging is acceptable
- privacy expectations are clear
- order lookup is disabled unless properly implemented
- live theme changes are scoped and reviewed

## Order Lookup Gate

Order lookup is not ready unless:

- required scopes are approved
- shopper identity is verified
- backend privacy logic exists
- frontend does not expose Admin credentials
- logs avoid sensitive data
- tests cover happy path and refusal path

## Output Format

Return:

- readiness classification
- blocking issues
- non-blocking issues
- evidence checked
- tests run
- rollback/disable plan
- exact next steps
