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
    Name = "shopify-chatbot-builder"
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
    Name = "shopify-landing-page-builder"
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
    Name = "shopify-site-builder"
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
    Name = "consumer-brand-copywriting"
    References = @(
      "consumer-brand-copywriting-framework.md"
    )
  }
)

$requiredFiles = @(
  "README.md",
  "INSTALL-CODEX.md",
  "START-HERE.md",
  "SKILL-PACK-GUIDE.md",
  "TROUBLESHOOTING.md",
  "VERSION.md",
  "extensions/README.md",
  "extensions/product-review-intelligence-v1.8.2.zip",
  "extensions/full-page-snapshot-v1.0.0.zip",
  "scripts/package-chrome-extensions.ps1"
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

foreach ($file in $requiredFiles) {
  $path = Join-Path $PackRoot $file
  if (Test-Path -LiteralPath $path -PathType Leaf) {
    Write-Check "ok" ("found {0}" -f $file)
  } else {
    Fail-Check ("missing {0}" -f $file)
  }
}

$extensionArchives = @(
  @{
    Path = "extensions/product-review-intelligence-v1.8.2.zip"
    Sha256 = "7F1F3B8D9840D20AFBFF20B92444F0DF4515379EC4C9F01159C59D7BF443CFF9"
  },
  @{
    Path = "extensions/full-page-snapshot-v1.0.0.zip"
    Sha256 = "1B65448E7938880B45B94BB74E5519918E3624C1DB72E49740896F34D250652F"
  }
)

Add-Type -AssemblyName System.IO.Compression.FileSystem

foreach ($extensionArchive in $extensionArchives) {
  $path = Join-Path $PackRoot $extensionArchive.Path
  if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
    continue
  }

  $actualHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $path).Hash
  if ($actualHash -ne $extensionArchive.Sha256) {
    Fail-Check ("checksum mismatch for {0}" -f $extensionArchive.Path)
    continue
  }

  $archive = [System.IO.Compression.ZipFile]::OpenRead($path)
  try {
    if ($archive.Entries | Where-Object { $_.FullName -match "\\" }) {
      Fail-Check ("non-portable path separators in {0}" -f $extensionArchive.Path)
    } elseif ($archive.Entries | Where-Object { $_.FullName -match "(^|/)deploy\.md$" }) {
      Fail-Check ("repo-internal deploy.md included in {0}" -f $extensionArchive.Path)
    } else {
      Write-Check "ok" ("portable extension archive {0}" -f $extensionArchive.Path)
    }

    foreach ($readmeEntry in $archive.Entries | Where-Object {
      $_.FullName -match "(^|/)README\.md$"
    }) {
      $reader = [System.IO.StreamReader]::new(
        $readmeEntry.Open(),
        [System.Text.Encoding]::UTF8
      )
      try {
        if ($reader.ReadToEnd() -match "[A-Za-z]:\\") {
          Fail-Check ("machine-specific path in {0}" -f $readmeEntry.FullName)
        }
      } finally {
        $reader.Dispose()
      }
    }
  } finally {
    $archive.Dispose()
  }
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
  } elseif ($skill.Name -eq "shopify-chatbot-builder" -and $content -notmatch "admin-dashboard-control-plane\.md") {
    Fail-Check "shopify-chatbot-builder does not reference the admin dashboard control plane"
  } elseif ($skill.Name -eq "shopify-chatbot-builder" -and $content -notmatch "empty-project-scaffold\.md") {
    Fail-Check "shopify-chatbot-builder does not reference the empty project scaffold"
  } elseif ($skill.Name -eq "shopify-chatbot-builder" -and $content -notmatch "Build the protected admin dashboard and embedded test chat") {
    Fail-Check "shopify-chatbot-builder tracker is not dashboard-first"
  } elseif ($skill.Name -eq "shopify-landing-page-builder" -and $content -notmatch "Fast Draft Mode") {
    Fail-Check "shopify-landing-page-builder does not define Fast Draft Mode"
  } elseif ($skill.Name -eq "shopify-landing-page-builder" -and $content -notmatch "Guided Strategy Mode") {
    Fail-Check "shopify-landing-page-builder does not define Guided Strategy Mode"
  } elseif ($skill.Name -eq "shopify-landing-page-builder" -and $content -notmatch "Deep Conversion Mode") {
    Fail-Check "shopify-landing-page-builder does not define Deep Conversion Mode"
  } elseif ($skill.Name -eq "shopify-landing-page-builder" -and $content -notmatch "Ask at most 1-3 missing-answer questions before drafting") {
    Fail-Check "shopify-landing-page-builder Fast Draft guidance may force too much intake"
  } elseif ($skill.Name -eq "shopify-landing-page-builder" -and $content -notmatch "dtc-derived-strategy\.md") {
    Fail-Check "shopify-landing-page-builder does not reference distilled DTC strategy references"
  } elseif ($skill.Name -eq "shopify-site-builder" -and $content -notmatch "Fast Site Draft Mode") {
    Fail-Check "shopify-site-builder does not define Fast Site Draft Mode"
  } elseif ($skill.Name -eq "shopify-site-builder" -and $content -notmatch "Guided Site Strategy Mode") {
    Fail-Check "shopify-site-builder does not define Guided Site Strategy Mode"
  } elseif ($skill.Name -eq "shopify-site-builder" -and $content -notmatch "Deep Storefront Build Mode") {
    Fail-Check "shopify-site-builder does not define Deep Storefront Build Mode"
  } elseif ($skill.Name -eq "shopify-site-builder" -and $content -notmatch "Shopify Site Build Progress") {
    Fail-Check "shopify-site-builder does not include the site progress tracker"
  } elseif ($skill.Name -eq "shopify-site-builder" -and $content -notmatch "site-strategy-and-architecture\.md") {
    Fail-Check "shopify-site-builder does not reference the site strategy reference"
  } elseif ($skill.Name -eq "shopify-site-builder" -and $content -notmatch "access-setup\.md") {
    Fail-Check "shopify-site-builder does not reference the access setup reference"
  } elseif ($skill.Name -eq "shopify-site-builder" -and $content -notmatch "Theme Access plus Shopify CLI") {
    Fail-Check "shopify-site-builder does not preserve the theme access rail"
  } elseif ($skill.Name -eq "shopify-site-builder" -and $content -notmatch "Shopify Dev Dashboard app plus Admin GraphQL") {
    Fail-Check "shopify-site-builder does not preserve the Admin API access rail"
  } elseif ($skill.Name -eq "amazon-opportunity-explorer" -and $content -notmatch "current user has\s+authorized") {
    Fail-Check "amazon-opportunity-explorer does not bind research to the current user's authorized account"
  } elseif ($skill.Name -eq "amazon-opportunity-explorer" -and $content -notmatch "never reuse them as evidence") {
    Fail-Check "amazon-opportunity-explorer does not protect against illustrative example reuse"
  } elseif ($skill.Name -eq "consumer-brand-copywriting" -and $content -notmatch "consumer-brand-copywriting-framework\.md") {
    Fail-Check "consumer-brand-copywriting does not reference its channel framework"
  } elseif ($skill.Name -eq "consumer-brand-copywriting" -and $content -notmatch "do not invent desire, claims, testimonials") {
    Fail-Check "consumer-brand-copywriting does not preserve its claim boundary"
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

if (-not (Test-Path -LiteralPath (Join-Path $PackRoot "skills/shopify-chatbot-builder/references/polished-local-demo.md"))) {
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
  if ($text -notmatch "Fast Draft Mode") {
    Fail-Check ("{0} does not mention Fast Draft Mode" -f $doc)
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
  if ($text -notmatch "shopify-site-builder") {
    Fail-Check ("{0} does not mention shopify-site-builder" -f $doc)
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
  if ($text -notmatch "consumer-brand-copywriting") {
    Fail-Check ("{0} does not mention consumer-brand-copywriting" -f $doc)
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
  foreach ($package in @(
    "product-review-intelligence-v1.8.2.zip",
    "full-page-snapshot-v1.0.0.zip"
  )) {
    if ($text -notmatch [regex]::Escape($package)) {
      Fail-Check ("{0} does not mention {1}" -f $doc, $package)
    }
  }
}

if (-not $failed) {
  Write-Check "ok" "skill pack validation passed"
}

if ($failed) {
  exit 1
}
