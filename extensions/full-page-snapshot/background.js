const DEBUGGER_PROTOCOL_VERSION = "1.3";
const MAX_FILENAME_SEGMENT_LENGTH = 80;
const LAZY_SCROLL_OPTIONS = {
  bottomSettleMs: 900,
  maxDurationMs: 90000,
  maxSteps: 140,
  minStepPx: 700,
  settleMs: 400,
  stableBottomPasses: 4,
  stepViewportRatio: 0.85
};
const MAX_CAPTURE_WIDTH = 16384;
const MAX_CAPTURE_HEIGHT = 20000;
const MAX_SINGLE_CAPTURE_HEIGHT = 16384;
const MAX_CAPTURE_SOURCE_DIMENSION = 16000;
const HARD_CAPTURE_SOURCE_DIMENSION = 16384;
const MAX_CAPTURE_TILE_HEIGHT = 8192;
const SCALE_PROBE_DIMENSION = 512;

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "capture-full-page") return false;

  captureFullPageSnapshot()
    .then((result) => sendResponse({ ok: true, ...result }))
    .catch((error) => sendResponse({ ok: false, error: toFriendlyError(error) }));

  return true;
});

async function captureFullPageSnapshot() {
  const [tab] = await queryTabs({ active: true, currentWindow: true });

  if (!tab?.id) {
    throw new Error("Could not find the active tab.");
  }

  assertCapturableTab(tab);

  const debuggee = { tabId: tab.id };
  let isAttached = false;
  let scrollState = null;

  try {
    scrollState = await preScrollPageForLazyContent(tab.id);
    await scrollPageToTopForCapture(tab.id);

    await attachDebugger(debuggee);
    isAttached = true;

    await sendCommand(debuggee, "Page.enable");
    const metrics = await sendCommand(debuggee, "Page.getLayoutMetrics");
    const pageSize = getPageSize(metrics, scrollState);

    const imageDataUrl = await capturePageImage(debuggee, pageSize);

    const filename = buildSnapshotFilename(tab);

    await downloadFile({
      url: imageDataUrl,
      filename,
      conflictAction: "uniquify",
      saveAs: false
    });

    return {
      filename,
      width: pageSize.width,
      height: pageSize.height,
      scrolled: scrollState?.scrolled || false
    };
  } finally {
    if (isAttached) {
      await detachDebugger(debuggee).catch(() => {});
    }

    if (scrollState) {
      await restorePageScroll(tab.id, scrollState).catch(() => {});
    }
  }
}

function assertCapturableTab(tab) {
  const url = tab.url || "";

  if (!/^https?:\/\//i.test(url) && !/^file:\/\//i.test(url)) {
    throw new Error("Chrome blocks snapshots on this kind of page. Try a normal website tab.");
  }
}

function getPageSize(metrics, scrollState) {
  const contentSize = metrics.cssContentSize || metrics.contentSize || {};
  const viewport = metrics.cssLayoutViewport || metrics.layoutViewport || {};

  const width = Math.ceil(Math.max(
    contentSize.width || 0,
    viewport.clientWidth || 0,
    scrollState?.scrollWidth || 0
  ));
  const height = Math.ceil(Math.max(
    contentSize.height || 0,
    viewport.clientHeight || 0,
    scrollState?.scrollHeight || 0
  ));

  if (!width || !height) {
    throw new Error("Could not read the page size.");
  }

  if (width > MAX_CAPTURE_WIDTH || height > MAX_CAPTURE_HEIGHT) {
    throw new Error(`Page is too large to capture (${width} x ${height}).`);
  }

  return { width, height };
}

async function capturePageImage(debuggee, pageSize) {
  if (typeof OffscreenCanvas === "undefined" || typeof createImageBitmap === "undefined") {
    throw new Error("Chrome does not support preparing screenshots in this extension context.");
  }

  const outputScale = await measureScreenshotScale(debuggee, pageSize);
  const { maxSafeClipHeight } = getSafeCaptureGeometry(pageSize, outputScale);

  const canCaptureDirectly =
    pageSize.height <= MAX_SINGLE_CAPTURE_HEIGHT &&
    pageSize.height <= maxSafeClipHeight &&
    Math.abs(outputScale.width - 1) < 0.001 &&
    Math.abs(outputScale.height - 1) < 0.001;

  if (canCaptureDirectly) {
    const screenshot = await capturePageTile(debuggee, {
      height: pageSize.height,
      width: pageSize.width,
      y: 0
    });

    return `data:image/png;base64,${screenshot.data}`;
  }

  const canvas = new OffscreenCanvas(pageSize.width, pageSize.height);
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Chrome could not create the long screenshot canvas.");
  }

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, pageSize.width, pageSize.height);

  const tileHeight = pageSize.height <= maxSafeClipHeight
    ? pageSize.height
    : Math.min(MAX_CAPTURE_TILE_HEIGHT, maxSafeClipHeight);

  for (let y = 0; y < pageSize.height; y += tileHeight) {
    const height = Math.min(tileHeight, pageSize.height - y);
    const screenshot = await capturePageTile(debuggee, {
      height,
      width: pageSize.width,
      y
    });
    const bitmap = await screenshotToBitmap(screenshot);

    try {
      assertUniformScale(bitmap, pageSize.width, height);

      context.drawImage(
        bitmap,
        0,
        0,
        bitmap.width,
        bitmap.height,
        0,
        y,
        pageSize.width,
        height
      );
    } finally {
      bitmap.close();
    }
  }

  const blob = await canvas.convertToBlob({ type: "image/png" });
  return `data:image/png;base64,${await blobToBase64(blob)}`;
}

