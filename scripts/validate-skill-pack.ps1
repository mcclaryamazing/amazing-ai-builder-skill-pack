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

$requiredFiles = @(
  "README.md",
  "INSTALL-CODEX.md",
  "START-HERE.md",
  "SKILL-PACK-GUIDE.md",
  "TROUBLESHOOTING.md",
  "VERSION.md",
  "skills/shopify-chatbot-builder/SKILL.md",
  "skills/shopify-chatbot-builder/agents/openai.yaml",
  "skills/shopify-chatbot-builder/references/guided-progress.md",
  "skills/shopify-chatbot-builder/references/private-real-store-demo.md",
  "skills/shopify-chatbot-builder/references/shopify-connection.md",
  "skills/shopify-chatbot-builder/references/widget-install-and-launch.md"
)

foreach ($file in $requiredFiles) {
  $path = Join-Path $PackRoot $file
  if (Test-Path -LiteralPath $path -PathType Leaf) {
    Write-Check "ok" ("found {0}" -f $file)
  } else {
    Fail-Check ("missing {0}" -f $file)
  }
}

$skillPath = Join-Path $PackRoot "skills/shopify-chatbot-builder/SKILL.md"
if (Test-Path -LiteralPath $skillPath -PathType Leaf) {
  $content = Get-Content -LiteralPath $skillPath -Raw
  if ($content -notmatch "(?s)^---\s*\r?\nname:\s*shopify-chatbot-builder\s*\r?\ndescription:\s*.+?\r?\n---") {
    Fail-Check "invalid front matter for shopify-chatbot-builder"
  } elseif ($content -match "\[TODO|TODO:") {
    Fail-Check "TODO placeholder remains in shopify-chatbot-builder"
  } else {
    Write-Check "ok" "valid skill front matter for shopify-chatbot-builder"
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

    if ($text -match "Install all skills|install the skills|eight skills|three skills") {
      Fail-Check ("stale multi-skill wording remains in {0}" -f $relative)
    }
  }
}

if (-not (Test-Path -LiteralPath (Join-Path $PackRoot "skills/shopify-chatbot-builder/references/polished-local-demo.md"))) {
  Write-Check "ok" "old polished-local-demo reference removed"
} else {
  Fail-Check "old polished-local-demo reference still exists"
}

if (-not $failed) {
  Write-Check "ok" "skill pack validation passed"
}

if ($failed) {
  exit 1
}
