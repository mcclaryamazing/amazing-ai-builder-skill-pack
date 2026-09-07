(() => {
  const NO_CUSTOMERS_SAY = "No Customers say section exists";

  globalThis.ReviewExpanderProductData = Object.freeze({
    capturePageData,
    captureProductBrand,
    captureProductImages,
    captureRatingSummary
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.type !== "review-expander-capture-product-page") return false;

    capturePageData(Boolean(message.captureProductDetails))
      .then((data) => sendResponse({ ok: true, data }))
      .catch((error) => sendResponse({
        ok: false,
        error: error?.message || "Product-page information could not be captured."
      }));
    return true;
  });

  async function capturePageData(includeProductDetails) {
    const warnings = [];
    let customersSay;
    let ratingSummary;
    let brand = "";
    let productDetails = emptyProductDetails(includeProductDetails);

    try {
      brand = captureProductBrand();
    } catch (error) {
      warnings.push(`Brand: ${friendlyError(error)}`);
    }

    try {
      ratingSummary = captureRatingSummary();
    } catch (error) {
      ratingSummary = emptyRatingSummary("Rating summary capture unavailable");
      warnings.push(`Rating summary: ${friendlyError(error)}`);
    }

    try {
      customersSay = captureCustomersSay();
    } catch (error) {
      customersSay = {
        status: "Customers say capture unavailable",
        summary: "Customers say capture unavailable",
        topics: []
      };
      warnings.push(`Customers say: ${friendlyError(error)}`);
    }

    if (includeProductDetails) {
      try {
        productDetails = captureProductDetails();
      } catch (error) {
        productDetails = {
          ...emptyProductDetails(true),
          status: "Product details capture unavailable"
        };
        warnings.push(`Product details: ${friendlyError(error)}`);
      }
    }

    return {
      capturedAt: new Date().toISOString(),
      sourceUrl: location.href,
      marketplace: captureMarketplace(),
      brand,
      ratingSummary,
      customersSay,
      productDetails,
      warnings
    };
  }

  function captureRatingSummary() {
    const ratingText = cleanText(
      document.querySelector("#acrPopover")?.getAttribute("title")
      || document.querySelector('[data-hook="rating-out-of-text"]')?.textContent
      || document.querySelector("#averageCustomerReviews .a-icon-alt")?.textContent
    );
    const overallStarRating = ratingText.match(/(\d+(?:[.,]\d+)?)/)?.[1]?.replace(",", ".") || "";
    const countRoot = document.querySelector("#acrCustomerReviewText");
    const countText = countRoot?.getAttribute("aria-label") || countRoot?.textContent || "";
    const totalRatingCount = numberFromText(countText.match(/\d[\d.,\s]*/)?.[0]);
    const percentages = {
      five_star_percentage: "",
      four_star_percentage: "",
      three_star_percentage: "",
      two_star_percentage: "",
      one_star_percentage: ""
    };

    Array.from(document.querySelectorAll(
      '#histogramTable a[href*="filterByStar="], #histogramTable [data-hook*="histogram"]'
    )).forEach((row) => {
      const href = row.getAttribute("href") || "";
      const filter = href.match(/[?&]filterByStar=(five|four|three|two|one)_star/i)?.[1]?.toLowerCase();
      if (!filter) return;

      const percentage = Number(
        row.querySelector('[role="progressbar"]')?.getAttribute("aria-valuenow")
        || row.getAttribute("aria-label")?.match(/(\d+(?:[.,]\d+)?)\s*(?:percent|prozent|%)/i)?.[1]?.replace(",", ".")
      );
      if (Number.isFinite(percentage)) percentages[`${filter}_star_percentage`] = percentage;
    });

    const captured = Boolean(
      overallStarRating
      || totalRatingCount != null
      || Object.values(percentages).some((value) => value !== "")
    );

    return {
      status: captured ? "Captured available rating summary" : "Rating summary not available",
      overall_star_rating: overallStarRating,
      total_rating_count: totalRatingCount ?? "",
      ...percentages
    };
  }

  function emptyRatingSummary(status = "Rating summary not available") {
    return {
      status,
      overall_star_rating: "",
      total_rating_count: "",
      five_star_percentage: "",
      four_star_percentage: "",
      three_star_percentage: "",
      two_star_percentage: "",
      one_star_percentage: ""
    };
  }

  function captureCustomersSay() {
    const root = findCustomersSayRoot();
    if (!root) {
      return {
        status: NO_CUSTOMERS_SAY,
        summary: NO_CUSTOMERS_SAY,
        topics: []
      };
    }

    const summary = cleanText(root.querySelector('[data-testid="overall-summary"]')?.textContent)
      || "Customers say section exists, but its summary was not available.";
    const topicButtons = Array.from(root.querySelectorAll('[data-testid="aspect-list"] button'));
    const panels = Array.from(root.querySelectorAll('[data-testid^="bottomsheet-content-"]'));
    const panelsByKey = new Map(panels.map((panel) => [
      normalizeKey(String(panel.getAttribute("data-testid") || "").replace(/^bottomsheet-content-/i, "")),
      panel
    ]));

    const topics = topicButtons.map((button, index) => {
      const labelText = cleanText(
        button.querySelector('[data-testid="aspect-label"]')?.textContent
        || button.textContent
      );
      const labelMatch = labelText.match(/^(.*?)(?:\s*\(([\d.,]+)\))?$/);
      const name = cleanText(labelMatch?.[1]);
      const panel = panelsByKey.get(normalizeKey(name)) || panels[index] || null;
      const mentionsText = cleanText(panel?.querySelector('[data-testid="mentions-inline"]')?.textContent);
      const sentimentTestId = button.querySelector('[data-testid^="aspect-icon-"]')
        ?.getAttribute("data-testid") || "";

      return {
        name,
        mention_count: numberFromText(labelMatch?.[2])
          || numberFromPatterns(mentionsText, [
            /([\d.,]+)\s+customers?\s+mention/i,
            /([\d.,]+)\s+kunden?\s+(?:erwähn|nenn)/i
          ]),
        sentiment: sentimentTestId.replace(/^aspect-icon-/i, "") || "not specified",
        positive_count: numberFromPatterns(mentionsText, [
          /([\d.,]+)\s+positive/i,
          /([\d.,]+)\s+positiv/i
        ]),
        negative_count: numberFromPatterns(mentionsText, [
          /([\d.,]+)\s+negative/i,
          /([\d.,]+)\s+negativ/i
        ]),
        summary: cleanText(panel?.querySelector('[data-testid="aspect-summary"]')?.textContent),
        review_excerpts: captureTopicExcerpts(panel)
      };
    }).filter((topic) => topic.name);

    return {
      status: "Captured",
      summary,
      topics
    };
  }

  function findCustomersSayRoot() {
    const stableRoot = document.querySelector('[data-csa-c-slot-id="cr-product-insights-detail-page"]');
    if (stableRoot) return stableRoot;

    const heading = Array.from(document.querySelectorAll('[data-testid="heading"], h2, h3, h4'))
      .find((element) => [
        "customers say",
        "kunden sagen",
        "das sagen kunden"
      ].includes(cleanText(element.textContent).toLowerCase()));
    return heading?.closest('[data-csa-c-type="slot"], .celwidget') || heading?.parentElement || null;
  }

  function captureTopicExcerpts(panel) {
    if (!panel) return [];

    const excerpts = Array.from(panel.querySelectorAll('[data-testid="read-more"]'))
      .slice(0, 10)
      .map((link) => {
        const reviewUrl = toAbsoluteUrl(link.getAttribute("href"));
        return {
          review_id: reviewUrl.match(/\/customer-reviews\/([A-Z0-9]+)/i)?.[1] || "",
          review_url: reviewUrl,
          excerpt: cleanText(link.parentElement?.textContent)
            .replace(/\s*(?:Read more|Weiterlesen|Mehr lesen)\s*$/i, "")
        };
      })
      .filter((item) => item.excerpt);

    return uniqueBy(excerpts, (item) => item.review_url || item.excerpt);
  }

  function captureProductDetails() {
    const title = cleanText(document.querySelector("#productTitle")?.textContent);
    const boughtPastMonth = firstText([
      "#social-proofing-faceout-title-tk_bought",
      "#pqv-bought-in-last-month"
    ]);
    const price = firstText([
      "#corePrice_feature_div .apex-pricetopay-value .a-offscreen",
      "#corePrice_feature_div .priceToPay .a-offscreen",
      "#corePrice_feature_div .apexPriceToPay .a-offscreen",
      "#corePriceDisplay_desktop_feature_div .a-price .a-offscreen",
      "#price_inside_buybox",
      "#newBuyBoxPrice"
    ]);
    const attributes = extractTablePairs("#productOverview_feature_div tr");
    const aboutThisItem = uniqueStrings(
      Array.from(document.querySelectorAll("#feature-bullets li"))
        .map((item) => elementText(item))
        .filter((text) => text && !/^(?:see more|mehr anzeigen)$/i.test(text))
    );
    const productInformation = uniquePairs([
      ...extractTablePairs([
        "#productDetails_feature_div table tr",
        "#productDetails_techSpec_section_1 tr",
        "#productDetails_detailBullets_sections1 tr"
      ].join(", ")),
      ...extractLegacyDetailPairs()
    ]);
    const productImages = captureProductImages();
    const hasAnyDetails = Boolean(
      title
      || boughtPastMonth
      || price
      || attributes.length
      || aboutThisItem.length
      || productInformation.length
      || productImages.length
    );

    return {
      status: hasAnyDetails ? "Captured available fields" : "No product details were available",
      title: title || "Not available",
      bought_past_month: boughtPastMonth || "Not available",
      price: price || "Not available",
      attributes,
      about_this_item: aboutThisItem,
      product_information: productInformation,
      product_images: productImages
    };
  }

  function captureProductBrand() {
    const directBrand = firstText([
      "#productOverview_feature_div .po-brand .po-break-word",
      "#productOverview_feature_div tr.po-brand td:last-child"
    ]);
    const productPairs = [
      ...extractTablePairs("#productOverview_feature_div tr"),
      ...extractTablePairs([
        "#productDetails_feature_div table tr",
        "#productDetails_techSpec_section_1 tr",
        "#productDetails_detailBullets_sections1 tr"
      ].join(", ")),
      ...extractLegacyDetailPairs()
    ];
    const pairedBrand = productPairs.find(({ label }) => (
      /^(?:brand|brand name|marke|markenname)$/i.test(cleanText(label))
    ))?.value;
    const bylineBrand = document.querySelector("#bylineInfo")?.textContent;

    return normalizeBrand(directBrand || pairedBrand || bylineBrand);
  }

  function normalizeBrand(value) {
    const brand = cleanText(value)
      .replace(/^(?:brand|brand name|marke|markenname)\s*:\s*/i, "")
      .replace(/^(?:visit the|besuche den|besuchen sie den)\s+/i, "")
      .replace(/(?:\s+store|-store)$/i, "")
      .trim();

    return /^(?:not available|nicht verf(?:u|ü)gbar)$/i.test(brand) ? "" : brand;
  }

  function captureProductImages() {
    const gallerySelectors = [
      "#landingImage",
      "#imgTagWrapperId img",
      "#main-image-container img",
      "#imageBlock_feature_div .a-dynamic-image"
    ];
    const thumbnailSelectors = [
      "#altImages img",
      "#imageBlock_feature_div .imageThumbnail img"
    ];
    const urls = [];

    collectImageUrls(gallerySelectors, urls);
    let normalizedUrls = uniqueStrings(urls.map(normalizeProductImageUrl).filter(Boolean));
    if (normalizedUrls.length <= 1) {
      collectImageUrls(thumbnailSelectors, urls);
      normalizedUrls = uniqueStrings(urls.map(normalizeProductImageUrl).filter(Boolean));
    }
    return normalizedUrls;
  }

  function collectImageUrls(selectors, urls) {
    const images = uniqueBy(
      selectors.flatMap((selector) => Array.from(document.querySelectorAll(selector))),
      (image) => image
    );

    images.forEach((image) => {
      addDynamicImageUrls(urls, image.getAttribute("data-a-dynamic-image"));
      [
        image.getAttribute("data-old-hires"),
        image.getAttribute("data-a-hires"),
        image.currentSrc,
        image.getAttribute("src"),
        image.getAttribute("data-src")
      ].forEach((url) => {
        if (url) urls.push(url);
      });
    });
  }

  function addDynamicImageUrls(urls, rawValue) {
    if (!rawValue) return;

    try {
      const parsed = JSON.parse(rawValue);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return;
      Object.keys(parsed).forEach((url) => urls.push(url));
    } catch {
      // Other image attributes can still provide usable URLs.
    }
  }

  function normalizeProductImageUrl(value) {
    try {
      const url = new URL(value, location.origin);
      if (!/^https?:$/i.test(url.protocol)) return "";
      if (!/(?:^|\.)media-amazon\.com$/i.test(url.hostname)
        && !/(?:^|\.)ssl-images-amazon\.com$/i.test(url.hostname)) return "";
      if (!/\/images\/I\//i.test(url.pathname) || /play-button/i.test(url.pathname)) return "";
      url.pathname = url.pathname.replace(/\._[^/]+_(?=\.[a-z0-9]+$)/i, "");
      return url.href;
    } catch {
      return "";
    }
  }

  function extractTablePairs(selector) {
    return Array.from(document.querySelectorAll(selector)).map((row) => {
      const cells = Array.from(row.querySelectorAll("th, td"));
      if (cells.length < 2) return null;

      const label = elementText(cells[0]).replace(/\s*:\s*$/, "");
      const value = cells.slice(1).map(elementText).filter(Boolean).join(" ");
      return label && value ? { label, value } : null;
    }).filter(Boolean);
  }

  function extractLegacyDetailPairs() {
    return Array.from(document.querySelectorAll("#detailBullets_feature_div li")).map((item) => {
      const labelElement = item.querySelector(".a-text-bold");
      const label = elementText(labelElement).replace(/\s*:\s*$/, "");
      if (!label) return null;

      const clone = item.cloneNode(true);
      clone.querySelectorAll("script, style, noscript, .a-text-bold").forEach((element) => element.remove());
      const value = cleanText(clone.textContent).replace(/^:\s*/, "");
      return value ? { label, value } : null;
    }).filter(Boolean);
  }

  function emptyProductDetails(requested) {
    return {
      status: requested ? "No product details were available" : "Not requested",
      title: "",
      bought_past_month: "",
      price: "",
      attributes: [],
      about_this_item: [],
      product_information: [],
      product_images: []
    };
  }

  function captureMarketplace() {
    const hostname = location.hostname.toLowerCase();
    const marketplaceDomain = hostname === "amazon.de" || hostname.endsWith(".amazon.de")
      ? "amazon.de"
      : "amazon.com";
    const localeMatch = location.pathname.match(/^\/-\/([a-z]{2}(?:-[a-z]{2})?)(?:\/|$)/i);
    const reviewLink = Array.from(document.querySelectorAll(
      'a[href*="/portal/customer-reviews/"], a[href*="/product-reviews/"]'
    )).map((link) => link.href).find(Boolean);
    let reviewPathPrefix = "";

    try {
      const reviewUrl = reviewLink ? new URL(reviewLink, location.origin) : null;
      const reviewLocale = reviewUrl?.pathname.match(
        /^\/-\/([a-z]{2}(?:-[a-z]{2})?)(?:\/|$)/i
      );
      if (reviewLocale) reviewPathPrefix = `/-/${reviewLocale[1].toLowerCase()}`;
    } catch {
      reviewPathPrefix = "";
    }

    const documentLanguage = cleanText(document.documentElement.lang).toLowerCase();
    const pageLanguage = (
      reviewPathPrefix.match(/^\/-\/([a-z]{2})/i)?.[1]
      || localeMatch?.[1]
      || documentLanguage.match(/^[a-z]{2}/)?.[0]
      || ""
    ).toLowerCase();

    return {
      marketplaceDomain,
      marketplaceCountry: marketplaceDomain === "amazon.de" ? "DE" : "US",
      pageLanguage,
      reviewPathPrefix
    };
  }

  function firstText(selectors) {
    for (const selector of selectors) {
      const values = Array.from(document.querySelectorAll(selector)).map(elementText).filter(Boolean);
      if (values.length) return values[0];
    }
    return "";
  }

  function elementText(element) {
    if (!element) return "";
    const clone = element.cloneNode(true);
    clone.querySelectorAll("script, style, noscript").forEach((child) => child.remove());
    return cleanText(clone.textContent);
  }

  function uniquePairs(pairs) {
    return uniqueBy(pairs, (pair) => `${pair.label.toLowerCase()}|${pair.value.toLowerCase()}`);
  }

  function uniqueStrings(values) {
    return Array.from(new Set(values));
  }

  function uniqueBy(values, getKey) {
    const seen = new Set();
    return values.filter((value) => {
      const key = getKey(value);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function numberFromPattern(value, pattern) {
    return numberFromText(String(value || "").match(pattern)?.[1]);
  }

  function numberFromPatterns(value, patterns) {
    for (const pattern of patterns) {
      const result = numberFromPattern(value, pattern);
      if (result != null) return result;
    }
    return null;
  }

  function numberFromText(value) {
    if (!value) return null;
    const parsed = Number(String(value).replace(/[.,\s]/g, ""));
    return Number.isFinite(parsed) ? parsed : null;
  }

  function normalizeKey(value) {
    return cleanText(value).toLowerCase();
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
    return String(value || "")
      .replace(/[\u200e\u200f]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function friendlyError(error) {
    return error?.message || "Unknown capture error";
  }
})();