function getSafeCaptureGeometry(pageSize, outputScale) {
  const sourceWidth = Math.ceil(pageSize.width * outputScale.width);
  const maxSafeClipHeight = Math.max(
    1,
    Math.floor(MAX_CAPTURE_SOURCE_DIMENSION / outputScale.height)
  );

  if (sourceWidth > MAX_CAPTURE_SOURCE_DIMENSION) {
    throw new Error(`Page is too wide to capture safely at Chrome's current scale (${pageSize.width} CSS pixels at ${outputScale.width.toFixed(2)}x).`);
  }

  return { maxSafeClipHeight };
}

async function measureScreenshotScale(debuggee, pageSize) {
  const width = Math.min(SCALE_PROBE_DIMENSION, pageSize.width);
  const height = Math.min(SCALE_PROBE_DIMENSION, pageSize.height);
  const screenshot = await capturePageTile(debuggee, { height, width, y: 0 });
  const bitmap = await screenshotToBitmap(screenshot);

  try {
    return assertUniformScale(bitmap, width, height);
  } finally {
    bitmap.close();
  }
}

async function screenshotToBitmap(screenshot) {
  const response = await fetch(`data:image/png;base64,${screenshot.data}`);
  return createImageBitmap(await response.blob());
}

function assertUniformScale(bitmap, requestedWidth, requestedHeight) {
  if (
    bitmap.width > HARD_CAPTURE_SOURCE_DIMENSION ||
    bitmap.height > HARD_CAPTURE_SOURCE_DIMENSION
  ) {
    throw new Error(`Chrome returned an oversized screenshot tile (${bitmap.width} x ${bitmap.height}).`);
  }

  const width = bitmap.width / requestedWidth;
  const height = bitmap.height / requestedHeight;

  if (!width || !height || Math.abs(width - height) > 0.01) {
    throw new Error(`Chrome returned a distorted screenshot tile (${bitmap.width} x ${bitmap.height}).`);
  }

  return { width, height };
}

async function capturePageTile(debuggee, { height, width, y }) {
  const screenshot = await sendCommand(debuggee, "Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: true,
    clip: {
      x: 0,
      y,
      width,
      height,
      scale: 1
    }
  });

  if (!screenshot?.data) {
    throw new Error("Chrome did not return screenshot data.");
  }

  return screenshot;
}

async function blobToBase64(blob) {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let binary = "";

  for (let index = 0; index < bytes.length; index += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
  }

  return btoa(binary);
}

async function preScrollPageForLazyContent(tabId) {
  const [result] = await executeScript({
    target: { tabId },
    func: scrollPageToBottomForLazyContent,
    args: [LAZY_SCROLL_OPTIONS]
  });

  if (!result?.result) {
    throw new Error("Could not prepare the page for capture.");
  }

  return result.result;
}

async function restorePageScroll(tabId, scrollState) {
  await executeScript({
    target: { tabId },
    func: ({ x, y }) => {
      window.scrollTo({ left: x, top: y, behavior: "auto" });
    },
    args: [{ x: scrollState.originalX, y: scrollState.originalY }]
  });
}

async function scrollPageToTopForCapture(tabId) {
  await executeScript({
    target: { tabId },
    func: async () => {
      window.scrollTo({ left: 0, top: 0, behavior: "auto" });
      await new Promise((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(resolve));
      });
    }
  });
}

