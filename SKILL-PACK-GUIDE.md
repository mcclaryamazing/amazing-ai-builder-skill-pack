# Skill Pack Guide

Use this pack for guided Shopify AI builder work.

## Available Skills

- `shopify-chatbot-builder` for the full Shopify chatbot build.
- `shopify-landing-page-builder` for the full Shopify DTC landing-page build.
- `shopify-site-builder` for the full Shopify site build across homepage, product pages, collections, content pages, navigation, and shared theme systems.

## Chatbot Workflow

1. Understand the store and chatbot goal.
2. Configure or verify the real AI model server-side.
3. Connect Shopify read-only store data.
4. Sync products, pages, collections, and policies.
5. Build the protected admin dashboard and embedded test chat.
6. Polish the customer-facing assistant experience and separate it from admin source/debug inspection.
7. Test desktop, mobile, safe links, contextual follow-ups, product-first recommendations, support handoff, and risky questions.
8. Install the storefront widget on a copied preview theme.
9. Turn on limited live preview.
10. Confirm rollback and disable path.

The dashboard test chat is the first meaningful proof. It must use real Shopify data, a real model, the same retrieval path, and the same commerce guardrails the storefront widget will use. Do not show fake products, made-up policies, static replies, standalone mock widgets, or raw JSON endpoints to the member as the demo.

The customer-facing preview and storefront widget should feel like a real shopping/support assistant. It must use warm concise copy, a normal typing indicator, clean Markdown/link rendering, mobile-safe prompts and placeholder text, friendly support fallbacks, and public storefront links. It must not expose developer/testing language, provider names, internal routes, stack traces, preview tokens, source/debug panels, or admin-only details.

The chatbot must have request-time contextual memory. The storefront widget and dashboard test chat should send the same bounded, sanitized recent transcript shape to the backend with each chat request. The backend should sanitize it again, use recent user turns for retrieval, include recent context in the model prompt, and instruct the assistant to continue naturally instead of restarting with a fresh greeting.

## Chatbot Readiness Gates

- Real inputs ready: server-side AI model access and read-only Shopify credentials are verified.
- Store data ready: real products, pages, collections, and policies are retrievable by the backend.
- Dashboard ready: the member can inspect synced products, collections, pages, policies, source filters, sync status, mode, settings, product controls, offers, conversations, support handoffs, analytics, and source-backed answers through a protected dashboard.
- Dashboard demo ready: the embedded test chat uses the real backend, model, retrieval, and guardrails while matching the storefront chat shape, loading state, product cards, Markdown/link behavior, and guardrails.
- Shopper polish ready: the customer-facing chat avoids developer/testing language and source/debug panels, uses polished copy, renders Markdown links cleanly, and has no clipped prompts, clipped placeholder text, or mobile horizontal overflow.
- Conversation continuity ready: storefront and dashboard chat send bounded sanitized recent history to the backend, follow-up retrieval uses recent user context, and answers do not restart with a fresh welcome unless the shopper greets the assistant.
- Link safety ready: absolute and relative customer-facing links strip preview, custom preview, admin, token, key, and other non-customer params while preserving shopper-safe params such as variant IDs.
- Recommendation quality ready: recommendation-style questions prioritize product and collection records and recommend from available products without inventing prices, discounts, inventory, delivery dates, warranty terms, policy exceptions, order status, or regulated claims.
- Safety ready: unsupported discounts, inventory, delivery promises, returns exceptions, warranty claims, policy exceptions, unsupported claims, and order status are refused or handed off.
- Theme preview ready: the widget works on a copied preview theme, preserves chat state across internal link navigation, and can be disabled quickly.
- Launch ready: live changes are approved, scoped, reversible, and monitored.

## Landing Page Workflow

1. Understand the product, audience, offer, and traffic source.
2. Inspect the Shopify repo, theme setup, and launch constraints.
3. Choose Fast Draft, Guided Strategy, or Deep Conversion depth.
4. Create the DTC strategy and copy package.
5. Approve page structure, claims, offer, product wiring, and image plan.
6. Build the Shopify page in real theme files.
7. Add products, images, metadata, and purchase wiring.
8. QA desktop, mobile, accessibility, interactions, and checkout path.
9. Preview on a development theme or private page.
10. Launch only after approval, rollback, and monitoring are clear.

