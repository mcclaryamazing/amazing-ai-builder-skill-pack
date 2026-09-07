const MARKETPLACES = Object.freeze({
  "amazon.com": Object.freeze({
    origin: "https://www.amazon.com",
    country: "US"
  }),
  "amazon.de": Object.freeze({
    origin: "https://www.amazon.de",
    country: "DE"
  })
});
const DEFAULT_FILTERS = {
  sortBy: "both",
  reviewerType: "all_reviews",
  filterByStar: "all_stars",
  mediaType: "all_contents"
};
const ALLOWED_FILTERS = {
  sortBy: new Set(["helpful", "recent", "both"]),
  reviewerType: new Set(["all_reviews", "avp_only_reviews"]),
  filterByStar: new Set([
    "all_stars",
    "five_star",
    "four_star",
    "three_star",
    "two_star",
    "one_star",
    "positive",
    "critical",
    "full_monty"
  ]),
  mediaType: new Set(["all_contents", "media_reviews_only"])
};
const PRODUCT_IMAGE_MAX_EDGE = 1200;
const PRODUCT_IMAGE_JPEG_QUALITY = 0.78;
const PRODUCT_IMAGE_FETCH_TIMEOUT_MS = 15000;
const PRODUCT_IMAGE_CONCURRENCY = 3;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "start-amazon-review-export") {
    launchExport(message.asin, message.filters, message.productPageData, message.marketplace)
      .then((result) => sendResponse({ ok: true, ...result }))
      .catch((error) => sendResponse({ ok: false, error: friendlyError(error) }));
    return true;
  }

  if (message?.type === "amazon-review-export-progress") {
    chrome.storage.local.set({
      amazonReviewExportState: {
        ...message.state,
        tabId: sender.tab?.id || null,
        updatedAt: new Date().toISOString()
      }
    }).catch(() => {});
    sendResponse({ ok: true });
    return false;
  }

  if (message?.type === "amazon-review-export-download") {
    saveZipDownload(message.files, message.filename, sender.tab?.id, message.productImageUrls)
      .then((result) => sendResponse({ ok: true, ...result }))
      .catch((error) => sendResponse({ ok: false, error: friendlyError(error) }));
    return true;
  }

  return false;
});

async function launchExport(rawAsin, rawFilters, rawProductPageData, rawMarketplace) {
  const asin = String(rawAsin || "").trim().toUpperCase();
  if (!/^[A-Z0-9]{10}$/.test(asin)) {
    throw new Error("The product ASIN was not valid.");
  }

  const filters = validateFilters(rawFilters);
  const isBothSorts = filters.sortBy === "both";
  const isFullMonty = filters.filterByStar === "full_monty";
  const sessionId = createSessionId();
  const productPageData = normalizeProductPageData(rawProductPageData);
  const marketplace = normalizeMarketplace(rawMarketplace, productPageData);
  const productDataKey = getProductDataKey(sessionId);
  const url = new URL(
    `${marketplace.origin}${marketplace.reviewPathPrefix}/portal/customer-reviews/${asin}/ref=cm_cr_dp_d_show_all_top`
  );
  url.searchParams.set("_encoding", "UTF8");
  url.searchParams.set("ie", "UTF8");
  url.searchParams.set("sortBy", isBothSorts ? "recent" : filters.sortBy);
  url.searchParams.set("reviewerType", filters.reviewerType);
  url.searchParams.set("filterByStar", isFullMonty ? "five_star" : filters.filterByStar);
  url.searchParams.set("mediaType", filters.mediaType);
  url.searchParams.set("amazonReviewExporter", "1");
  url.searchParams.set("reviewExpanderSession", sessionId);
  url.searchParams.set("reviewExpanderMarketplace", marketplace.domain);
  if (marketplace.pageLanguage) {
    url.searchParams.set("reviewExpanderLanguage", marketplace.pageLanguage);
  }

  if (isFullMonty) {
    url.searchParams.set("reviewExpanderMode", "full_monty");
    url.searchParams.set("reviewExpanderSortMode", filters.sortBy);
    url.searchParams.set("reviewExpanderPassIndex", "0");
  } else if (isBothSorts) {
    url.searchParams.set("reviewExpanderMode", "both");
    url.searchParams.set("reviewExpanderPass", "recent");
  }

  await chrome.storage.local.set({
    [productDataKey]: {
      ...productPageData,
      marketplace
    }
  });

  let tab;
  try {
    tab = await chrome.tabs.create({ url: url.href, active: true });
  } catch (error) {
    await chrome.storage.local.remove(productDataKey).catch(() => {});
    throw error;
  }

  if (!tab?.id) {
    await chrome.storage.local.remove(productDataKey).catch(() => {});
    throw new Error("Chrome did not create the reviews tab.");
  }

  await chrome.storage.local.set({
    amazonReviewExportState: {
      asin,
      filters,
      marketplace,
      sessionId,
      phase: "opening",
      tabId: tab.id,
      updatedAt: new Date().toISOString()
    }
  });

  return { asin, filters, marketplace, tabId: tab.id };
}

