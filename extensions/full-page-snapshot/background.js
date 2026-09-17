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
const MAX_CAPTURE_SOURCE_DIMENSION = 16000;
const HARD_CAPTURE_SOURCE_DIMENSION = 16384;
let captureInProgress = false;

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "capture-full-page") return false;

  if (captureInProgress) {
    sendResponse({ ok: false, error: "A snapshot is already in progress. Please wait for it to finish." });
    return false;
  }
  captureInProgress = true;
  captureFullPageSnapshot(message.includeMobile === true)
    .then((result) => sendResponse({ ok: true, ...result }))
    .catch((error) => sendResponse({ ok: false, error: toFriendlyError(error) }))
    .finally(() => { captureInProgress = false; });

  return true;
});

async function captureFullPageSnapshot(includeMobile = false) {
  const [tab] = await queryTabs({ active: true, currentWindow: true });
  if (!tab?.id) throw new Error("Could not find the active tab.");
  assertCapturableTab(tab);

  const debuggee = { tabId: tab.id };
  let isAttached = false;
  let mobileOverrideAttempted = false;
  const filename = buildSnapshotFilename(tab);
  let result;
  const cleanupErrors = [];
  try {
    await executeScript({ target: { tabId: tab.id }, func: rememberCaptureScroll });
    await attachDebugger(debuggee);
    isAttached = true;
    await sendCommand(debuggee, "Page.enable");
    const desktop = await captureSnapshotMode(debuggee, includeMobile
      ? filename.replace(/\.png$/, "-desktop.png") : filename);
    result = desktop;
    if (!includeMobile) return result;
    if (desktop.cleanupError) return { ...desktop, mobileError: "The desktop layout could not be restored. Refresh the page and try again." };

    try {
      mobileOverrideAttempted = true;
      await sendCommand(debuggee, "Emulation.setDeviceMetricsOverride", {
        width: 390, height: 844, deviceScaleFactor: 1, mobile: true,
        screenWidth: 390, screenHeight: 844
      });
      await executeScript({ target: { tabId: tab.id }, func: settleCaptureViewport });
      const mobile = await captureSnapshotMode(debuggee, filename.replace(/\.png$/, "-mobile.png"));
      result = { ...desktop, mobile };
      return result;
    } catch (error) {
      result = { ...desktop, mobileError: toFriendlyError(error) };
      return result;
    }
  } finally {
    if (mobileOverrideAttempted) {
      await sendCommand(debuggee, "Emulation.clearDeviceMetricsOverride")
        .catch(error => cleanupErrors.push(toFriendlyError(error)));
    }
    if (isAttached) await detachDebugger(debuggee)
      .catch(error => cleanupErrors.push(toFriendlyError(error)));
    await executeScript({ target: { tabId: tab.id }, func: restoreInitialCaptureScroll })
      .catch(error => cleanupErrors.push(toFriendlyError(error)));
    if (result && cleanupErrors.length) result.cleanupError = cleanupErrors.join(" ");
  }
}

async function captureSnapshotMode(debuggee, filename) {
  let scrollState;
  let result;
  try {
    await executeScript({ target: { tabId: debuggee.tabId }, func: prepareCaptureLayout });
    scrollState = await preScrollPageForLazyContent(debuggee.tabId);
    await scrollPageToTopForCapture(debuggee.tabId);
    await executeScript({ target: { tabId: debuggee.tabId }, func: prepareCaptureOverlays });
    const metrics = await sendCommand(debuggee, "Page.getLayoutMetrics");
    const pageSize = getPageSize(metrics, scrollState);
    const { imageDataUrl, width, height } = await capturePageImage(debuggee, pageSize);
    await downloadFile({ url: imageDataUrl, filename, conflictAction: "uniquify", saveAs: false });
    result = { filename, width, height, cropped: width < pageSize.width || height < pageSize.height,
      scrolled: scrollState?.scrolled || false };
    return result;
  } finally {
    if (scrollState) await restorePageScroll(debuggee.tabId, scrollState).catch(() => {});
    try {
      await executeScript({ target: { tabId: debuggee.tabId }, func: restoreCaptureLayout });
    } catch (error) {
      if (result) result.cleanupError = toFriendlyError(error);
      else throw error;
    }
  }
}

