# Version

Current version: `0.6.0`

Repo focus: installable Codex skills for Amazing.com members building Shopify AI growth assets.

## Status

Member-facing Shopify builder skill pack.

## Notes

- The pack includes `shopify-chatbot-builder`.
- The pack includes `shopify-landing-page-builder`.
- The chatbot workflow is dashboard-first: build a protected admin dashboard/control plane before any storefront widget install.
- The dashboard test chat is the real private demo and must use real Shopify data, a real server-side AI model, real retrieval, and real commerce guardrails.
- A complete chatbot dashboard must expose reachable protected screens for setup, sync/status, sources, product promotion, offers, test chat, conversations, support handoffs, analytics, and install/rollback values.
- Fake/sample data, standalone mock widgets, static replies, and raw JSON endpoints may not be shown to the member as the chatbot demo.
- The landing-page workflow must create a Shopify-ready DTC design package before theme implementation.
- Landing-page image placeholders must preserve the final slot geometry and use the exact placeholder standard.
- Theme pushes and Shopify mutations require deploy-guide review, git-status review, explicit uncommitted-work handling, targeted no-delete pushes where possible, and rollback.