function normalizeMarketplace(rawMarketplace, productPageData) {
  const sourceMarketplace = productPageData?.marketplace || {};
  const sourceUrl = parseAmazonUrl(productPageData?.sourceUrl);
  const domain = String(
    rawMarketplace?.marketplaceDomain
      || rawMarketplace?.domain
      || sourceMarketplace.marketplaceDomain
      || sourceMarketplace.domain
      || sourceUrl?.marketplaceDomain
      || ""
  ).toLowerCase();
  const config = MARKETPLACES[domain];

  if (!config) {
    throw new Error("Open an Amazon.com or Amazon.de product page before starting the export.");
  }

  const explicitPrefix = normalizeReviewPathPrefix(
    rawMarketplace?.reviewPathPrefix
      || sourceMarketplace.reviewPathPrefix
      || sourceUrl?.reviewPathPrefix
      || ""
  );
  const pageLanguage = normalizeLanguage(
    rawMarketplace?.pageLanguage
      || sourceMarketplace.pageLanguage
      || sourceUrl?.pageLanguage
      || ""
  );
  const reviewPathPrefix = domain === "amazon.de"
    ? explicitPrefix || (pageLanguage ? `/-/${pageLanguage}` : "")
    : "";

  return {
    domain,
    country: config.country,
    origin: config.origin,
    pageLanguage,
    reviewPathPrefix
  };
}

function parseAmazonUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    const hostname = url.hostname.toLowerCase();
    const marketplaceDomain = Object.keys(MARKETPLACES)
      .find((domain) => hostname === domain || hostname.endsWith(`.${domain}`));
    if (!marketplaceDomain) return null;

    const localeMatch = url.pathname.match(/^\/-\/([a-z]{2}(?:-[a-z]{2})?)(?:\/|$)/i);
    return {
      marketplaceDomain,
      pageLanguage: normalizeLanguage(localeMatch?.[1] || ""),
      reviewPathPrefix: localeMatch ? `/-/${localeMatch[1].toLowerCase()}` : ""
    };
  } catch {
    return null;
  }
}

function normalizeReviewPathPrefix(value) {
  const match = String(value || "").match(/^\/-\/([a-z]{2}(?:-[a-z]{2})?)$/i);
  return match ? `/-/${match[1].toLowerCase()}` : "";
}

function normalizeLanguage(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .match(/^[a-z]{2}/)?.[0] || "";
}

function getProductDataKey(sessionId) {
  return `reviewExpanderProductData:${sessionId}`;
}

