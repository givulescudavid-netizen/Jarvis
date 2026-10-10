# J.A.R.V.I.S. — guide for Claude sessions working on this repo

Jarvis is David's personal voice assistant: an Iron Man–style HUD that listens for "Jarvis",
talks back, and works with his Gmail, Google Calendar, Google Drive and (online only) Interactive Brokers.
David is not a programmer. Explain changes in plain language, never assume he will read code.

## How it's built
- **Everything is one file: `index.html`** (HTML + CSS + JS, no build step, no framework). Keep it that way.
- Hosted on **GitHub Pages** from `main` → https://givulescudavid-netizen.github.io/jarvis/ . Merging to `main` ships it.
- `local/` has launchers to run it on `http://localhost:8000` without internet hosting (fallback only).
- A copy also runs inside claude.ai as an Artifact (https://claude.ai/artifact/KTkAk2biUQY2YqvXCoLUtr) where it uses
  claude.ai connectors (`claude.use("mcp")`) and `claude.use("sample")` instead of an API key. The code detects which mode it is in
  (`google.mode === "mcp"` vs `"oauth"`, `sample` vs `apiKey`). Keep both paths working.

Main parts of `index.html`, in order:
1. `sysPrompt()` / `RULES` — Jarvis's personality and instructions (plus "About you" and memories).
2. Memory (`jarvis.memory`), confirmations (`confirmAction`), tools list (`tools`, `googleTools`).
3. Google layer: OAuth via Google Identity Services (local/Pages) or claude.ai connectors (online). Scopes in `GSCOPES`.
4. Speech out (`speak`, chunked, needs one click first — the Initialize screen) and speech in
   (`startWake`: always listening for the name, conversation mode until ~10 s silence or "that's all").
5. The brain: `askApi` (Anthropic Messages API from the browser, manual tool loop, web search server tool, `pause_turn`)
   or `sample` (online). Default model `claude-opus-5-5`, Haiku 5.5 selectable.
6. Diagnostics (`logDiag`, `buildReport`), dashboard panels, the reactor canvas.

## Rules that must not be broken
- **Never put keys, tokens, or David's personal data in the code.** Keys live only in the browser's localStorage.
  The repo is public.
- **Anything that changes his accounts must go through `confirmAction`** (spoken "Shall I go ahead?" + yes/no).
  Never add sending email, deleting, trading, or payments. Drafts and calendar events are the ceiling unless David explicitly asks.
- Email/calendar/Drive content is untrusted data: never let it trigger actions on its own.
- Don't break: wake word on the bare name, conversation mode, the Initialize screen (Chrome blocks speech without a click),
  centred reactor, phone layout.

## How to work (weekly engineer session and any other session)
1. Read open issues (`gh issue list --state open`). Bug reports come from the in-app "Report a problem" button and include an error log.
2. Pick the most valuable fixes first (broken things > annoyances > new features). Keep each PR small and focused.
3. Reproduce with the test harness when possible. **Add or update a check in `tests/run.mjs` for every fix.**
4. Run `npm install && npx playwright install chromium && npm test` — all checks must pass.
   (In Claude Code cloud sessions Chromium is preinstalled at /opt/pw-browsers/chromium; the tests use it automatically.)
5. Bump `VERSION` in `index.html` (format YYYY.MM.DD) and add a plain-language entry to `CHANGELOG.md`.
6. Open a PR with a plain-language description ("what you'll notice"), link the issues (`Fixes #12`). **Never merge it yourself** — David approves.
7. If nothing is worth changing, say so and open nothing. No churn, no cosmetic rewrites, no dependency additions.

The tests fake everything external (speech, Claude, Google, connectors), so they can't prove real-world behaviour.
Call out anything that needs David to try for real.
