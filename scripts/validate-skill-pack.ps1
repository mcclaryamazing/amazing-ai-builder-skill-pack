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
  "INSTALL-CLAUDE-CODE.md",
  "START-HERE.md",
  "SKILL-PACK-GUIDE.md",
  "PROMPT-FALLBACKS.md",
  "TROUBLESHOOTING.md",
  "VERSION.md",
  "examples/shopify-ai-chatbot/README.md",
  "prompts/01-start-a-new-ai-tool-project.md",
  "prompts/02-build-my-shopify-chatbot.md",
  "prompts/03-connect-my-shopify-store.md",
  "prompts/04-test-my-chatbot-safety.md",
  "prompts/05-fix-an-error.md",
  "prompts/06-review-before-launch.md"
)

$requiredSkills = @(
  "ai-business-app-project-planner",
  "non-technical-founder-coding-coach",
  "shopify-ai-chatbot-builder",
  "shopify-access-and-data-sync",
  "shopify-theme-widget-installer",
  "commerce-ai-guardrail-tester",
  "coding-agent-debugging-buddy",
  "launch-readiness-reviewer"
)

foreach ($file in $requiredFiles) {
  $path = Join-Path $PackRoot $file
  if (Test-Path -LiteralPath $path -PathType Leaf) {
    Write-Check "ok" ("found {0}" -f $file)
  } else {
    Fail-Check ("missing {0}" -f $file)
  }
}

foreach ($skill in $requiredSkills) {
  $skillPath = Join-Path $PackRoot ("skills/{0}/SKILL.md" -f $skill)
  if (-not (Test-Path -LiteralPath $skillPath -PathType Leaf)) {
    Fail-Check ("missing SKILL.md for {0}" -f $skill)
    continue
  }

  $content = Get-Content -LiteralPath $skillPath -Raw
  if ($content -notmatch "(?s)^---\s*\r?\nname:\s*$([regex]::Escape($skill))\s*\r?\ndescription:\s*.+?\r?\n---") {
    Fail-Check ("invalid front matter for {0}" -f $skill)
  } elseif ($content -match "\[TODO|TODO:") {
    Fail-Check ("TODO placeholder remains in {0}" -f $skill)
  } else {
    Write-Check "ok" ("valid skill front matter for {0}" -f $skill)
  }
}

$allTextFiles = Get-ChildItem -LiteralPath $PackRoot -Recurse -File | Where-Object {
  $_.Extension -in @(".md", ".ps1", ".yaml", ".yml", ".txt")
}

foreach ($file in $allTextFiles) {
  $text = Get-Content -LiteralPath $file.FullName -Raw
  if ($text -match "(?i)(sk-[A-Za-z0-9_-]{20,}|shpat_[A-Za-z0-9_]{20,}|AIza[0-9A-Za-z_-]{20,}|-----BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY-----)") {
    Fail-Check ("possible literal secret in {0}" -f $file.FullName.Replace($PackRoot, "").TrimStart("\", "/"))
  }
}

if (-not $failed) {
  Write-Check "ok" "skill pack validation passed"
}

if ($failed) {
  exit 1
}
