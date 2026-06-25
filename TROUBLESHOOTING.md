# Troubleshooting

## A Skill Does Not Show Up

1. Confirm the expected `SKILL.md` file exists:
   - `skills/shopify-chatbot-builder/SKILL.md`
   - `skills/shopify-landing-page-builder/SKILL.md`
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
Use the shopify-chatbot-builder skill. Do not present fake products or made-up policies as my demo. The private demo must use my real Shopify products, pages, policies, and a real server-side AI model. If credentials are not ready, run only an internal connectivity test and label it clearly as not the demo.
```

## Codex Wants To Skip The Landing Page Design Package

Stop and redirect:

```text
Use the shopify-landing-page-builder skill. Do not touch Shopify theme files yet. First create the Shopify-ready DTC design package with archetype, big idea, copy strategy, section sequence, offer/proof logic, CTA path, claim notes, metadata direction, and exact image-slot plan.
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

## Codex Wants To Edit A Live Theme Too Early

Stop and redirect:

```text
Do not touch my live Shopify theme yet. First inspect current files, read deploy.md or DEPLOY.md if present, check git status, prefer a development theme, show the exact intended files, use targeted no-delete pushes where possible, and give me a rollback path.
```

## The Chatbot Gives Unsupported Answers

Ask:

```text
Use the shopify-chatbot-builder skill. Review the chatbot for unsupported claims about price, discounts, inventory, shipping, returns, warranty, safety, and order status. Fix the prompt, retrieval, or refusal behavior before any theme install.
```

## The Landing Page Looks Installed But Broken

Ask:

```text
Use the shopify-landing-page-builder skill. Run the landing-page QA checklist: verify the approved DTC spec, CSS and JS asset loading, Shopify Files image references, exact placeholders, desktop and mobile layout, CTA wiring, metadata, theme chrome, sticky CTA behavior, and rollback path.
```
