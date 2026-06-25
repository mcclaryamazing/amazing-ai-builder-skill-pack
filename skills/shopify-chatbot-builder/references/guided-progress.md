# Guided Progress

Use a visible progress tracker throughout the project. The user should always know what step they are on, what just changed, and what comes next.

## Standard Tracker

```text
Shopify Chatbot Build Progress
[ ] 1. Understand the store and chatbot goal
[ ] 2. Configure or verify the real AI model server-side
[ ] 3. Connect Shopify read-only store data
[ ] 4. Sync products, collections, pages, and policies
[ ] 5. Build the protected admin dashboard and embedded test chat
[ ] 6. Inspect sources and test risky questions
[ ] 7. Copy the current live theme, verify the copy, then install the storefront widget on that copied preview theme
[ ] 8. Turn on limited live preview
[ ] 9. Confirm rollback and disable path
```

## Stage Done Signals

1. Store goal: the agent knows the store type, support path, product categories, policy pages, and questions the chatbot should not answer yet.
2. Real AI model: the backend can call the selected model using a server-side key or existing secure setup.
3. Shopify read-only access: required values are stored in `.env` or a secret manager, never pasted into chat or frontend code.
4. Store sync: real products, collections, pages, and policies are retrievable by the backend, not merely configured in a dry run.
5. Protected admin dashboard: the user can open a protected dashboard, inspect synced sources, see source filters, manage mode/settings, and ask questions in an embedded test chat using real synced data and a real model.
6. Source and risk testing: product/page/collection/policy eligibility, desktop, mobile, support handoff, failure states, raw Markdown rendering, and risky questions are checked before any storefront install.
7. Widget install: the current live theme has been copied into a fresh unpublished preview theme, the copy has been verified against the real storefront, and the widget loads on that copied preview theme while calling the intended backend endpoint.
8. Limited live preview: the chatbot is enabled only for the intended storefront surface after review.
9. Rollback: the owner knows how to disable the widget and roll back backend/theme changes.

At each stage, ask whether the user already has relevant setup. Reuse verified existing resources instead of recreating them. Examples include API keys, `.env` files, Shopify Theme Access, Shopify custom apps, hosting projects, storage buckets, deployment services, secret-manager entries, databases, snippets, or widget assets.

## Communication Pattern

After completing a stage, say:

```text
Step 5 of 9 is complete. You now have a protected chatbot dashboard with source inspection and a test chat using your real Shopify products and policies plus a real AI model. Next we will test source filters and risky questions before copying the current live theme for storefront preview.
```

When blocked, say what is blocking progress and give one safe next command or question.
