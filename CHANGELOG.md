# Changelog

## 2026.10.13.1 — Change 3D models live, keep them in Google Drive
- **Change it live:** with a model up on barehands, just say what to change: "add a turbo", "make the cylinders gold", "remove the mirrors", "make it bigger". Jarvis saves over the **same file** in barehands' media folder and swaps the new version onto the board.
- **Pick up later:** Jarvis remembers every model it built (the design is stored inside the file too), so "Jarvis, add wheels to the go-kart" works another day.
- **Google Drive:** "Jarvis, save it to my Drive" puts a copy in a "Jarvis 3D" folder in your Google Drive (Jarvis asks first). After that, every change updates the Drive copy as well.
- **Fix:** putting something new on a busy barehands board could bring up an old card instead. New cards and models are now added first, then put centre stage.

## 2026.10.12.8 — 3D models and notifications on the barehands board
- **Build in 3D:** "Jarvis, build me a V8 engine in 3D and put it on the board." Jarvis designs the object from named parts (block, cylinders, pulleys…), saves it as a 3D file in barehands, and puts it centre stage.
- **In pieces:** "Show it in pieces" splits it into its parts on the board (exploded view); "put it back together" reassembles it. You can also pull it apart by hand in barehands.
- **Holograms:** "Make it a hologram" shows it as barehands' blue wireframe.
- **One-time setup:** ⚙ → barehands board → "Choose barehands' media folder", then pick the media folder inside barehands. Until then, Jarvis downloads the model and tells you where to drop it.
- **Notifications to the board:** each item on Jarvis's screen panel (emails, Centris listings…) has a "→ board" button that puts it on the board as a card. Tick "Also put my reminders and alerts on the board" and every reminder, meeting alert and price alert lands there too.

## 2026.10.12.7 — Centris deal finder and emails on screen
- **Centris deals:** "Jarvis, any good deals on Centris?" Jarvis reads your Centris alert emails, pulls out every property and runs the investor numbers: price per door, gross rent multiplier, cap rate, mortgage payment (Canadian semi-annual compounding), monthly cash flow, cash-on-cash return and debt coverage. Then it ranks them and tells you which one or two look best and why.
- **Your criteria:** the first time, Jarvis asks what you look for (areas, number of units, max price, minimum cap rate or cash flow, down payment and rate) and remembers it. Change it any time: "Jarvis, only Montreal and Laval, at least a 6% cap rate."
- **On screen:** a new panel on the right of the HUD shows the ranked listings (green = matches your criteria, amber = close, red = misses) with an Open button to the Centris page.
- **Emails on screen:** "Jarvis, put my emails up" or "read me my emails": the list appears in the same panel, and clicking an email shows the whole thing.
- If a listing doesn't show its revenue, Jarvis says so and asks you (or estimates rents with a web search and says it's an estimate). Expenses are estimated unless the listing gives them. These are quick screening numbers to decide what to visit, not advice.

## 2026.10.12.6 — Trips and packages from your email
- **Trips:** "Jarvis, what trips do I have coming up?" or "add my flights to the calendar". Jarvis finds flight, train, hotel and rental-car confirmations in your Gmail and tells you what's coming. It offers to put them on your calendar (asking "Shall I go ahead?" for each one), plus a reminder to check in 24 hours before and a "time to leave for the airport" reminder.
- **Packages:** "Where's my Amazon order?" or "what's arriving this week?" Jarvis reads your shipping emails and tells you what's coming, from whom, and when, including anything delayed or needing action.
- The morning briefing mentions a trip in the next two days or a package arriving today, only when there is one.
- Behind the scenes: changes to Jarvis now always come to you as a pull request to approve; nothing goes live without your click.

