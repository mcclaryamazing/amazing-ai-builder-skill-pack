(() => {
  const currentUrl = new URL(location.href);
  const launchUrl = getExportLaunchUrl(currentUrl);
  const ACCOUNT_VERIFICATION_STATUS = "Account verification required";
  globalThis.ReviewExpanderExportFiles = Object.freeze({
    buildFullMontyPlan,
    buildExportName,
    buildExportFiles,
    detectReviewAccessGateText,
    getAsinFromUrl,
    getExportLaunchUrl,
    parseReviewDateMetadata
  });
  const launchMode = launchUrl?.searchParams.get("reviewExpanderMode");
  const workflow = launchUrl ? {
    asin: getAsinFromUrl(launchUrl),
    mode: launchMode === "both" || launchMode === "full_monty" ? launchMode : "single",
    pass: launchUrl.searchParams.get("reviewExpanderPass") || "single",
    passIndex: Number.parseInt(launchUrl.searchParams.get("reviewExpanderPassIndex") || "0", 10),
    sortMode: launchUrl.searchParams.get("reviewExpanderSortMode") || "",
    sessionId: launchUrl.searchParams.get("reviewExpanderSession") || "",
    marketplaceDomain: normalizeMarketplaceDomain(
      launchUrl.searchParams.get("reviewExpanderMarketplace") || currentUrl.hostname
    ),
    pageLanguage: normalizeLanguage(
      launchUrl.searchParams.get("reviewExpanderLanguage") || document.documentElement.lang
    )
  } : {
    asin: getAsinFromUrl(currentUrl),
    mode: "single",
    pass: "single",
    sessionId: "",
    marketplaceDomain: normalizeMarketplaceDomain(currentUrl.hostname),
    pageLanguage: normalizeLanguage(document.documentElement.lang)
  };
  const MAX_EXPANSIONS = 15;
  const MAX_TOTAL_RUNTIME_MS = 180000;
  const PRE_CLICK_DELAY_MS = { min: 2800, max: 4200 };
  const POST_LOAD_DELAY_MS = { min: 1800, max: 2800 };
  const LOAD_INCREASE_TIMEOUT_MS = 20000;
  const REVIEW_SELECTOR = '[data-hook="review"]';
  const FULL_MONTY_RATINGS = Object.freeze([
    Object.freeze({ value: "five_star", label: "5 star only" }),
    Object.freeze({ value: "four_star", label: "4 star only" }),
    Object.freeze({ value: "three_star", label: "3 star only" }),
    Object.freeze({ value: "two_star", label: "2 star only" }),
    Object.freeze({ value: "one_star", label: "1 star only" })
  ]);
  const collectedReviews = new Map();
  const startedAt = Date.now();
  let panelDismissed = false;
  let productPageData = fallbackProductPageData();
  if (!launchUrl) return;

  if (globalThis.__amazonReviewExporterRunning) return;
  globalThis.__amazonReviewExporterRunning = true;

  if (isAmazonSignInUrl(currentUrl) && currentUrl.href !== launchUrl.href) {
    waitForAmazonSignIn();
    return;
  }

  [
    "amazonReviewExporter",
    "reviewExpanderMode",
    "reviewExpanderPass",
    "reviewExpanderPassIndex",
    "reviewExpanderSortMode",
    "reviewExpanderSession",
    "reviewExpanderMarketplace",
    "reviewExpanderLanguage"
  ].forEach((name) => launchUrl.searchParams.delete(name));
  history.replaceState(history.state, "", launchUrl.href);

  run().catch(async (error) => {
    await clearWorkflowSession().catch(() => {});
    updatePanel({
      phase: "error",
      headline: "Export stopped",
      detail: friendlyError(error)
    });
    await sendProgress({
      phase: "error",
      error: friendlyError(error),
      reviewCount: collectedReviews.size
    });
  });

  async function waitForAmazonSignIn() {
    createPanel();
    updatePanel({
      phase: "restricted",
      headline: "Sign in to Amazon to continue",
      detail: "Review export requires an Amazon account. After sign-in, Amazon should return here and the export will resume."
    });
    await sendProgress({
      phase: "sign-in-required",
      reviewCount: 0,
      reviewCaptureStatus: ACCOUNT_VERIFICATION_STATUS,
      reviewAccessMessage: "Sign in to an Amazon account to access individual reviews."
    });
  }

  async function run() {
    createPanel();
    assertUsablePage();
    productPageData = await loadProductPageData();
    const initialReviewState = await waitForInitialReviews();

    if (initialReviewState.accessGate) {
      await completeAccountVerificationExport(initialReviewState.accessGate);
      return;
    }

    let stopReason = "No more review batches were available.";
    let expansionCount = 0;
    let reviewCaptureStatus = "Captured available reviews";
    let reviewAccessMessage = "";

    collectCurrentReviews();
    updatePanel({
      phase: "running",
      headline: "Collecting reviews",
      detail: `${collectedReviews.size} unique reviews found.`
    });

    while (expansionCount < MAX_EXPANSIONS) {
      assertUsablePage();

      if (Date.now() - startedAt >= MAX_TOTAL_RUNTIME_MS) {
        stopReason = "Stopped at the three-minute safety limit.";
        break;
      }

      const accessGate = findReviewAccessGate();
      if (accessGate) {
        reviewCaptureStatus = "Partial capture - account verification required";
        reviewAccessMessage = accessGate.message;
        stopReason = buildAccountVerificationStopReason(accessGate, collectedReviews.size);
        break;
      }

      const moreControl = findMoreReviewsControl();
      if (!moreControl) break;

      const beforeCount = getUniqueReviewIds().size;
      const controlLabel = cleanText(moreControl.textContent) || "More reviews";
      const preClickDelay = randomBetween(PRE_CLICK_DELAY_MS.min, PRE_CLICK_DELAY_MS.max);

      updatePanel({
        phase: "waiting",
        headline: `${collectedReviews.size} reviews collected`,
        detail: `${controlLabel} is available. Waiting ${formatSeconds(preClickDelay)} before loading it.`
      });
      await sendProgress({
        phase: "waiting",
        reviewCount: collectedReviews.size,
        expansionCount,
        nextControlLabel: controlLabel
      });

      moreControl.scrollIntoView({ behavior: "smooth", block: "center" });
      await wait(preClickDelay);
      assertUsablePage();

      const preClickAccessGate = findReviewAccessGate();
      if (preClickAccessGate) {
        reviewCaptureStatus = "Partial capture - account verification required";
        reviewAccessMessage = preClickAccessGate.message;
        stopReason = buildAccountVerificationStopReason(preClickAccessGate, collectedReviews.size);
        break;
      }

      if (!moreControl.isConnected || moreControl.getAttribute("aria-disabled") === "true") {
        stopReason = "Amazon removed the next-review control before it could be used.";
        break;
      }

      moreControl.click();
      expansionCount += 1;

      updatePanel({
        phase: "loading",
        headline: "Loading the next batch",
        detail: `Batch ${expansionCount} requested. Waiting for new unique reviews.`
      });

      const loadResult = await waitForReviewIncrease(beforeCount, LOAD_INCREASE_TIMEOUT_MS);
      collectCurrentReviews();

      if (loadResult.accessGate) {
        reviewCaptureStatus = "Partial capture - account verification required";
        reviewAccessMessage = loadResult.accessGate.message;
        stopReason = buildAccountVerificationStopReason(loadResult.accessGate, collectedReviews.size);
        break;
      }

      if (!loadResult.increased) {
        stopReason = "Amazon did not add another review batch before the timeout.";
        break;
      }

      await sendProgress({
        phase: "running",
        reviewCount: collectedReviews.size,
        expansionCount
      });
      await wait(randomBetween(POST_LOAD_DELAY_MS.min, POST_LOAD_DELAY_MS.max));
    }

    if (!reviewAccessMessage && expansionCount >= MAX_EXPANSIONS && findMoreReviewsControl()) {
      stopReason = `Stopped after ${MAX_EXPANSIONS} expansions at the safety cap.`;
    }

    collectCurrentReviews();

    if (!collectedReviews.size && workflow.mode !== "full_monty") {
      throw new Error("No reviews were found on this page.");
    }

    if (!collectedReviews.size) {
      stopReason = "No reviews were available for this rating pass.";
    }

    await completeCollection(
      Array.from(collectedReviews.values()),
      stopReason,
      expansionCount,
      {
        reviewCaptureStatus,
        reviewAccessMessage,
        stopAfterCurrentPass: Boolean(reviewAccessMessage)
      }
    );
  }

  async function completeCollection(reviews, stopReason, expansionCount, options = {}) {
    if (workflow.mode === "full_monty") {
      await completeFullMontyPass(reviews, stopReason, expansionCount, options);
      return;
    }

    if (workflow.mode !== "both") {
      const preparedReviews = reviews.map((review) => ({
        ...review,
        discovered_in_sort: review.sort,
        discovered_in_rating: review.star_filter
      }));
      await downloadReviews(preparedReviews, stopReason, expansionCount, options);
      await clearWorkflowSession();
      return;
    }

    assertBothWorkflow();

    if (workflow.pass === "recent") {
      if (options.stopAfterCurrentPass) {
        const preparedReviews = reviews.map((review) => ({
          ...review,
          discovered_in_sort: review.sort,
          discovered_in_rating: review.star_filter
        }));
        await downloadReviews(preparedReviews, stopReason, expansionCount, {
          ...options,
          passReviewCounts: { recent: reviews.length, helpful: 0 }
        });
        await clearWorkflowSession();
        return;
      }

      await saveRecentPass(reviews, stopReason, expansionCount);
      await openTopReviewsPass();
      return;
    }

    if (workflow.pass !== "helpful") {
      throw new Error("The combined-sort workflow had an invalid pass.");
    }

    const sessionKey = getBothSessionKey();
    const stored = await chrome.storage.local.get(sessionKey);
    const recentPass = stored[sessionKey];

    if (!recentPass?.reviews?.length) {
      throw new Error("The Most recent review set was unavailable for the final merge.");
    }

    if (recentPass.asin !== getAsin()) {
      throw new Error("The combined-sort workflow changed products before the final merge.");
    }

    const merged = globalThis.ReviewExpanderDedupe.mergeReviewSets(
      recentPass.reviews,
      reviews
    );
    const combinedStopReason = [
      `Most recent: ${recentPass.stopReason}`,
      `Top reviews: ${stopReason}`,
      `Removed ${merged.duplicateCount} duplicate review${merged.duplicateCount === 1 ? "" : "s"}.`
    ].join(" ");

    await downloadReviews(
      merged.reviews,
      combinedStopReason,
      Number(recentPass.expansionCount || 0) + expansionCount,
      {
        ...options,
        duplicateCount: merged.duplicateCount,
        passReviewCounts: {
          recent: recentPass.reviews.length,
          helpful: reviews.length
        }
      }
    );
    await clearWorkflowSession();
  }

  async function completeFullMontyPass(reviews, stopReason, expansionCount, options = {}) {
    assertFullMontyWorkflow();
    const plan = buildFullMontyPlan(workflow.sortMode);
    const currentPass = plan[workflow.passIndex];

    if (!currentPass) {
      throw new Error("The Full Monty workflow had an invalid pass.");
    }

    const sessionKey = getFullMontySessionKey();
    const stored = await chrome.storage.local.get(sessionKey);
    const session = stored[sessionKey] || {
      asin: getAsin(),
      passes: []
    };

    if (session.asin !== getAsin()) {
      throw new Error("The Full Monty workflow changed products before the final merge.");
    }

    session.passes[workflow.passIndex] = {
      ...currentPass,
      expansionCount,
      reviews,
      stopReason
    };
    await chrome.storage.local.set({ [sessionKey]: session });

    if (!options.stopAfterCurrentPass && workflow.passIndex < plan.length - 1) {
      const nextPass = plan[workflow.passIndex + 1];
      updatePanel({
        phase: "switching",
        headline: `${reviews.length} ${currentPass.ratingLabel.toLowerCase()} reviews captured`,
        detail: `Starting ${nextPass.sortLabel}, ${nextPass.ratingLabel.toLowerCase()} (${workflow.passIndex + 2} of ${plan.length}).`
      });
      await sendProgress({
        phase: "switching",
        pass: workflow.passIndex,
        reviewCount: reviews.length,
        expansionCount
      });
      await openFullMontyPass(nextPass, workflow.passIndex + 1);
      return;
    }

    const completedPasses = session.passes.filter(Boolean);
    const merged = globalThis.ReviewExpanderDedupe.mergeReviewPasses(completedPasses);
    const combinedStopReason = [
      ...completedPasses.map((pass) => `${pass.sortLabel} / ${pass.ratingLabel}: ${pass.stopReason}`),
      options.stopAfterCurrentPass && completedPasses.length < plan.length
        ? `Stopped after ${completedPasses.length} of ${plan.length} passes.`
        : "",
      `Removed ${merged.duplicateCount} duplicate review${merged.duplicateCount === 1 ? "" : "s"}.`
    ].filter(Boolean).join(" ");
    const passReviewCounts = Object.fromEntries(
      completedPasses.map((pass) => [`${pass.sortValue}:${pass.ratingValue}`, pass.reviews.length])
    );
    const totalExpansions = completedPasses.reduce(
      (sum, pass) => sum + Number(pass.expansionCount || 0),
      0
    );

    await downloadReviews(merged.reviews, combinedStopReason, totalExpansions, {
      ...options,
      duplicateCount: merged.duplicateCount,
      passReviewCounts
    });
    await clearWorkflowSession();
  }

  function buildFullMontyPlan(sortMode) {
    const sorts = sortMode === "both"
      ? [
        { value: "recent", label: "Most recent" },
        { value: "helpful", label: "Top reviews" }
      ]
      : sortMode === "helpful"
        ? [{ value: "helpful", label: "Top reviews" }]
        : [{ value: "recent", label: "Most recent" }];

    return sorts.flatMap((sort) => FULL_MONTY_RATINGS.map((rating) => ({
      sortValue: sort.value,
      sortLabel: sort.label,
      ratingValue: rating.value,
      ratingLabel: rating.label
    })));
  }

  async function openFullMontyPass(nextPass, nextPassIndex) {
    await wait(1800);

    const nextUrl = new URL(location.href);
    nextUrl.searchParams.set("sortBy", nextPass.sortValue);
    nextUrl.searchParams.set("filterByStar", nextPass.ratingValue);
    nextUrl.searchParams.set("amazonReviewExporter", "1");
    nextUrl.searchParams.set("reviewExpanderMode", "full_monty");
    nextUrl.searchParams.set("reviewExpanderSortMode", workflow.sortMode);
    nextUrl.searchParams.set("reviewExpanderPassIndex", String(nextPassIndex));
    nextUrl.searchParams.set("reviewExpanderSession", workflow.sessionId);
    nextUrl.searchParams.set("reviewExpanderMarketplace", workflow.marketplaceDomain);
    if (workflow.pageLanguage) {
      nextUrl.searchParams.set("reviewExpanderLanguage", workflow.pageLanguage);
    }
    location.assign(nextUrl.href);
  }

  async function completeAccountVerificationExport(accessGate) {
    const blockedHelpfulPass = workflow.mode === "both" && workflow.pass === "helpful";
    let preservedFullMontyReviews = 0;
    let stopReason = buildAccountVerificationStopReason(accessGate, 0);
    const options = {
      reviewCaptureStatus: ACCOUNT_VERIFICATION_STATUS,
      reviewAccessMessage: accessGate.message,
      stopAfterCurrentPass: true,
      product: getPageMetadata(),
      savingHeadline: "Product insights ready",
      savingDetail: "No individual reviews are visible. Exporting the available product and Customers say data.",
      completionHeadline: "Available product insights exported"
    };

    if (workflow.mode === "full_monty") {
      const sessionKey = getFullMontySessionKey();
      const stored = await chrome.storage.local.get(sessionKey);
      preservedFullMontyReviews = (stored[sessionKey]?.passes || []).reduce(
        (sum, pass) => sum + Number(pass?.reviews?.length || 0),
        0
      );

      if (preservedFullMontyReviews) {
        stopReason = `${accessGate.message} Preserved reviews from the completed Full Monty passes.`;
        options.reviewCaptureStatus = "Partial capture - account verification required";
        options.savingHeadline = "Available reviews and insights ready";
        options.savingDetail = "A later rating pass is restricted. Exporting reviews from completed passes and the remaining product insights.";
        options.completionHeadline = "Available reviews and insights exported";
      }
    }

    if (blockedHelpfulPass) {
      stopReason = `${accessGate.message} The Top reviews pass was unavailable; preserved the Most recent reviews and remaining product insights.`;
      options.reviewCaptureStatus = "Partial capture - account verification required";
      options.savingHeadline = "Available reviews and insights ready";
      options.savingDetail = "The second review pass is restricted. Exporting the preserved first-pass reviews and remaining product insights.";
      options.completionHeadline = "Available reviews and insights exported";
    }

    updatePanel({
      phase: "restricted",
      headline: "Amazon sign-in required",
      detail: blockedHelpfulPass
        ? "The second pass is restricted. Reviews from the first pass will be preserved."
        : preservedFullMontyReviews
          ? "A later rating pass is restricted. Reviews from completed passes will be preserved."
          : "No individual review cards are available. The remaining product insights will still be exported."
    });
    await sendProgress({
      phase: "restricted",
      reviewCount: blockedHelpfulPass || preservedFullMontyReviews ? undefined : 0,
      reviewCaptureStatus: options.reviewCaptureStatus,
      reviewAccessMessage: accessGate.message
    });

    if (workflow.mode === "full_monty") {
      await completeFullMontyPass([], stopReason, 0, options);
      return;
    }

    if (blockedHelpfulPass) {
      await completeCollection([], stopReason, 0, options);
      return;
    }

    await downloadReviews([], stopReason, 0, {
      ...options
    });
    await clearWorkflowSession();
  }

  async function saveRecentPass(reviews, stopReason, expansionCount) {
    const sessionKey = getBothSessionKey();
    await chrome.storage.local.set({
      [sessionKey]: {
        asin: getAsin(),
        expansionCount,
        reviews,
        savedAt: new Date().toISOString(),
        stopReason
      }
    });

    updatePanel({
      phase: "switching",
      headline: `${reviews.length} recent reviews captured`,
      detail: "Starting over with Top reviews before the final de-duplicated export."
    });
    await sendProgress({
      phase: "switching",
      pass: "recent",
      reviewCount: reviews.length,
      expansionCount
    });
  }

  async function openTopReviewsPass() {
    await wait(1800);

    const nextUrl = new URL(location.href);
    nextUrl.searchParams.set("sortBy", "helpful");
    nextUrl.searchParams.set("amazonReviewExporter", "1");
    nextUrl.searchParams.set("reviewExpanderMode", "both");
    nextUrl.searchParams.set("reviewExpanderPass", "helpful");
    nextUrl.searchParams.set("reviewExpanderSession", workflow.sessionId);
    nextUrl.searchParams.set("reviewExpanderMarketplace", workflow.marketplaceDomain);
    if (workflow.pageLanguage) {
      nextUrl.searchParams.set("reviewExpanderLanguage", workflow.pageLanguage);
    }
    location.assign(nextUrl.href);
  }

  async function downloadReviews(reviews, stopReason, expansionCount, options = {}) {
    const exportedAt = new Date().toISOString();
    const asin = getAsin();
    const product = options.product || getPageMetadata();
    const exportName = buildExportName(asin, exportedAt, product.product_brand);
    const filename = `${exportName}.zip`;
    const reviewCaptureStatus = options.reviewCaptureStatus
      || (reviews.length ? "Captured available reviews" : "No reviews captured");
    const reviewAccessMessage = options.reviewAccessMessage || "";
    const files = buildExportFiles(reviews, stopReason, exportedAt, exportName, {
      product,
      reviewCaptureStatus,
      reviewAccessMessage
    });
    const productImageUrls = parseJsonArray(product.product_images_json);

    updatePanel({
      phase: "saving",
      headline: options.savingHeadline || `${reviews.length} reviews ready`,
      detail: options.savingDetail || (options.duplicateCount == null
        ? `Creating one ZIP with a data guide, five related CSV files${productImageUrls.length
          ? `, and ${productImageUrls.length} listing image${productImageUrls.length === 1 ? "" : "s"}`
          : ""}…`
        : `Creating one ZIP with a data guide after removing ${options.duplicateCount} duplicate review${options.duplicateCount === 1 ? "" : "s"}.`)
    });

    const result = await chrome.runtime.sendMessage({
      type: "amazon-review-export-download",
      files,
      filename,
      productImageUrls
    });

    if (!result?.ok) {
      throw new Error(result?.error || "Chrome could not save the ZIP export.");
    }

    updatePanel({
      phase: "complete",
      headline: options.completionHeadline || `${reviews.length} reviews exported`,
      detail: `${filename} was saved${result.productImagesDownloaded
        ? ` with ${result.productImagesDownloaded} product image${result.productImagesDownloaded === 1 ? "" : "s"}`
        : ""}. ${stopReason}`
    });
    await sendProgress({
      phase: "complete",
      reviewCount: reviews.length,
      expansionCount,
      filename,
      stopReason,
      reviewCaptureStatus,
      reviewAccessMessage,
      duplicateCount: options.duplicateCount || 0,
      passReviewCounts: options.passReviewCounts || null
    });
  }

  function buildExportName(asin, exportedAt, brand = "") {
    const timestamp = new Date(exportedAt)
      .toISOString()
      .slice(0, 19)
      .replace(/[-:]/g, "");
    const brandToken = cleanText(brand)
      .replace(/^(?:brand|brand name|marke|markenname)\s*:\s*/i, "")
      .replace(/^(?:visit the|besuche den|besuchen sie den)\s+/i, "")
      .replace(/(?:\s+store|-store)$/i, "")
      .replace(/&/g, " and ")
      .replace(/[\u2018\u2019']/g, "")
      .normalize("NFKD")
      .replace(/\p{M}/gu, "")
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60)
      .replace(/-+$/g, "");
    const usableBrand = /^(?:not-available|nicht-verfugbar)$/i.test(brandToken) ? "" : brandToken;
    return `prod-int-export-${usableBrand ? `${usableBrand}-` : ""}${asin}-${timestamp}`;
  }

  function assertBothWorkflow() {
    if (!workflow.sessionId) {
      throw new Error("The combined-sort workflow was missing its session ID.");
    }

    if (typeof globalThis.ReviewExpanderDedupe?.mergeReviewSets !== "function") {
      throw new Error("The combined-sort de-duplication helper was unavailable.");
    }
  }

  function assertFullMontyWorkflow() {
    if (!workflow.sessionId) {
      throw new Error("The Full Monty workflow was missing its session ID.");
    }

    if (!["recent", "helpful", "both"].includes(workflow.sortMode)) {
      throw new Error("The Full Monty workflow had an invalid sort selection.");
    }

    if (!Number.isInteger(workflow.passIndex) || workflow.passIndex < 0) {
      throw new Error("The Full Monty workflow had an invalid pass number.");
    }

    if (typeof globalThis.ReviewExpanderDedupe?.mergeReviewPasses !== "function") {
      throw new Error("The Full Monty de-duplication helper was unavailable.");
    }
  }

  function getBothSessionKey() {
    return `reviewExpanderBoth:${workflow.sessionId}`;
  }

  function getFullMontySessionKey() {
    return `reviewExpanderFullMonty:${workflow.sessionId}`;
  }

  function getProductDataKey() {
    return `reviewExpanderProductData:${workflow.sessionId}`;
  }

  async function loadProductPageData() {
    if (!workflow.sessionId) return fallbackProductPageData();

    try {
      const sessionKey = getProductDataKey();
      const stored = await chrome.storage.local.get(sessionKey);
      return stored[sessionKey] || fallbackProductPageData();
    } catch {
      return fallbackProductPageData();
    }
  }

  async function clearWorkflowSession() {
    if (!workflow.sessionId) return;

    const keys = [getProductDataKey()];
    if (workflow.mode === "both") keys.push(getBothSessionKey());
    if (workflow.mode === "full_monty") keys.push(getFullMontySessionKey());
    await chrome.storage.local.remove(keys);
  }

  function collectCurrentReviews() {
    const metadata = getPageMetadata();
    const reviewNodes = Array.from(document.querySelectorAll(REVIEW_SELECTOR));

    reviewNodes.forEach((root) => {
      const review = parseReview(root, metadata);
      if (review.review_id && !collectedReviews.has(review.review_id)) {
        collectedReviews.set(review.review_id, review);
      }
    });

    updatePanelCount(collectedReviews.size);
  }

  function parseReview(root, metadata) {
    const titleLink = root.querySelector('[data-hook="review-title"]');
    const ratingText = cleanText(root.querySelector('[data-hook="review-star-rating"]')?.textContent)
      || cleanText(titleLink?.querySelector("i")?.textContent);
    const fullTitle = cleanText(titleLink?.textContent);
    const reviewTitle = ratingText && fullTitle.startsWith(ratingText)
      ? fullTitle.slice(ratingText.length).trim()
      : fullTitle.replace(
        /^\d(?:[.,]\d)?\s+(?:out of 5 stars|von 5 Sternen)\s*/i,
        ""
      ).trim();
    const reviewDateRaw = cleanText(root.querySelector('[data-hook="review-date"]')?.textContent);
    const dateMetadata = parseReviewDateMetadata(reviewDateRaw);
    const author = cleanText(root.querySelector(".a-profile-name")?.textContent)
      || cleanText(root.querySelector('[data-hook="genome-widget"]')?.textContent);
    const titleHref = titleLink?.getAttribute("href") || "";
    const reviewId = root.id
      || titleHref.match(/\/(R[A-Z0-9]+)(?:\/|\?|$)/i)?.[1]
      || buildFallbackReviewId(root);
    const imageUrls = Array.from(root.querySelectorAll(
      '[data-hook="review-image-tile"] img, img[data-hook="review-image-tile"], .review-image-tile-section img'
    ))
      .map((image) => image.currentSrc || image.getAttribute("src") || image.getAttribute("data-src") || "")
      .filter(Boolean);

    return {
      ...metadata,
      review_id: reviewId,
      review_url: toAbsoluteUrl(titleHref),
      reviewer_name: author,
      rating: (ratingText.match(/\d(?:[.,]\d)?/)?.[0] || "").replace(",", "."),
      review_title: reviewTitle,
      review_date: dateMetadata.date,
      review_country: dateMetadata.country,
      review_date_raw: reviewDateRaw,
      verified_purchase: root.querySelector('[data-hook="avp-badge"]') ? "Yes" : "No",
      variant: cleanText(root.querySelector('[data-hook="format-strip"]')?.textContent),
      helpful_votes: findHelpfulText(root),
      review_body: cleanText(root.querySelector('[data-hook="review-body"]')?.textContent),
      image_urls: Array.from(new Set(imageUrls)).join(" | ")
    };
  }

  function getPageMetadata() {
    const productTitle = cleanText(document.querySelector(".product-info-title")?.textContent)
      || cleanText(document.querySelector("main h1")?.textContent).replace(/\s*›\s*Customer reviews\s*$/i, "");
    const localizedProductTitle = productTitle.replace(
      /\s*(?:â€º|›)\s*(?:Customer reviews|Kundenrezensionen)\s*$/i,
      ""
    );
    const customersSay = productPageData?.customersSay || {};
    const ratingSummary = productPageData?.ratingSummary || {};
    const productDetails = productPageData?.productDetails || {};
    const productDetailsRequested = productDetails.status && productDetails.status !== "Not requested";
    const marketplace = getMarketplaceMetadata();

    return {
      asin: getAsin(),
      ...marketplace,
      product_brand: cleanText(productPageData?.brand),
      product_title: cleanText(productDetails.title) || localizedProductTitle,
      rating_summary_status: cleanText(ratingSummary.status) || "Rating summary capture unavailable",
      overall_star_rating: ratingSummary.overall_star_rating ?? "",
      total_rating_count: ratingSummary.total_rating_count ?? "",
      five_star_percentage: ratingSummary.five_star_percentage ?? "",
      four_star_percentage: ratingSummary.four_star_percentage ?? "",
      three_star_percentage: ratingSummary.three_star_percentage ?? "",
      two_star_percentage: ratingSummary.two_star_percentage ?? "",
      one_star_percentage: ratingSummary.one_star_percentage ?? "",
      customers_say_status: cleanText(customersSay.status) || "Customers say capture unavailable",
      customers_say_summary: cleanText(customersSay.summary) || "Customers say capture unavailable",
      customers_say_topics_json: safeJson(customersSay.topics || []),
      product_details_status: cleanText(productDetails.status) || "Not requested",
      product_bought_past_month: productDetailsRequested
        ? cleanText(productDetails.bought_past_month) || "Not available"
        : "",
      product_price: productDetailsRequested
        ? cleanText(productDetails.price) || "Not available"
        : "",
      product_attributes_json: safeJson(productDetails.attributes || []),
      about_this_item_json: safeJson(productDetails.about_this_item || []),
      product_information_json: safeJson(productDetails.product_information || []),
      product_images_json: safeJson(productDetails.product_images || []),
      product_data_source_url: cleanText(productPageData?.sourceUrl),
      product_capture_notes: safeJson(productPageData?.warnings || []),
      sort: getSelectedText("#sort-order-dropdown"),
      reviewer_filter: getSelectedText("#reviewer-type-dropdown"),
      star_filter: getSelectedText("#star-count-dropdown"),
      variant_filter: getSelectedText("#format-type-dropdown"),
      media_filter: getSelectedText("#media-type-dropdown"),
      page_review_summary: cleanText(
        document.querySelector('[data-hook="cr-filter-info-review-rating-count"]')?.textContent
        || document.querySelector(".filter-info-section")?.textContent
      )
    };
  }

  function findMoreReviewsControl() {
    const hookedControls = Array.from(document.querySelectorAll('[data-hook="show-more-button"]'));
    const hooked = hookedControls.find(isUsableControl);
    if (hooked) return hooked;

    const candidates = Array.from(document.querySelectorAll("a, button"));
    return candidates.find((element) => {
      if (!isUsableControl(element)) return false;

      const label = cleanText(element.textContent || element.getAttribute("aria-label"));
      const href = element.getAttribute("href") || "";
      const hasReviewMeaning = /\bmore\b.*\breviews?\b/i.test(label)
        || /\b(?:show|load|see)\b.*\breviews?\b/i.test(label)
        || /\b(?:mehr|weitere)\b.*\brezensionen?\b/i.test(label)
        || /\brezensionen?\b.*\b(?:anzeigen|laden)\b/i.test(label);
      const hasReviewPagingHref = /customer-reviews/i.test(href) && /paging|page/i.test(href);

      return hasReviewMeaning && hasReviewPagingHref;
    }) || null;
  }

  function isUsableControl(element) {
    if (!element?.isConnected) return false;
    if (element.matches(":disabled") || element.getAttribute("aria-disabled") === "true") return false;
    return element.getClientRects().length > 0;
  }

  async function waitForInitialReviews() {
    const deadline = Date.now() + 20000;

    while (Date.now() < deadline) {
      assertUsablePage();
      if (document.querySelector(REVIEW_SELECTOR)) return { accessGate: null };

      const accessGate = findReviewAccessGate();
      if (accessGate) return { accessGate };

      await wait(500);
    }

    if (workflow.mode === "full_monty") {
      return { accessGate: null, noReviews: true };
    }

    throw new Error("Amazon did not display any review cards before the timeout.");
  }

  async function waitForReviewIncrease(beforeCount, timeoutMs) {
    const deadline = Date.now() + timeoutMs;

    while (Date.now() < deadline) {
      assertUsablePage();
      if (getUniqueReviewIds().size > beforeCount) {
        return { increased: true, accessGate: null };
      }

      const accessGate = findReviewAccessGate();
      if (accessGate) return { increased: false, accessGate };

      await wait(500);
    }

    return { increased: false, accessGate: null };
  }

  function findReviewAccessGate() {
    const candidates = Array.from(document.querySelectorAll(
      '[role="alert"], .a-alert-content, .a-alert, [data-testid*="review"], main'
    ));

    for (const candidate of candidates) {
      const accessGate = detectReviewAccessGateText(candidate?.textContent);
      if (accessGate) return accessGate;
    }

    return detectReviewAccessGateText(document.body?.textContent);
  }

  function detectReviewAccessGateText(value) {
    const text = cleanText(value);
    const isEnglishGate = /customer reviews require account verification/i.test(text);
    const isGermanGate = /kundenrezensionen.{0,80}(?:kontoverifizierung|konto.{0,30}verifizierung)/i.test(text)
      || /(?:kontoverifizierung|konto.{0,30}verifizierung).{0,80}kundenrezensionen/i.test(text);
    if (!isEnglishGate && !isGermanGate) return null;

    return {
      status: ACCOUNT_VERIFICATION_STATUS,
      message: "Sign in to an Amazon account to access individual reviews."
    };
  }

  function buildAccountVerificationStopReason(accessGate, reviewCount) {
    if (reviewCount > 0) {
      return `${accessGate.message} Exported ${reviewCount} review${reviewCount === 1 ? "" : "s"} captured before access was restricted.`;
    }

    return `${accessGate.message} No individual reviews were available; exported the remaining product insights.`;
  }

  function getUniqueReviewIds() {
    return new Set(
      Array.from(document.querySelectorAll(REVIEW_SELECTOR))
        .map((root) => root.id || cleanText(root.querySelector('[data-hook="review-title"]')?.textContent))
        .filter(Boolean)
    );
  }

  function assertUsablePage() {
    const isCaptcha = /robot check|captcha/i.test(document.title)
      || document.querySelector('form[action*="validateCaptcha"], input[name="cvf_captcha_input"]')
      || /enter the characters you see below/i.test(cleanText(document.querySelector("main")?.textContent).slice(0, 500))
      || /geben sie die zeichen ein, die sie unten sehen/i.test(
        cleanText(document.querySelector("main")?.textContent).slice(0, 500)
      );

    if (isCaptcha) {
      throw new Error("Amazon presented a CAPTCHA or robot check. Complete it manually, then start a new export.");
    }

    if (!/\/portal\/customer-reviews\/[A-Z0-9]{10}/i.test(location.pathname)) {
      throw new Error("This is not the expected Amazon customer-reviews page.");
    }
  }

  function buildExportFiles(reviews, stopReason, exportedAt, exportName, options = {}) {
    const product = options.product || reviews[0] || {};
    const reviewCaptureStatus = options.reviewCaptureStatus
      || (reviews.length ? "Captured available reviews" : "No reviews captured");
    const reviewAccessMessage = options.reviewAccessMessage || "";
    const marketplace = {
      ...getMarketplaceMetadata(),
      marketplace_domain: product.marketplace_domain || getMarketplaceMetadata().marketplace_domain,
      marketplace_country: product.marketplace_country || getMarketplaceMetadata().marketplace_country,
      page_language: product.page_language || getMarketplaceMetadata().page_language
    };
    const reviewColumns = [
      "asin",
      "marketplace_domain",
      "marketplace_country",
      "page_language",
      "review_id",
      "review_url",
      "reviewer_name",
      "rating",
      "review_title",
      "review_date",
      "review_country",
      "review_date_raw",
      "verified_purchase",
      "variant",
      "helpful_votes",
      "review_body",
      "image_urls",
      "sort",
      "discovered_in_sort",
      "discovered_in_rating",
      "reviewer_filter",
      "star_filter",
      "variant_filter",
      "media_filter",
      "page_review_summary",
      "export_stop_reason",
      "exported_at_utc"
    ];
    const productColumns = [
      "asin",
      "marketplace_domain",
      "marketplace_country",
      "page_language",
      "product_title",
      "product_price",
      "product_bought_past_month",
      "rating_summary_status",
      "overall_star_rating",
      "total_rating_count",
      "five_star_percentage",
      "four_star_percentage",
      "three_star_percentage",
      "two_star_percentage",
      "one_star_percentage",
      "customers_say_status",
      "customers_say_summary",
      "product_details_status",
      "product_data_source_url",
      "product_capture_notes",
      "review_capture_status",
      "reviews_exported",
      "review_access_message",
      "export_stop_reason",
      "exported_at_utc"
    ];
    const productDetailColumns = [
      "asin",
      "marketplace_domain",
      "marketplace_country",
      "page_language",
      "section",
      "field",
      "value",
      "sequence",
      "exported_at_utc"
    ];
    const topicColumns = [
      "asin",
      "marketplace_domain",
      "marketplace_country",
      "page_language",
      "topic",
      "mention_count",
      "sentiment",
      "positive_count",
      "negative_count",
      "summary",
      "exported_at_utc"
    ];
    const excerptColumns = [
      "asin",
      "marketplace_domain",
      "marketplace_country",
      "page_language",
      "topic",
      "review_id",
      "review_url",
      "excerpt",
      "exported_at_utc"
    ];

    const reviewRows = reviews.map((review) => ({
      ...marketplace,
      ...review,
      export_stop_reason: stopReason,
      exported_at_utc: exportedAt
    }));
    const productRows = [{
      asin: product.asin || getAsin(),
      ...marketplace,
      product_title: product.product_title || "",
      product_price: product.product_price || "",
      product_bought_past_month: product.product_bought_past_month || "",
      rating_summary_status: product.rating_summary_status || "Rating summary capture unavailable",
      overall_star_rating: product.overall_star_rating ?? "",
      total_rating_count: product.total_rating_count ?? "",
      five_star_percentage: product.five_star_percentage ?? "",
      four_star_percentage: product.four_star_percentage ?? "",
      three_star_percentage: product.three_star_percentage ?? "",
      two_star_percentage: product.two_star_percentage ?? "",
      one_star_percentage: product.one_star_percentage ?? "",
      customers_say_status: product.customers_say_status || "",
      customers_say_summary: product.customers_say_summary || "",
      product_details_status: product.product_details_status || "Not requested",
      product_data_source_url: product.product_data_source_url || "",
      product_capture_notes: product.product_capture_notes || "[]",
      review_capture_status: reviewCaptureStatus,
      reviews_exported: reviews.length,
      review_access_message: reviewAccessMessage,
      export_stop_reason: stopReason,
      exported_at_utc: exportedAt
    }];
    const productDetailRows = buildProductDetailRows(product, exportedAt, marketplace);
    const { topicRows, excerptRows } = buildCustomersSayRows(product, exportedAt, marketplace);
    const basePath = `${exportName}/`;
    const asin = product.asin || getAsin();

    return [
      {
        path: `${basePath}README.md`,
        content: buildExportReadme({
          asin,
          ...marketplace,
          exportedAt,
          stopReason,
          reviewCaptureStatus,
          reviewsExported: reviews.length,
          reviewAccessMessage
        })
      },
      { path: `${basePath}reviews.csv`, content: createCsv(reviewColumns, reviewRows) },
      { path: `${basePath}product.csv`, content: createCsv(productColumns, productRows) },
      { path: `${basePath}product-details.csv`, content: createCsv(productDetailColumns, productDetailRows) },
      { path: `${basePath}customers-say-topics.csv`, content: createCsv(topicColumns, topicRows) },
      { path: `${basePath}customers-say-excerpts.csv`, content: createCsv(excerptColumns, excerptRows) }
    ];
  }

  function buildExportReadme({
    asin,
    marketplace_domain,
    marketplace_country,
    page_language,
    exportedAt,
    stopReason,
    reviewCaptureStatus,
    reviewsExported,
    reviewAccessMessage
  }) {
    return [
      "# Product Review Intelligence export data guide",
      "",
      "This archive was generated by Product Review Intelligence from the Amazon pages visible to the user at export time. It contains five related CSV datasets plus this guide and, when product details were requested and Amazon exposed them, downloaded listing gallery images. Use this file as the data dictionary and import contract for both manual analysis and automated or AI-assisted workflows.",
      "",
      "## Export identity",
      "",
      `- ASIN: ${asin}`,
      `- Marketplace domain: ${marketplace_domain}`,
      `- Marketplace country: ${marketplace_country}`,
      `- Page language: ${page_language || "Not detected"}`,
      `- Exported at (UTC): ${exportedAt}`,
      `- Review capture status: ${reviewCaptureStatus}`,
      `- Reviews exported: ${reviewsExported}`,
      `- Review access message: ${reviewAccessMessage || "None"}`,
      `- Collection stop reason: ${stopReason}`,
      "- Export schema version: 1.7",
      "",
      "The ASIN is Amazon's 10-character product identifier within a marketplace. The marketplace_domain and exported_at_utc values identify the marketplace and collection run. Every CSV schema includes these provenance columns so records from Amazon.com and Amazon.de can be stored together without conflating marketplace-specific listings or reviews.",
      "",
      "## Critical interpretation note for The Full Monty",
      "",
      "When Rating = The Full Monty, reviews.csv is a rating-stratified collection, not a naturally proportional sample of all customer sentiment. Product Review Intelligence separately requests 5-, 4-, 3-, 2-, and 1-star views and captures as many reviews as Amazon exposes within the extension's safety limits. Amazon may expose only a limited number of reviews for each filtered view, commonly no more than about 100. As a result, the exported row counts can make uncommon negative ratings appear much more prevalent than they are on the listing.",
      "",
      "- Do not calculate the product's positive/negative share, average rating, or star distribution from reviews.csv row counts when The Full Monty was used.",
      "- Use product.csv overall_star_rating, total_rating_count, and the five star-percentage columns as the listing-level rating context displayed by Amazon at capture time.",
      "- Use reviews.csv for qualitative themes, examples, wording, defects, and opportunities within each rating group.",
      "- discovered_in_rating and discovered_in_sort identify the filtered passes that contributed each deduplicated review.",
      "- The five percentage fields may not total exactly 100 because Amazon rounds displayed percentages.",
      "",
      "## Files and relationships",
      "",
      "| File | Grain (what one row represents) | Suggested key or join |",
      "| --- | --- | --- |",
      "| reviews.csv | One deduplicated customer review | marketplace_domain + asin + exported_at_utc + review_id |",
      "| product.csv | One product snapshot for this export | marketplace_domain + asin + exported_at_utc |",
      "| product-details.csv | One product image URL, product attribute, bullet point, or Product information field | marketplace_domain + asin + exported_at_utc; sequence orders rows within each section |",
      "| customers-say-topics.csv | One Amazon Customers say topic | marketplace_domain + asin + exported_at_utc + topic |",
      "| customers-say-excerpts.csv | One sample review excerpt associated with a Customers say topic | marketplace_domain + asin + exported_at_utc + topic; review_id may also link to reviews.csv |",
      "| images/product/ | Resized JPEG copies of the selected listing's primary and gallery images, plus a manifest.csv mapping each file to its source URL and product-details.csv sequence | Optional; created only when product details were requested and image URLs were available |",
      "",
      "Join product-level data to other files using marketplace_domain, asin, and exported_at_utc. Join Customers say excerpts to topics using marketplace_domain, asin, exported_at_utc, and topic. An excerpt's review_id may be blank or may refer to a review that is not present in reviews.csv because Amazon can surface topic excerpts outside the selected review filters. Treat that relationship as optional.",
      "",
      "## CSV parsing rules",
      "",
      "- Encoding is UTF-8 with a byte-order mark (UTF-8 BOM) for spreadsheet compatibility.",
      "- The delimiter is a comma. The first row is the header row.",
      "- Data values are enclosed in double quotes, and embedded double quotes are escaped according to standard CSV rules.",
      "- Line endings are CRLF. Use a CSV parser instead of splitting lines or commas manually.",
      "- A dataset with no applicable records still exists and contains its header row.",
      "- Empty cells mean the value was unavailable, not shown, not applicable, or not captured. Check the related status and notes columns before interpreting a blank.",
      "- Preserve source text during import. Displayed prices, helpful-vote phrases, dates, variants, and bought-in-past-month values are not normalized numeric fields.",
      "- Values containing ` | ` are multi-value display strings. In reviews.csv this applies to image_urls and can apply to discovered_in_sort and discovered_in_rating.",
      "",
      "## Recommended AI and analytics import behavior",
      "",
      "1. Read this guide before interpreting the CSV files.",
      "2. Import each CSV as a separate table and keep marketplace_domain, asin, and exported_at_utc on every row.",
      "3. Do not concatenate the five CSVs vertically because they have different row meanings and schemas.",
      "4. Treat review_id as text. Do not discard IDs beginning with fallback-; Product Review Intelligence creates those only when Amazon does not expose a normal review ID.",
      "5. Parse rating, sequence, mention_count, positive_count, and negative_count as numbers only when nonblank. Retain the original source value if strict reproducibility matters.",
      "6. Do not parse product_price as a number without separately handling its displayed currency and locale.",
      "7. Treat review_date as locale-formatted source text, not as an ISO date. review_date_raw preserves the fuller visible phrase.",
      "8. Read review_capture_status, reviews_exported, review_access_message, and export_stop_reason from product.csv before analyzing reviews. These fields remain available even when reviews.csv is header-only.",
      "9. If star_filter = The Full Monty, do not use reviews.csv row counts as a sentiment distribution. Use the listing-level rating fields in product.csv.",
      "10. Do not infer that missing data is negative data. For example, verified_purchase = No means a Verified Purchase badge was not detected; it is not proof that the purchase was unverified.",
      "11. Do not invent or fill missing values unless the downstream analysis explicitly calls for imputation. Keep derived fields separate from captured source fields.",
      "",
      "## Account verification behavior",
      "",
      "An Amazon account signed in to the selected marketplace is a prerequisite for exporting individual reviews. Product Review Intelligence does not collect credentials or sign in on the user's behalf.",
      "",
      "- If Amazon redirects to sign-in, the on-page panel asks the user to sign in. Amazon should then return to the pending review URL and collection can resume.",
      "- It does not submit credentials, click account-verification controls, or attempt to bypass the requirement.",
      "- If no review cards are visible, reviews.csv is header-only while product.csv, product details, Customers say topics, Customers say excerpts, and this README are still exported.",
      "- If the message appears after some reviews were collected, the available reviews are preserved and review_capture_status identifies the export as partial.",
      "- A Sort = Both workflow stops rather than starting another review pass once account verification blocks access. If the second pass is blocked, reviews already captured during the first pass are preserved.",
      "- A Rating = The Full Monty workflow also stops when account verification blocks access and preserves reviews from completed passes plus any reviews captured during the current pass.",
      "- Sign in to the appropriate Amazon account and start a new export if individual reviews are required.",
      "",
      "## reviews.csv",
      "",
      "Contains one row per review after deduplication by review_id. With Sort = Both, Product Review Intelligence combines the Most recent and Top reviews passes. With Rating = The Full Monty, it runs separate 5-, 4-, 3-, 2-, and 1-star passes for each selected sort. It keeps the most complete captured copy and records the contributing views in discovered_in_sort and discovered_in_rating. This file contains only its header when account verification prevents all individual reviews from being displayed.",
      "",
      "| Column | Meaning | Type or format |",
      "| --- | --- | --- |",
      "| asin | Amazon product identifier. | Text, normally 10 uppercase letters/digits. |",
      "| marketplace_domain | Amazon marketplace from which the data was captured. | amazon.com or amazon.de. |",
      "| marketplace_country | Normalized marketplace country code. | US or DE. |",
      "| page_language | Language detected from Amazon's locale route or page markup. Source text remains in this language. | Usually en or de; may be blank if unavailable. |",
      "| review_id | Amazon review ID; a fallback- ID is generated when Amazon does not expose one. Unique within this export. | Text. |",
      "| review_url | Absolute URL to the individual Amazon review when available. | URL text or blank. |",
      "| reviewer_name | Reviewer's displayed profile name. | Text or blank. |",
      "| rating | Star rating extracted from Amazon's displayed rating. | Numeric text, usually 1 through 5. |",
      "| review_title | Displayed review headline with the rating prefix removed. | Text or blank. |",
      "| review_date | Date portion extracted from Amazon's review metadata. It is not normalized to ISO format. | Locale-formatted text or blank. |",
      "| review_country | Country or location phrase extracted from the review metadata. | Text or blank. |",
      "| review_date_raw | Full visible review date/location phrase before parsing. | Text or blank. |",
      "| verified_purchase | Whether a visible Verified Purchase badge was detected. | Yes or No. |",
      "| variant | Visible style, size, color, format, or other variation text associated with the review. | Text or blank. |",
      "| helpful_votes | Amazon's displayed helpful-vote statement. | Display text such as `3 people found this helpful`, or blank. |",
      "| review_body | Visible review text with whitespace normalized. | Text or blank. |",
      "| image_urls | Unique review image URLs. | Zero or more URLs separated by ` \\| `. |",
      "| sort | Selected sort view for the export. Combined exports use Both. | Display text. |",
      "| discovered_in_sort | Sort view or views in which the review was found. | Most recent, Top reviews, or both separated by ` \\| `. |",
      "| discovered_in_rating | Rating pass or passes in which the review was found. The Full Monty records the individual star pass here. | Rating filter text; multiple values are separated by ` \\| `. |",
      "| reviewer_filter | Selected reviewer filter as displayed by Amazon. | Display text. |",
      "| star_filter | Selected star/rating filter as displayed by Amazon. | Display text. |",
      "| variant_filter | Selected product-variant filter. Product Review Intelligence currently uses Amazon's All variants view. | Display text. |",
      "| media_filter | Selected media/content filter as displayed by Amazon. | Display text. |",
      "| page_review_summary | Amazon's visible review/rating count summary for the filtered page. | Display text or blank. |",
      "| export_stop_reason | Why Product Review Intelligence stopped loading additional review batches. Repeated on each populated review row for standalone use. The same value is always present in product.csv. | Text. |",
      "| exported_at_utc | Time the final archive was created. | ISO 8601 UTC timestamp. |",
      "",
      "## product.csv",
      "",
      "Contains exactly one product-level snapshot row. Customers say is captured whenever available. The remaining optional product fields depend on the Capture product details checkbox.",
      "",
      "| Column | Meaning | Type or format |",
      "| --- | --- | --- |",
      "| asin | Amazon product identifier. | Text. |",
      "| marketplace_domain | Amazon marketplace for this product snapshot. | amazon.com or amazon.de. |",
      "| marketplace_country | Normalized marketplace country code. | US or DE. |",
      "| page_language | Language in which the product page was displayed. | Usually en or de; may be blank. |",
      "| product_title | Product title captured from the product page or review-page heading. | Text or blank. |",
      "| product_price | Primary displayed price for the selected offer/variant at capture time. Currency is not normalized separately. | Display text, Not available, or blank when details were not requested. |",
      "| product_bought_past_month | Amazon's visible social-proof statement about recent purchases. | Display text such as `1K+ bought in past month`, Not available, or blank. |",
      "| rating_summary_status | Whether listing-level rating context was captured from the product page. | Status text. |",
      "| overall_star_rating | Amazon's displayed overall average star rating for the listing at capture time. | Decimal number text such as 4.6, or blank. |",
      "| total_rating_count | Amazon's displayed total rating count for the listing at capture time. This is a rating count and may differ from the number of written reviews. | Nonnegative integer or blank. |",
      "| five_star_percentage | Amazon's displayed share of ratings that are 5 star. Use this instead of Full Monty review-row proportions. | Percentage number from 0 through 100, or blank. |",
      "| four_star_percentage | Amazon's displayed share of ratings that are 4 star. | Percentage number from 0 through 100, or blank. |",
      "| three_star_percentage | Amazon's displayed share of ratings that are 3 star. | Percentage number from 0 through 100, or blank. |",
      "| two_star_percentage | Amazon's displayed share of ratings that are 2 star. | Percentage number from 0 through 100, or blank. |",
      "| one_star_percentage | Amazon's displayed share of ratings that are 1 star. | Percentage number from 0 through 100, or blank. |",
      "| customers_say_status | Outcome of locating and reading Amazon's Customers say section. | Status text such as Captured or No Customers say section exists. |",
      "| customers_say_summary | Amazon's displayed Customers say overview, which may be generated or summarized by Amazon from customer reviews. | Text or an availability message. |",
      "| product_details_status | Whether optional product details were requested and whether any were captured. | Status text such as Not requested, Captured available fields, or No product details were available. |",
      "| product_data_source_url | Amazon product-page URL from which product-level data was captured. | URL text or blank. |",
      "| product_capture_notes | Nonfatal warnings encountered while capturing product-level data. Review collection continues despite these warnings. | JSON array encoded as text inside the CSV cell, usually `[]`. Parse as JSON after CSV parsing if needed. |",
      "| review_capture_status | Overall individual-review outcome for this export. | Captured available reviews, Account verification required, Partial capture - account verification required, or another explicit status. |",
      "| reviews_exported | Number of rows written to reviews.csv, excluding its header. | Nonnegative integer. |",
      "| review_access_message | Account-verification message detected on the Amazon page, when applicable. | Text or blank. |",
      "| export_stop_reason | Why review collection ended. This remains populated even when reviews.csv has no data rows. | Text. |",
      "| exported_at_utc | Time the final archive was created. | ISO 8601 UTC timestamp. |",
      "",
      "## product-details.csv",
      "",
      "Contains optional product details in a long, flexible format so products with different images and attributes can share one schema. It is header-only when Capture product details was not selected or no detail rows were available.",
      "",
      "| Column | Meaning | Type or format |",
      "| --- | --- | --- |",
      "| asin | Amazon product identifier. | Text. |",
      "| marketplace_domain | Amazon marketplace for the detail row. | amazon.com or amazon.de. |",
      "| marketplace_country | Normalized marketplace country code. | US or DE. |",
      "| page_language | Language of the captured field label and value. | Usually en or de; may be blank. |",
      "| section | Source category for the row. | Product image, Product attribute, About this item, or Product information. |",
      "| field | Detail label. Product image rows distinguish the first primary/gallery URL from later gallery URLs; About this item rows use Bullet point. | Text. |",
      "| value | Captured image URL, attribute value, bullet text, or information value. | Text; product image rows contain an absolute HTTP(S) URL. |",
      "| sequence | One-based display order within the row's section. Sequence restarts for each section. | Integer. |",
      "| exported_at_utc | Time the final archive was created. | ISO 8601 UTC timestamp. |",
      "",
      "## customers-say-topics.csv",
      "",
      "Contains the topic-level feedback Amazon exposes under Select to learn more. Counts and summaries reflect Amazon's displayed Customers say analysis, not counts independently calculated by Product Review Intelligence.",
      "",
      "| Column | Meaning | Type or format |",
      "| --- | --- | --- |",
      "| asin | Amazon product identifier. | Text. |",
      "| marketplace_domain | Amazon marketplace for the Customers say topic. | amazon.com or amazon.de. |",
      "| marketplace_country | Normalized marketplace country code. | US or DE. |",
      "| page_language | Language of the captured topic and summary. | Usually en or de; may be blank. |",
      "| topic | Displayed feedback topic, such as Brightness or Quality. | Text. |",
      "| mention_count | Number of customers Amazon says mention the topic. | Integer or blank. |",
      "| sentiment | Sentiment/category identifier exposed by Amazon for the topic. Do not assume a fixed vocabulary. | Text or blank. |",
      "| positive_count | Positive mention count displayed for the topic. | Integer or blank. |",
      "| negative_count | Negative mention count displayed for the topic. | Integer or blank. |",
      "| summary | Amazon's displayed summary for that topic. | Text or blank. |",
      "| exported_at_utc | Time the final archive was created. | ISO 8601 UTC timestamp. |",
      "",
      "## customers-say-excerpts.csv",
      "",
      "Contains the sample review excerpts Amazon exposes for each Customers say topic. These are topic examples, not a complete set of all reviews mentioning that topic.",
      "",
      "| Column | Meaning | Type or format |",
      "| --- | --- | --- |",
      "| asin | Amazon product identifier. | Text. |",
      "| marketplace_domain | Amazon marketplace for the excerpt. | amazon.com or amazon.de. |",
      "| marketplace_country | Normalized marketplace country code. | US or DE. |",
      "| page_language | Language of the captured excerpt. | Usually en or de; may be blank. |",
      "| topic | Customers say topic associated with the excerpt. | Text. |",
      "| review_id | Amazon review ID parsed from the excerpt's link when available. | Text or blank. |",
      "| review_url | Absolute URL to the source review when Amazon provides one. | URL text or blank. |",
      "| excerpt | The visible sample excerpt associated with the topic. | Text. |",
      "| exported_at_utc | Time the final archive was created. | ISO 8601 UTC timestamp. |",
      "",
      "## Scope and limitations",
      "",
      "- The export represents data visible through Amazon's page markup and normal review pagination at collection time; it is not guaranteed to contain every review Amazon stores.",
      "- Selected filters affect reviews.csv. Amazon's product-level and Customers say content may summarize a broader review population than the selected review subset.",
      "- Collection can stop because the next-review control disappears, no new IDs appear, Amazon requires account verification, the three-minute or 15-expansion safety cap is reached, or Amazon presents a CAPTCHA/robot check. Inspect product.csv review_capture_status and export_stop_reason.",
      "- Amazon can change its labels, markup, summaries, filters, and availability. Status fields and header-only files preserve nonfatal missing-data outcomes.",
      "- Product Review Intelligence reads displayed data but does not independently verify reviewer identity, purchase status, sentiment, counts, or Amazon-generated summaries.",
      ""
    ].join("\n");
  }

  function buildProductDetailRows(product, exportedAt, marketplace) {
    const asin = product.asin || getAsin();
    const rows = [];

    parseJsonArray(product.product_images_json).forEach((item, index) => {
      rows.push({
        asin,
        ...marketplace,
        section: "Product image",
        field: index === 0 ? "Primary/gallery image URL" : "Gallery image URL",
        value: item ?? "",
        sequence: index + 1,
        exported_at_utc: exportedAt
      });
    });
    parseJsonArray(product.product_attributes_json).forEach((item, index) => {
      rows.push({
        asin,
        ...marketplace,
        section: "Product attribute",
        field: item?.label || `Attribute ${index + 1}`,
        value: item?.value ?? "",
        sequence: index + 1,
        exported_at_utc: exportedAt
      });
    });
    parseJsonArray(product.about_this_item_json).forEach((item, index) => {
      rows.push({
        asin,
        ...marketplace,
        section: "About this item",
        field: "Bullet point",
        value: item ?? "",
        sequence: index + 1,
        exported_at_utc: exportedAt
      });
    });
    parseJsonArray(product.product_information_json).forEach((item, index) => {
      rows.push({
        asin,
        ...marketplace,
        section: "Product information",
        field: item?.label || `Field ${index + 1}`,
        value: item?.value ?? "",
        sequence: index + 1,
        exported_at_utc: exportedAt
      });
    });
    return rows;
  }

  function buildCustomersSayRows(product, exportedAt, marketplace) {
    const asin = product.asin || getAsin();
    const topicRows = [];
    const excerptRows = [];

    parseJsonArray(product.customers_say_topics_json).forEach((topic) => {
      const topicName = topic?.name || "";
      topicRows.push({
        asin,
        ...marketplace,
        topic: topicName,
        mention_count: topic?.mention_count ?? "",
        sentiment: topic?.sentiment || "",
        positive_count: topic?.positive_count ?? "",
        negative_count: topic?.negative_count ?? "",
        summary: topic?.summary || "",
        exported_at_utc: exportedAt
      });

      const excerpts = Array.isArray(topic?.review_excerpts) ? topic.review_excerpts : [];
      excerpts.forEach((item) => {
        excerptRows.push({
          asin,
          ...marketplace,
          topic: topicName,
          review_id: item?.review_id || "",
          review_url: item?.review_url || "",
          excerpt: item?.excerpt || "",
          exported_at_utc: exportedAt
        });
      });
    });
    return { topicRows, excerptRows };
  }

  function parseJsonArray(value) {
    if (Array.isArray(value)) return value;
    try {
      const parsed = JSON.parse(value || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function createCsv(columns, rows) {
    const body = rows.map((row) => columns.map((column) => csvCell(row[column] ?? "")).join(","));

    return `\uFEFF${columns.join(",")}\r\n${body.join("\r\n")}\r\n`;
  }

  function csvCell(value) {
    return `"${String(value).replace(/"/g, '""')}"`;
  }

  function findHelpfulText(root) {
    const hooked = cleanText(root.querySelector('[data-hook="helpful-vote-statement"]')?.textContent);
    if (hooked) return hooked;

    return Array.from(root.querySelectorAll("span, div"))
      .map((element) => cleanText(element.textContent))
      .find((text) => /^(?:one|[\d,]+) (?:person|people) found this helpful$/i.test(text)
        || /^(?:eine|[\d.]+) (?:person|personen) (?:fand|fanden) (?:diese informationen|dies) hilfreich$/i.test(text)) || "";
  }

  function getSelectedText(selector) {
    const select = document.querySelector(selector);
    return cleanText(select?.selectedOptions?.[0]?.textContent);
  }

  function getAsin() {
    return workflow.asin
      || getAsinFromUrl(new URL(location.href))
      || "unknown-asin";
  }

  function getExportLaunchUrl(url) {
    if (url.searchParams.get("amazonReviewExporter") === "1") {
      return new URL(url.href);
    }

    for (const name of ["openid.return_to", "return_to", "returnTo"]) {
      const rawValue = url.searchParams.get(name);
      if (!rawValue) continue;

      try {
        const candidate = new URL(rawValue, url.origin);
        if (
          candidate.searchParams.get("amazonReviewExporter") === "1"
          && normalizeMarketplaceDomain(candidate.hostname) === normalizeMarketplaceDomain(url.hostname)
        ) {
          return candidate;
        }
      } catch {
        // Ignore unrelated or malformed sign-in return URLs.
      }
    }

    return null;
  }

  function isAmazonSignInUrl(url) {
    return /\/(?:ap\/signin|gp\/sign-in)(?:\/|$)/i.test(url.pathname);
  }

  function getAsinFromUrl(url) {
    return url.pathname.match(
      /\/(?:portal\/customer-reviews|product-reviews|dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})(?:[/?]|$)/i
    )?.[1]?.toUpperCase() || "";
  }

  function getMarketplaceMetadata() {
    const storedMarketplace = productPageData?.marketplace || {};
    const marketplaceDomain = normalizeMarketplaceDomain(
      workflow.marketplaceDomain
        || storedMarketplace.marketplaceDomain
        || storedMarketplace.domain
        || location.hostname
    ) || "amazon.com";
    const pageLanguage = normalizeLanguage(
      workflow.pageLanguage
        || storedMarketplace.pageLanguage
        || document.documentElement.lang
    );

    return {
      marketplace_domain: marketplaceDomain,
      marketplace_country: marketplaceDomain === "amazon.de" ? "DE" : "US",
      page_language: pageLanguage
    };
  }

  function normalizeMarketplaceDomain(value) {
    const hostname = String(value || "").toLowerCase();
    if (hostname === "amazon.de" || hostname.endsWith(".amazon.de")) return "amazon.de";
    if (hostname === "amazon.com" || hostname.endsWith(".amazon.com")) return "amazon.com";
    return "";
  }

  function normalizeLanguage(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .match(/^[a-z]{2}/)?.[0] || "";
  }

  function parseReviewDateMetadata(value) {
    const text = cleanText(value);
    const patterns = [
      /^Reviewed in (.+?) on (.+)$/i,
      /^Rezension aus (.+?) vom (.+)$/i
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return {
          country: cleanText(match[1]),
          date: cleanText(match[2])
        };
      }
    }

    return { country: "", date: "" };
  }

  function buildFallbackReviewId(root) {
    const basis = `${cleanText(root.querySelector(".a-profile-name")?.textContent)}|${cleanText(root.querySelector('[data-hook="review-title"]')?.textContent)}|${cleanText(root.querySelector('[data-hook="review-date"]')?.textContent)}|${cleanText(root.querySelector('[data-hook="review-body"]')?.textContent)}`;
    let hash = 0;
    for (let characterIndex = 0; characterIndex < basis.length; characterIndex += 1) {
      hash = ((hash << 5) - hash + basis.charCodeAt(characterIndex)) | 0;
    }
    return `fallback-${Math.abs(hash)}`;
  }

  function toAbsoluteUrl(href) {
    if (!href) return "";
    try {
      return new URL(href, location.origin).href;
    } catch {
      return href;
    }
  }

  function cleanText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function safeJson(value) {
    try {
      return JSON.stringify(value ?? null);
    } catch {
      return "[]";
    }
  }

  function fallbackProductPageData() {
    return {
      sourceUrl: "",
      brand: "",
      ratingSummary: {
        status: "Rating summary capture unavailable",
        overall_star_rating: "",
        total_rating_count: "",
        five_star_percentage: "",
        four_star_percentage: "",
        three_star_percentage: "",
        two_star_percentage: "",
        one_star_percentage: ""
      },
      customersSay: {
        status: "Customers say capture unavailable",
        summary: "Customers say capture unavailable",
        topics: []
      },
      productDetails: {
        status: "Not requested",
        title: "",
        bought_past_month: "",
        price: "",
        attributes: [],
        about_this_item: [],
        product_information: [],
        product_images: []
      },
      warnings: ["Product-page information was unavailable; review collection continued."]
    };
  }

  function randomBetween(min, max) {
    return Math.round(min + Math.random() * (max - min));
  }

  function formatSeconds(ms) {
    return `${(ms / 1000).toFixed(1)} seconds`;
  }

  function wait(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  async function sendProgress(state) {
    try {
      await chrome.runtime.sendMessage({
        type: "amazon-review-export-progress",
        state: { asin: getAsin(), ...state }
      });
    } catch {
      // The on-page panel remains the source of truth if the service worker restarts.
    }
  }

  function createPanel() {
    if (document.querySelector("#amazon-review-exporter-panel")) return;

    const style = document.createElement("style");
    style.id = "amazon-review-exporter-style";
    style.textContent = `
      #amazon-review-exporter-panel {
        position: fixed;
        z-index: 2147483647;
        top: 22px;
        right: 22px;
        width: 310px;
        padding: 16px;
        border: 1px solid rgba(255,255,255,.16);
        border-radius: 14px 14px 14px 5px;
        color: #fffaf0;
        background: #173f32;
        box-shadow: 0 18px 48px rgba(0,0,0,.28);
        font: 13px/1.45 "Segoe UI Variable", "Segoe UI", sans-serif;
      }
      #amazon-review-exporter-panel * { box-sizing: border-box; }
      #amazon-review-exporter-panel .are-top { display:flex; align-items:center; justify-content:space-between; gap:12px; }
      #amazon-review-exporter-panel .are-kicker { margin:0; color:#f1ad43; font-size:10px; font-weight:800; letter-spacing:.14em; }
      #amazon-review-exporter-panel .are-close { border:0; color:rgba(255,255,255,.72); background:transparent; font-size:20px; line-height:1; cursor:pointer; }
      #amazon-review-exporter-panel .are-headline { margin:7px 0 3px; font:700 20px/1.15 Georgia, serif; }
      #amazon-review-exporter-panel .are-detail { margin:0; color:rgba(255,255,255,.78); }
      #amazon-review-exporter-panel .are-meter { display:flex; gap:4px; margin-top:13px; }
      #amazon-review-exporter-panel .are-meter span { flex:1; height:4px; border-radius:999px; background:rgba(255,255,255,.16); overflow:hidden; }
      #amazon-review-exporter-panel .are-meter span::after { content:""; display:block; width:var(--are-fill, 0%); height:100%; background:#f1ad43; transition:width .3s ease; }
      #amazon-review-exporter-panel[data-phase="complete"] { background:#164c39; }
      #amazon-review-exporter-panel[data-phase="error"] { background:#6f2924; }
    `;

    const panel = document.createElement("aside");
    panel.id = "amazon-review-exporter-panel";
    panel.setAttribute("role", "status");
    panel.setAttribute("aria-live", "polite");
    panel.innerHTML = `
      <div class="are-top">
        <p class="are-kicker">REVIEW EXPORT</p>
        <button class="are-close" type="button" aria-label="Dismiss export status">×</button>
      </div>
      <p class="are-headline">Preparing reviews</p>
      <p class="are-detail">Reading the first visible batch.</p>
      <div class="are-meter" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
    `;
    panel.querySelector(".are-close").addEventListener("click", () => {
      panelDismissed = true;
      panel.remove();
    });

    document.documentElement.append(style, panel);
  }

  function updatePanel({ phase, headline, detail }) {
    if (panelDismissed) return;
    const panel = document.querySelector("#amazon-review-exporter-panel");
    if (!panel) return;

    panel.dataset.phase = phase || "running";
    panel.querySelector(".are-headline").textContent = headline;
    panel.querySelector(".are-detail").textContent = detail;

    const fill = phase === "complete" ? 100 : Math.min(94, Math.max(10, collectedReviews.size));
    panel.querySelectorAll(".are-meter span").forEach((segment, index) => {
      const segmentStart = index * 20;
      const segmentFill = Math.max(0, Math.min(100, (fill - segmentStart) * 5));
      segment.style.setProperty("--are-fill", `${segmentFill}%`);
    });
  }

  function updatePanelCount(count) {
    const panel = document.querySelector("#amazon-review-exporter-panel");
    if (panel) panel.dataset.reviewCount = String(count);
  }

  function friendlyError(error) {
    return error?.message || "The review export failed.";
  }
})();
