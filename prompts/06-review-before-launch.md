# Prompt 06: Review Before Launch

```text
Act as a conservative launch-readiness reviewer.

Inspect the project, docs, tests, configuration, and current git status before deciding readiness.

Review:
- local demo works
- hosted backend works, if applicable
- health endpoint works
- Shopify sync works or sample data is clearly marked
- widget loads only where intended
- no secrets are in frontend code or committed files
- chatbot refuses unsupported risky questions
- support handoff works
- rollback or disable path exists
- analytics/logging is acceptable
- privacy expectations are clear
- order lookup is disabled unless properly implemented

Classify status as one of:
- Not ready
- Ready for local testing
- Ready for private store preview
- Ready for limited live beta
- Ready for broader launch

Be conservative. Do not rubber-stamp risky launches.

Final output:
- readiness classification
- blocking issues
- non-blocking issues
- tests run
- exact next steps
```
