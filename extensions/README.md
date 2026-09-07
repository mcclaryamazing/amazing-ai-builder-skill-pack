# Chrome Extensions

These folders contain self-contained Chrome extensions for local installation.
Their runtime files are promoted from the `chrome-extensions` source repository
and kept aligned with the corresponding extensions distributed through Amazing
Copilot. Member-facing paths remain portable so the repository can be cloned to
any stable local folder.

## Included extensions

| Extension | Folder | Version source |
|---|---|---|
| Product Review Intelligence | [`review-expander`](review-expander) | [`manifest.json`](review-expander/manifest.json) |
| Full Page Snapshot | [`full-page-snapshot`](full-page-snapshot) | [`manifest.json`](full-page-snapshot/manifest.json) |

Each extension's `manifest.json` is the authority for its installed version.

## Install

1. Clone this repository into a permanent local folder.
2. Open `chrome://extensions`.
3. Turn on **Developer mode**.
4. Click **Load unpacked**.
5. For Product Review Intelligence, select
   `<clone-folder>/extensions/review-expander`.
6. For Full Page Snapshot, select
   `<clone-folder>/extensions/full-page-snapshot`.

Chrome loads each extension directly from its folder. Keep the clone in place
after installation.

## Update

Run `git pull --ff-only` in the clean repository clone, open
`chrome://extensions`, and click **Reload** on each installed extension card.
If the clone contains local changes, review them before pulling or replacing
files.

## Product Review Intelligence

Product Review Intelligence works on supported Amazon product and review pages.
It uses the active user's Amazon session and does not contain credentials,
seller IDs, account configuration, or captured review data.

Chrome permissions:

- `downloads` to save the generated research archive
- `storage` and `unlimitedStorage` to retain an in-progress multi-pass export
- `tabs` to open and coordinate the selected Amazon review view
- host access to Amazon.com and Amazon.de product and review pages
- host access to Amazon `media-amazon.com` and `ssl-images-amazon.com` image
  delivery domains for optional listing-gallery downloads

## Full Page Snapshot

Full Page Snapshot captures a full-page PNG from the active tab and downloads it
under `full-page-snapshots/`.

Chrome permissions:

- `activeTab` and `scripting` to work with the page the user selected
- `debugger` to use Chrome's full-page screenshot capability
- `downloads` to save the PNG

Chrome displays a temporary debugging notice while a full-page capture runs.
Protected Chrome pages, the Chrome Web Store, extension pages, and some PDF
viewer pages cannot be captured.

Read each extension's linked README before use for its current behavior,
permissions, and limitations.
