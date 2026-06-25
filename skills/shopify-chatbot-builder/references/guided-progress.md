# Guided Progress

Use a visible progress tracker throughout the project. The user should always know what step they are on, what just changed, and what comes next.

## Standard Tracker

```text
Shopify Chatbot Build Progress
[ ] 1. Understand the store and chatbot goal
[ ] 2. Build a polished local demo
[ ] 3. Add safe answers and support handoff
[ ] 4. Connect Shopify credentials server-side
[ ] 5. Sync products, pages, and policies
[ ] 6. Install the storefront widget on a development theme
[ ] 7. Test desktop, mobile, and risky questions
[ ] 8. Turn on limited live preview
[ ] 9. Confirm rollback and disable path
```

## Stage Done Signals

1. Store goal: the agent knows the store type, support path, product categories, policy pages, and questions the chatbot should not answer yet.
2. Polished local demo: the user can open a local URL and see a credible chatbot experience using sample store data.
3. Safe answers: the bot answers from known data and refuses unsupported prices, discounts, inventory, shipping dates, returns exceptions, warranty claims, and order status.
4. Shopify credentials: required values are stored in `.env` or a secret manager, never pasted into chat or frontend code.
5. Store sync: real products, collections, pages, and policies are retrievable by the backend, not merely configured in a dry run.
6. Widget install: the widget loads on a development theme and calls the intended backend endpoint.
7. Testing: desktop, mobile, support handoff, failure states, and risky questions are checked.
8. Limited live preview: the chatbot is enabled only for the intended storefront surface after review.
9. Rollback: the owner knows how to disable the widget and roll back backend/theme changes.

At each stage, ask whether the user already has relevant setup. Reuse verified existing resources instead of recreating them. Examples include API keys, `.env` files, Shopify Theme Access, Shopify custom apps, GCP projects, GCS buckets, Cloud Run services, Secret Manager entries, databases, snippets, or widget assets.

## Communication Pattern

After completing a stage, say:

```text
Step 2 of 9 is complete. You now have a local chatbot demo running on your computer with sample store data. Next we will add safety behavior so it refuses questions it cannot verify.
```

When blocked, say what is blocking progress and give one safe next command or question.
