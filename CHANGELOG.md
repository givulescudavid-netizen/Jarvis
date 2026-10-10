# Changelog

## 2026.10.11
- **Interrupt Jarvis any time.** Talk over it and it stops mid-sentence, knows exactly how far it got, and reacts: adds what you said, corrects itself, changes subject, or carries on if you say "go on". Saying "stop" just quiets it; "that's all" ends the conversation even mid-sentence. It ignores its own voice coming back through the speakers (works best with headphones).
- **Glows with its voice.** The reactor, a soft screen-wide halo and the subtitles pulse in time with the words Jarvis is speaking.
- **Apple Music:** "Jarvis, play Back in Black" opens that exact song in Apple Music. (Jarvis can't pause or skip afterwards; that needs Apple's paid developer program.)
- **Open websites by voice:** "Jarvis, open YouTube". If Chrome blocks the new tab, tap the button under the reactor, or allow pop-ups for the site.
- Fixed: a microphone listener that had already been switched off could still react to late speech.
- Tests are now 44 checks and wait for Jarvis to finish instead of using fixed pauses, so they no longer flicker.

## 2026.10.10
- First version on GitHub, hosted on GitHub Pages.
- Voice: wakes on "Jarvis", conversation mode, Initialize screen so Chrome allows speech.
- Gmail, Calendar, Drive (read), email drafts and calendar events with spoken confirmation.
- Web search, memory, "About you", morning briefing.
- Diagnostics log and "Report a problem" → GitHub issue.
- Automated end-to-end tests (`npm test`) run on every change.
