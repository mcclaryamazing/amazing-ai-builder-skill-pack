# Full Page Snapshot

A local Chrome extension that saves a full-page PNG snapshot of the active tab.

It uses Chrome's extension `debugger` permission to capture visible viewport sections with the Chrome DevTools Protocol `Page.captureScreenshot` command, then stitches those sections into one PNG. It scrolls to each section instead of asking Chrome to resize its rendering surface for an offscreen capture.

Before the screenshot, the extension scrolls the page to the bottom in steps so lazy-loaded sections have a chance to render. When the main content lives inside a viewport-sized scrolling container, such as Shopify's page wrapper, it temporarily expands that container for capture. After success or failure, it restores the original layout and scroll position. Sticky elements stay in their natural document position during capture; fixed overlays appear only in the first section.

## Install

1. Open `chrome://extensions`.
2. Turn on `Developer mode`.
3. Click `Load unpacked`.
4. Select `<clone-folder>/extensions/full-page-snapshot`.

## Use with a local AI agent

Codex, Claude Code, or local desktop ChatGPT Work can help you install this
extension and interpret its output. The extension runs in Chrome; it is not an
Agent Skill and does not provide the agent's Chrome browser-control connection.
Enable that connection separately if the workflow needs it.

Load the extension in the Chrome profile you will use for the target page. A
separate agent browser session or in-app browser does not automatically contain
this extension or share that profile's sign-in. If the agent cannot operate
`chrome://extensions`, the toolbar popup, or the folder picker, have it give you
the exact folder and guide the necessary clicks; do not assume these browser
controls are available to the agent.

Attach the downloaded PNG to the AI task, or put it in a workspace folder
the local agent can read. Ask it to confirm it can open the image before
reviewing the page.

## Use

1. Open a normal website tab.
2. Click the Full Page Snapshot toolbar icon.
3. Optionally enable **Also capture mobile** to save both desktop and phone layouts. It starts off each time you open the popup.
4. Click `Capture Full Page`.

Snapshots are downloaded as PNG files under `full-page-snapshots/`. Keep the tab selected and avoid scrolling or resizing the browser until capture finishes.

When mobile capture is enabled, the extension saves the desktop PNG first, then temporarily uses a 390 x 844 phone viewport and saves a second PNG. The files share a timestamp and end in `-desktop.png` and `-mobile.png`. It restores the desktop viewport and original scroll positions afterward. If mobile capture fails, the desktop PNG remains saved.

This captures the site's responsive layout in Chrome; it does not reload the page, change its user agent, or reproduce Safari or a separate server-side mobile site. Pages without a mobile viewport declaration may retain a wider layout. Both captures use the same size limits.

## Notes

- Chrome will show a temporary debugging notice while the capture runs.
- Chrome blocks this on protected pages such as `chrome://` pages, the Chrome Web Store, extension pages, and some PDF viewer pages.
- Close DevTools for the target tab before capturing. Another active debugger, including a browser-control connection that uses this attachment, can also prevent capture. If Chrome reports that a debugger is already attached, release that connection through its supported controls before capturing, then reconnect afterward. Do not move, scroll, or resize the target tab during capture.
- The output is capped at 20,000 CSS pixels tall. Width is capped at the smaller of 16,384 CSS pixels and 16,000 divided by Chrome's measured screenshot scale (rounded down): 16,000 CSS pixels at 1x or 8,000 at 2x. Viewport images are checked against the 16,384-pixel raster boundary and normalized to CSS-pixel dimensions before stitching.
- Oversized pages still save a PNG containing the largest supported area from the top-left, without shrinking the page. The popup reports the saved dimensions and explains that the image is partial. Content beyond the right or bottom capture edge is omitted.
- If the page blocks or snaps scrolling so a section cannot be captured, the extension reports an error instead of saving repeated sections or gaps. Very large or animation-heavy pages can still fail or change while capture runs.
- Nested-scroller support targets the main content and its viewport-sized ancestor container. Independently scrolling side panels, cross-origin frames, and custom virtualized content are not expanded.
- Infinite-scroll pages may keep loading more content. The extension stops its pre-capture scroll after a safety limit so it does not run forever.
