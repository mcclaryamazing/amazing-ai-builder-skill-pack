# Full Page Snapshot

A local Chrome extension that saves a full-page PNG snapshot of the active tab.

It uses Chrome's extension `debugger` permission to call the Chrome DevTools Protocol `Page.captureScreenshot` command with `captureBeyondViewport`, which is the same underlying family of browser tooling used by DevTools screenshot capture.

Before the screenshot, the extension scrolls the page to the bottom in steps so lazy-loaded sections have a chance to render. After the PNG is saved, it restores the tab to the original scroll position.

## Install

1. Open `chrome://extensions`.
2. Turn on `Developer mode`.
3. Click `Load unpacked`.
4. Select `<clone-folder>/extensions/full-page-snapshot`.

## Use

1. Open a normal website tab.
2. Click the Full Page Snapshot toolbar icon.
3. Click `Capture Full Page`.

Snapshots are downloaded as PNG files under `full-page-snapshots/`.

## Notes

- Chrome will show a temporary debugging notice while the capture runs.
- Chrome blocks this on protected pages such as `chrome://` pages, the Chrome Web Store, extension pages, and some PDF viewer pages.
- Close DevTools for the target tab before capturing. Chrome only allows one debugger attachment at a time.
- The extension captures pages up to 16,384 CSS pixels wide and 20,000 CSS pixels tall. It measures Chrome's current output scale, keeps each source tile within Chrome's 16,384-pixel raster boundary, normalizes the tiles to CSS-pixel dimensions, and stitches them into one PNG.
- Very large or animation-heavy pages can fail if Chrome cannot render the full page into one image.
- Infinite-scroll pages may keep loading more content. The extension stops its pre-capture scroll after a safety limit so it does not run forever.
