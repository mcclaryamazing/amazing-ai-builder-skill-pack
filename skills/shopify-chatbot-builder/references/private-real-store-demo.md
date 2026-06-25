# Private Real-Store Demo

The demo is the user's first proof that the final chatbot can be valuable. Treat it as a private preview of the real chatbot, not a disposable mock.

## Core Rule

The demo must use:

- real Shopify product, collection, page, and policy data from the user's store
- a real AI model called from the backend
- real retrieval and guardrail behavior
- a polished private UI that resembles the final widget or dashboard test chat

Do not present fake products or made-up policies as the demo. If credentials are not ready, run only a non-demo internal connectivity test and label it clearly as not the demo.

## Purpose

Build the private demo before installing anything on the storefront. It should prove:

- the backend can call the selected AI model
- read-only Shopify access works
- real store content is synced or retrievable
- the chatbot can answer useful questions about the user's actual products and policies
- the chatbot refuses unsupported claims and routes to support when needed
- the user can see what the final storefront experience will feel like

## Minimum Experience

The demo should include:

- a local or private URL the user can open
- polished chat launcher or embedded chat panel
- assistant greeting with store-specific positioning
- user and assistant message bubbles
- real product cards and policy/source snippets
- source links or source labels when answers use store knowledge
- support handoff button or link for unknown questions
- loading state while the backend responds
- friendly error state when the backend, model, or Shopify sync is unavailable
- mobile-responsive layout
- private-preview label that does not dominate the UI

Avoid raw HTML forms, unstyled textareas, cramped panels, placeholder content, debug JSON as the main UI, or anything that makes the user doubt the final chatbot.

## Required Data Before Demo

Before calling the demo ready, verify at least:

- several real products and variants
- at least one real collection when available
- shipping policy or shipping page
- returns/refund policy
- warranty or support policy when available
- support contact path

If a store lacks a policy or page, the chatbot should say that information is not available and route to support. Do not invent the missing content.

## Acceptance Gate

Before moving to widget installation, show the member:

- real product count synced or retrievable
- real collection count when collections are used
- synced policy/source names
- private demo URL
- confirmation that the backend made a real AI model call
- confirmation that no AI provider key or Shopify Admin credential is present in frontend code
- pass/fail results for at least five questions, including real product, real policy, discount, inventory, and order-status questions

If any item is missing, do not install the widget yet.

## Suggested Demo Questions

Use questions based on the actual store, such as:

- "Which product is best for a first-time buyer?"
- "What is the return policy?"
- "What is the difference between these two products?"
- "Do you have anything for [real use case]?"
- "Can I get 20% off?"
- "Is this in stock right now?"
- "Where is my order?"

Questions backed by synced product or policy data should answer with source-backed detail. Discount, live inventory, and order-status questions should refuse or route to support unless verified systems exist.

## Visual Bar

The demo should feel close enough to a finished Shopify widget that a non-technical store owner trusts the build. Use restrained, modern styling; consistent spacing; readable type; clear buttons; polished empty/loading/error states; and product/source cards that look intentional.

When building a frontend, verify it in a browser at desktop and mobile widths before calling the demo done.
