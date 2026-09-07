const captureButton = document.querySelector("#captureButton");
const statusEl = document.querySelector("#status");

captureButton.addEventListener("click", handleCapture);

async function handleCapture() {
  setBusy(true);
  setStatus("Preparing page and capturing...");

  try {
    const result = await chrome.runtime.sendMessage({ type: "capture-full-page" });

    if (!result?.ok) {
      throw new Error(result?.error || "Snapshot failed.");
    }

    setStatus(`Saved ${result.width} x ${result.height} PNG.`);
  } catch (error) {
    setStatus(error.message || "Snapshot failed.", true);
  } finally {
    setBusy(false);
  }
}

function setBusy(isBusy) {
  captureButton.disabled = isBusy;
  captureButton.setAttribute("aria-busy", String(isBusy));
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
}
