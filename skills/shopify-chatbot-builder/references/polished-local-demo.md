# Polished Local Demo

The local demo is the user's first proof that the final chatbot can be good. Treat it as a real product moment, not a disposable test page.

## Purpose

Build the demo before Shopify access, theme edits, or deployment. It should prove:

- the computer can run the project
- the backend chat endpoint works
- sample product and policy retrieval works
- the chatbot can refuse unsupported claims
- the user can see what the final storefront experience will feel like

## Minimum Experience

The demo should include:

- a local URL the user can open
- polished chat launcher or embedded chat panel
- assistant greeting with store-help positioning
- user and assistant message bubbles
- realistic sample products, product cards, and policy snippets
- source links or source labels when answers use demo knowledge
- support handoff button or link for unknown questions
- loading state while the backend responds
- friendly error state when the backend is unavailable
- mobile-responsive layout
- demo-only note that does not dominate the UI

Avoid raw HTML forms, unstyled textareas, cramped panels, placeholder lorem ipsum, debug JSON as the main UI, or anything that makes the user doubt the final chatbot.

## Source Pattern To Preserve

Match the source starter pattern:

- backend owns `GET /health` and `POST /api/chat`
- dashboard or local storefront page can send test chat messages
- widget is endpoint-only and contains no private keys
- sample knowledge includes store-neutral products and policies
- responses can include product cards, sources, and support actions
- unsupported discount, inventory, delivery, return-exception, warranty, and order-status questions are refused or handed off

## Suggested Demo Questions

Use questions like:

- "Which product is best for a first-time buyer?"
- "What is your return policy?"
- "Do you have a desk lamp?"
- "Can I get 20% off?"
- "Is this in stock right now?"
- "Where is my order?"

The first three should answer from sample data when supported. The last three should refuse or route to support unless verified systems exist.

## Visual Bar

The demo should feel close enough to a finished Shopify widget that a non-technical store owner trusts the build. Use restrained, modern styling; consistent spacing; readable type; clear buttons; polished empty/loading/error states; and product/source cards that look intentional.

When building a frontend, verify it in a browser at desktop and mobile widths before calling the demo done.
