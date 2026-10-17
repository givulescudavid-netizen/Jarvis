// Builds "Jarvis helper (Windows).bat": one file that carries the helper (jarvis-helper.ps1) inside it,
// so there is only one thing to download. Run: node local/build-helper.mjs   (the tests check it's up to date)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url));
export function buildHelperBat(ps1){
  const head = [
    "@echo off",
    "title Jarvis helper - keep this window open",
    "rem Lets Jarvis do errands in your own Chrome; it always asks you before the final click. See HELPER.md.",
    "rem Everything below the marker is the helper itself (PowerShell); this line runs it.",
    `set "JARVIS_HELPER_FILE=%~f0"`,
    `powershell -NoProfile -ExecutionPolicy Bypass -Command "$s = [IO.File]::ReadAllText($env:JARVIS_HELPER_FILE); $m = '#JARVIS' + '-HELPER-BELOW'; Invoke-Expression $s.Substring($s.LastIndexOf($m) + $m.Length)"`,
    "pause",
    "exit /b",
    "#JARVIS-HELPER-BELOW" ];
  return head.join("\r\n") + "\r\n" + ps1.replace(/\r?\n/g, "\r\n");
}
if(process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])){
  const out = buildHelperBat(fs.readFileSync(path.join(here, "jarvis-helper.ps1"), "utf8"));
  fs.writeFileSync(path.join(here, "Jarvis helper (Windows).bat"), out);
  console.log("wrote local/Jarvis helper (Windows).bat");
}
