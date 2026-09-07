const asinEl = document.querySelector("#asin");
const exportButton = document.querySelector("#exportButton");
const pageStateEl = document.querySelector("#pageState");
const statusEl = document.querySelector("#status");
const versionEl = document.querySelector("#version");
const captureProductDetailsEl = document.querySelector("#captureProductDetails");
const filterSelects = {
  sortBy: document.querySelector("#sortBy"),
  reviewerType: document.querySelector("#reviewerType"),
  filterByStar: document.querySelector("#filterByStar"),
  mediaType: document.querySelector("#mediaType")
};
const DEFAULT_FILTERS = {
  sortBy: "both",
  reviewerType: "all_reviews",
  filterByStar: "all_stars",
  mediaType: "all_contents"
};
const ALLOWED_FILTERS = Object.fromEntries(
  Object.entries(filterSelects).map(([name, select]) => [
    name,
    new Set(Array.from(select.options, (option) => option.value))
  ])
);

let activeAsin = null;
let activeTabId = null;
let activeMarketplace = null;

versionEl.textContent = `v${chrome.runtime.getManifest().version}`;
initialize();

exportButton.addEventListener("click", startExport);
Object.values(filterSelects).forEach((select) => {
  select.addEventListener("change", saveFilterPreferences);
});

async function initialize() {
  try {
    const [[tab], stored] = await Promise.all([
      chrome.tabs.query({ active: true, currentWindow: true }),
      chrome.storage.local.get("reviewExpanderFilters")
    ]);
    applyFilters(stored.reviewExpanderFilters);
    activeTabId = tab?.id || null;
    activeMarketplace = getAmazonProductContext(tab?.url || "");
    activeAsin = activeMarketplace?.asin || null;

    if (!activeAsin) {
      setUnavailable("Open an Amazon.com or Amazon.de product or reviews page first.");
      return;
    }

    asinEl.textContent = activeAsin;
    pageStateEl.textContent = "READY";
    pageStateEl.className = "state ready";
    exportButton.disabled = false;
    statusEl.textContent = "";
  } catch (error) {
    setUnavailable(error?.message || "Could not inspect this tab.");
  }
}

async function startExport() {
  if (!activeAsin) return;

  exportButton.disabled = true;
  pageStateEl.textContent = "STARTING";
  pageStateEl.className = "state";
  setStatus(captureProductDetailsEl.checked
    ? "Reading Customers say, product details, and listing images…"
    : "Reading Customers say…");

  try {
    const productPageData = await captureProductPageData(captureProductDetailsEl.checked);
    const isFullMonty = filterSelects.filterByStar.value === "full_monty";
    setStatus(isFullMonty
      ? (filterSelects.sortBy.value === "both"
        ? "Opening Most recent 5-star reviews first; nine passes will follow…"
        : "Opening 5-star reviews first; four passes will follow…")
      : (filterSelects.sortBy.value === "both"
        ? "Opening Most recent first; Top reviews will follow…"
        : "Opening the selected review view…"));
    const result = await chrome.runtime.sendMessage({
      type: "start-amazon-review-export",
      asin: activeAsin,
      filters: getSelectedFilters(),
      productPageData,
      marketplace: {
        ...activeMarketplace,
        ...(productPageData.marketplace || {})
      }
    });

    if (!result?.ok) {
      throw new Error(result?.error || "Could not start the export.");
    }

    setStatus("Collection started in the reviews tab.");
  } catch (error) {
    exportButton.disabled = false;
    pageStateEl.textContent = "ERROR";
    pageStateEl.className = "state error";
    setStatus(error?.message || "Could not start the export.", true);
  }
}

async function captureProductPageData(includeProductDetails) {
  if (!activeTabId) {
    return unavailableProductPageData(includeProductDetails, "The starting tab was unavailable.");
  }

  try {
    const result = await chrome.tabs.sendMessage(activeTabId, {
      type: "review-expander-capture-product-page",
      captureProductDetails: includeProductDetails
    });

    if (result?.ok && result.data) return result.data;
    return unavailableProductPageData(
      includeProductDetails,
      result?.error || "The product-page capture did not return data."
    );
  } catch {
    return unavailableProductPageData(
      includeProductDetails,
      "Product-page information was unavailable; review collection continued."
    );
  }
}

function unavailableProductPageData(includeProductDetails, note) {
  return {
    capturedAt: new Date().toISOString(),
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
      status: includeProductDetails ? "Product details capture unavailable" : "Not requested",
      title: "",
      bought_past_month: "",
      price: "",
      attributes: [],
      about_this_item: [],
      product_information: []
    },
    warnings: [note]
  };
}

function getSelectedFilters() {
  return Object.fromEntries(
    Object.entries(filterSelects).map(([name, select]) => [name, select.value])
  );
}

function applyFilters(savedFilters) {
  Object.entries(filterSelects).forEach(([name, select]) => {
    const savedValue = savedFilters?.[name];
    select.value = ALLOWED_FILTERS[name].has(savedValue)
      ? savedValue
      : DEFAULT_FILTERS[name];
  });
}

async function saveFilterPreferences() {
  await chrome.storage.local.set({
    reviewExpanderFilters: getSelectedFilters()
  });
}

function getAmazonProductContext(rawUrl) {
  try {
    const url = new URL(rawUrl);
    const hostname = url.hostname.toLowerCase();
    const marketplaceDomain = getMarketplaceDomain(hostname);
    if (!marketplaceDomain) return null;

    const match = url.pathname.match(
      /\/(?:dp|gp\/product|gp\/aw\/d|product-reviews|portal\/customer-reviews)\/([a-z0-9]{10})(?:[/?]|$)/i
    );

    if (!match?.[1]) return null;

    const localeMatch = url.pathname.match(/^\/-\/([a-z]{2}(?:-[a-z]{2})?)(?:\/|$)/i);
    return {
      asin: match[1].toUpperCase(),
      marketplaceDomain,
      marketplaceCountry: marketplaceDomain === "amazon.de" ? "DE" : "US",
      pageLanguage: localeMatch?.[1]?.toLowerCase() || "",
      reviewPathPrefix: localeMatch ? `/-/${localeMatch[1].toLowerCase()}` : ""
    };
  } catch {
    return null;
  }
}

function getMarketplaceDomain(hostname) {
  if (hostname === "amazon.com" || hostname.endsWith(".amazon.com")) return "amazon.com";
  if (hostname === "amazon.de" || hostname.endsWith(".amazon.de")) return "amazon.de";
  return "";
}

function setUnavailable(message) {
  activeAsin = null;
  activeMarketplace = null;
  asinEl.textContent = "Not detected";
  pageStateEl.textContent = "NO ASIN";
  pageStateEl.className = "state error";
  exportButton.disabled = true;
  setStatus(message, true);
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
}
