# Product Review Intelligence

A local-only Chrome extension for Amazon.com and Amazon.de that captures Amazon's available **Customers say** insights, opens the selected reviews view for the ASIN on the active product page, cautiously loads each additional review batch, and downloads one ZIP containing a detailed data guide plus five related UTF-8 CSV files. Optional product-detail capture can add the product's demand, price, listing-gallery image URLs and resized JPEG files, attributes, bullets, and information tables.

## Install

1. Open `chrome://extensions`.
2. Turn on **Developer mode**.
3. Click **Load unpacked**.
4. Select the copied, cloned, or extracted folder containing `manifest.json`.

The installed version number appears in small text in the upper-right corner of the extension popup.

Product Review Intelligence requests Chrome's `unlimitedStorage` permission so large **The Full Monty** runs can temporarily preserve completed review passes for the final deduplicated export without hitting Chrome's standard 10 MB extension-storage quota. This working data stays on the local computer and is removed when the export completes or stops with a handled error. The permission does not provide access to additional Amazon data or any cloud storage.

The manifest also grants access to Amazon's `media-amazon.com` and `ssl-images-amazon.com` image hosts. This is used only to download the main listing-gallery URLs already captured from the selected product page when **Capture product details** is enabled. The background downloader rejects non-Amazon hosts and Amazon placeholder or video-button assets.

## Use

1. Sign in to an Amazon account on the marketplace you want to use.
2. Open an Amazon.com or Amazon.de product page or customer-reviews page.
3. Click the **Product Review Intelligence** toolbar icon.
4. Choose the sort, reviewer, rating, and media filters you want.
5. Optionally select **Capture product details**. It is off by default.
6. Confirm the detected ASIN and click **Open reviews & export ZIP**.
7. Leave the reviews tab open while the status panel works through the available batches.
8. The ZIP downloads under `amazon-review-exports/` when collection finishes.

The popup remembers your most recent filter choices. Product Review Intelligence uses the same URL values Amazon applies on its reviews page:

- Sort: `helpful`, `recent`, or `both`
- Reviewer: `all_reviews` or `avp_only_reviews`
- Rating: `all_stars`, `five_star`, `four_star`, `three_star`, `two_star`, `one_star`, `positive`, `critical`, or the extension workflow `full_monty`
- Media: `all_contents` or `media_reviews_only`

For a new installation, the recommended defaults are **Both**, **All reviewers**, **All stars**, and **Text, image, video**. This collects the Most recent and Top reviews, removes duplicates, and provides a broad sample for understanding customer sentiment. The narrower reviewer, rating, and media filters are optional and are most useful for focused analysis, such as reviewing only critical feedback.

Variant remains set to Amazon's **All variants** view. The active sort and filter labels are recorded in every review row.

The listing's overall average star rating, total rating count, and displayed 5-to-1-star percentage distribution are captured whenever available, regardless of the product-details checkbox. These listing-level fields are written once to `product.csv`.

The **Customers say** summary is captured whenever that section exists, regardless of the product-details checkbox. Its topic records include the topic name, mention count, sentiment, positive/negative counts, topic summary, and the review excerpts and links Amazon places in each expanded topic panel. Amazon currently pre-renders these panels, so Product Review Intelligence reads them without clicking every topic. If the section does not exist, `customers_say_status` and `customers_say_summary` say `No Customers say section exists`.

When **Capture product details** is selected, Product Review Intelligence also attempts to capture:

- Product title
- Number bought in the past month
- Current primary price shown for the selected offer/variant
- Primary and gallery product image URLs exposed by the listing
- Product attributes from Amazon's overview table
- **About this item** bullet points
- **Product information** from both Amazon's current expandable-table layout and its older detail-bullets layout

Missing product fields use `Not available`, and isolated product parsing failures are recorded in `product_capture_notes`. They never stop review collection or prevent the available reviews from being exported.

Product image rows contain absolute Amazon-hosted image URLs for the selected listing/variant when Amazon exposes them in the main gallery. The extension also downloads those listing images, resizes them to fit within 1200 by 1200 pixels, converts them to space-efficient JPEGs, and places them in `images/product/`. `images/product/manifest.csv` maps each numbered image file to its source URL and `product-details.csv` sequence. Review photos, A+ content, sponsored products, recommendations, and images elsewhere on the page are not downloaded.

