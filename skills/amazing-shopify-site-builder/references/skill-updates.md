# Check and update this installed skill

At the start of each use, before substantive work, make one bounded GitHub update check. A nested repeat of the same skill in the current task does not need another check. The installed VERSION is the package version; do not infer versions from timestamps. A failed check is not proof the installed version is current.

## Source and baseline

Read `.skill-install.json` when present. It records the installation repository, stable skill key, package path, immutable commit and source file hashes. This receipt describes provenance, not permission to trust a new repository or overwrite files. Use the source established during installation or confirmed by the user; never silently switch between Amazing Copilot, the standalone Ad Creator repository or another distribution merely because access fails. Inspect the actual skill directory and supported discovery mechanism.

If the receipt is missing, establish the original source from installer records or its enclosing Git checkout. If that is unknown, ask which repository supplied the skill. Verify an existing installation against its actual source revision before recording a baseline; never bless locally modified contents as a pristine baseline. Older installations require a one-time update to acquire this mechanism.

A canonical maintainer workspace is source code, not an installed copy to auto-replace. Check its upstream/version when available, report divergence and use that repository's normal maintenance and release process. Preserve uncommitted edits. Do not automatically replace an authoritative live source or Git working tree with a downloaded distribution.

## Check

Run the bundled `scripts/skill_updates.py --help`, then use its check command with the actual skill directory, verified repository and stable skill key. The root `skill-releases.json` at that repository maps the key to the current name, VERSION and package path. Use the immutable commit returned by the helper for the entire update; do not mix files from changing main revisions. Keep GitHub credentials in the existing authorized credential tools and never display them.

- Current: continue the requested task without an approval interruption.
- Update available, same name, verified unmodified baseline: automatically install the complete updated package, briefly report the version change, reread its instructions and continue.
- Renamed package: tell the member the old and new names and versions. Ask, "This skill is now called <new name>. May I update it and rename your installed skill from <old name> to <new name>?" Wait for yes before changing names. A generic request to check/update skills is not rename approval. Honor an explicit approval of that exact rename already given in this task; do not ask twice. If declined, leave the installation intact and continue with it where possible.
- Local modifications or conflicting destination: preserve both versions, explain the actual differences and ask before overwriting or merging member changes. Do not silently discard customization, auto-downgrade, or overwrite a different skill.
- Local-ahead version or inconsistent release metadata: do not downgrade or replace it; report the discrepancy and keep the installed package.
- Missing source/baseline or unverifiable package: resolve provenance or ask for the needed input before replacement. Do not claim an unverified copy is safe to overwrite.
- Network/authentication unavailable: briefly say the latest version could not be verified, continue using the installed skill if usable, and do not retry repeatedly or ask for secrets in chat.

## Apply and verify

Fetch only the verified repository package at the check's pinned commit, with existing authorized GitHub access. Preserve exact source bytes: use the GitHub archive/API or a checkout with automatic line-ending conversion disabled, rather than a Windows clone that rewrites line endings. Inspect the proposed version, source and intended file changes. Stage the complete package outside every active discovery directory, including its references, scripts, assets and metadata. Reject path traversal, symlinks or files escaping that package. Keep unrelated data and persistent preferences outside the replacement scope; Ad Creator intentionally retains its existing meta-ads-generator preferences/creative-recipes storage and repository URL.

Keep a recoverable backup outside discovery. Check completeness, relative references, frontmatter name, VERSION and package hashes. Apply the verified package to its intended installation location, then use the helper's `record` command to verify it against that same remote commit and write `.skill-install.json`. The receipt is local installation metadata; never distribute it or embed credentials. On a failed update restore the previously working copy and report the failure. Verify actual discovery/readability before retiring an old name. If verification needs a fresh turn or reload, keep the backup and report that verification is pending rather than claiming success. Do not leave two callable versions after a successful rename.

After an approved rename, update relevant active project references, preserving historical records and unrelated work. Report the final version/name and any required fresh task. This update step authorizes skill maintenance only: it does not authorize store changes, ad publication, paid image generation, new app permissions or application deployment.
