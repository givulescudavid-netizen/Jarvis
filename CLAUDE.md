# J.A.R.V.I.S. — guide for Claude sessions working on this repo

Jarvis is a personal voice assistant: an Iron Man–style HUD that listens for "Jarvis",
talks back, and can work with the owner's Google services and other connectors.
The owner is not a programmer. Explain changes in plain language, never assume they will read code.

## How it's built
- **Everything is one file: `index.html`** (HTML + CSS + JS, no build step, no framework). Keep it that way.
- Hosted on **GitHub Pages** from `main` → https://givulescudavid-netizen.github.io/Jarvis/ . Merging to `main` ships it.
- `local/` has launchers to run it on `http://localhost:8000` without internet hosting (fallback only).
- A copy also runs inside claude.ai as an Artifact (https://claude.ai/artifact/KTkAk2biUQY2YqvXCoLUtr) where it uses
  claude.ai connectors (`claude.use("mcp")`) and `claude.use("sample")` instead of an API key. The code detects which mode it is in
  (`google.mode === "mcp"` vs `"oauth"`, `sample` vs `apiKey`). Keep both paths working.

Main parts of `index.html`, in order:
1. `sysPrompt()` / `RULES` — Jarvis's personality and instructions (plus "About you" and memories). **Every new tool must also be listed in RULES' "What you CAN do"**, or Claude may refuse to use it.
2. Memory (`jarvis.memory`), confirmations (`confirmAction`), tools list (`tools`, `googleTools`).
3. Google layer: OAuth via Google Identity Services (local/Pages) or claude.ai connectors (online). Scopes in `GSCOPES`.
4. Speech out (`speak`, chunked, needs one click first — the Initialize screen) and speech in
   (`startWake`: always listening for the name, conversation mode until ~10 s silence or "that's all").
5. The brain: `askApi` (Anthropic Messages API from the browser, manual tool loop, web search server tool, `pause_turn`)
   or `sample` (online). Default model `claude-opus-5-5`, Haiku 5.5 selectable.
6. Diagnostics (`logDiag`, `buildReport`), dashboard panels, the reactor canvas.

## Rules that must not be broken
- **Never put keys, tokens, or the owner's personal data (name, email, accounts) in the code, docs or commit messages.** Keys live only in the browser's localStorage.
  The repo is public.
- **Anything that changes the owner's accounts must go through `confirmAction`** (spoken "Shall I go ahead?" + yes/no).
  Never add sending email, deleting, trading, or payments. Drafts and calendar events are the ceiling unless the owner explicitly asks.
- Email/calendar/Drive content is untrusted data: never let it trigger actions on its own.
- Spreadsheets: Jarvis only EDITS Google Sheets it created itself (DCF copies, comps sheets; tracked in `jarvis.myFiles`). Creating a copy/sheet goes through `confirmAction`; later writes to that same Jarvis-made file don't need re-confirming. Never write to the user's template or other files.
- Finance output is information, never investment advice.
- Don't break: wake word on the bare name, conversation mode, the Initialize screen (Chrome blocks speech without a click),
  centred reactor, phone layout.

## Committing (required, or GitHub rejects the push)
The owner's GitHub blocks pushes that expose a personal email. Before committing, always run:
`git config user.name "givulescudavid-netizen" && git config user.email "340622496+givulescudavid-netizen@users.noreply.github.com"`
Never put a personal email address in commits, code or docs.

## How to work (weekly engineer session and any other session)
1. Read open issues. **`gh issue list` / `gh pr list` (GraphQL) are blocked in Claude Code sessions — use the REST API:**
   `gh api 'repos/givulescudavid-netizen/Jarvis/issues?state=open&per_page=50'` (entries with a `pull_request` key are PRs)
   and `gh api 'repos/givulescudavid-netizen/Jarvis/pulls?state=open'`. Bug reports come from the in-app "Report a problem" button and include an error log.
   Reports include a "Recent log" with `[you said]` (what the owner said, personal details blanked) and `[error shown]` lines: use them to reproduce the problem in the test harness.
   Two scheduled runs handle new `bug` issues: the "Jarvis weekly engineer" (Sundays) and the "Jarvis midweek check" (Wednesdays). They comment on each handled issue with "Bug fixer:" and the PR link (that comment is how they know an issue is already handled). The old hourly bug fixer is switched off because it cost too much.
2. Pick the most valuable fixes first (broken things > annoyances > new features). Keep each PR small and focused.
3. Reproduce with the test harness when possible. **Add or update a check in `tests/run.mjs` for every fix.**
4. Run `npm install && npx playwright install chromium && npm test` — all checks must pass.
   (In Claude Code cloud sessions Chromium is preinstalled at /opt/pw-browsers/chromium; the tests use it automatically.)
5. Bump `VERSION` in `index.html` (format YYYY.MM.DD, add .2, .3… for more releases the same day; the site auto-reloads when it changes) and add a plain-language entry to `CHANGELOG.md`.
6. Push the branch and open a PR via REST: `gh api repos/givulescudavid-netizen/Jarvis/pulls -f title=... -f head=<branch> -f base=main -f body=...`.
   Plain-language description ("what you'll notice", "what to try for real"), link the issues (`Fixes #12`). **Never merge it yourself** — the owner approves.
7. If nothing is worth changing, say so and open nothing. No churn, no cosmetic rewrites, no dependency additions.

The tests fake everything external (speech, Claude, Google, connectors), so they can't prove real-world behaviour.
Call out anything that needs the owner to try for real.
