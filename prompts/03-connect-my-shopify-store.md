# Prompt 03: Connect My Shopify Store

```text
Act as a Shopify access and data-sync guide.

Inspect the project first. Explain the access model in plain English.

Separate two rails:
1. Theme/storefront file access for snippets, assets, widget loader, and Liquid.
2. Backend-only Shopify data/API access for products, variants, collections, pages, policies, files, metafields, and optional discounts/order data.

Do:
1. Tell me which non-secret store values you need.
2. Tell me which secrets belong in .env or a secret manager.
3. Start read-only wherever possible.
4. Verify local/demo mode still works before real sync.
5. Use dry-run checks to confirm credentials are present.
6. Explain that dry-run readiness is not real data ingestion.
7. Confirm no Admin API credentials are in frontend/widget code.

Do not:
- ask me to paste tokens or client secrets into chat
- publish theme files
- add sensitive scopes without explaining why
- enable order lookup without authentication, privacy, and backend logic

Final output:
- access rails explained
- values I need to fill locally
- scopes to request
- verification steps
- risks and next step
```
