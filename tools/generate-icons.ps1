Add-Type -AssemblyName System.Drawing

$sizes = 72, 96, 128, 144, 152, 192, 384, 512
$outputDirectory = Join-Path $PSScriptRoot "..\icons"
New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null

foreach ($size in $sizes) {
  $bitmap = New-Object System.Drawing.Bitmap($size, $size)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

  $red = [System.Drawing.ColorTranslator]::FromHtml("#c8102e")
  $navy = [System.Drawing.ColorTranslator]::FromHtml("#071b34")
  $white = [System.Drawing.Color]::White
  $graphics.Clear($red)

  $safeInset = [int]($size * 0.16)
  $circleSize = $size - (2 * $safeInset)
  $graphics.FillEllipse(
    (New-Object System.Drawing.SolidBrush($navy)),
    $safeInset,
    $safeInset,
    $circleSize,
    $circleSize
  )

  $lineWidth = [Math]::Max(2, [int]($size * 0.035))
  $linePen = New-Object System.Drawing.Pen($white, $lineWidth)
  $linePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $linePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $graphics.DrawLine(
    $linePen,
    [int]($size * 0.31),
    [int]($size * 0.66),
    [int]($size * 0.69),
    [int]($size * 0.34)
  )

  $dotBrush = New-Object System.Drawing.SolidBrush($white)
  $dotSize = [int]($size * 0.105)
  $points = @(
    @([int]($size * 0.27), [int]($size * 0.62)),
    @([int]($size * 0.46), [int]($size * 0.46)),
    @([int]($size * 0.65), [int]($size * 0.30))
  )

  foreach ($point in $points) {
    $graphics.FillEllipse($dotBrush, $point[0], $point[1], $dotSize, $dotSize)
  }

  $fontSize = [Math]::Max(8, [single]($size * 0.16))
  $font = New-Object System.Drawing.Font(
    "Segoe UI",
    $fontSize,
    [System.Drawing.FontStyle]::Bold,
    [System.Drawing.GraphicsUnit]::Pixel
  )
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::Center
  $format.LineAlignment = [System.Drawing.StringAlignment]::Center
  $textArea = New-Object System.Drawing.RectangleF(
    0,
    [single]($size * 0.64),
    $size,
    [single]($size * 0.16)
  )
  $graphics.DrawString("CO", $font, $dotBrush, $textArea, $format)

  $path = Join-Path $outputDirectory "icon-$size.png"
  $bitmap.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)

  $format.Dispose()
  $font.Dispose()
  $dotBrush.Dispose()
  $linePen.Dispose()
  $graphics.Dispose()
  $bitmap.Dispose()
}

Write-Output "CoachOS-iconen gegenereerd in $outputDirectory"