async function scrollPageToBottomForLazyContent(options) {
  const originalX = window.scrollX;
  const originalY = window.scrollY;
  const startTime = Date.now();
  let steps = 0;
  let stablePasses = 0;
  let lastScrollHeight = getScrollHeight();

  while (steps < options.maxSteps && Date.now() - startTime < options.maxDurationMs) {
    const viewportHeight = getViewportHeight();
    const maxY = Math.max(0, getScrollHeight() - viewportHeight);

    if (window.scrollY >= maxY - 4) {
      await wait(options.settleMs);

      const nextScrollHeight = getScrollHeight();
      if (nextScrollHeight <= lastScrollHeight + 4) {
        stablePasses += 1;
        if (stablePasses >= options.stableBottomPasses) break;
      } else {
        stablePasses = 0;
      }

      lastScrollHeight = nextScrollHeight;
      continue;
    }

    stablePasses = 0;
    const step = Math.max(
      options.minStepPx,
      Math.round(viewportHeight * options.stepViewportRatio)
    );

    window.scrollTo({
      left: originalX,
      top: Math.min(window.scrollY + step, maxY),
      behavior: "auto"
    });

    await wait(options.settleMs);
    lastScrollHeight = Math.max(lastScrollHeight, getScrollHeight());
    steps += 1;
  }

  window.scrollTo({
    left: originalX,
    top: Math.max(0, getScrollHeight() - getViewportHeight()),
    behavior: "auto"
  });

  await waitForLazyRendering(options.bottomSettleMs);

  return {
    originalX,
    originalY,
    finalY: window.scrollY,
    scrollHeight: getScrollHeight(),
    scrollWidth: getScrollWidth(),
    scrolled: Math.abs(window.scrollY - originalY) > 4,
    timedOut: Date.now() - startTime >= options.maxDurationMs
  };

  function getViewportHeight() {
    return window.innerHeight || document.documentElement.clientHeight || 0;
  }

  function getScrollHeight() {
    const doc = document.documentElement;
    const body = document.body;

    return Math.max(
      doc?.scrollHeight || 0,
      doc?.offsetHeight || 0,
      doc?.clientHeight || 0,
      body?.scrollHeight || 0,
      body?.offsetHeight || 0,
      body?.clientHeight || 0
    );
  }

  function getScrollWidth() {
    const doc = document.documentElement;
    const body = document.body;

    return Math.max(
      doc?.scrollWidth || 0,
      doc?.offsetWidth || 0,
      doc?.clientWidth || 0,
      body?.scrollWidth || 0,
      body?.offsetWidth || 0,
      body?.clientWidth || 0
    );
  }

  async function waitForLazyRendering(ms) {
    await wait(ms);

    if (document.fonts?.ready) {
      await Promise.race([
        document.fonts.ready,
        wait(1500)
      ]).catch(() => {});
    }

    const pendingImages = Array.from(document.images || []).filter((image) => !image.complete);
    if (pendingImages.length) {
      await Promise.race([
        Promise.allSettled(pendingImages.map((image) => new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        }))),
        wait(3000)
      ]);
    }

    await new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(resolve));
    });
  }

  function wait(ms) {
    return new Promise((resolve) => {
      window.setTimeout(resolve, ms);
    });
  }
}

function buildSnapshotFilename(tab) {
  const title = sanitizeFilenameSegment(tab.title || new URL(tab.url).hostname || "page");
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

  return `full-page-snapshots/${title}-${timestamp}.png`;
}

function sanitizeFilenameSegment(value) {
  const cleaned = value
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^-+|-+$/g, "");

  return (cleaned || "page").slice(0, MAX_FILENAME_SEGMENT_LENGTH);
}

function queryTabs(queryInfo) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query(queryInfo, (tabs) => {
      const error = chrome.runtime.lastError;
      if (error) {
        reject(new Error(error.message));
        return;
      }

      resolve(tabs);
    });
  });
}

function executeScript(options) {
  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript(options, (results) => {
      const error = chrome.runtime.lastError;
      if (error) {
        reject(new Error(error.message));
        return;
      }

      resolve(results);
    });
  });
}

function attachDebugger(debuggee) {
  return new Promise((resolve, reject) => {
    chrome.debugger.attach(debuggee, DEBUGGER_PROTOCOL_VERSION, () => {
      const error = chrome.runtime.lastError;
      if (error) {
        reject(new Error(error.message));
        return;
      }

      resolve();
    });
  });
}

function detachDebugger(debuggee) {
  return new Promise((resolve, reject) => {
    chrome.debugger.detach(debuggee, () => {
      const error = chrome.runtime.lastError;
      if (error) {
        reject(new Error(error.message));
        return;
      }

      resolve();
    });
  });
}

function sendCommand(debuggee, command, params) {
  return new Promise((resolve, reject) => {
    chrome.debugger.sendCommand(debuggee, command, params || {}, (result) => {
      const error = chrome.runtime.lastError;
      if (error) {
        reject(new Error(error.message));
        return;
      }

      resolve(result);
    });
  });
}

function downloadFile(options) {
  return new Promise((resolve, reject) => {
    chrome.downloads.download(options, (downloadId) => {
      const error = chrome.runtime.lastError;
      if (error) {
        reject(new Error(error.message));
        return;
      }

      resolve(downloadId);
    });
  });
}

function toFriendlyError(error) {
  const message = error?.message || "Snapshot failed.";

  if (/another debugger/i.test(message) || /attached/i.test(message)) {
    return "Chrome could not attach the DevTools capture tool. Close DevTools for this tab and try again.";
  }

  if (/Cannot access|Cannot attach|No tab with given id/i.test(message)) {
    return "Chrome blocked access to this tab. Try a normal website tab.";
  }

  if (/Cannot access contents|extensions gallery|scripting/i.test(message)) {
    return "Chrome blocked the pre-capture scroll on this tab. Try a normal website tab.";
  }

  return message;
}
