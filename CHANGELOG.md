# Changelog

## 2026.10.11.21 — Reliable automatic checks
- Nothing changes in how Jarvis works. The automatic checks that run before every change were failing at random (between 1 and 14 failures out of ~130) on a busy computer: the pretend microphone sometimes "spoke" in the half second while Jarvis was restarting its listening, so a test sentence got lost. The checks now wait until Jarvis is actually listening, like a real person would.

## 2026.10.11.20 — Better problem reports
- "Report a problem" now includes what you said to Jarvis and the exact error it showed, so problems can be reproduced and fixed. Email addresses, phone numbers and links are blanked out, because reports are public.
- New reports are picked up automatically by a Claude bug-fixer, which proposes a fix for you to approve.

## 2026.10.11.19 — Fewer "one moment, sir"s
- Jarvis now only says "one moment" when an answer takes longer than 4 seconds (it was 1.4), and at most once every 2 minutes.

## 2026.10.11.18 — Fix "Uplink error … without a corresponding code_execution_tool_result"
- When a web search got cut off part-way, Jarvis saved the unfinished step and then every later question failed until you reloaded. It now keeps only the words of a cut-off reply.
- If Claude ever rejects the conversation history again, Jarvis quietly starts a fresh conversation and answers instead of showing an error.
- Replies have more room before they get cut off.

## 2026.10.11.17 — Finance
- **DCF co-pilot.** Jarvis learns your own DCF template (a Google Sheet) once, then for any company: makes a copy (your template is never touched), fills historicals from filings with sources, walks you through each assumption by voice (history, a sensible range, a recommendation; you decide), writes your choices in, and reads back EV, equity value, implied price and upside.
- **Markets (free Finnhub key):** live prices, company metrics, news, earnings dates with estimates and past surprises.
- **Watchlist + spoken price alerts:** "watch Nvidia, tell me if it drops below 110". Prices show on the left; alerts wait until Jarvis isn't mid-sentence, so they're never lost.
- **Comps tables** as a new Google Sheet with medians.
- Morning briefing includes watchlist moves and upcoming earnings.

## 2026.10.11.16
- **Bookings: Jarvis interviews you first, by voice.** Before handing off to Claude in Chrome it asks (two questions at a time, only what it doesn't know): which branch, day/time, how many, the earliest and latest time you'd accept, seating/occasion/allergies, what to do about deposits, and your contact details (and offers to remember them).
- The instructions now let Claude in Chrome pick the closest time in your window without stopping to ask, add your requests to the booking notes, and follow your deposit choice. It still shows you everything before the final click.
- Jarvis explains what happens next out loud after preparing the booking.

## 2026.10.11.15
- **Restaurant bookings via Claude in Chrome.** "Jarvis, book me a table at Nobu for 2 at 8pm Friday" prepares the booking: it opens a search for the restaurant's booking page and shows ready-to-paste instructions (date, time, party size, your details, and safety rules: show options if the time isn't free, ask before the final click, never enter card details). Paste them into Claude in Chrome, Anthropic's browser extension, which does the booking. Jarvis itself never clicks on websites.

## 2026.10.11.14
- **Mic status at the top:** 🎙 listening (green), paused, blocked or no mic (red), problem (amber). Click it for a full mic check.
- **Mic check (⚙):** Chrome's permission, which microphone Chrome is using, a live sound-level bar, the last thing Jarvis heard, and the last problem in plain English (blocked, no mic, another app using it, network). A "Test microphone" button retries.

## 2026.10.11.13
- **Keep Jarvis listening while you use other tabs.** Chrome stops microphones in background tabs, so Jarvis can now live in its own window: tap ⧉ (top right) to pop it out into a compact window, or install it as an app (⚙ → Keep Jarvis listening). Keep a corner of the window visible.
- Listening restarts automatically when Jarvis's tab comes back into view, and Jarvis explains what happened if it missed you while in the background.
- If voice listening isn't supported, Jarvis says which browser you're in and gives you the Chrome link.
- App icon; fixed the ⚙ icon showing as garbled characters in some setups.

## 2026.10.11.11
- **Only one Jarvis answers.** Opening Jarvis in another tab now pauses the older tab, so two copies never answer you at once (one tab could be using a different voice). Click "Use Jarvis in this tab" to switch back.

## 2026.10.11.10 — Acting like the films' JARVIS
- **Answers out loud when you say its name:** "Yes, sir?", "At your service, sir."…
- **Never leaves you in silence:** if an answer takes more than a moment, Jarvis says "One moment, sir" / "Right away" while it works.
- **"Welcome home" status:** when you click Initialize, Jarvis greets you with the time, your next appointment and how many unread emails you have.
- **Speaks up on its own:** "Sir, the board meeting starts in 10 minutes", and again when it starts. Switch off in ⚙ → Alerts.
- **Personality:** answers first, crisp butler-style acknowledgements ("Done, sir." "As you wish."), precise numbers, sensible assumptions instead of lots of questions, one useful heads-up when it matters, dry wit.

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
