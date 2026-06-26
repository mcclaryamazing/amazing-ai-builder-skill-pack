# Skill Pack Guide

Use this pack for guided Shopify AI builder work.

## Available Skills

- `shopify-chatbot-builder` for the full Shopify chatbot build.
- `shopify-landing-page-builder` for the full Shopify DTC landing-page build.

## Chatbot Workflow

1. Understand the store and chatbot goal.
2. Configure or verify the real AI model server-side.
3. Connect Shopify read-only store data.
4. Sync products, pages, collections, and policies.
5. Build the protected admin dashboard and embedded test chat.
6. Polish the customer-facing assistant experience and separate it from admin source/debug inspection.
7. Test desktop, mobile, safe links, product-first recommendations, support handoff, and risky questions.
8. Install the storefront widget on a copied preview theme.
9. Turn on limited live preview.
10. Confirm rollback and disable path.

The dashboard test chat is the first meaningful proof. It must use real Shopify data, a real model, the same retrieval path, and the same commerce guardrails the storefront widget will use. Do not show fake products, made-up policies, static replies, standalone mock widgets, or raw JSON endpoints to the member as the demo.

The customer-facing preview and storefront widget should feel like a real shopping/support assistant. It must use warm concise copy, a normal typing indicator, clean Markdown/link rendering, mobile-safe prompts and placeholder text, friendly support fallbacks, and public storefront links. It must not expose developer/testing language, provider names, internal routes, stack traces, preview tokens, source/debug panels, or admin-only details.

## Chatbot Readiness Gates

- Real inputs ready: server-side AI model access and read-only Shopify credentials are verified.
- Store data ready: real products, pages, collections, and policies are retrievable by the backend.
- Dashboard ready: the member can inspect synced products, collections, pages, policies, source filters, sync status, mode, settings, product controls, offers, conversations, support handoffs, analytics, and source-backed answers through a protected dashboard.
- Dashboard demo ready: the embedded test chat uses the real backend, model, retrieval, and guardrails while matching the storefront chat shape, loading state, product cards, Markdown/link behavior, and guardrails.
- Shopper polish ready: the customer-facing chat avoids developer/testing language and source/debug panels, uses polished copy, renders Markdown links cleanly, and has no clipped prompts, clipped placeholder text, or mobile horizontal overflow.
- Link safety ready: absolute and relative customer-facing links strip preview, custom preview, admin, token, key, and other non-customer params while preserving shopper-safe params such as variant IDs.
- Recommendation quality ready: recommendation-style questions prioritize product and collection records and recommend from available products without inventing prices, discounts, inventory, delivery dates, warranty terms, policy exceptions, order status, or regulated claims.
- Safety ready: unsupported discounts, inventory, delivery promises, returns exceptions, warranty claims, policy exceptions, unsupported claims, and order status are refused or handed off.
- Theme preview ready: the widget works on a copied preview theme, preserves chat state across internal link navigation, and can be disabled quickly.
- Launch ready: live changes are approved, scoped, reversible, and monitored.

## Landing Page Workflow

1. Understand the product, audience, offer, and traffic source.
2. Inspect the Shopify repo, theme setup, and launch constraints.
3. Create the DTC strategy and copy package.
4. Approve page structure, claims, offer, product wiring, and image plan.
5. Build the Shopify page in real theme files.
6. Add products, images, metadata, and purchase wiring.
7. QA desktop, mobile, accessibility, interactions, and checkout path.
8. Preview on a development theme or private page.
9. Launch only after approval, rollback, and monitoring are clear.

The DTC design package is the first meaningful proof. It must include the archetype, big idea, section sequence, copy strategy, offer/proof logic, CTA path, claim notes, metadata direction, and exact image-slot plan before Shopify implementation begins.

## Landing Page Readiness Gates

- Brief ready: product, audience, offer, traffic source, proof, assets, claim boundaries, and primary CTA are known or marked as placeholders.
- Strategy ready: the DTC design package is specific enough to build without redesigning.
- Approval ready: claims, offer, page structure, product wiring assumptions, and image plan are approved or clearly blocked.
- Build ready: target repo, deploy guide, git status, theme access, Admin API access, theme ID, and implementation path are known.
- Preview ready: the page works on a development theme or private URL with desktop/mobile QA.
- Launch ready: live changes are approved, scoped, reversible, and monitored.

## Shared Safety Rules

- Inspect the real repo before advising.
- Read the target repo's `deploy.md` or `DEPLOY.md` before deploys or Shopify mutations.
- Check `git status --short` before deploys or Shopify mutations.
- If uncommitted work exists, list exactly what changed and ask whether it should be included before deploying.
- Never ask the member to paste secrets into chat.
- Prefer development theme or private preview before live launch.
- Use targeted Shopify theme pushes with `--nodelete` and explicit `--only` paths.
- Keep rollback or fast disable paths clear.
