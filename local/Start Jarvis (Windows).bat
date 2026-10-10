@echo off
title Jarvis - keep this window open
echo.
echo   J.A.R.V.I.S. is starting...
echo   Keep this window open while you use Jarvis. Close it to shut Jarvis down.
echo.
cd /d "%~dp0.."
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$dir = (Get-Location).Path;" ^
  "$l = New-Object System.Net.HttpListener; $l.Prefixes.Add('http://localhost:8000/');" ^
  "try { $l.Start() } catch { Write-Host '  Port 8000 is busy. Jarvis may already be running - check your other windows.'; Read-Host '  Press Enter to close'; exit };" ^
  "Start-Process 'http://localhost:8000/index.html';" ^
  "Write-Host '  Jarvis is running at http://localhost:8000/index.html';" ^
  "while ($l.IsListening) { $c = $l.GetContext(); $name = [Uri]::UnescapeDataString($c.Request.Url.AbsolutePath.TrimStart('/')); if (-not $name) { $name = 'index.html' };" ^
  "  $f = Join-Path $dir $name; $r = $c.Response;" ^
  "  if ((Test-Path $f -PathType Leaf) -and ((Resolve-Path $f).Path.StartsWith($dir))) { $b = [IO.File]::ReadAllBytes($f); if ($f -like '*.html') { $r.ContentType = 'text/html; charset=utf-8' }; $r.OutputStream.Write($b, 0, $b.Length) } else { $r.StatusCode = 404 };" ^
  "  $r.Close() }"
