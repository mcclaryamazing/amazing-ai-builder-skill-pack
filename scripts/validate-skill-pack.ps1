param(
  [string]$PackRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
)

$ErrorActionPreference = "Stop"
$failed = $false

function Write-Check {
  param([string]$Status, [string]$Message)
  Write-Host ("[{0}] {1}" -f $Status, $Message)
}

function Fail-Check {
  param([string]$Message)
  $script:failed = $true
  Write-Check "fail" $Message
}

$skills = @(
  @{
    Name = "amazing-shopify-chatbot-builder"
    References = @(
      "guided-progress.md",
      "empty-project-scaffold.md",
      "admin-dashboard-control-plane.md",
      "private-real-store-demo.md",
      "shopify-connection.md",
      "widget-install-and-launch.md"
    )
  },
  @{
    Name = "amazing-landing-page-builder"
    References = @(
      "guided-progress.md",
      "dtc-design-package.md",
      "dtc-derived-strategy.md",
      "dtc-archetypes.md",
      "dtc-components.md",
      "dtc-category-packs.md",
      "dtc-visual-copy-system.md",
      "dtc-qa-rubric.md",
      "access-setup.md",
      "shopify-implementation.md",
      "launch-and-rollback.md"
    )
  },
  @{
    Name = "amazing-shopify-site-builder"
    References = @(
      "guided-progress.md",
      "site-strategy-and-architecture.md",
      "access-setup.md",
      "theme-system-and-implementation.md",
      "surface-playbooks.md",
      "launch-and-rollback.md"
    )
  },
  @{
    Name = "amazon-opportunity-explorer"
    References = @(
      "example-validation-report.md"
    )
    Assets = @(
      "icon.svg"
    )
  },
  @{
    Name = "amazing-copywriter"
    References = @(
      "consumer-brand-copywriting-framework.md"
    )
  }
)

$extensions = @(
  @{
    Name = "review-expander"
    DisplayName = "Product Review Intelligence"
  },
  @{
    Name = "full-page-snapshot"
    DisplayName = "Full Page Snapshot"
  }
)

$requiredFiles = @(
  "README.md",
  "INSTALL-CODEX.md",
  "START-HERE.md",
  "SKILL-PACK-GUIDE.md",
  "TROUBLESHOOTING.md",
  "VERSION.md",
  "extensions/README.md"
)

foreach ($skill in $skills) {
  $requiredFiles += "skills/$($skill.Name)/SKILL.md"
  $requiredFiles += "skills/$($skill.Name)/agents/openai.yaml"
  foreach ($reference in $skill.References) {
    $requiredFiles += "skills/$($skill.Name)/references/$reference"
  }
  foreach ($asset in $skill.Assets) {
    $requiredFiles += "skills/$($skill.Name)/assets/$asset"
  }
}

foreach ($extension in $extensions) {
  foreach ($file in @("README.md", "deploy.md", "manifest.json")) {
    $requiredFiles += "extensions/$($extension.Name)/$file"
  }
}

foreach ($file in $requiredFiles) {
  $path = Join-Path $PackRoot $file
  if (Test-Path -LiteralPath $path -PathType Leaf) {
    Write-Check "ok" ("found {0}" -f $file)
  } else {
    Fail-Check ("missing {0}" -f $file)
  }
}