`both` is an extension workflow rather than an Amazon URL value. It first collects the complete **Most recent** view, saves that pass locally, starts over with **Top reviews** using the same reviewer/rating/media filters, and merges both sets by Amazon review ID. Only one ZIP is downloaded after the second pass finishes.

**The Full Monty** is also an extension workflow rather than an Amazon URL value. It runs the selected sort separately for **5 star only**, **4 star only**, **3 star only**, **2 star only**, and **1 star only**, in that order. A rating with no visible review cards is recorded as an empty pass and the workflow continues. With Sort = **Both**, it runs all five rating passes under **Most recent** and then repeats all five under **Top reviews**, for ten cautious passes total. The final ZIP removes duplicate review IDs across every pass. In `reviews.csv`, `star_filter` is `The Full Monty`, while `discovered_in_rating` and `discovered_in_sort` preserve the pass or passes where each review was found.

Full Monty review rows are intentionally rating-stratified and are not a proportional sample of the product's natural rating distribution. Amazon may expose only a limited number of reviews in each filtered view, commonly no more than about 100. Never use the number of exported 5-, 4-, 3-, 2-, or 1-star review rows to estimate the product's positive/negative share. Use `product.csv` fields `overall_star_rating`, `total_rating_count`, and `five_star_percentage` through `one_star_percentage` for the listing-level distribution displayed by Amazon. Use the captured reviews for qualitative themes and examples within each rating group.

## Amazon account verification

An Amazon account signed in to the selected marketplace is required to export individual reviews. Product Review Intelligence does not collect credentials or sign in on the user's behalf.

- If Amazon redirects the review tab to sign-in, the status panel asks the user to sign in. Amazon should then return to the pending review URL and collection can resume.
- It does not submit credentials, click the sign-in link, or attempt to bypass the restriction.
- Amazon may instead replace the individual review cards with an inline account-verification message. Product Review Intelligence recognizes this as an access restriction rather than assuming the product has no reviews.
- When no review cards are visible, it exports a header-only `reviews.csv` plus the available product, Customers say, topic, excerpt, and product-detail data.
- When the restriction appears after some reviews were captured, those reviews are preserved and the export is marked as partial.
- A **Both** workflow stops rather than starting another pass after account verification blocks access. If the second pass is blocked, reviews from the first pass remain in the export.
- **The Full Monty** also stops when account verification blocks access and preserves reviews from every completed pass plus any reviews captured in the current pass.
- `product.csv` records `review_capture_status`, `reviews_exported`, `review_access_message`, and `export_stop_reason`. The exported `README.md` records the same outcome in plain language.

If Amazon does not return to the pending export after sign-in, return to the product page and start a new export.

## Portability and icons

The `review-expander` folder is self-contained and can be copied to another location or computer. Chrome reads the icon files through relative manifest paths such as `icons/icon-32.png`, so the extension has no dependency on its original source location.

The checked-in folder contains the complete extension, including its generated PNG icons. Load the `review-expander` folder directly in Chrome.

The finished icons are included in the extension folder, so no icon generator is needed.

## Export files

Each download is a uniquely named ZIP containing one folder with a detailed `README.md`, five normalized CSV files, and optional listing gallery JPEGs when **Capture product details** was selected. The ZIP and its internal folder use the same short format, `prod-int-export-BRAND-ASIN-YYYYMMDDTHHMMSS`, with the timestamp recorded in UTC. For example: `prod-int-export-M-and-Ms-B097XHFP8T-20260726T150933.zip`. The brand is captured from the Amazon product page and converted to a filename-safe token. If no usable brand is available, the export keeps the prior `prod-int-export-ASIN-YYYYMMDDTHHMMSS` format. Every CSV includes `marketplace_domain`, `marketplace_country`, `page_language`, `asin`, and `exported_at_utc` so Amazon.com and Amazon.de data can be joined without repeating product-level information or conflating marketplace-specific listings.

- `README.md` explains the archive's relationships, parsing rules, recommended AI/analytics import behavior, missing-data conventions, limitations, and every column in every CSV. It also records the ASIN, export timestamp, collection stop reason, and export schema version for that run.

