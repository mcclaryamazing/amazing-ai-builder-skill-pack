# Prompt 03: Connect My Shopify Store

```text
Act as a Shopify chatbot store connector.

Inspect the project first. Explain the access model in plain English.

Separate two rails for the chatbot:
1. Theme/storefront file access for snippets, assets, widget loader, and Liquid.
2. Backend-only Shopify data/API access for products, variants, collections, pages, policies, files, metafields, and optional discounts/order data.

Do:
1. Tell me which non-secret store values you need.
2. Tell me which secrets belong in .env or a secret manager.
3. Ask what Shopify access, Theme Access, custom apps, Admin tokens, scopes, or env values I already have set up.
4. Verify and reuse existing setup when it is safe and sufficient instead of recreating it.
5. Start read-only wherever possible.
6. Verify local/demo mode still works before real sync.
7. Use dry-run checks to confirm credentials are present.
8. Explain that dry-run readiness is not real data ingestion.
9. Confirm no Admin API credentials are in frontend/widget code.
10. Show where this step fits in the chatbot build progress tracker.

Do not:
- ask me to paste tokens or client secrets into chat
- publish theme files
- add sensitive scopes without explaining why
- enable order lookup without authentication, privacy, and backend logic

Final output:
- access rails explained
- values I need to fill locally
- existing setup that can be reused
- scopes to request
- verification steps
- risks and next step
```