function rememberCaptureScroll() {
  globalThis.__fullPageSnapshotInitialScroll = {
    x: window.scrollX, y: window.scrollY,
    elements: Array.from(document.querySelectorAll("body *"))
      .filter(element => element.scrollLeft || element.scrollTop)
      .map(element => ({ element, x: element.scrollLeft, y: element.scrollTop }))
  };
}

async function settleCaptureViewport() {
  await new Promise(resolve => setTimeout(resolve, 300));
}

async function restoreInitialCaptureScroll() {
  const state = globalThis.__fullPageSnapshotInitialScroll;
  if (!state) return;
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    for (const { element, x, y } of state.elements) {
      if (element.isConnected) element.scrollTo({ left: x, top: y, behavior: "instant" });
    }
    window.scrollTo({ left: state.x, top: state.y, behavior: "instant" });
  } finally {
    delete globalThis.__fullPageSnapshotInitialScroll;
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

  return { width, height };
}

async function capturePageImage(debuggee, pageSize) {
  if (typeof OffscreenCanvas === "undefined" || typeof createImageBitmap === "undefined") {
    throw new Error("Chrome does not support preparing screenshots in this extension context.");
  }

  let canvas;
  let context;
  let size;
  let viewport;
  for (let y = 0; !size || y < size.height; y += viewport.height) {
    for (let x = 0; !size || x < size.width; x += viewport.width) {
      const [result] = await executeScript({
        target: { tabId: debuggee.tabId },
        func: scrollToCapturePosition,
        args: [x, y]
      });
      const position = result.result;
      if (!viewport) viewport = { width: position.width, height: position.height };
      if (position.width !== viewport.width || position.height !== viewport.height) {
        throw new Error("The browser window changed size during capture. Keep it the same size and try again.");
      }
      let offsetX = x - position.x;
      let offsetY = y - position.y;
      if (offsetX < -1 || offsetY < -1 || offsetX >= viewport.width || offsetY >= viewport.height) {
        throw new Error("The page stopped scrolling during capture. Close any open page dialogs and try again.");
      }
      offsetX = Math.max(0, offsetX);
      offsetY = Math.max(0, offsetY);
      // No clip or beyond-viewport capture: those commands resize Chrome's
      // rendering surface and can return repeated viewports on affected pages.
      const screenshot = await sendCommand(debuggee, "Page.captureScreenshot", {
        format: "png", fromSurface: true, captureBeyondViewport: false
      });
      if (!screenshot?.data) throw new Error("Chrome did not return screenshot data.");
      const bitmap = await screenshotToBitmap(screenshot);
      try {
        const scale = assertUniformScale(bitmap, viewport.width, viewport.height);
        if (!size) {
          const geometry = getSafeCaptureGeometry(pageSize, scale);
          size = { width: geometry.width, height: geometry.height };
          canvas = new OffscreenCanvas(size.width, size.height);
          context = canvas.getContext("2d");
          if (!context) throw new Error("Chrome could not create the screenshot canvas.");
          context.fillStyle = "#ffffff";
          context.fillRect(0, 0, size.width, size.height);
        }
        const width = Math.min(viewport.width, size.width - x);
        const height = Math.min(viewport.height, size.height - y);
        if (offsetX + width > viewport.width + 1 || offsetY + height > viewport.height + 1) {
          throw new Error("The page stopped scrolling during capture. Close any open page dialogs and try again.");
        }
        context.drawImage(bitmap, offsetX * scale.width, offsetY * scale.height,
          width * scale.width, height * scale.height, x, y, width, height);
      } finally {
        bitmap.close();
      }
    }
  }
  const blob = await canvas.convertToBlob({ type: "image/png" });
  return { imageDataUrl: `data:image/png;base64,${await blobToBase64(blob)}`, ...size };
}

async function scrollToCapturePosition(x, y) {
  const state = globalThis.__fullPageSnapshotLayout;
  if (state) {
    for (const { element } of state.fixedElements) {
      if (x || y) element.style.setProperty("visibility", "hidden", "important");
    }
  }
  window.scrollTo({ left: x, top: y, behavior: "instant" });
  // A timer also completes when Chrome pauses requestAnimationFrame in a hidden tab.
  await new Promise(resolve => setTimeout(resolve, 200));
  return { x: window.scrollX, y: window.scrollY, width: window.innerWidth, height: window.innerHeight };
}