## 2026.10.12.5 — Jarvis can see through your camera
- Ask "Jarvis, what am I holding?", "what's this?", "read this for me" or "how do I look?" and Jarvis takes one picture with your webcam and answers. "📷 LOOKING" shows at the top when it does.
- It only looks when you ask. It isn't watching all the time, and the picture isn't saved: it goes to Claude with your question and that's it.
- The first time, Chrome asks to use the camera (if hand gestures are on, it's already allowed).

## 2026.10.12.4 — Gestures pause for barehands; bigger / smaller with your hand; no extra click after popping out
- **No more clicks in Jarvis while you use barehands.** barehands and Jarvis watch the same hands through the same camera (one camera is enough), so moving cards on the board also pinched and clicked things inside Jarvis. Now, while barehands is running, Jarvis ignores your hands (the top shows "✋ paused (barehands) · ☝️ to use").
- **Want Jarvis anyway?** Hold up one pointing finger ☝️ for about a second. Jarvis takes your hand for a few seconds ("☝️ JARVIS HAS YOUR HAND"), so you can pinch and drag it to another screen or click something. Then it goes back to ignoring you. Everything is back to normal when you close barehands. You can switch this off in ⚙ → Hand gestures.
- **Pop-out starts listening straight away.** After you tap ⧉, the new window starts on its own: no more "Initialize" click before you can talk. If Chrome still insists on one click before Jarvis can speak out loud, the click screen comes back, and a click anywhere on it is enough.
- **Swipe up / down to resize** (hand gestures, in the pop-out or installed app): swipe up to make Jarvis bigger (from the small orb to the normal window, then full screen with the whole dashboard), swipe down to make it smaller (back to the normal window, then a small orb in the bottom right corner). Sideways swipes still close what's open.
- **By voice:** "Jarvis, go full screen", "expand", "minimize", "shrink", "back to normal".
- A web page can't truly minimize its own window to the taskbar, and Jarvis has to stay visible to hear you, so "minimize" shrinks it to a small orb instead.

## 2026.10.12.3 — Your DCF on the board
- Say "Jarvis, put the Nvidia DCF on the board" and three cards appear on your barehands board: the valuation (enterprise value, equity value, implied share price and the other outputs from your template) centre stage, the key assumptions (growth, margins, WACC, terminal value; not the historicals) and the upside against today's live price.
- To change an assumption, say it: "bump growth to 12%". Jarvis writes it into your DCF copy and the cards update by themselves with the new value and upside. (barehands can't tell Jarvis what you touch on the board, so pinching a card can't change a number.)
- It only works on DCFs Jarvis made for you, never your template. The live price needs your market data key; without it the upside card shows your template's own upside figure if it has one.

## 2026.10.12.2 — "Jarvis, open the board"
- Once barehands is running on your computer, say "Jarvis, open the board" and its page opens in a new tab. Jarvis can't start barehands itself (websites aren't allowed to start programs), so start it first.

## 2026.10.12 — Jarvis can put things on your barehands board
- barehands is a free app that turns your webcam into a hand-tracked glass board: cards float over your camera and you move them with your bare hands. Jarvis can now be its voice: say "Jarvis, put today's plan on the board" and the card flies up centre stage.
- Switch it on in ⚙ → barehands board and press "Test it": a J.A.R.V.I.S. card should appear. barehands itself has to be running on your computer, with its page open in Chrome. Chrome may ask once whether Jarvis can reach devices on your network; say allow.
- Jarvis can also add cards next to each other, clear the board, or reset it. It can only show things; it can't see what you've moved around.
- Jarvis's own hand gestures (palm, fist, pinch to move between screens) are unchanged and separate from barehands.

## 2026.10.11.29 — Jarvis learns from your corrections
- When you correct Jarvis ("no, I meant Pepper Potts", "not dollars, euros", "I told you, I use 5.5%"), it fixes the answer and, if the correction is something lasting, saves it to memory so it doesn't make the same mistake again. It says briefly that it'll remember.
- One-off slips aren't saved. You can see and delete what it remembers in ⚙ → memory, or say "forget that".

## 2026.10.11.28 — Smart speed: quicker small talk, deeper analysis
- Quick questions like the time, the weather, a timer, "thanks" or "how are you" now go to Claude Haiku, which answers faster and costs a small fraction of what Opus does.
- Analysis questions (DCFs, valuations, comparisons, "why…", "should I…", plans, summaries) get more thinking from Opus, so the answers go deeper. Say "think hard about…" for the most thorough answer.
- Anything involving your email, calendar, files or spreadsheets always stays on Opus.
- You can switch it off in ⚙ → "Smart speed".

## 2026.10.11.27 — Jarvis starts talking sooner
- Jarvis used to wait until Claude had written the whole answer before saying a word. Now it starts speaking the first sentence as soon as it's written, while the rest is still coming in. Longer answers should feel a few seconds quicker.
- Saying "stop" while it's talking still works, and the rest of that answer isn't spoken (it still appears on screen).
- Works with both the computer voice and ElevenLabs. No change in cost.

