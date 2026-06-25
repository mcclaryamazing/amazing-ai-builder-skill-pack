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
5. Build a private real-store demo.
6. Test desktop, mobile, support handoff, and risky questions.
7. Install the storefront widget on a development theme.
8. Turn on limited live preview.
9. Confirm rollback and disable path.

The private demo is the first meaningful proof. It must use real Shopify data and a real model. Do not show fake products or made-up policies to the member as a demo.

## Chatbot Readiness Gates

- Real inputs ready: server-side AI model access and read-only Shopify credentials are verified.
- Store data ready: real products, pages, collections, and policies are retrievable by the backend.
- Private demo ready: the member can ask real store questions through a polished private UI and get source-backed answers.
- Safety ready: unsupported discounts, inventory, delivery promises, returns exceptions, warranty claims, and order status are refused or handed off.
- Theme preview ready: the widget works on a development theme and can be disabled quickly.
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
