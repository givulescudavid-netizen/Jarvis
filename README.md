# J.A.R.V.I.S.

My personal Iron Man–style voice assistant.

**Open it:** https://givulescudavid-netizen.github.io/jarvis/ (Chrome or Edge), click **Initialize**, then just say **"Jarvis"**.

- Talks back, keeps a conversation going until you say "that's all"
- Reads Gmail, Google Calendar and Drive; drafts emails and books meetings **only after you say yes**
- Searches the web, remembers things about you, gives you a morning briefing
- Settings (⚙): API key, Google connection, voice, "About you", memory, **Report a problem**

Your API key and Google access are stored only in your own browser, never in this code.

## Something broken or missing?
Say **"Jarvis, log a bug: …"** or open ⚙ → **Report a problem** → **Send to GitHub**.
A Claude session reviews reports every week and proposes fixes as pull requests for approval.

## One-time setup
1. **Anthropic API key** from console.anthropic.com → paste in ⚙.
2. **Google**: in Google Cloud, your OAuth client's *Authorized JavaScript origins* must include
   `https://givulescudavid-netizen.github.io` (and `http://localhost:8000` if you use the local launcher).
   Then ⚙ → **Connect Google** and tick every box.

For developers / Claude sessions: see `CLAUDE.md`.
