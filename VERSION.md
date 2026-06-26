# Version

Current version: `0.7.0`

Repo focus: installable Codex skills for Amazing.com members building Shopify AI growth assets.

## Status

Member-facing Shopify builder skill pack.

## Notes

- The pack includes `shopify-chatbot-builder`.
- The pack includes `shopify-landing-page-builder`.
- The chatbot workflow is dashboard-first: build a protected admin dashboard/control plane before any storefront widget install.
- The dashboard test chat is the real private demo and must use real Shopify data, a real server-side AI model, real retrieval, and real commerce guardrails.
- The customer-facing chatbot must feel like a polished shopping/support assistant, not a developer demo.
- Shopper chat must not expose retrieval/source/debug language, provider names, internal routes, preview tokens, stack traces, config names, or admin-only details.
- Customer-facing links must strip preview/admin/token/key params from absolute and relative URLs while preserving shopper-safe params such as variant IDs.
- Storefront and dashboard chat must send bounded sanitized recent history to the backend so follow-up questions use real conversational context rather than visual transcript memory only.
- Recommendation-style questions should prioritize product and collection records while preserving commerce guardrails.
- A complete chatbot dashboard must expose reachable protected screens for setup, sync/status, sources, product promotion, offers, test chat, conversations, support handoffs, analytics, and install/rollback values.
- Fake/sample data, standalone mock widgets, static replies, and raw JSON endpoints may not be shown to the member as the chatbot demo.
- The landing-page workflow must create a Shopify-ready DTC design package before theme implementation.
- The landing-page workflow supports Fast Draft Mode by default, plus Guided Strategy Mode and Deep Conversion Mode for higher-risk or higher-rigor pages.
- The DTC master guide has been distilled into progressive references for derived strategy, archetypes, components, category packs, visual/copy rules, and QA scoring.
- Landing-page image placeholders must preserve the final slot geometry and use the exact placeholder standard.
- Theme pushes and Shopify mutations require deploy-guide review, git-status review, explicit uncommitted-work handling, targeted no-delete pushes where possible, and rollback.