foreach ($extension in $extensions) {
  $extensionRoot = Join-Path $PackRoot "extensions/$($extension.Name)"
  $manifestPath = Join-Path $extensionRoot "manifest.json"
  if (-not (Test-Path -LiteralPath $manifestPath -PathType Leaf)) {
    continue
  }

  try {
    $manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json
  } catch {
    Fail-Check ("invalid manifest JSON for {0}" -f $extension.Name)
    continue
  }

  if ($manifest.manifest_version -ne 3) {
    Fail-Check ("{0} is not a Manifest V3 extension" -f $extension.Name)
  } elseif ($manifest.name -ne $extension.DisplayName) {
    Fail-Check ("unexpected display name for {0}" -f $extension.Name)
  } elseif ([string]$manifest.version -notmatch "^[0-9]+(?:\.[0-9]+){0,3}$") {
    Fail-Check ("invalid numeric manifest version for {0}" -f $extension.Name)
  } else {
    Write-Check "ok" ("valid unpacked extension {0} {1}" -f $extension.Name, $manifest.version)
  }

  $manifestReferences = @(
    $manifest.background.service_worker,
    $manifest.action.default_popup
  )
  if ($manifest.icons) {
    $manifestReferences += $manifest.icons.PSObject.Properties.Value
  }
  if ($manifest.action.default_icon) {
    $manifestReferences += $manifest.action.default_icon.PSObject.Properties.Value
  }
  foreach ($contentScript in @($manifest.content_scripts)) {
    $manifestReferences += @($contentScript.js)
    $manifestReferences += @($contentScript.css)
  }

  foreach ($reference in $manifestReferences | Where-Object { $_ -is [string] -and $_ }) {
    $referencePath = [System.IO.Path]::GetFullPath((Join-Path $extensionRoot $reference))
    if (-not $referencePath.StartsWith(
      ([System.IO.Path]::GetFullPath($extensionRoot) + [System.IO.Path]::DirectorySeparatorChar),
      [System.StringComparison]::OrdinalIgnoreCase
    )) {
      Fail-Check ("manifest path leaves extension/{0}: {1}" -f $extension.Name, $reference)
    } elseif (-not (Test-Path -LiteralPath $referencePath -PathType Leaf)) {
      Fail-Check ("manifest references missing file in {0}: {1}" -f $extension.Name, $reference)
    }
  }

  foreach ($docName in @("README.md", "deploy.md")) {
    $docPath = Join-Path $extensionRoot $docName
    if ((Test-Path -LiteralPath $docPath -PathType Leaf) -and
        ((Get-Content -LiteralPath $docPath -Raw) -match "[A-Za-z]:\\")) {
      Fail-Check ("machine-specific path in extensions/{0}/{1}" -f $extension.Name, $docName)
    }
  }
}

$obsoleteArchives = Get-ChildItem -LiteralPath (Join-Path $PackRoot "extensions") -Filter "*.zip" -File
if ($obsoleteArchives) {
  Fail-Check "obsolete extension ZIP files remain"
} else {
  Write-Check "ok" "no obsolete extension ZIP files"
}

if (Test-Path -LiteralPath (Join-Path $PackRoot "scripts/package-chrome-extensions.ps1")) {
  Fail-Check "obsolete Chrome extension packaging script remains"
} else {
  Write-Check "ok" "obsolete Chrome extension packaging script removed"
}

$quickValidate = Join-Path $env:USERPROFILE ".codex/skills/.system/skill-creator/scripts/quick_validate.py"
$canQuickValidate = (Test-Path -LiteralPath $quickValidate -PathType Leaf) -and (Get-Command python -ErrorAction SilentlyContinue)

