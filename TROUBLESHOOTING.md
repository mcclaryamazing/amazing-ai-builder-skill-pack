# Troubleshooting

## A Skill Does Not Show Up

1. Confirm the expected `SKILL.md` file exists:
   - `skills/shopify-chatbot-builder/SKILL.md`
   - `skills/shopify-landing-page-builder/SKILL.md`
   - `skills/shopify-site-builder/SKILL.md`
2. Confirm the folder was copied under your Codex skills directory.
3. Restart or refresh Codex.
4. Invoke the skill by exact name.

Try:

```text
What Amazing Shopify AI builder skills can you see?
```

## Codex Asks For Secrets In Chat

Stop and redirect:

```text
Do not ask me to paste secrets into chat. Tell me the exact .env variable names or secret-manager entries I should fill in myself.
```

## Codex Wants To Use Fake Chatbot Demo Data

Stop and redirect:

```text
Use the shopify-chatbot-builder skill. Do not present fake products, made-up policies, static replies, standalone mock widgets, raw JSON endpoints, or fake data as my demo. The real private demo is the protected dashboard test chat using my real Shopify products, collections, pages, policies, and a real server-side AI model. If credentials are not ready, run only an internal connectivity test and label it clearly as not the demo.
```

## Codex Wants To Install The Widget Before The Dashboard

Stop and redirect:

```text
Use the shopify-chatbot-builder skill. Do not install or enable any storefront widget yet. First build the protected admin dashboard/control plane with health/readiness status, chatbot mode, fast disable path, Shopify sync, source counts, source browser, active/published source filters, embedded dashboard test chat, risky-question tests, support routing, and no exposed secrets.
```

## The Chatbot Feels Like A Developer Demo

Stop and redirect:

```text
Use the shopify-chatbot-builder skill. Polish the customer-facing chat so it sounds like a real shopping/support assistant. Remove developer/testing language such as retrieval, sources, verified knowledge, preview, provider names, route names, config names, API key messages, and stack traces. Use warm concise copy, a normal typing indicator, friendly support fallbacks, mobile-safe prompt buttons and placeholder text, and no shopper-visible source/debug panels.
```

## Chatbot Links Expose Preview Or Admin Tokens

Stop and redirect:

```text
Use the shopify-chatbot-builder skill. Add and test customer-facing URL sanitization for both backend-generated and widget-rendered links. Strip preview, custom preview, admin, token, key, and other non-customer query params from absolute and relative URLs, preserve shopper-safe params such as variant IDs, route policy links to public storefront policy pages when possible, and keep source-review links admin-only.
```

## Product Recommendations Refuse Too Easily

Stop and redirect:

```text
Use the shopify-chatbot-builder skill. For recommendation-style questions like "Which product should I start with?", "best for a first-time buyer", "recommend", "compare", or "gift", prioritize product and collection records over policy/page records and recommend from available products. Keep guardrails: do not invent prices, discounts, live inventory, delivery dates, warranty terms, policy exceptions, order status, or regulated claims.
```

## The Chatbot Keeps Restarting The Conversation

Stop and redirect:

```text
Use the shopify-chatbot-builder skill. Fix conversational continuity. The storefront widget and dashboard test chat must send a bounded, sanitized recent transcript with each request. The backend must sanitize history again, use recent user turns in retrieval, include recent conversation context in the model prompt, and instruct the assistant to continue naturally instead of starting with a fresh welcome unless I am greeting it. Visual transcript persistence alone is not enough.
```

## Codex Wants To Skip The Landing Page Design Package

Stop and redirect:

```text
Use the shopify-landing-page-builder skill. Do not touch Shopify theme files yet. First create the Shopify-ready DTC design package with archetype, big idea, copy strategy, section sequence, offer/proof logic, CTA path, claim notes, metadata direction, and exact image-slot plan.
```

## Codex Asks Too Many Landing Page Questions

Stop and redirect:

```text
Use the shopify-landing-page-builder skill in Fast Draft Mode. Ask only for the missing facts that materially change the page archetype, CTA path, offer truth, claim/compliance boundaries, product selection logic, Shopify build path, or launch safety. Otherwise infer conservative defaults, label assumptions, and use verification placeholders.
```

## Codex Invents Landing Page Claims Or Proof

Stop and redirect:

```text
Use the shopify-landing-page-builder skill. Do not invent review counts, discounts, guarantees, certifications, testimonials, shipping terms, urgency, clinical claims, or comparison claims. Use verification placeholders or soften the copy until I provide proof.
```

## Codex Wants To Use A Large Custom Liquid Paste-In

Stop and redirect:

```text
Use the shopify-landing-page-builder skill. Build the landing page in real Shopify theme files: section, CSS asset, optional JS asset, and JSON page template. Use Shopify Files for merchant-facing images and exact placeholders for missing images.
```

## Codex Treats A Full Site Like One Landing Page

Stop and redirect:

```text
Use the shopify-site-builder skill. Do not treat this as one campaign page. First create the Shopify site blueprint with site map, navigation, homepage plan, PDP template plan, collection template plan, content-page plan, shared theme system, reusable sections, data plan, metadata direction, image-slot plan, QA plan, and rollback path.
```

## Codex Starts Full-Site Theme Work Without Access Setup

Stop and redirect:

```text
Use the shopify-site-builder skill. Before broad theme work, verify or guide setup for both access rails: Theme Access plus Shopify CLI for theme files, and a Shopify Dev Dashboard app plus Admin GraphQL client credentials for products, collections, pages, files, menus, redirects, discounts, publications, metafields, and metaobjects. Reuse existing setup when safe and do not ask me to paste secrets into chat.
```

## Codex Breaks Product Or Collection Behavior

Stop and redirect:

```text
Use the shopify-site-builder skill. Preserve Shopify-native product forms, variant selection, price/availability display, collection filters, sorting, pagination, product-card behavior, cart updates, and checkout links unless I explicitly approve a change. Re-test homepage, one product page, one collection page, one standard page, and cart/checkout path.
```

## Codex Wants To Edit A Live Theme Too Early

Stop and redirect:

```text
Do not touch my live Shopify theme yet. First inspect current files, read deploy.md or DEPLOY.md if present, check git status, prefer a development theme, show the exact intended files, use targeted no-delete pushes where possible, and give me a rollback path.
```

## The Chatbot Gives Unsupported Answers

Ask:

```text
Use the shopify-chatbot-builder skill. Review the dashboard test chat for unsupported claims about price, discounts, inventory, shipping, returns, warranty, policy exceptions, safety, and order status. Fix the prompt, retrieval, source filters, or refusal behavior before any theme install.
```

## The Landing Page Looks Installed But Broken

Ask:

```text
Use the shopify-landing-page-builder skill. Run the landing-page QA checklist: verify the approved DTC spec, CSS and JS asset loading, Shopify Files image references, exact placeholders, desktop and mobile layout, CTA wiring, metadata, theme chrome, sticky CTA behavior, and rollback path.
```

## The Site Build Looks Installed But Broken

Ask:

```text
Use the shopify-site-builder skill. Run the full-site QA checklist: verify the approved site blueprint, shared theme system, homepage, PDPs, collections, content pages, navigation, product forms, filters, sorting, pagination, cart updates, checkout path, Shopify Files image references, metadata/social tags, desktop/mobile layout, normal-page regressions, and rollback path.
```
