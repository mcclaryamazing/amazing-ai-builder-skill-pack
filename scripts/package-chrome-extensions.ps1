param(
  [Parameter(Mandatory = $true)]
  [string]$SourceRoot,
  [string]$PackRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
)

$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.IO.Compression

function New-ExtensionArchive {
  param(
    [string]$SourceDirectory,
    [string]$ArchiveRoot,
    [string]$Destination,
    [scriptblock]$RewriteReadme
  )

  $temporaryArchive = "$Destination.tmp"
  if (Test-Path -LiteralPath $temporaryArchive) {
    Remove-Item -LiteralPath $temporaryArchive -Force
  }

  $fileStream = [System.IO.File]::Open(
    $temporaryArchive,
    [System.IO.FileMode]::CreateNew
  )

  try {
    $archive = [System.IO.Compression.ZipArchive]::new(
      $fileStream,
      [System.IO.Compression.ZipArchiveMode]::Create,
      $false
    )

    try {
      $files = Get-ChildItem -LiteralPath $SourceDirectory -Recurse -File |
        Where-Object { $_.Name -ne "deploy.md" } |
        Sort-Object FullName

      foreach ($file in $files) {
        $relativePath = $file.FullName.Substring($SourceDirectory.Length).
          TrimStart("\").
          Replace("\", "/")
        $entry = $archive.CreateEntry(
          "$ArchiveRoot/$relativePath",
          [System.IO.Compression.CompressionLevel]::Optimal
        )
        $entry.LastWriteTime = [System.DateTimeOffset]::new($file.LastWriteTimeUtc)
        $entryStream = $entry.Open()

        try {
          if ($relativePath -eq "README.md") {
            $text = [System.IO.File]::ReadAllText(
              $file.FullName,
              [System.Text.Encoding]::UTF8
            )
            $text = & $RewriteReadme $text
            $bytes = [System.Text.UTF8Encoding]::new($false).GetBytes($text)
            $entryStream.Write($bytes, 0, $bytes.Length)
          } else {
            $sourceStream = [System.IO.File]::OpenRead($file.FullName)
            try {
              $sourceStream.CopyTo($entryStream)
            } finally {
              $sourceStream.Dispose()
            }
          }
        } finally {
          $entryStream.Dispose()
        }
      }
    } finally {
      $archive.Dispose()
    }
  } finally {
    $fileStream.Dispose()
  }

  Move-Item -LiteralPath $temporaryArchive -Destination $Destination -Force
}

$extensionRoot = Join-Path $PackRoot "extensions"
New-Item -ItemType Directory -Path $extensionRoot -Force | Out-Null

$reviewSource = Join-Path $SourceRoot "extensions/review-expander"
$snapshotSource = Join-Path $SourceRoot "extensions/full-page-snapshot"
$reviewDestination = Join-Path $extensionRoot "product-review-intelligence-v1.8.2.zip"
$snapshotDestination = Join-Path $extensionRoot "full-page-snapshot-v1.0.0.zip"

New-ExtensionArchive `
  -SourceDirectory $reviewSource `
  -ArchiveRoot "review-expander" `
  -Destination $reviewDestination `
  -RewriteReadme {
    param($text)
    $text = $text -replace (
      '(?m)^4\. Select the `review-expander` folder.*\r?$'
    ), '4. Select the extracted `review-expander` folder.'
    $text -replace (
      'original `D:\\repos` location'
    ), 'original source location'
  }

New-ExtensionArchive `
  -SourceDirectory $snapshotSource `
  -ArchiveRoot "full-page-snapshot" `
  -Destination $snapshotDestination `
  -RewriteReadme {
    param($text)
    $text -replace (
      '(?m)^4\. Select .*full-page-snapshot.*\r?$'
    ), '4. Select the extracted `full-page-snapshot` folder.'
  }

Get-FileHash -Algorithm SHA256 -LiteralPath @(
  $reviewDestination,
  $snapshotDestination
)