foreach ($skill in $skills) {
  $skillPath = Join-Path $PackRoot "skills/$($skill.Name)/SKILL.md"
  if (-not (Test-Path -LiteralPath $skillPath -PathType Leaf)) {
    continue
  }

  $content = Get-Content -LiteralPath $skillPath -Raw
  $frontMatterPattern = "(?s)^---\s*\r?\nname:\s*$($skill.Name)\s*\r?\ndescription:\s*.+?\r?\n---"

  if ($content -notmatch $frontMatterPattern) {
    Fail-Check ("invalid front matter for {0}" -f $skill.Name)
  } elseif ($content -match "\[TODO|TODO:") {
    Fail-Check ("TODO placeholder remains in {0}" -f $skill.Name)
  } elseif ($skill.Name -eq "amazing-shopify-chatbot-builder" -and $content -notmatch "admin-dashboard-control-plane\.md") {
    Fail-Check "amazing-shopify-chatbot-builder does not reference the admin dashboard control plane"
  } elseif ($skill.Name -eq "amazing-shopify-chatbot-builder" -and $content -notmatch "empty-project-scaffold\.md") {
    Fail-Check "amazing-shopify-chatbot-builder does not reference the empty project scaffold"
  } elseif ($skill.Name -eq "amazing-shopify-chatbot-builder" -and $content -notmatch "Build the protected admin dashboard and embedded test chat") {
    Fail-Check "amazing-shopify-chatbot-builder tracker is not dashboard-first"
  } elseif ($skill.Name -eq "amazing-landing-page-builder" -and $content -notmatch "placeholder-only") {
    Fail-Check "landing builder must require the full placeholder wireframe"
  } elseif ($skill.Name -eq "amazing-landing-page-builder" -and $content -notmatch "final-wireframe-review") {
    Fail-Check "landing builder must retain independent final review"
  } elseif ($skill.Name -eq "amazing-landing-page-builder" -and $content -notmatch "dtc-derived-strategy\.md") {
    Fail-Check "amazing-landing-page-builder does not reference distilled DTC strategy references"
  } elseif ($skill.Name -eq "amazing-shopify-site-builder" -and $content -notmatch "Fast Site Draft Mode") {
    Fail-Check "amazing-shopify-site-builder does not define Fast Site Draft Mode"
  } elseif ($skill.Name -eq "amazing-shopify-site-builder" -and $content -notmatch "Guided Site Strategy Mode") {
    Fail-Check "amazing-shopify-site-builder does not define Guided Site Strategy Mode"
  } elseif ($skill.Name -eq "amazing-shopify-site-builder" -and $content -notmatch "Deep Storefront Build Mode") {
    Fail-Check "amazing-shopify-site-builder does not define Deep Storefront Build Mode"
  } elseif ($skill.Name -eq "amazing-shopify-site-builder" -and $content -notmatch "Shopify Site Build Progress") {
    Fail-Check "amazing-shopify-site-builder does not include the site progress tracker"
  } elseif ($skill.Name -eq "amazing-shopify-site-builder" -and $content -notmatch "site-strategy-and-architecture\.md") {
    Fail-Check "amazing-shopify-site-builder does not reference the site strategy reference"
  } elseif ($skill.Name -eq "amazing-shopify-site-builder" -and $content -notmatch "access-setup\.md") {
    Fail-Check "amazing-shopify-site-builder does not reference the access setup reference"
  } elseif ($skill.Name -eq "amazing-shopify-site-builder" -and $content -notmatch "Theme Access plus Shopify CLI") {
    Fail-Check "amazing-shopify-site-builder does not preserve the theme access rail"
  } elseif ($skill.Name -eq "amazing-shopify-site-builder" -and $content -notmatch "Shopify Dev Dashboard app plus Admin GraphQL") {
    Fail-Check "amazing-shopify-site-builder does not preserve the Admin API access rail"
  } elseif ($skill.Name -eq "amazon-opportunity-explorer" -and $content -notmatch "current user has\s+authorized") {
    Fail-Check "amazon-opportunity-explorer does not bind research to the current user's authorized account"
  } elseif ($skill.Name -eq "amazon-opportunity-explorer" -and $content -notmatch "never reuse them as evidence") {
    Fail-Check "amazon-opportunity-explorer does not protect against illustrative example reuse"
  } elseif ($skill.Name -eq "amazing-copywriter" -and $content -notmatch "consumer-brand-copywriting-framework\.md") {
    Fail-Check "amazing-copywriter does not reference its channel framework"
  } elseif ($skill.Name -eq "amazing-copywriter" -and $content -notmatch "do not invent desire, claims, testimonials") {
    Fail-Check "amazing-copywriter does not preserve its claim boundary"
  } else {
    Write-Check "ok" ("valid skill front matter for {0}" -f $skill.Name)
  }

  if ($canQuickValidate) {
    $skillDir = Split-Path -Parent $skillPath
    $previousPythonUtf8 = $env:PYTHONUTF8
    $env:PYTHONUTF8 = "1"
    try {
      $quickOutput = & python $quickValidate $skillDir 2>&1
      if ($LASTEXITCODE -ne 0) {
        Fail-Check ("skill-creator validation failed for {0}: {1}" -f $skill.Name, ($quickOutput -join " "))
      } else {
        Write-Check "ok" ("skill-creator validation passed for {0}" -f $skill.Name)
      }
    } finally {
      $env:PYTHONUTF8 = $previousPythonUtf8
    }
  } else {
    Write-Check "skip" "skill-creator quick validator not available"
  }
}

$allTextFiles = Get-ChildItem -LiteralPath $PackRoot -Recurse -File | Where-Object {
  $_.Extension -in @(".md", ".ps1", ".yaml", ".yml", ".txt")
}

