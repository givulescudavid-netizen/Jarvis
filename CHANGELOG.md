# Changelog

## 2026.10.11.9
- **ElevenLabs only.** Once you've added an ElevenLabs key, Jarvis never uses the computer voice. The voice list shows only your ElevenLabs voices.
- If ElevenLabs refuses to speak, the exact reason appears in amber under the reactor (and the reply still shows as subtitles) instead of Jarvis quietly switching to the computer voice.
- "Remove ElevenLabs key" in ⚙ → Voice brings the computer voices back.

## 2026.10.11.8
- **One voice list.** Your ElevenLabs voices now appear at the top of the main voice list in ⚙ → Voice, with this computer's voices below. Whatever you pick there is what Jarvis uses; no more separate ElevenLabs dropdown.
- Pasting a new ElevenLabs key switches Jarvis to an ElevenLabs voice automatically.

## 2026.10.11.7
- **ElevenLabs never fails silently.** If the ElevenLabs voice can't be used, Jarvis now says why on the main screen (not just in settings) and keeps talking with the built-in voice.
- Explains the most common case: Voice Library voices need a paid ElevenLabs plan; standard voices (George, Daniel…) work on the free plan.

## 2026.10.11.6
- **ElevenLabs: clear error messages.** Instead of a vague "couldn't reach" or "rejected", settings now show ElevenLabs' exact reason and the fix (missing key permission, invalid key, credits, paid-only voice, or a blocker stopping the connection).
- If your ElevenLabs key isn't allowed to list voices, Jarvis uses ElevenLabs' standard voices (George, Daniel, Adam, Rachel) instead of failing.

## 2026.10.11.5
- **ElevenLabs voices.** Paste your ElevenLabs key in ⚙ → Voice and pick a voice (a British male voice is chosen by default). The reactor now glows with the real sound of the voice, and interruptions know the exact word you cut in on. If ElevenLabs fails or runs out of credits, Jarvis switches to the built-in voice automatically and tells you why in settings.
- The version number now shows at the top left of the screen.

## 2026.10.11.2
- **Fixed: Jarvis said it couldn't open anything.** Its instructions still said "everything is read-only", which made it refuse. It now has a clear list of what it can do: open websites, play Apple Music, and use the web versions of apps it can't launch directly (Spotify, WhatsApp…).
- **Auto-update:** Jarvis checks for a newer version when it opens and reloads itself, so you never get stuck on an old copy.

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
