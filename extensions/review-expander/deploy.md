# Product Review Intelligence Local Deploy

This extension is local-only. There is no hosted service or production deployment target.

## Safety checks

Before changing, updating, or reloading the extension:

1. Run `git status --short` from the root of the repository clone.
2. Review any uncommitted work. Proceed with current-task changes without another confirmation; ask only about pre-existing, unrelated, or uncertain work.
3. Never silently discard, revert, or exclude uncommitted changes.

## Local install

1. Open `chrome://extensions`.
2. Turn on **Developer mode**.
3. Click **Load unpacked**.
4. Select the copied, cloned, or extracted folder containing `manifest.json`.

## Local reload

1. Open `chrome://extensions`.
2. Find **Product Review Intelligence**.
3. Click the reload button.
4. Refresh any Amazon product/reviews tab used for testing.

## Verification

1. Sign in to the Amazon marketplace being tested.
2. Start on a normal Amazon.com product page containing an ASIN in the URL. Also test Amazon's `/gp/aw/d/ASIN` product route.
3. Confirm the popup detects the ASIN.
4. Select non-default values for sort, reviewer, rating, and media, then close and reopen the popup to confirm they persist.
5. Confirm **Capture product details** is unchecked each time the popup opens.
6. Start an export and verify the review page URL contains the selected Amazon filter values.
7. Confirm the on-page panel advances gradually and the loaded unique review count increases.
8. Confirm collection stops when the review pagination control disappears.
9. Confirm the ZIP and its one internal folder have the same `prod-int-export-BRAND-ASIN-YYYYMMDDTHHMMSS` basename, then open the folder and confirm it contains `README.md`, `reviews.csv`, `product.csv`, `product-details.csv`, `customers-say-topics.csv`, and `customers-say-excerpts.csv`. If Amazon does not expose a usable brand, confirm both names keep the prior `prod-int-export-ASIN-YYYYMMDDTHHMMSS` format.
10. With **Capture product details** checked, confirm `images/product/` contains numbered JPEGs only from the main listing gallery plus `manifest.csv`; verify each JPEG's long edge is no more than 1200 pixels and no review, A+, sponsored, recommendation, or other page images were downloaded.
11. Verify the exported `README.md` records the correct marketplace, ASIN, timestamp, stop reason, and every CSV column, join relationship, parsing rule, missing-data convention, and collection limitation.
12. Verify all CSVs are UTF-8, have headers, and share the same `marketplace_domain`, `marketplace_country`, `page_language`, `asin`, and `exported_at_utc` values.
13. Verify `reviews.csv` has one row per `review_id` and does not repeat title, price, Customers say, or product-detail fields.
14. On a product with Customers say, verify `product.csv` has the summary, `customers-say-topics.csv` has the available topic counts/sentiment/summaries, and `customers-say-excerpts.csv` has excerpts and review URLs.
15. On a product without Customers say, verify `product.csv` says `No Customers say section exists` and the reviews still export.
16. Run with **Capture product details** unchecked and verify `product.csv` records `product_details_status` as `Not requested`, `product-details.csv` has headers only, and no `images/product/` folder exists.
17. Run with **Capture product details** checked and verify `product.csv` has title/price/demand while `product-details.csv` has separate Product attribute, About this item, and Product information rows.
18. Confirm a missing product field says `Not available` and never stops the review export.
19. Run **Both** and confirm it completes Most recent first, starts Top reviews without an intermediate download, and downloads one `-both-` ZIP after the second pass.
20. Confirm `reviews.csv` has one row per `review_id`, `sort` is `Both`, and `discovered_in_sort` records the contributing sort view or views.
21. On Amazon.de, confirm the popup detects the ASIN, the review tab remains on Amazon.de, the active locale prefix is preserved, and every CSV records `amazon.de`, `DE`, and the detected page language.
22. If Amazon redirects the export tab to sign-in, verify the panel says sign-in is required and the pending export resumes after Amazon returns to the review URL.
23. For an inline `Customer reviews require account verification` state, verify a header-only `reviews.csv` preserves the other datasets and records `Account verification required`, `0`, the access message, and the stop reason in `product.csv`.
24. Verify **Both** does not start another pass after account verification blocks the first pass; if verification blocks the second pass, verify the first-pass reviews remain in the export.
25. Confirm the exported `README.md` explains the account-verification behavior and all structured status and marketplace fields.
26. If Amazon presents a CAPTCHA or robot check, stop and complete it manually. Do not add bypass behavior.