foreach ($file in $allTextFiles) {
  $relative = $file.FullName.Replace($PackRoot, "").TrimStart("\", "/")
  $text = Get-Content -LiteralPath $file.FullName -Raw

  if ($text -match "(?i)(sk-[A-Za-z0-9_-]{20,}|shpat_[A-Za-z0-9_]{20,}|AIza[0-9A-Za-z_-]{20,}|-----BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY-----)") {
    Fail-Check ("possible literal secret in {0}" -f $relative)
  }

  if ($relative -ne "scripts\validate-skill-pack.ps1") {
    if ($text -match "github\.com/<owner>/") {
      Fail-Check ("placeholder GitHub owner remains in {0}" -f $relative)
    }

    if ($text -match "polished-local-demo|shopify-ai-chatbot-builder|sample products|sample policies|demo product data|demo policy data") {
      Fail-Check ("stale old-demo wording remains in {0}" -f $relative)
    }

    if ($text -match "\[TODO|TODO:") {
      Fail-Check ("TODO placeholder remains in {0}" -f $relative)
    }
  }
}

if (-not (Test-Path -LiteralPath (Join-Path $PackRoot "skills/amazing-shopify-chatbot-builder/references/polished-local-demo.md"))) {
  Write-Check "ok" "old polished-local-demo reference removed"
} else {
  Fail-Check "old polished-local-demo reference still exists"
}

$landingDocs = @(
  "README.md",
  "INSTALL-CODEX.md",
  "START-HERE.md",
  "SKILL-PACK-GUIDE.md"
)

foreach ($doc in $landingDocs) {
  $path = Join-Path $PackRoot $doc
  if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
    continue
  }

  $text = Get-Content -LiteralPath $path -Raw
  if ($text -notmatch "full-design process") {
    Fail-Check ("{0} does not mention full-design process" -f $doc)
  }
}

$siteDocs = @(
  "README.md",
  "INSTALL-CODEX.md",
  "START-HERE.md",
  "SKILL-PACK-GUIDE.md"
)

foreach ($doc in $siteDocs) {
  $path = Join-Path $PackRoot $doc
  if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
    continue
  }

  $text = Get-Content -LiteralPath $path -Raw
  if ($text -notmatch "amazing-shopify-site-builder") {
    Fail-Check ("{0} does not mention amazing-shopify-site-builder" -f $doc)
  }

  if ($text -notmatch "Fast Site Draft Mode") {
    Fail-Check ("{0} does not mention Fast Site Draft Mode" -f $doc)
  }
}

$amazonDocs = @(
  "README.md",
  "INSTALL-CODEX.md",
  "START-HERE.md",
  "SKILL-PACK-GUIDE.md"
)

foreach ($doc in $amazonDocs) {
  $path = Join-Path $PackRoot $doc
  if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
    continue
  }

  $text = Get-Content -LiteralPath $path -Raw
  if ($text -notmatch "amazon-opportunity-explorer") {
    Fail-Check ("{0} does not mention amazon-opportunity-explorer" -f $doc)
  }
}

$copywritingDocs = @(
  "README.md",
  "INSTALL-CODEX.md",
  "START-HERE.md",
  "SKILL-PACK-GUIDE.md",
  "VERSION.md"
)

foreach ($doc in $copywritingDocs) {
  $path = Join-Path $PackRoot $doc
  if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
    continue
  }

  $text = Get-Content -LiteralPath $path -Raw
  if ($text -notmatch "amazing-copywriter") {
    Fail-Check ("{0} does not mention amazing-copywriter" -f $doc)
  }
}

$extensionDocs = @(
  "README.md",
  "extensions/README.md"
)

foreach ($doc in $extensionDocs) {
  $path = Join-Path $PackRoot $doc
  if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
    continue
  }

  $text = Get-Content -LiteralPath $path -Raw
  foreach ($extension in $extensions) {
    if ($text -notmatch [regex]::Escape($extension.Name)) {
      Fail-Check ("{0} does not mention {1}" -f $doc, $extension.Name)
    }
  }
}

if (-not $failed) {
  Write-Check "ok" "skill pack validation passed"
}

if ($failed) {
  exit 1
}