function normalizeProductPageData(rawProductPageData) {
  const fallback = {
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
      status: "Not requested",
      title: "",
      bought_past_month: "",
      price: "",
      attributes: [],
      about_this_item: [],
      product_information: [],
      product_images: []
    },
    warnings: ["Product-page information was not supplied; review collection continued."]
  };

  try {
    const serialized = JSON.stringify(rawProductPageData);
    if (!serialized || serialized.length > 750000) return fallback;
    const parsed = JSON.parse(serialized);
    return parsed && typeof parsed === "object" ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function createSessionId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

function validateFilters(rawFilters) {
  return Object.fromEntries(
    Object.entries(DEFAULT_FILTERS).map(([name, defaultValue]) => {
      const candidate = String(rawFilters?.[name] || "");
      return [name, ALLOWED_FILTERS[name].has(candidate) ? candidate : defaultValue];
    })
  );
}

async function saveZipDownload(rawFiles, filename, tabId, rawProductImageUrls = []) {
  if (!Array.isArray(rawFiles) || !rawFiles.length) {
    throw new Error("No export files were available to download.");
  }

  const files = rawFiles.map((file) => {
    if (typeof file?.content !== "string") {
      throw new Error("An export file did not contain valid text.");
    }

    return {
      path: sanitizeZipPath(file.path),
      content: file.content
    };
  });
  const zipRoot = files[0].path.split("/")[0];
  const productImages = await buildProductImageFiles(rawProductImageUrls, zipRoot);
  files.push(...productImages.files);
  const safeFilename = sanitizeFilename(filename || "amazon-review-export.zip");
  const zipBytes = createStoredZip(files);
  const url = `data:application/zip;base64,${bytesToBase64(zipBytes)}`;
  const downloadId = await chrome.downloads.download({
    url,
    filename: `amazon-review-exports/${safeFilename}`,
    conflictAction: "uniquify",
    saveAs: false
  });

  await chrome.storage.local.set({
    amazonReviewExportState: {
      phase: "complete",
      tabId: tabId || null,
      filename: safeFilename,
      productImagesDownloaded: productImages.downloaded,
      productImagesFailed: productImages.failed,
      updatedAt: new Date().toISOString()
    }
  });

  return {
    downloadId,
    productImagesDownloaded: productImages.downloaded,
    productImagesFailed: productImages.failed
  };
}

async function buildProductImageFiles(rawUrls, zipRoot) {
  const urls = Array.isArray(rawUrls)
    ? Array.from(new Set(rawUrls.map((value) => String(value || "").trim()).filter(Boolean)))
    : [];
  if (!urls.length) return { files: [], downloaded: 0, failed: 0 };

  const results = [];
  for (let offset = 0; offset < urls.length; offset += PRODUCT_IMAGE_CONCURRENCY) {
    const batch = urls.slice(offset, offset + PRODUCT_IMAGE_CONCURRENCY);
    results.push(...await Promise.all(batch.map((url, index) => (
      downloadProductImage(url, offset + index + 1, zipRoot)
    ))));
  }

  const files = results.flatMap((result) => result.file ? [result.file] : []);
  const manifest = [
    ["sequence", "file", "source_url", "width", "height", "bytes", "status"],
    ...results.map((result) => [
      result.sequence,
      result.file?.path || "",
      result.sourceUrl,
      result.width || "",
      result.height || "",
      result.file?.content?.length || "",
      result.status
    ])
  ].map((row) => row.map(csvCell).join(",")).join("\r\n");
  files.push({
    path: `${zipRoot}/images/product/manifest.csv`,
    content: `\uFEFF${manifest}\r\n`
  });

  return {
    files,
    downloaded: results.filter((result) => result.file).length,
    failed: results.filter((result) => !result.file).length
  };
}

async function downloadProductImage(rawUrl, sequence, zipRoot) {
  const sourceUrl = allowedProductImageUrl(rawUrl);
  if (!sourceUrl) {
    return {
      sequence,
      sourceUrl: String(rawUrl || ""),
      status: "Skipped: URL is not an approved Amazon image host"
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PRODUCT_IMAGE_FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(sourceUrl, {
      credentials: "omit",
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const sourceBlob = await response.blob();
    const bitmap = await createImageBitmap(sourceBlob);
    try {
      const scale = Math.min(1, PRODUCT_IMAGE_MAX_EDGE / Math.max(bitmap.width, bitmap.height));
      const width = Math.max(1, Math.round(bitmap.width * scale));
      const height = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = new OffscreenCanvas(width, height);
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Image canvas was unavailable");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, height);
      context.drawImage(bitmap, 0, 0, width, height);
      const jpeg = await canvas.convertToBlob({
        type: "image/jpeg",
        quality: PRODUCT_IMAGE_JPEG_QUALITY
      });
      const label = sequence === 1 ? "primary" : "gallery";
      return {
        sequence,
        sourceUrl,
        width,
        height,
        status: "Downloaded",
        file: {
          path: `${zipRoot}/images/product/${String(sequence).padStart(2, "0")}-${label}.jpg`,
          content: new Uint8Array(await jpeg.arrayBuffer())
        }
      };
    } finally {
      bitmap.close();
    }
  } catch (error) {
    const reason = error?.name === "AbortError" ? "Timed out" : friendlyError(error);
    return {
      sequence,
      sourceUrl,
      status: `Failed: ${reason}`
    };
  } finally {
    clearTimeout(timeout);
  }
}

function allowedProductImageUrl(value) {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    if (url.protocol !== "https:") return "";
    if (hostname !== "media-amazon.com" && !hostname.endsWith(".media-amazon.com")
      && hostname !== "ssl-images-amazon.com" && !hostname.endsWith(".ssl-images-amazon.com")) {
      return "";
    }
    if (!/\/images\/I\//i.test(url.pathname) || /play-button/i.test(url.pathname)) return "";
    return url.href;
  } catch {
    return "";
  }
}

function csvCell(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function createStoredZip(files, modifiedAt = new Date()) {
  if (files.length > 65535) throw new Error("The export contained too many files.");

  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  const { dosDate, dosTime } = toDosDateTime(modifiedAt);
  let localOffset = 0;

  files.forEach((file) => {
    const nameBytes = encoder.encode(file.path);
    const dataBytes = typeof file.content === "string"
      ? encoder.encode(file.content)
      : file.content;
    if (!(dataBytes instanceof Uint8Array)) {
      throw new Error("An export file did not contain valid text or binary data.");
    }
    const checksum = crc32(dataBytes);
    const local = new Uint8Array(30 + nameBytes.length + dataBytes.length);
    const localView = new DataView(local.buffer);

    localView.setUint32(0, 0x04034b50, true);
    localView.setUint16(4, 20, true);
    localView.setUint16(6, 0x0800, true);
    localView.setUint16(8, 0, true);
    localView.setUint16(10, dosTime, true);
    localView.setUint16(12, dosDate, true);
    localView.setUint32(14, checksum, true);
    localView.setUint32(18, dataBytes.length, true);
    localView.setUint32(22, dataBytes.length, true);
    localView.setUint16(26, nameBytes.length, true);
    localView.setUint16(28, 0, true);
    local.set(nameBytes, 30);
    local.set(dataBytes, 30 + nameBytes.length);
    localParts.push(local);

    const central = new Uint8Array(46 + nameBytes.length);
    const centralView = new DataView(central.buffer);
    centralView.setUint32(0, 0x02014b50, true);
    centralView.setUint16(4, 20, true);
    centralView.setUint16(6, 20, true);
    centralView.setUint16(8, 0x0800, true);
    centralView.setUint16(10, 0, true);
    centralView.setUint16(12, dosTime, true);
    centralView.setUint16(14, dosDate, true);
    centralView.setUint32(16, checksum, true);
    centralView.setUint32(20, dataBytes.length, true);
    centralView.setUint32(24, dataBytes.length, true);
    centralView.setUint16(28, nameBytes.length, true);
    centralView.setUint16(30, 0, true);
    centralView.setUint16(32, 0, true);
    centralView.setUint16(34, 0, true);
    centralView.setUint16(36, 0, true);
    centralView.setUint32(38, 0, true);
    centralView.setUint32(42, localOffset, true);
    central.set(nameBytes, 46);
    centralParts.push(central);

    localOffset += local.length;
  });

  const centralDirectory = concatBytes(centralParts);
  const end = new Uint8Array(22);
  const endView = new DataView(end.buffer);
  endView.setUint32(0, 0x06054b50, true);
  endView.setUint16(4, 0, true);
  endView.setUint16(6, 0, true);
  endView.setUint16(8, files.length, true);
  endView.setUint16(10, files.length, true);
  endView.setUint32(12, centralDirectory.length, true);
  endView.setUint32(16, localOffset, true);
  endView.setUint16(20, 0, true);

  return concatBytes([...localParts, centralDirectory, end]);
}

function sanitizeZipPath(value) {
  const cleaned = String(value || "")
    .replace(/\\/g, "/")
    .split("/")
    .filter((part) => part && part !== "." && part !== "..")
    .map((part) => part.replace(/[<>:"|?*\u0000-\u001F]/g, "-").trim())
    .filter(Boolean)
    .join("/");

  if (!cleaned) throw new Error("An export file had an invalid path.");
  return cleaned;
}

function concatBytes(parts) {
  const length = parts.reduce((sum, part) => sum + part.length, 0);
  const result = new Uint8Array(length);
  let offset = 0;

  parts.forEach((part) => {
    result.set(part, offset);
    offset += part.length;
  });
  return result;
}

function toDosDateTime(value) {
  const date = value instanceof Date && !Number.isNaN(value.getTime()) ? value : new Date();
  const year = Math.min(2107, Math.max(1980, date.getFullYear()));
  return {
    dosDate: ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate(),
    dosTime: (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2)
  };
}

const CRC32_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let index = 0; index < 256; index += 1) {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) {
      value = (value >>> 1) ^ ((value & 1) ? 0xedb88320 : 0);
    }
    table[index] = value >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let value = 0xffffffff;
  for (const byte of bytes) {
    value = CRC32_TABLE[(value ^ byte) & 0xff] ^ (value >>> 8);
  }
  return (value ^ 0xffffffff) >>> 0;
}

function bytesToBase64(bytes) {
  let binary = "";
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return btoa(binary);
}

function sanitizeFilename(value) {
  const cleaned = String(value)
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "-")
    .replace(/\s+/g, " ")
    .trim();

  return (cleaned || "amazon-review-export.zip").slice(0, 160);
}

function friendlyError(error) {
  const message = error?.message || "The review export failed.";

  return message;
}