function getSafeCaptureGeometry(pageSize, outputScale) {
  const width = Math.min(
    pageSize.width,
    MAX_CAPTURE_WIDTH,
    Math.floor(MAX_CAPTURE_SOURCE_DIMENSION / outputScale.width)
  );
  const height = Math.min(pageSize.height, MAX_CAPTURE_HEIGHT);
  const maxSafeClipHeight = Math.max(
    1,
    Math.floor(MAX_CAPTURE_SOURCE_DIMENSION / outputScale.height)
  );

  return { width, height, maxSafeClipHeight };
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

async function blobToBase64(blob) {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let binary = "";

  for (let index = 0; index < bytes.length; index += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
  }

  return btoa(binary);
}

// Runs in Chrome's isolated extension world; DOM references stay in the tab.
function prepareCaptureLayout() {
  const state = { x: window.scrollX, y: window.scrollY, elements: [], fixedElements: [] };
  globalThis.__fullPageSnapshotLayout = state;
  const root = document.documentElement;
  const viewportHeight = window.innerHeight;
  if (root.scrollHeight > viewportHeight + 4) return;

  let scroller = document.querySelector("main, [role='main']");
  while (scroller && scroller !== document.body) {
    const rect = scroller.getBoundingClientRect();
    const style = getComputedStyle(scroller);
    if (
      /^(auto|scroll)$/.test(style.overflowY) &&
      scroller.scrollHeight > scroller.clientHeight + 4 &&
      rect.width >= window.innerWidth * 0.75 &&
      rect.height >= viewportHeight * 0.75 &&
      rect.top < viewportHeight * 0.25 && rect.bottom > viewportHeight * 0.75
    ) break;
    scroller = scroller.parentElement;
  }
  if (!scroller || scroller === document.body) return;

  for (let element = scroller; element; element = element.parentElement) {
    const properties = ["height", "max-height", "overflow-x", "overflow-y", "scroll-behavior"];
    state.elements.push({
      element,
      x: element.scrollLeft,
      y: element.scrollTop,
      hadStyle: element.hasAttribute("style"),
      properties: properties.map(name => ({ name, value: element.style.getPropertyValue(name),
        priority: element.style.getPropertyPriority(name) }))
    });
    element.style.setProperty("height", "auto", "important");
    element.style.setProperty("max-height", "none", "important");
    element.style.setProperty("overflow-x", "visible", "important");
    element.style.setProperty("overflow-y", "visible", "important");
    element.style.setProperty("scroll-behavior", "auto", "important");
  }
}

function prepareCaptureOverlays() {
  const state = globalThis.__fullPageSnapshotLayout;
  if (!state) return;
  for (const element of document.querySelectorAll("body *")) {
    const position = getComputedStyle(element).position;
    if (position !== "fixed" && position !== "sticky") continue;
    if (!element.getClientRects().length) continue;
    const names = position === "sticky" ? ["position", "top", "right", "bottom", "left"] : ["visibility"];
    const item = { element, hadStyle: element.hasAttribute("style"),
      properties: names.map(name => ({ name, value: element.style.getPropertyValue(name),
        priority: element.style.getPropertyPriority(name) })) };
    state.elements.push(item);
    if (position === "sticky") {
      element.style.setProperty("position", "relative", "important");
      for (const name of names.slice(1)) element.style.setProperty(name, "auto", "important");
    } else state.fixedElements.push(item);
  }
}

function restoreCaptureLayout() {
  const state = globalThis.__fullPageSnapshotLayout;
  if (!state) return;
  try {
    for (const { element, properties, hadStyle } of state.elements) {
      for (const { name, value, priority } of properties) {
        if (value) element.style.setProperty(name, value, priority);
        else element.style.removeProperty(name);
      }
    }
    // Restore positions only after the containers have their original dimensions.
    for (const { element, x, y } of state.elements) {
      if (x !== undefined) element.scrollTo({ left: x, top: y, behavior: "instant" });
    }
    window.scrollTo({ left: state.x, top: state.y, behavior: "instant" });
    for (const { element, hadStyle } of state.elements) {
      if (!hadStyle && !element.style.length) element.removeAttribute("style");
    }
  } finally {
    delete globalThis.__fullPageSnapshotLayout;
  }
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
      window.scrollTo({ left: 0, top: 0, behavior: "instant" });
      await new Promise(resolve => setTimeout(resolve, 100));
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

    await wait(100);
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
