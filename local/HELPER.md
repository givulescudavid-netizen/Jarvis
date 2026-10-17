# Jarvis helper: bookings and errands done for you (Windows)

Besides restaurants, you can ask for other errands in Chrome: look-ups (stock, prices, flights, opening hours) come straight back; bookings, appointments, forms, carts and website contact forms (e.g. contacting a broker on Centris) stop before the final button and Jarvis reads you the details and asks first; your yes finishes it. It never pays or buys, sends emails, texts or social posts, moves money, trades, deletes, or changes accounts.

With the helper running, "Jarvis, book me a table at Joe Beef Friday at 8" works like this:

1. Jarvis asks its usual quick questions, then hands the job to the helper on your computer.
2. Claude (through the Claude in Chrome extension) opens the restaurant's booking page in **your own Chrome**, picks the best time in your window and fills in your details.
3. It **stops right before the final "Reserve" button**. Jarvis reads you the exact details: "Ready to book: Joe Beef, Friday 8:15, two people. Shall I go ahead?"
4. Say **yes** (or click "Yes, do it") and it's booked. Jarvis tells you the confirmation. Say **no** and nothing is booked.

It never pays: if a restaurant wants a card, a deposit or a no-show fee, Jarvis tells you and you finish that one yourself.

## One-time setup (about 10 minutes)

1. **Chrome + Claude in Chrome:** you already have the extension. Make sure it's signed in to your Claude account.
2. **Install Claude Code:** click Start, type `PowerShell`, open it, paste this line and press Enter:

   `irm https://claude.ai/install.ps1 | iex`

   When it finishes, close PowerShell and open a new one.
   If it says `...\.local\bin is not in your PATH`, paste this line too, press Enter, then close and reopen PowerShell:

   `[Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path", "User") + ";$env:USERPROFILE\.local\bin", "User")`
3. **Sign Claude Code in:** in the new PowerShell, type `claude` and press Enter. It opens your browser: sign in with the **same Claude account** as the extension. (Don't use an API key: with a key, the Chrome connection stays off.) Then type `/chrome`, check it says the extension is connected, and type `/exit`.
4. **Get the helper (one file):** open https://github.com/givulescudavid-netizen/Jarvis/blob/main/local/Jarvis%20helper%20(Windows).bat and click the **download** button (arrow pointing down, top right). Put it wherever you like, e.g. your Desktop. If Chrome warns about the download, choose **Keep**.
5. **Start the helper:** double-click **Jarvis helper (Windows)**. If a blue "Windows protected your PC" box appears, click **More info**, then **Run anyway** (it's because the file came from the internet). A window opens with a **pairing code**. Keep that window open (you can minimise it).
6. **Pair Jarvis:** in Jarvis, open ⚙ → **Computer helper**, paste the pairing code, click **Save**. Jarvis runs a test: Claude opens example.com in your Chrome and Jarvis shows "Working ✓".
   - If Chrome asks whether Jarvis may access devices on your local network, click **Allow**.

## Every day

- Double-click **Jarvis helper (Windows)** when you want bookings done for you (or put a shortcut to it in your Startup folder so it starts with Windows).
- Keep Chrome open.
- If the helper isn't running, Jarvis falls back to the copy-and-paste way and tells you so.

## Good to know

- It only listens on your own computer, only answers the Jarvis page, and only with your pairing code.
- Claude may only use the browser through the helper: it can't run programs or touch your files.
- Each booking takes a few minutes and uses your Claude plan.
- Some sites show "are you a robot?" checks or ask you to sign in: Claude stops and Jarvis tells you to finish that one yourself.
- The pairing code is stored in `%APPDATA%\JarvisHelper\pairing-code.txt`. Delete that file to get a new code.