## 2026.10.11.26 — Excel DCF templates
- Your DCF template can now be an Excel file. The first time, Jarvis asks "Make a Google Sheets copy so I can read it?" and, once you say yes, uses that copy as your template. Your Excel file is never changed.
- Layout and formulas carry over. If any formula doesn't work in Google Sheets (a few Excel-only functions don't), Jarvis tells you which cells so you can fix them in the copy before trusting the numbers.

## 2026.10.11.25 — Move Jarvis between screens
- **Pinch-drag:** with hand gestures on, pinch your thumb and finger on an empty spot in Jarvis and hold for half a second. The cursor turns into a dashed "grabbed" circle. Move your hand left or right and the window follows across your monitors; open your fingers to drop it on that screen. A quick pinch on a button still clicks it.
- **By voice:** "Jarvis, move to the other screen" (or "the left screen", "screen 2", "the main screen").
- This only works when Jarvis is in its own window (tap ⧉ at the top right, or the installed app), in Chrome or Edge on a computer: Chrome never lets a page move a normal tab. The first time, click ⚙ → Hand gestures → "Allow moving between screens" and say yes to Chrome's question.

## 2026.10.11.24 — Reminders, weather, travel times, Uber and hotels
- **Reminders:** "Jarvis, remind me at 4 to call the bank" or "remind me in 20 minutes to check the oven". Jarvis says it out loud when it's due. If Jarvis was closed at that moment, it tells you as soon as you open it again. Reminders show on the dashboard (under Timers & reminders) and survive a reload. "What reminders do I have?" and "cancel the bank reminder" work too.
- **Weather:** "Do I need an umbrella?", "What's the weather in Lisbon this weekend?" Current conditions, the next 12 hours and up to 7 days. The morning briefing now includes the weather for your city (tell Jarvis your city once, or put it in "About you").
- **Travel times:** "How long to the airport from home?" Typical driving time (no live traffic), walking or cycling, with an offer to open Google Maps for live traffic. Tell Jarvis your home and office addresses once and it remembers them.
- **Uber:** "How much is an Uber to the airport?" Price and pickup time for a ride right now. Jarvis never books: you book in the Uber app. Live prices work in the claude.ai version; on the website, Jarvis opens Uber with the trip filled in.
- **Hotels:** "Find me a hotel in Lisbon next weekend under €200." Two or three good options with price per night, rating and area, from Tripadvisor (claude.ai version). On the website, Jarvis opens Tripadvisor for that city and suggests options from a web search.

## 2026.10.11.23 — Cheaper: prompt caching + cost meter
- Jarvis now asks Claude to keep its instructions, tool list and the conversation so far ready between questions ("prompt caching"). Re-reading them costs about a twentieth of the normal price, so an active conversation should cost roughly half or less.
- ⚙ → Brain shows what today and this month cost on your API key, and how much caching saved (an estimate; exact numbers at console.anthropic.com → Usage).

## 2026.10.11.22 — Hand gestures
- ⚙ → Hand gestures: control Jarvis with your hand in front of the webcam. Hold an open palm to wake it, make a fist to stop it talking, thumbs up / down to answer "Shall I go ahead?", peace sign for focus mode (just the reactor), 🤟 for music you like, point to move a glowing cursor and pinch to click, swipe to close what's open.
- A small holographic wireframe of your hand shows bottom left, and "✋ gestures on" at the top shows when the camera is watching (click it to turn off).
- Hand tracking runs on your computer (Google's MediaPipe); the video is never uploaded or recorded.

## 2026.10.11.21 — The Brain: linked memory
- When you ask Jarvis to remember something, it also notes who and what it's about and how they connect (Mark → works at → Acme).
- "What do I have on Acme?" pulls together linked memories, your DCFs and comps, watchlist, Library documents, and checks email and calendar.
- ⚙ → Memory → "Keep memory in Google Drive" creates a "Jarvis Brain" spreadsheet (shared by all your devices, editable by you) and a "Jarvis Library" folder: drop documents in and Jarvis reads and indexes them.
- Tests now wait for Jarvis to be listening before "speaking", so they no longer fail at random on a busy machine.

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