- `reviews.csv` contains one row per deduplicated review, including review identifiers, review URL, reviewer, rating, title, date/country, verified-purchase status, variant, helpful votes, body, images, filters, stop reason, and sort provenance.
- `product.csv` contains one row for the product title, price, bought-in-past-month count, overall star rating, total rating count, displayed star percentages, Customers say summary/status, product-detail status, source URL, capture notes, review count, access status/message, and collection stop reason.
- `product-details.csv` contains one row per product image URL, Product attribute, About this item bullet, or Product information field. The `section`, `field`, `value`, and `sequence` columns preserve its meaning and order.
- `customers-say-topics.csv` contains one row per Customers say topic with mention count, sentiment, positive/negative counts, and summary.
- `customers-say-excerpts.csv` contains one row per sample excerpt with its topic, review ID, and review URL.
- `images/product/` contains numbered, resized JPEG copies of the main listing gallery images and a `manifest.csv` source map when product details and gallery URLs were available.

Files with no applicable rows still contain their headers. `product.csv` therefore records `No Customers say section exists`, `Not requested`, `Not available`, account-verification outcomes, or any non-fatal capture notes without preventing the remaining available data from being exported.

Review rows are deduplicated by Amazon review ID. A combined export sets `sort` to `Both` and uses `discovered_in_sort` to show whether each review appeared in **Most recent**, **Top reviews**, or both. A **The Full Monty** export uses `discovered_in_rating` to identify the individual star pass or passes that contributed each review.

Use `marketplace_domain + asin + exported_at_utc` as the product-level join key. The same ASIN can have marketplace-specific listing content and review populations, so ASIN alone is not a sufficient cross-marketplace key.

## Safety behavior

- The export starts only after a deliberate toolbar action and button click.
- Product-page capture only reads data already present in the page. It does not click the Customers say topics or Product information accordions.
- The review-page content script remains dormant on ordinary browsing and starts only when the extension opens a URL carrying its one-time launch marker.
- It loads one visible review batch at a time.
- It waits a randomized 2.8–4.2 seconds before each pagination click and pauses again after each successful load.
- **Both** applies the same cautious pacing and safety limits independently to each of its two passes.
- **The Full Monty** applies the same cautious pacing and safety limits independently to each of its five rating passes, or all ten passes when combined with **Both**.
- It identifies the stable Amazon `show-more-button` data hook first and only uses a tightly scoped semantic fallback. It does not depend on the exact text `Show 10 more reviews`.
- It detects Amazon's account-verification message separately from an ordinary page that simply has no additional review button.
- It exports the remaining available product insights instead of clicking or waiting when account verification hides all review cards.
- It stops when the control disappears, review IDs stop increasing, three minutes pass, 15 expansions are reached, the tab is closed, or Amazon presents a CAPTCHA/robot check.
- It does not attempt to bypass access controls, CAPTCHA, rate limits, or the visible review pagination Amazon provides to the signed-in user.

## Important policy note

This is a personal internal tool, but a slow interaction rate does not by itself make automated extraction compliant with Amazon's terms. Review Amazon's current [Conditions of Use](https://www.amazon.com/gp/help/customer/display.html?nodeId=GLSBYFE9MGKKQXXM) and obtain appropriate approval before relying on it. Do not redistribute the collected review database or use the extension to evade Amazon restrictions.

## License

Copyright (c) 2026 Mike McClary. Product Review Intelligence is source-available
software, not open-source software. You may download, install, and use an
unmodified copy for personal or internal business purposes. You may not modify,
redistribute, sublicense, sell, or offer it as part of another product or
service. See [LICENSE.md](LICENSE.md) for the complete terms.

## Current scope

- Amazon.com and Amazon.de product and customer-reviews pages.
- Amazon.de source text in Amazon's active English or German display language.
- User-selectable top, most-recent, or combined two-pass sorting.
- User-selectable reviewer, rating, and media filters.
- Optional **The Full Monty** five-rating workflow, repeated for both sort views when **Both** is selected.
- Customers say summary and available topic details.
- Optional product title, bought-in-past-month count, price, listing-gallery image URLs and resized JPEG files, attributes, About this item bullets, and Product information.
- All variants only.
- Up to the reviews exposed by the page's normal incremental pagination and the extension's safety limits.
- Header-only review exports with explicit access status when Amazon requires account verification.
- Page-markup based; Amazon can change the review DOM at any time.
