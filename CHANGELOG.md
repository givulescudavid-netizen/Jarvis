# Changelog

## 2026.10.21 — Jarvis judges a deal the way your agents do
- When you ask Jarvis about a property ("what do you think of 470 St-Dominique?"), it now works through the same six steps as the Deal Scout: the right comparables, NOI and value, inconsistencies and hidden assumptions in the seller's numbers, signs of distress and pricing gaps, risks and opportunities, then a decision (pursue, watch or pass, with a target price when the numbers support one).
- Out loud you get the decision and the key numbers in a few sentences; the full breakdown goes on screen.
- The analysis now flags by itself when the seller's expenses are far below a realistic budget, when the revenue is only "potential", and when the asking price is well above the municipal assessment.

## 2026.10.20.2 — DuProprio alerts too
- When you ask "Jarvis, any good deals?" (or about DuProprio), Jarvis now reads your **DuProprio alert emails** as well as Centris. It opens each listing's duproprio.com page for the numbers, analyses it the same way, and saves it as a comparable. DuProprio account emails (security codes, sign-up) are ignored.

## 2026.10.20 — Market comparables and price drops
- **Jarvis now keeps every property it sees as a comparable,** whether you liked it or passed: from Centris pages, broker emails and the PDFs in your Library property folders. Every analysis is saved automatically.
- **"How does this compare?"** Jarvis checks the comps in the same area and size and compares price per door, cap rate and gross rent multiplier against them, naming the closest ones. Try "what are triplexes going for in Rosemont?".
- **Price drops.** When a listing Jarvis has seen comes back cheaper (a "Prix réduit" alert, a broker's "baisse de prix" email, a new price on the page), it tells you how much and since when. Ask "any price drops?" or "what's been sitting for a while?".
- **A "Jarvis Comps" sheet** in your Jarvis Library lists them all with their price history (Jarvis asks once before making it).
- Days on market count from when Jarvis first saw a listing, unless it read the listing date.

## 2026.10.19 — Property folders in the Jarvis Library, and PDFs Jarvis can read
- **Folders inside the Jarvis Library now work.** Make a folder per property (e.g. "470-472 Rue St-Dominique") and put its listing sheets, PDFs and notes in it. Ask "Jarvis, what do I have on 470 St-Dominique?" or "what's in the Fontaine folder?" and it finds the folder (the address doesn't have to be typed exactly) and reads the files. Before, Jarvis only saw files sitting directly in the Library and skipped anything in a folder.
- **Jarvis reads PDFs** on the website version too (before, only Google Docs, Sheets and text files). Each PDF is read once and remembered until it changes.
- **"Jarvis, put the PDFs from my email into folders for each property."** Jarvis finds the emails with PDF attachments (Centris, brokers…), groups them by property address, asks you once, then saves them into a folder per property in your Jarvis Library. Existing folders are reused and files already there aren't copied twice. Nothing is sent or deleted. (Website version only: the claude.ai version can't open email attachments.)
- Deals that didn't go through stay in their folders, so Jarvis can use them as market comparables later.

## 2026.10.18.3 — Hand gestures can't cut you off any more
- A pinch no longer "presses" the reactor. Scratching your nose or adjusting your headset sometimes looked like a pinch on the reactor, which stopped Jarvis listening mid-sentence. You can still tap the reactor with the mouse.
- Everything else stays: pinch to click buttons, pinch-and-hold to drag Jarvis's window to another screen, palm, fist, thumbs and swipes.

## 2026.10.18.2 — Jarvis as an app: its own window, no Initialize click
- The start screen now offers **"Install as an app"**. Once installed, Jarvis has its own icon and opens in its own window, and it starts talking straight away without the Initialize click.
- To have it open by itself when your computer starts: in Chrome go to `chrome://apps`, right-click Jarvis and tick **"Start app when you sign in"**.
- One click is still needed after a restart to reconnect Gmail and Calendar (Google requires it). Jarvis asks for it on screen.

## 2026.10.18 — Deal analyser and broker follow-ups
- **Analyse a property by voice.** Say "Jarvis, analyse Centris 12345678": Claude reads the listing in your Chrome (read-only, with the computer helper running), and Jarvis gives you the verdict: cap rate, price per door, cash flow after the mortgage, debt coverage and red flags. You can also just give the numbers: "a million, 6 units, 90k rents, 30k expenses".
- **Your own numbers.** Tell Jarvis your standard once, e.g. "25% down at 5%, 25 years, minimum 6 cap, max 150k a door", and every deal is judged against it.
- **Every deal is kept** in a "Jarvis Deals" sheet in your Jarvis Library (Jarvis asks once before making it), so you build a comparison list without trying. The full breakdown also shows on screen.
- **Broker follow-ups.** When Jarvis contacts a broker for you (or you say "I emailed the broker for 55 King"), it watches your Gmail for their reply and tells you when it comes. No reply after 3 days? Jarvis brings it up and offers to draft a follow-up; nothing is sent without you. "Marie called me back" closes it.
- Information, not investment advice.

## 2026.10.17.3 — No more "Jarvis" every time, and errands that finish the job
- **You don't have to say "Jarvis" before every sentence any more.** After Jarvis answers, it keeps listening for **2 minutes** (it was 10 seconds). In ⚙ → Voice you can pick 10 s, 1 min, 2 min, 5 min or **Always**: Always means it listens from the moment you press Initialize until you say "that's all" (then say "Jarvis" to wake it again).
- **Contacting a broker (or any website's contact form) now goes all the way.** Say e.g. "Jarvis, contact the broker on Centris listing 12345678 and ask if it's still available." Claude fills the form in your Chrome, Jarvis reads you the whole message and asks "Shall I go ahead?", and your yes presses "Envoyer" for you. Emails, texts, social posts, payments and money stay off-limits.
- **The tab with the filled form isn't lost any more.** Claude keeps it open until you answer; if it was closed anyway, it reopens the page, fills it in exactly as you approved and sends it (or asks again if anything changed).
- **Results now reach Jarvis.** What an errand finds is spoken, saved, and Jarvis can tell you again later ("Jarvis, what did the errand find?"). If Jarvis reloads (e.g. an update) while Claude is still working, it picks the job back up instead of losing the answer.
- After merging: download "Jarvis helper (Windows).bat" again from the `local` folder and replace the old one (your pairing code stays the same).

## 2026.10.17.2 — The computer helper is now one file
- The helper used to be two files that had to sit in the same folder ("…the -File parameter does not exist" if they didn't). Now it's **one file: "Jarvis helper (Windows).bat"**. Download it from the `local` folder on GitHub, put it anywhere (e.g. your Desktop) and double-click it.
- Your pairing code stays the same; you can delete the old "Start Jarvis helper (Windows)" and "jarvis-helper.ps1".

## 2026.10.17 — Errands in Chrome, not just restaurants
- **Ask Jarvis to do things in your Chrome** (with the computer helper running on your Windows computer):
  - **Look-ups** come straight back as an answer: "is the Dyson in stock at the Costco on Marché Central?", "cheapest flight to Miami on the 20th?", "what time does my dentist close Saturday?"
  - **Bookings and forms** (a haircut, a doctor's or car-service appointment, a form, adding things to a cart) stop right before the final button: Jarvis reads the details and asks "Shall I go ahead?". Only your yes finishes it.
  - Longer answers also appear on Jarvis's screen.
- **Off-limits, always:** paying or buying, sending messages, emails or posts, moving money, trading, deleting, or changing accounts and passwords. Jarvis refuses before anything starts and offers the closest thing (e.g. it fills the cart, you pay).
- **To use it:** restart the helper with the new version of the two files in the `local` folder (download them again from GitHub).

## 2026.10.16.2 — Bookings done for you, with one "yes"
- **No more copy-paste:** with the new **computer helper** running on your Windows computer, "Jarvis, book me a table at Joe Beef Friday at 8" is done in your own Chrome. Claude (through the Claude in Chrome extension) finds the booking page, picks the best time in your window and fills in your details.
- **You stay in charge:** it stops right before the final "Reserve" button. Jarvis reads the details out ("Ready to book: Joe Beef, Friday 8:15, two people. Shall I go ahead?"). Only your yes books it; no cancels. Then Jarvis tells you the confirmation.
- **It never pays:** if a restaurant wants a card, a deposit or a no-show fee, it stops and Jarvis tells you to finish that one yourself. Same for "are you a robot?" checks and sign-ins.
- **Setup:** once, about 10 minutes: install Claude Code, start "Start Jarvis helper (Windows)", paste its pairing code in ⚙ → Computer helper. Steps in local/HELPER.md.
- If the helper isn't running, Jarvis falls back to the copy-and-paste way and says so.

## 2026.10.16 — Jarvis talks to your agent team
- **"Jarvis, what did the agents find?"** Jarvis reads tonight's Brief from your agent team (the Jarvis HQ folder in Google Drive): the top 3 first, then details if you ask. You can also ask for one report: "what did the Deal Scout find?", "what did the analyst say?", "what's on the team's task list?"
- **The evening briefing includes it:** the first time you open Jarvis after the team has run, the briefing starts with "Your team reports…" and its top 3.
- **Give the team orders by voice:** "Jarvis, have the Deal Scout look at Centris 12345678" or "tell the team to check Wise's results." Jarvis asks "Shall I go ahead?", then leaves an "Owner note" in Jarvis HQ. The team acts on it at its next run (weekdays, about 6:20 pm).
- The team's reports are treated as information only: nothing in them can make Jarvis do anything.

## 2026.10.16 — "About you" keeps itself up to date
- **You don't have to type it any more:** when you tell Jarvis something about yourself (your job, where you live, your family, what to call you, how you like answers), Jarvis adds it to **About you** by itself, without asking. If something changes ("I moved to Montreal"), it updates that line instead of adding a second one.
- **Your own writing stays as you wrote it:** Jarvis only adds new lines or swaps the exact words that changed. You can still edit or delete anything in ⚙ → About you.
- **It also catches things you mentioned in passing:** when Jarvis looks back over recent conversations, facts about you go into About you too.
- **Never kept there:** passwords, card or account numbers, or anything about skipping "Shall I go ahead?". Facts about other people and your work still go to Memory.

## 2026.10.15.2 — A dashboard you can read without squinting
- **Bigger, brighter text:** the schedule, markets, inbox and everything Jarvis puts on screen are larger. The side panels are wider, and the grey secondary text is lighter.
- **Markets at a glance:**
  - your holdings come first, marked **OWN**;
  - each one shows its price and the day's move in **green ▲ or red ▼**;
  - gold shows its price per ounce.
- **Inbox:** each email shows **who it's from** in bold, the time, and the subject underneath (up to two lines), instead of a cut-off subject and a first name.
- **Text size:** ⚙ → Text size → Normal, Large or Extra large. Jarvis remembers your choice.

## 2026.10.15 — Jarvis really makes files now, and keeps them in your Jarvis Library
- **Fixed:** asking Jarvis to make a template (or any file) got "it's downloading", but nothing came. Jarvis had no way to make files and was claiming it had.
- **Now it makes real files:** "Jarvis, make me a monthly budget template", "write me a packing list", "make a checklist for viewing a duplex". Jarvis writes it and saves it in your **Jarvis Library** folder in Google Drive as:
  - a **Google Sheet**, with working formulas, for tables and templates;
  - a **Google Doc** for documents and lists;
  - or a plain text file.

  It asks "Shall I go ahead?" first, opens the new file for you, and creates the Jarvis Library folder the first time if you don't have one yet.
- **Nothing goes to Downloads any more:** 3D models that can't go into barehands' folder are kept in the Jarvis Library too. Jarvis asks once the first time, and every change you make updates that copy.
- Jarvis is told never to say it made, saved or downloaded a file unless it really did.

## 2026.10.14.7 — Your whole portfolio in the briefing, gold included
- **Physical gold:** "Jarvis, I own physical gold" puts gold on your watchlist. Jarvis reads the spot price per ounce in US$ and C$, and the move since the day before. No market data key is needed for gold.
- **Canadian and European holdings:** for stocks the free market data plan doesn't cover, like Canadian Net REIT (NET-UN.V) or Unibail-Rodamco-Westfield (URW.PA), the briefing now does one quick web search each (up to four) for news and what's coming up. It used to stop at two.
- Your holdings still come first, then the stocks you only watch.

## 2026.10.14.6 — The briefing tells you what matters: money, your stocks, Centris
- **One sweep for what matters:** when Jarvis briefs you (by itself when you first open it each day, or when you ask "anything important?" or "what did I miss?"), it checks everything since you last looked in one go:
  - **Money emails:** banks, cards and brokers (Desjardins, RBC, TD, BMO, Scotiabank, CIBC, National Bank, Tangerine, Wealthsimple, Questrade, Interactive Brokers, Wise, PayPal, Amex…). It looks for statements, payments due, deposits, e-transfers, fraud or security alerts, and dividends.
  - **Your stocks:** the ones you own first, then your watchlist. It covers big moves (3% or more), the latest important news, and results or trading-update dates in the next two weeks.
  - **New Centris alerts:** just how many there are, with an offer to rank them.
  - **Other important unread email.**
- **Most important first:** anything about money that needs action comes first, then today's meetings, your stocks, Centris, then the rest.
- **Tell Jarvis what you own:** "Jarvis, I own Netflix and Wise." Owned stocks come first in the briefing. "Add Shopify to my watchlist" works as before.
- **Prices and results dates** need your free Finnhub key in ⚙ → Markets. Without it (or for a London-only listing), Jarvis does up to two quick web searches for what's coming up, owned stocks first.
- **Email is information only:** Jarvis never acts on what an email says and never opens its links.

## 2026.10.14.5 — Jarvis underwrites deals your way, with CMHC expenses
- **Deals are now underwritten like your income statement.** Jarvis takes the rents (plus parking and laundry when they're separate), takes off 3% vacancy, then subtracts the actual taxes, insurance and utilities and CMHC's stabilized expenses: maintenance and repairs, management, salaries, appliance, heat pump and elevator reserves, and other costs.
- **It knows the CMHC rates for every region** (Atlantic, Quebec, Ontario, Prairies and territories, B.C.), for wood frame with 11 units or less, wood frame with 12 or more, and concrete. They're the same rates as in your portfolio's CMHC tab.
- It also gives the building's value at a 4.5% cap rate and how the asking price compares. You can change that cap rate by voice ("use a 5% cap rate").
- If a listing doesn't show the insurance or taxes, Jarvis says the NOI is too high because of it.
- This works for Centris listings and any other income property you ask about.

## 2026.10.14.4 — Jarvis doesn't lose long questions
- **Long questions aren't cut off any more.** When you paused for breath in the middle of a long question, Jarvis sent only the first half to its brain, which then said it didn't get it. Now it waits until you've actually stopped (about a second of silence) and sends the whole thing.
- **"Answer it" works.** If Jarvis still misunderstands or hits an error, just say "answer it", "you heard me" or "try again", and it answers what you said before, so you don't have to repeat a long question.
- Jarvis now knows your words come from speech recognition, so it guesses the most likely meaning of a misheard word instead of asking you to say it again.

## 2026.10.14.3 — Jarvis finds Centris listings by their number
- **No more stalling on tracking links:** the "Voir la propriété" links in Centris emails are long tracking addresses, and Jarvis wouldn't read through them. Now it looks each listing up by its Centris number (for example "Centris 25265270") and opens the real centris.ca page. The email link is only a last resort.
- The links on Jarvis's screen now point to the clean centris.ca page when Jarvis found it.
- Jarvis can now do up to 8 web searches per question (was 3), so it can look up all the listings in one go.

## 2026.10.14.2 — Fix "Uplink error … Invalid signature in thinking block"
- **The error after a Centris question is fixed.** When Claude read a listing page in a certain way, Jarvis saved a small detail of that step (which page it opened) slightly wrong. Claude then refused the next question with "Invalid signature in thinking block". Jarvis now keeps the step exactly as Claude sent it.
- **If it ever happens again,** Jarvis quietly starts a fresh conversation and answers, instead of showing the error. It still remembers your recent exchanges.

## 2026.10.14 — Centris listings: a second way in, and clearer error reports
- **If a listing link won't open,** Jarvis now looks the listing up by its Centris number and opens the page it finds. Before, it gave up.
- **No more "I can't open Centris":** Jarvis used to say that in earlier conversations, and it still remembers those. It's now told plainly that it can open the pages.
- **Problem reports show which pages failed and why,** so a "Report a problem" after a Centris question tells us exactly what Centris said. Only the page address is logged, never its content.

## 2026.10.13.5 — Jarvis opens your Centris listings and learns what you like
- **Reads the listing pages:** your Centris alert emails only give the address and a "Voir la propriété" button. Jarvis now opens each listing's page on Centris and reads the asking price, the units and their rents, potential gross revenue, municipal and school taxes, heating/electricity and other expenses, year built and anything notable (vacant units, commercial space, work needed). It then runs the numbers (cap rate, cash flow, mortgage) and ranks the listings on screen. It reads up to 6 listings per question, newest first.
  - Jarvis can only open pages on centris.ca, nothing else.
  - This works in your own-API-key version (GitHub Pages / local). The claude.ai version can't open web pages yet, so there it still uses what's in the email.
- **Heating and electricity count:** when a listing says what the owner pays for energy, it's included in the expenses instead of guessed.
- **Train it:** tell Jarvis what you think of a listing ("pass, too far from the metro", "I like that one, good rents for the area"). It keeps your verdict and reason, and uses everything you've said before to judge new listings the way you would ("this looks like the Rosemont triplex you liked").

## 2026.10.13.4 — Jarvis remembers earlier conversations, moves meetings, keeps you posted while thinking
- **Picks up where you left off:** after a refresh, an update or a new day, Jarvis now starts knowing your last 20 or so exchanges ("what did I ask you this morning?"). They're kept in this browser only.
- **Move or change meetings:** "Jarvis, move my 3pm to 4", "push the board meeting to tomorrow at 10", "rename it", "change the place to Stark Tower". Jarvis says exactly what will change and asks "Shall I go ahead?" first. If you only give a new start, the meeting keeps its length.
  - Guests aren't emailed about the change, but their calendars still show it.
  - Jarvis still can't delete events.
  - Only the person who organised a meeting can move it.
- **"Think harder" keeps you posted:** Jarvis says straight away that it's thinking it through. Then it gives a short "still working on it, sir" about every 25 seconds until it answers, so you're never left in silence.

## 2026.10.13.3 — Cheaper to talk to Jarvis throughout the day
- **Longer cache:** Claude now remembers Jarvis's instructions, tools and your conversation for an **hour** instead of 5 minutes. Coming back after a few quiet minutes used to mean paying full price again for everything. Now it costs a small fraction, about $0.003 instead of $0.07 for the fixed part. The first question of each hour costs slightly more (about $0.10 instead of $0.07). If Anthropic ever refuses the 1-hour cache, Jarvis quietly falls back to the 5-minute one.
- **Clock fix:** Jarvis's instructions used to say the time the page was opened, and it never changed. Every message already carries the real time, so that line is gone (the claude.ai version still gets the live time). That also keeps the instructions identical between conversations, so they stay cached.
- **Trimmed instructions:** a few paragraphs (the barehands board, the camera, moving the window, hand gestures) repeated what the tool descriptions already say. They're shorter now, with the same abilities.
- The cost meter in ⚙ now counts 1-hour cache writes at their real price (2x instead of 1.25x).
- Jarvis still keeps the whole conversation; nothing it was told earlier is dropped.

## 2026.10.13.2 — Jarvis learns from your conversations, anticipates, and thinks harder
- **Jarvis reflects:** each time you open Jarvis, it quietly looks back over the conversations it hasn't reviewed yet (at most every 6 hours, and only once there are a handful of new ones). It keeps three kinds of notes: new lasting facts about you (added to its memory), **habits** it can anticipate ("usually asks for the market around 9"), and **lessons** on doing better ("give prices in euros, not dollars").
- **Anticipates:** when a habit fits the moment, Jarvis offers the next thing before you ask, once ("Shall I pull up the market, sir? You usually check it about now."). The briefing can end with one such offer too.
- **Ask it directly:** "Jarvis, learn from our conversations" or "what have you learned about me?". "Forget that" also removes a habit or lesson.
- **See and edit what it learned:** ⚙ → Memory → "Learned by Jarvis". Each habit and lesson has a ✕ to delete it, and a "Reflect now" button. The conversation notes stay in this browser only and are never put in problem reports.
- **Safety:** reflecting can't make Jarvis do anything. It has no tools, it learns only from what *you* said (not from emails or web pages Jarvis read out), and any note that would let Jarvis skip asking "Shall I go ahead?" is thrown away.
- **"Think harder":** say "think harder", "take your time" or "think it through" and Jarvis gets the most thinking time for that question (website version, with your API key). It takes longer and costs a little more.
- **Briefing when you open Jarvis:** the automatic briefing now comes the first time you open Jarvis each day, at any hour (it used to be mornings only), so it works when you only open Jarvis at work.

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
