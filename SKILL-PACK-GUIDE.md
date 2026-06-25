# Skill Pack Guide

Use `shopify-chatbot-builder` for the full Shopify chatbot build.

## Workflow

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

## Readiness Gates

- Real inputs ready: server-side AI model access and read-only Shopify credentials are verified.
- Store data ready: real products, pages, collections, and policies are retrievable by the backend.
- Private demo ready: the member can ask real store questions through a polished private UI and get source-backed answers.
- Safety ready: unsupported discounts, inventory, delivery promises, returns exceptions, warranty claims, and order status are refused or handed off.
- Theme preview ready: the widget works on a development theme and can be disabled quickly.
- Launch ready: live changes are approved, scoped, reversible, and monitored.
