@echo off
title Jarvis helper - keep this window open
rem Lets Jarvis book things in your own Chrome (it always asks you before the final click). See HELPER.md.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0jarvis-helper.ps1"
pause
