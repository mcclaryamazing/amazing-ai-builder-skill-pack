# Chrome Extension Packages

These ZIP files contain self-contained Chrome extensions for local installation.
Their runtime files were packaged from the clean `main` branch of the
`chrome-extensions` source repository at commit
`65212a009295ca59a3596aefb1f6738656b082b6` on July 30, 2026. Repo-internal
`deploy.md` files are excluded, and the packaged README install paths are
normalized for use from any extracted location.

## Packages

| Extension | Package | Version | SHA-256 |
|---|---|---:|---|
| Product Review Intelligence | [product-review-intelligence-v1.8.2.zip](product-review-intelligence-v1.8.2.zip) | 1.8.2 | `7F1F3B8D9840D20AFBFF20B92444F0DF4515379EC4C9F01159C59D7BF443CFF9` |
| Full Page Snapshot | [full-page-snapshot-v1.0.0.zip](full-page-snapshot-v1.0.0.zip) | 1.0.0 | `1B65448E7938880B45B94BB74E5519918E3624C1DB72E49740896F34D250652F` |

## Install

1. Extract the ZIP file to a permanent local folder.
2. Open `chrome://extensions`.
3. Turn on **Developer mode**.
4. Click **Load unpacked**.
5. For Product Review Intelligence, select the extracted `review-expander`
   folder.
6. For Full Page Snapshot, select the extracted `full-page-snapshot` folder.

Chrome loads the extracted folder, not the ZIP file itself. Keep that folder in
place after installation.

## Product Review Intelligence

Product Review Intelligence works on supported Amazon product and review pages.
It uses the active user's Amazon session and does not contain credentials,
seller IDs, account configuration, or captured review data.

Chrome permissions:

- `downloads` to save the generated research archive
- `storage` and `unlimitedStorage` to retain an in-progress multi-pass export
- `tabs` to open and coordinate the selected Amazon review view
- host access limited to Amazon.com and Amazon.de

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

## Verification

To verify a downloaded package in PowerShell:

```powershell
Get-FileHash -Algorithm SHA256 .\product-review-intelligence-v1.8.2.zip
Get-FileHash -Algorithm SHA256 .\full-page-snapshot-v1.0.0.zip
```

Compare the resulting hashes with the package table above.
