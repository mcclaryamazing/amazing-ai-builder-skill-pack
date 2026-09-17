# Deploy

This extension is local-only and has no hosted deploy target.

## Safety Checks

From the monorepo root:

```powershell
git status --short
```

Review uncommitted work before reloading or packaging the extension. Proceed with current-task changes without another confirmation; ask only about pre-existing, unrelated, or uncertain work.

## Local Install

1. Open `chrome://extensions`.
2. Turn on `Developer mode`.
3. Click `Load unpacked`.
4. Select `<clone-folder>/extensions/full-page-snapshot`.

## Local Reload

1. Open `chrome://extensions`.
2. Find `Full Page Snapshot`.
3. Click the reload button.
4. Test on a normal website tab with **Also capture mobile** off, then on. Confirm the two suffixed PNGs, complete content up to the capture limit, and restoration of the desktop layout and original scroll position.

Select the extension folder, not the repository root.