The DTC design package is the first meaningful proof. It must include the selected mode, labeled assumptions, archetype, confidence label, derived strategy labels, big idea, section sequence, copy strategy, offer/proof logic, CTA path, claim notes, metadata direction, and exact image-slot plan before Shopify implementation begins.

Fast Draft Mode is the default for members who want to answer only a few questions and see a strong first version. Guided Strategy Mode helps shape the offer, audience, traffic promise, proof stack, or positioning before drafting. Deep Conversion Mode applies the fuller DTC rubric for high-stakes, high-AOV, regulated, technical, claim-sensitive, subscription, quiz, bundle, custom, or proof-light pages.

## Landing Page Readiness Gates

- Brief ready: product, audience, offer, traffic source, proof, assets, claim boundaries, and primary CTA are known or marked as placeholders.
- Strategy ready: the DTC design package is specific enough to build without redesigning, with assumptions and verification needs labeled.
- Approval ready: claims, offer, page structure, product wiring assumptions, and image plan are approved or clearly blocked.
- Build ready: target repo, deploy guide, git status, theme access, Admin API access, theme ID, and implementation path are known.
- Preview ready: the page works on a development theme or private URL with desktop/mobile QA.
- Launch ready: live changes are approved, scoped, reversible, and monitored.

## Site Builder Workflow

1. Understand the store, catalog, brand, goals, and must-have pages.
2. Inspect the repo, theme, deploy guide, git status, access, and constraints.
3. Choose Fast Site Draft, Guided Site Strategy, or Deep Storefront Build depth.
4. Create the site map, conversion strategy, and page-template plan.
5. Define the shared theme system, reusable sections, and image plan.
6. Approve homepage, PDP, collection, content-page, navigation, and data changes.
7. Build the site surfaces in real Shopify theme files.
8. Add or update products, collections, pages, menus, metadata, and Shopify Files.
9. QA desktop, mobile, accessibility, interactions, performance, SEO, product forms, filters, cart, and checkout path.
10. Preview on a development or copied theme and launch only after approval, rollback, and monitoring are clear.

The Shopify site blueprint is the first meaningful proof. It must include the selected mode, labeled assumptions, site map, navigation, homepage plan, PDP plan, collection plan, content-page plan, conversion strategy, shared theme system, reusable section inventory, data plan, metadata direction, exact image-slot plan, QA plan, and rollback path before broad Shopify implementation begins.

Fast Site Draft Mode is the default for members who want a practical first site plan quickly. Guided Site Strategy Mode helps shape positioning, catalog architecture, navigation, collection structure, page priority, or proof strategy. Deep Storefront Build Mode applies fuller rigor for rebuilds, migrations, multi-template launches, high-AOV or claim-sensitive catalogs, large catalogs, subscription/custom/quiz flows, or SEO-sensitive work.

## Site Builder Readiness Gates

- Store brief ready: brand, catalog shape, audiences, goals, required pages, proof/assets, and constraints are known or marked as placeholders.
- Blueprint ready: site map, navigation, template strategy, reusable sections, content model, image plan, SEO direction, and data plan are specific enough to build without redesigning.
- Build ready: target repo, deploy guide, git status, Theme Access, Admin API access, theme ID, implementation path, and preview plan are known.
- Surface ready: homepage, PDP, collection, content-page, cart/checkout-adjacent, and navigation changes are implemented or intentionally out of scope.
- Preview ready: the site works on a development or copied preview theme with desktop/mobile QA.
- Launch ready: live changes are approved, scoped, reversible, monitored, and documented.

## Shared Safety Rules

- Inspect the real repo before advising.
- Read the target repo's `deploy.md` or `DEPLOY.md` before deploys or Shopify mutations.
- Check `git status --short` before deploys or Shopify mutations.
- If uncommitted work exists, list exactly what changed and ask whether it should be included before deploying.
- Never ask the member to paste secrets into chat.
- Prefer development theme or private preview before live launch.
- Use targeted Shopify theme pushes with `--nodelete` and explicit `--only` paths.
- Keep rollback or fast disable paths clear.
- Keep Theme Access plus Shopify CLI separate from Dev Dashboard app plus Admin GraphQL client credentials.
