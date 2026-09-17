const captureButton = document.querySelector("#captureButton");
const mobileToggle = document.querySelector("#includeMobile");
const statusEl = document.querySelector("#status");

captureButton.addEventListener("click", handleCapture);

async function handleCapture() {
  const includeMobile = mobileToggle.checked;
  setBusy(true);
  setStatus(includeMobile ? "Capturing desktop, then mobile..." : "Preparing page and capturing...");

  try {
    const result = await chrome.runtime.sendMessage({ type: "capture-full-page", includeMobile });

    if (!result?.ok) {
      throw new Error(result?.error || "Snapshot failed.");
    }

    if (result.mobileError) {
      setStatus(`Desktop saved (${result.width} x ${result.height}). Mobile capture failed: ${result.mobileError}`, true);
    } else if (result.mobile) {
      const partial = [result.cropped && "Desktop", result.mobile.cropped && "Mobile"].filter(Boolean);
      setStatus(`Saved desktop ${result.width} x ${result.height} and mobile ${result.mobile.width} x ${result.mobile.height} PNGs.` +
        (partial.length ? ` ${partial.join(" and ")} reached the capture limit; the supported area was saved.` : ""));
    } else {
      setStatus(result.cropped
        ? `Saved ${result.width} x ${result.height} PNG. This page exceeds the capture limit, so the image includes the largest supported area from the top-left.`
        : `Saved ${result.width} x ${result.height} PNG.`);
    }
    const cleanupError = result.cleanupError || result.mobile?.cleanupError;
    if (cleanupError) setStatus(`${statusEl.textContent} The page could not be fully restored. Refresh it before continuing. ${cleanupError}`, true);
  } catch (error) {
    setStatus(error.message || "Snapshot failed.", true);
  } finally {
    setBusy(false);
  }
}

function setBusy(isBusy) {
  captureButton.disabled = isBusy;
  mobileToggle.disabled = isBusy;
  captureButton.setAttribute("aria-busy", String(isBusy));
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
}
