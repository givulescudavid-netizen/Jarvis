// End-to-end checks for index.html with every outside service faked:
// speech recognition, speech output, the Anthropic API, Google APIs and claude.ai connectors.
// Run: npm test   (needs: npm install && npx playwright install chromium)
import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PAGE = pathToFileURL(path.join(root, "index.html")).href;
const shots = path.join(root, "tests", "screenshots"); fs.mkdirSync(shots, { recursive: true });
const exe = process.env.CHROMIUM_PATH || (fs.existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined);
// A fake microphone (Chrome's built-in test device) so the mic check can be tested
const browser = await chromium.launch({ ...(exe ? { executablePath: exe } : {}), args:["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream"] });
// Some checks need a real web address (Google sign-in is disabled for file:// pages), so serve the page locally too.
import http from "node:http";
const server = http.createServer((req, res) => { const f = path.join(root, decodeURIComponent(req.url.split("?")[0])); fs.readFile(f, (err, data) => { if(err){ res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": f.endsWith(".html") ? "text/html" : "text/plain" }); res.end(data); }); });
await new Promise(r => server.listen(0, "127.0.0.1", r));
const HTTP_PAGE = `http://127.0.0.1:${server.address().port}/index.html`;

let failed = 0, passed = 0;
function check(name, ok, info = ""){ if(ok){ passed++; console.log("  ✓", name); } else { failed++; console.log("  ✗", name, info); } }

// Fakes injected before the page loads. `script` is the list of replies the fake Claude gives, in order.
function fakes({ mcp = false, script = [], slowVoice = false, eleven = false, events = [], unread = 0, googleBefore = false, noSR = false, micBusy = false, ls = {} } = {}){
  return [({ mcp, script, slowVoice, eleven, events, unread, googleBefore, noSR, micBusy, ls }) => {
    // the automatic morning briefing would otherwise make the results depend on the time of day
    Object.entries({ "jarvis.autoBrief": false, ...ls }).forEach(([k, v]) => localStorage.setItem(k, JSON.stringify(v)));
    if(micBusy) navigator.mediaDevices.getUserMedia = () => Promise.reject(Object.assign(new Error("Could not start audio source"), { name:"NotReadableError" }));
    if(googleBefore){ localStorage.setItem("jarvis.gon", "true"); localStorage.setItem("jarvis.gconsented3", "true"); }
    localStorage.setItem("jarvis.key", '"sk-ant-test"'); localStorage.setItem("jarvis.gclient", '"x.apps.googleusercontent.com"');
    if(eleven) localStorage.setItem("jarvis.elKey", '"el-test-key"');
    window.__spoken = []; window.__log = [];
    // Fake voice. slowVoice: speaks one word every 220 ms with word-timing events, and cancel() cuts it off like Chrome does.
    let current = null; window.__cancels = 0;
    const synth = { speaking:false, pending:false, resume(){}, getVoices(){ return [{ name:"Daniel", lang:"en-GB" }]; },
      cancel(){ window.__cancels++; if(current){ clearInterval(current.tick); const u = current.u; current = null; u.onerror && u.onerror({ error:"interrupted" }); } },
      speak(u){ window.__spoken.push(u.text);
        if(!slowVoice){ setTimeout(() => { u.onstart && u.onstart(); setTimeout(() => u.onend && u.onend(), 20); }, 5); return; }
        setTimeout(() => { u.onstart && u.onstart();
          let i = 0, at = 0; const words = u.text.split(" ");
          const c = { u };
          c.tick = setInterval(() => { if(i >= words.length){ clearInterval(c.tick); current = null; u.onend && u.onend(); return; }
            u.onboundary && u.onboundary({ name:"word", charIndex: at, charLength: words[i].length }); at += words[i].length + 1; i++; }, 220);
          current = c;
        }, 5); } };
    Object.defineProperty(window, "speechSynthesis", { value: synth });
    window.SpeechSynthesisUtterance = function(t){ this.text = t; };
    // Fake speech recognition that behaves like Chrome's: on* handlers AND addEventListener
    class FakeSR extends EventTarget {
      constructor(){ super(); window.__rec = this; }
      fire(type, props = {}){ const ev = Object.assign(new Event(type), props); this["on" + type] && this["on" + type](ev); this.dispatchEvent(ev); }
      start(){ setTimeout(() => { this.live = true; this.fire("start"); }, 5); }
      stop(){ this.live = false; this.fire("end"); } abort(){ this.live = false; this.fire("end"); }
    }
    window.SpeechRecognition = FakeSR; window.webkitSpeechRecognition = FakeSR;
    window.__say = txt => { const r = [{ transcript: txt }]; r.isFinal = true; window.__rec && window.__rec.fire("result", { resultIndex:0, results:[r] }); };
    window.__micError = err => window.__rec && window.__rec.fire("error", { error: err });
    window.google = { accounts:{ oauth2:{ initTokenClient: o => ({ requestAccessToken: () => setTimeout(() => o.callback({ access_token:"tok", expires_in:3600 }), 5) }) } } };
    let call = 0; const realFetch = window.fetch;
    window.fetch = async (u, o) => {
      u = String(u); const J = (x, st = 200) => new Response(JSON.stringify(x), { status: st });
      if(window.__extraFetch){ const r = await window.__extraFetch(u, o, J); if(r) return r; }
      if(u.includes("api.anthropic.com")){
        const body = JSON.parse(o.body); window.__log.push({ tools: body.tools.map(t => t.name), last: body.messages.at(-1), msgs: body.messages, system: body.system });
        const st = script[call++] || { text: "Done." };
        if(st.delay) await new Promise(r => setTimeout(r, st.delay));
        if(st.err) return J({ error:{ message: st.err } }, st.status || 400);
        if(st.raw) return J(st.raw);
        if(st.tool) return J({ stop_reason:"tool_use", content:[{ type:"tool_use", id:"t" + call, name: st.tool, input: st.input }] });
        return J({ stop_reason:"end_turn", content:[{ type:"text", text: st.text }] });
      }
      if(u.includes("gmail.googleapis.com") && u.includes("/drafts")){ window.__log.push({ draft: JSON.parse(o.body) }); return J({ id:"d1" }); }
      if(u.includes("calendar/v3") && o && o.method === "POST"){ window.__log.push({ event: JSON.parse(o.body), url: u }); return J({ id:"e1" }); }
      if(u.includes("calendar/v3")) return J({ items: events.map(e => ({ summary:e.title, location:e.location, start:{ dateTime: new Date(Date.now() + e.inMin * 60000).toISOString() }, end:{ dateTime: new Date(Date.now() + (e.inMin + 30) * 60000).toISOString() } })) });
      if(u.includes("gmail.googleapis.com")) return J({ messages:[], resultSizeEstimate: unread });
      return realFetch(u, o);
    };
    if(mcp){
      window.__calls = [];
      const m = { callTool: async (srv, tool, input) => { window.__calls.push([srv, tool, input]); return { payload:{ viewUrl:"https://mail.google.com/x", threads:[], events:[] } }; } };
      const sample = async (input, opts) => {
        const t = opts.tools.find(t => t.name === "draft_email");
        const r = await t.execute({ to:["pepper@example.com"], subject:"Board", body:"See you at 9." });
        window.__log.push({ sampleToolResult: r }); opts.onText && opts.onText({ text:"Draft saved, sir." });
        return { text:"Draft saved, sir." };
      };
      window.claude = { use: async n => n === "sample" ? sample : n === "mcp" ? m : null };
    }
    window.__opened = [];
    window.open = url => { window.__opened.push(String(url)); return window.__blockPopups ? null : {}; };
    if(noSR){ window.SpeechRecognition = undefined; window.webkitSpeechRecognition = undefined; }
  }, { mcp, script, slowVoice, eleven, events, unread, googleBefore, noSR, micBusy, ls }];
}
async function open(opts, viewport = { width:1440, height:900 }, url = PAGE){
  const p = await browser.newPage({ viewport }); const errs = [];
  p.on("pageerror", e => errs.push(e.message));
  // Fake Apple Music search (the page loads it JSONP-style)
  await p.route(/itunes\.apple\.com\/search/, route => {
    const u = new URL(route.request().url()), cb = u.searchParams.get("callback");
    const term = u.searchParams.get("term") || "";
    const results = /nothingmatches/.test(term) ? [] : [
      { wrapperType:"track", trackName:"Back In Black", artistName:"AC/DC", collectionName:"Back In Black", trackViewUrl:"https://music.apple.com/us/album/back-in-black/574050396?i=574050602" },
      { wrapperType:"track", trackName:"Hells Bells", artistName:"AC/DC" } ];
    route.fulfill({ contentType:"text/javascript", body:`${cb}(${JSON.stringify({ resultCount: results.length, results })});` });
  });
  await p.addInitScript(...fakes(opts));
  await p.goto(url); await p.waitForTimeout(600);
  p.errs = errs; return p;
}
// A real audio clip (a tone, 60 ms per character) so ElevenLabs playback, glow and timing can be tested.
function toneWav(seconds){
  const rate = 22050, n = Math.floor(rate * seconds), buf = Buffer.alloc(44 + n * 2);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + n * 2, 4); buf.write("WAVEfmt ", 8); buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22); buf.writeUInt32LE(rate, 24); buf.writeUInt32LE(rate * 2, 28);
  buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(n * 2, 40);
  for(let i = 0; i < n; i++){ const env = 0.5 + 0.5 * Math.sin(i / rate * 2 * Math.PI * 4); buf.writeInt16LE(Math.round(Math.sin(i / rate * 2 * Math.PI * 220) * 12000 * env), 44 + i * 2); }
  return buf.toString("base64");
}
// Fake ElevenLabs. mode: "ok", "badkey", "noVoicesPerm" (can speak, can't list voices), "noTtsPerm"
async function fakeEleven(p, mode = "ok"){
  p.__el = [];
  await p.route(/api\.elevenlabs\.io/, route => {
    const req = route.request(), url = req.url(), cors = { "access-control-allow-origin":"*" };
    p.__el.push({ url, key: req.headers()["xi-api-key"], body: req.postData() });
    if(mode === "badkey") return route.fulfill({ status:401, headers:cors, contentType:"application/json", body:'{"detail":{"status":"invalid_api_key","message":"Invalid API key"}}' });
    const perm = what => route.fulfill({ status:401, headers:cors, contentType:"application/json", body: JSON.stringify({ detail:{ status:"missing_permissions", message:`The API key you used is missing the permission ${what} to execute this operation.` } }) });
    if(mode === "noVoicesPerm" && url.endsWith("/v1/voices")) return perm("voices_read");
    if(mode === "noTtsPerm" && url.includes("/text-to-speech/")) return perm("text_to_speech");
    if(url.endsWith("/v1/voices")) return route.fulfill({ headers:cors, contentType:"application/json", body: JSON.stringify({ voices:[
      { voice_id:"v-rachel", name:"Rachel", labels:{ accent:"american", gender:"female" } },
      { voice_id:"v-daniel", name:"Daniel", labels:{ accent:"british", gender:"male" } } ] }) });
    const text = JSON.parse(req.postData()).text, chars = [...text];
    return route.fulfill({ headers:cors, contentType:"application/json", body: JSON.stringify({
      audio_base64: toneWav(Math.min(4, chars.length * 0.06)),
      alignment:{ characters: chars, character_start_times_seconds: chars.map((_, i) => i * 0.06), character_end_times_seconds: chars.map((_, i) => (i + 1) * 0.06) } }) });
  });
}

// Say something, then wait until Jarvis has finished (not thinking/speaking) and is listening again.
// Like a real microphone, the fake one only hears while a listener is running. Jarvis restarts its listener a moment
// after it stops talking, so wait (up to 3 s) for one to be live: on a slow machine a fixed pause wasn't enough and words got lost.
const sayNow = async (p, t) => { await p.waitForFunction(() => window.__rec && window.__rec.live, null, { timeout:3000 }).catch(() => {}); await p.evaluate(t => window.__say(t), t); };
async function settle(p, minWait = 300){
  await p.waitForTimeout(minWait);
  const busy = () => p.evaluate(() => { const m = document.getElementById("mode").textContent; return /Processing|Speaking/.test(m) || !document.getElementById("confirmBox").hidden && false; });
  for(let i = 0; i < 60 && await busy(); i++) await p.waitForTimeout(100);
  await p.waitForTimeout(500);   // listener restarts ~300 ms after Jarvis stops talking
}
const say = async (p, t, wait = 300) => { await sayNow(p, t); await settle(p, wait); };
const log = p => p.evaluate(() => window.__log);

console.log("Start screen, voice, wake word, conversation");
{
  const p = await open({ script:[{ text:"It is noon. Anything else?" }, { text:"Tomorrow is clear." }, { text:"Fine, thank you." }] });
  check("start screen shows", await p.locator("#boot").isVisible());
  await p.click("#bootBtn"); await settle(p);
  check("greets out loud after Initialize", (await p.evaluate(() => window.__spoken)).length === 1);
  await say(p, "random chatter in the room", 300);
  check("ignores speech without its name", (await log(p)).length === 0);
  await say(p, "jarvis");
  check("bare name opens conversation", /Yes, sir\?|Go ahead, sir/.test(await p.locator("#mode").textContent()));
  await say(p, "what time is it", 900);
  await say(p, "and tomorrow", 900);
  check("follow-up works without the name", (await log(p)).length === 2);
  await say(p, "that's all", 400);
  await say(p, "this should be ignored", 400);
  check("'that's all' ends the conversation", (await log(p)).length === 2);
  await say(p, "Jarvis, how are you", 900);
  check("name + question in one go", (await log(p)).length === 3);
  check("microphone is listening again after it answers", await p.waitForFunction(() => window.__rec && window.__rec.live, null, { timeout:3000 }).then(() => true, () => false));
  const box = await p.locator("#reactor").boundingBox();
  check("reactor centred horizontally", Math.abs(box.x + box.width / 2 - 720) < 4, box.x + box.width / 2);
  await p.screenshot({ path: path.join(shots, "desktop.png") });
  await p.setViewportSize({ width:400, height:850 }); await p.waitForTimeout(300);
  check("no sideways scroll on phones", (await p.evaluate(() => document.documentElement.scrollWidth)) <= 400);
  await p.screenshot({ path: path.join(shots, "phone.png") });
  check("no page errors", p.errs.length === 0, p.errs.join(" | "));
  await p.close();
}

console.log("Acting like JARVIS: spoken acknowledgements, welcome status, meeting alerts");
{
  const p = await open({ googleBefore:true, script:[ { text:"It is noon, sir.", delay:2600 }, { text:"Two unread, sir. Nothing urgent.", delay:5500 }, { text:"Also clear, sir.", delay:5500 } ],
    events:[ { title:"Board meeting", location:"Conference room", inMin:10 }, { title:"Lunch with Happy", inMin:120 } ], unread:3 }, undefined, HTTP_PAGE);
  const spoken = () => p.evaluate(() => window.__spoken);
  await p.click("#bootBtn"); await settle(p, 1200);   // Google was connected before, so this click reconnects it
  const hi = (await spoken()).find(t => /Good (morning|afternoon|evening)|Working late/.test(t)) || "";
  check("'welcome home' greeting gives the time, next appointment and unread mail", /It's \d/.test(hi) && /next appointment is Board meeting/.test(hi) && /3 unread emails/.test(hi), hi);
  check("speaks up before a meeting without being asked (after saying hello)", (await spoken()).findIndex(t => /Board meeting starts in (9|10) minutes in Conference room/.test(t)) > (await spoken()).indexOf(hi), (await spoken()).join(" | "));
  await settle(p);
  const n0 = (await spoken()).length;
  await say(p, "jarvis", 300);
  check("answers out loud when you say its name", /^(Yes, sir\?|At your service, sir\.|Sir\?|I'm here, sir\.|Go ahead, sir\.|Listening, sir\.)$/.test((await spoken())[n0] || ""), (await spoken()).slice(n0).join(" | "));
  const ACK = /One moment|Right away|Working on it|On it|Just a moment|Checking now/;
  const n0b = (await spoken()).length;
  await sayNow(p, "what time is it"); await settle(p, 800);
  check("no 'one moment' when the answer comes quickly", !(await spoken()).slice(n0b).some(t => ACK.test(t)) && (await spoken()).at(-1) === "It is noon, sir.", (await spoken()).slice(n0b).join(" | "));
  const n1 = (await spoken()).length;
  await sayNow(p, "any important email"); await p.waitForTimeout(4600);
  const mid = await spoken();
  check("says 'one moment' while it works on something slow", mid.slice(n1).some(t => ACK.test(t)), mid.slice(n1).join(" | "));
  // (the "one moment" itself shows "Speaking" for an instant, so allow a moment to get back to "Processing")
  check("…and still shows it's working", await p.waitForFunction(() => /Processing/.test(document.getElementById("mode").textContent), null, { timeout:700 }).then(() => true, () => false), await p.locator("#mode").textContent());
  await settle(p, 1500);
  check("…then gives the answer", (await spoken()).at(-1) === "Two unread, sir. Nothing urgent.");
  const n2 = (await spoken()).length;
  await sayNow(p, "anything on the calendar"); await settle(p, 800);
  check("…but doesn't say it again on the very next slow answer", !(await spoken()).slice(n2).some(t => ACK.test(t)) && (await spoken()).at(-1) === "Also clear, sir.", (await spoken()).slice(n2).join(" | "));
  check("no page errors", p.errs.length === 0, p.errs.join(" | "));
  await p.close();
}

console.log("Memory, confirmations, drafts, events, web search fallback, diagnostics");
{
  const p = await open({ script:[
    { err:"web_search tool is not enabled for this organization" }, { tool:"remember", input:{ fact:"Acme is my biggest client" } }, { text:"Noted." },
    { tool:"draft_email", input:{ to:["pepper@example.com"], subject:"Board meeting", body:"Hi Pepper,\nSee you at 9.\nTony" } }, { text:"Draft saved." },
    { tool:"draft_email", input:{ to:["happy@example.com"], body:"Car at 8" } }, { text:"Nothing saved." },
    { tool:"create_event", input:{ title:"Call with Mark", start:"2026-10-16T15:00", attendees:["mark@example.com"], add_meet:true } }, { text:"Booked." },
    { tool:"log_bug", input:{ description:"Did not hear me with music on" } }, { text:"Logged." },
    { err:"invalid x-api-key", status:401 }
  ]});
  await p.click("#bootBtn"); await settle(p);
  await p.click("#gearBtn"); await p.click("#gBtn"); await p.waitForTimeout(400); await p.click("#closeBtn");
  await say(p, "jarvis remember that acme is my biggest client", 900);
  let L = await log(p);
  check("offers web search first", L[0].tools.includes("web_search"));
  check("retries without web search when it's disabled", !L[1].tools.includes("web_search"));
  check("local version doesn't offer brokerage tools", !L[0].tools.some(t => t.startsWith("portfolio_")));
  check("Jarvis is told it CAN open websites and play music", /open_website/.test(L[0].system) && /play_music/.test(L[0].system) && L[0].tools.includes("open_website") && L[0].tools.includes("play_music"));
  check("no blanket 'everything is read-only' rule that makes it refuse", !/Everything is read-only/i.test(L[0].system));
  check("memory saved", (await p.evaluate(() => localStorage.getItem("jarvis.memory"))).includes("Acme"));
  await say(p, "draft pepper an email");
  check("confirmation card appears", await p.locator("#confirmBox").isVisible());
  check("asks out loud", /Shall I go ahead\?$/.test((await p.evaluate(() => window.__spoken)).slice(-1)[0]));
  await say(p, "yes", 900);
  L = await log(p);
  check("'yes' saves the draft", L.filter(x => x.draft).length === 1);
  check("tool results are sent as JSON, not [object Object]", JSON.stringify(L.filter(x => x.last).at(-1).last).includes('\\"saved\\":true'));
  await say(p, "draft one to happy"); await say(p, "no, cancel", 900);
  check("'no' saves nothing", (await log(p)).filter(x => x.draft).length === 1);
  await say(p, "book a call with mark"); await p.click("#confirmYes"); await p.waitForTimeout(800);
  const ev = (await log(p)).find(x => x.event);
  check("event created with invite + Meet", ev && ev.event.attendees?.[0]?.email === "mark@example.com" && !!ev.event.conferenceData && ev.url.includes("sendUpdates=all"));
  await say(p, "log a bug: you did not hear me with music on", 900);
  check("bug logged by voice", (await p.evaluate(() => localStorage.getItem("jarvis.bugs") || "")).includes("music"));
  await say(p, "what's new", 900);
  check("bad key shows a clear message", /API key was rejected/.test(await p.locator("#capJ").textContent()));
  await p.click("#gearBtn"); await p.waitForTimeout(200);
  const href = await p.locator("#issueLink").getAttribute("href");
  check("report link targets the repo's issues", href.startsWith("https://github.com/givulescudavid-netizen/Jarvis/issues/new?"));
  const report = new URL(href).searchParams.get("body");
  check("report includes the logged bug and the error log", report.includes("music") && report.includes("[api]"));
  check("report never contains keys", !/sk-ant-/.test(report));
  check("report includes what you said and the error Jarvis showed", /\[you said\] what's new/.test(report) && /\[error shown\] The API key was rejected/.test(report), report.slice(-600));
  await p.click("#closeBtn").catch(() => {}); await p.waitForTimeout(150);
  await say(p, "jarvis email a.b@example.com or call +34 600 000 000 about https://x.example/y", 900);
  await p.click("#gearBtn"); await p.waitForTimeout(200);
  const red = new URL(await p.locator("#issueLink").getAttribute("href")).searchParams.get("body");
  check("…with emails, phone numbers and links blanked out (reports are public)", /\[you said\] [Jj]arvis email \[email\] or call \[number\] about \[link\]/.test(red) && !/example\.com|600 000/.test(red), red.slice(-500));
  check("no page errors", p.errs.length === 0, p.errs.join(" | "));
  await p.close();
}

console.log("Voice glow, Apple Music, websites");
{
  const p = await open({ slowVoice:true, script:[
    { tool:"play_music", input:{ query:"back in black acdc", type:"song" } }, { text:"Playing Back in Black by AC DC on Apple Music, sir. Enjoy the noise." },
    { tool:"open_website", input:{ url:"youtube.com", name:"YouTube" } }, { text:"YouTube is open." }
  ]});
  await p.click("#bootBtn");
  const levels = [];
  for(let k = 0; k < 12; k++){ await p.waitForTimeout(120); levels.push(await p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--voice").trim())); }
  const distinct = new Set(levels.filter(v => v !== "" && v !== "0")).size;
  check("glow follows the voice while speaking (pulses, not constant)", distinct >= 3, levels.join(","));
  await p.waitForTimeout(2500);
  await say(p, "jarvis play back in black", 1500);
  const opened = await p.evaluate(() => window.__opened);
  check("music: opens the exact song on Apple Music", opened.some(u => u.includes("music.apple.com") && u.includes("?i=574050602")), opened.join(" "));
  check("music: shows a Play button as backup", await p.locator("#openLink").isVisible() && /Back In Black/.test(await p.locator("#openLink").textContent()));
  const L = await log(p);
  const res = JSON.stringify(L.filter(x => x.last).map(x => x.last.content));
  check("music: tells Claude what is playing", res.includes("Back In Black by AC/DC"));
  await p.waitForTimeout(3500);
  await p.evaluate(() => { window.__blockPopups = true; });
  await say(p, "jarvis open youtube", 1500);
  const op2 = await p.evaluate(() => window.__opened);
  check("website: adds https:// and opens it", op2.includes("https://youtube.com"));
  check("website: if Chrome blocks pop-ups, the Open button is there", (await p.locator("#openLink").getAttribute("href")) === "https://youtube.com" && await p.locator("#openLink").isVisible());
  check("no page errors", p.errs.length === 0, p.errs.join(" | "));
  await p.close();
}

console.log("Interrupting Jarvis (barge-in)");
{
  const LONG = "Your day looks busy, sir. At nine you have the board meeting with Pepper, then lunch with Happy at one, and in the afternoon three calls about the Stark Expo budget and the new reactor design.";
  const p = await open({ slowVoice:true, script:[ { text: LONG }, { text:"Tomorrow, then. Moving on." }, { text: LONG } ] });
  await p.click("#bootBtn"); await p.waitForTimeout(2500);
  await sayNow(p, "jarvis what does my day look like"); await p.waitForTimeout(1300);
  const before = (await log(p)).length;
  await sayNow(p, "the board meeting with Pepper"); await p.waitForTimeout(700);   // Jarvis's own words picked up by the mic
  check("ignores its own voice coming back through the speakers", (await log(p)).length === before && (await p.locator("#mode").textContent()) !== "Go ahead, sir");
  await sayNow(p, "wait move the lunch to tomorrow"); await p.waitForTimeout(1200);
  const L = await log(p);
  const last = L.at(-1).last.content;
  check("talking over it stops it immediately", (await p.evaluate(() => window.__cancels)) > 0);
  check("tells Claude it was interrupted, with what you heard", typeof last === "string" && last.includes("[You were interrupted") && last.includes("Your day looks busy"));
  check("only what you actually heard is reported, not the whole reply", !last.includes("new reactor design"));
  check("your words reach Claude", last.endsWith("wait move the lunch to tomorrow"));
  await p.waitForTimeout(1500);
  await sayNow(p, "and tomorrow?"); await p.waitForTimeout(1300);
  const n = (await log(p)).length;
  await sayNow(p, "stop"); await p.waitForTimeout(900);
  check("'stop' just stops: no new reply", (await log(p)).length === n);
  check("…and the conversation stays open", /Go ahead|Yes, sir/.test(await p.locator("#mode").textContent()));
  check("no page errors", p.errs.length === 0, p.errs.join(" | "));
  await p.close();
}

console.log("ElevenLabs voice");
{
  const LONG = "Good evening, sir. Your board meeting with Pepper is at nine, lunch with Happy is at one, and the reactor review runs all afternoon.";
  const p = await browser.newPage({ viewport:{ width:1440, height:900 } }); const errs = [];
  p.on("pageerror", e => errs.push(e.message));
  await fakeEleven(p, "ok");
  await p.addInitScript(...fakes({ eleven:true, script:[ { text: LONG }, { text:"Tomorrow it is." } ] }));
  await p.goto(PAGE); await p.waitForTimeout(800);
  check("ElevenLabs voices load into the one voice list, British voice picked", (await p.locator("#voiceSel").inputValue()) === "el:v-daniel" && /Daniel/.test(await p.locator("#elStatus").textContent()));
  const groups = await p.evaluate(() => [...document.querySelectorAll("#voiceSel optgroup")].map(g => g.label + ":" + g.children.length));
  check("with an ElevenLabs key, the list shows only ElevenLabs voices (no computer voices)", groups.length === 1 && groups[0] === "ElevenLabs:2", groups.join(" "));
  await p.click("#bootBtn"); await p.waitForTimeout(400);
  const tts = () => p.__el.filter(r => r.url.includes("/text-to-speech/"));
  check("speaks through ElevenLabs with your key and voice", tts().length > 0 && tts()[0].url.includes("/v-daniel/") && tts()[0].key === "el-test-key");
  check("…not the built-in voice", (await p.evaluate(() => window.__spoken.length)) === 0);
  await p.click("#gearBtn"); await p.selectOption("#voiceSel", "el:v-rachel");
  const before = tts().length; await p.click("#testVoice"); await p.waitForTimeout(800);
  check("picking another ElevenLabs voice switches to it", tts().length > before && tts().at(-1).url.includes("/v-rachel/") && (await p.evaluate(() => window.__spoken.length)) === 0);
  await p.selectOption("#voiceSel", "el:v-daniel"); await p.click("#closeBtn");
  await settle(p, 300);
  await sayNow(p, "jarvis what's my day"); await p.waitForTimeout(1600);
  const levels = [];
  for(let k = 0; k < 10; k++){ await p.waitForTimeout(90); levels.push(await p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--voice").trim())); }
  check("glow follows the real ElevenLabs audio", new Set(levels.filter(v => v && v !== "0")).size >= 2, levels.join(","));
  await sayNow(p, "wait make lunch tomorrow"); await p.waitForTimeout(1200);
  const last = (await log(p)).at(-1).last.content;
  check("interrupting ElevenLabs works and reports what you heard", typeof last === "string" && last.includes("[You were interrupted") && last.includes("Good evening") && !last.includes("reactor review"));
  check("no page errors", errs.length === 0, errs.join(" | "));
  await p.close();
}
{
  const p = await browser.newPage(); const errs = [];
  p.on("pageerror", e => errs.push(e.message));
  await fakeEleven(p, "badkey");
  await p.addInitScript(...fakes({ eleven:true }));
  await p.goto(PAGE); await p.waitForTimeout(800);
  check("bad ElevenLabs key: clear message with ElevenLabs' own reason", /isn't valid/.test(await p.locator("#elStatus").textContent()) && /Invalid API key/.test(await p.locator("#elStatus").textContent()));
  await p.click("#bootBtn"); await p.waitForTimeout(600);
  check("…and NEVER falls back to the computer voice", (await p.evaluate(() => window.__spoken.length)) === 0);
  check("…the reason is shown under the reactor", await p.locator("#voiceErr").isVisible() && /isn't valid/.test(await p.locator("#voiceErr").textContent()));
  await p.click("#gearBtn"); await p.click("#elRemove"); await p.click("#closeBtn");
  await p.click("#reactor").catch(() => {}); await p.evaluate(() => window.__say("jarvis hello")); await p.waitForTimeout(800);
  check("'Remove ElevenLabs key' brings the computer voices back", (await p.evaluate(() => document.querySelectorAll("#voiceSel optgroup")[0]?.label)) === "This computer");
  check("no page errors", errs.length === 0, errs.join(" | "));
  await p.close();
}

{
  const p = await browser.newPage(); const errs = [];
  p.on("pageerror", e => errs.push(e.message));
  await fakeEleven(p, "noVoicesPerm");
  await p.addInitScript(...fakes({ eleven:true }));
  await p.goto(PAGE); await p.waitForTimeout(800);
  check("key that can't list voices: falls back to ElevenLabs' standard voices", (await p.locator("#voiceSel").inputValue()) === "el:JBFqnCBsd6RMkjVDRZzb" && /standard voices/.test(await p.locator("#elStatus").textContent()));
  await p.click("#bootBtn"); await p.waitForTimeout(600);
  check("…and still speaks with ElevenLabs", p.__el.some(r => r.url.includes("/text-to-speech/JBFqnCBsd6RMkjVDRZzb/")) && (await p.evaluate(() => window.__spoken.length)) === 0);
  check("no page errors", errs.length === 0, errs.join(" | "));
  await p.close();
}
{
  const p = await browser.newPage(); const errs = [];
  p.on("pageerror", e => errs.push(e.message));
  await fakeEleven(p, "noTtsPerm");
  await p.addInitScript(...fakes({ eleven:true }));
  await p.goto(PAGE); await p.waitForTimeout(800);
  await p.click("#bootBtn"); await p.waitForTimeout(800);
  const st = await p.locator("#elStatus").textContent();
  check("key missing Text to Speech permission: says exactly that and how to fix it", /missing a permission/.test(st) && /text_to_speech/.test(st) && /Text to Speech/.test(st));
  check("…no computer voice", (await p.evaluate(() => window.__spoken.length)) === 0);
  check("…and says why on the main screen, not just in settings", /ElevenLabs didn't speak/.test(await p.locator("#voiceErr").textContent()));
  check("no page errors", errs.length === 0, errs.join(" | "));
  await p.close();
}
{
  const p = await browser.newPage(); const errs = [];
  p.on("pageerror", e => errs.push(e.message));
  await p.route(/api\.elevenlabs\.io/, route => {
    const cors = { "access-control-allow-origin":"*" };
    if(route.request().url().endsWith("/v1/voices")) return route.fulfill({ headers:cors, contentType:"application/json", body:'{"voices":[{"voice_id":"lib1","name":"Movie Butler"}]}' });
    return route.fulfill({ status:402, headers:cors, contentType:"application/json", body:'{"detail":{"status":"payment_required","message":"Free users cannot use library voices via the API. Please upgrade your subscription to use this voice."}}' });
  });
  await p.addInitScript(...fakes({ eleven:true }));
  await p.goto(PAGE); await p.waitForTimeout(800);
  await p.click("#bootBtn"); await p.waitForTimeout(800);
  check("Voice Library voice on a free plan: explains it needs a paid plan and suggests standard voices", /Voice Library/.test(await p.locator("#elStatus").textContent()) && /George/.test(await p.locator("#voiceErr").textContent()));
  check("no page errors", errs.length === 0, errs.join(" | "));
  await p.close();
}

console.log("Finance: DCF co-pilot, markets, comps, price alerts");
{
  const p = await open({ googleBefore:true, ls:{ "jarvis.fhKey":"fh-test" }, script:[
    { tool:"dcf_new", input:{ company:"Nvidia", ticker:"NVDA" } }, { text:"I need your template first, sir." },
    { tool:"dcf_inspect", input:{ file_id:"TEMPLATE1" } }, { text:"Inputs are on the Inputs tab." },
    { tool:"dcf_save_template", input:{ file_id:"TEMPLATE1", title:"My DCF", inputs:[{ name:"Revenue growth Y1", cell:"Inputs!C8" }, { name:"WACC", cell:"Inputs!C20" }], outputs:[{ name:"Implied share price", cell:"DCF!H40" }] } }, { text:"Saved." },
    { tool:"dcf_new", input:{ company:"Nvidia", ticker:"NVDA" } }, { text:"Your copy is open." },
    { tool:"dcf_set_inputs", input:{ file_id:"COPY1", values:[{ cell:"Inputs!C8", value:"35%" }, { cell:"Inputs!C20", value:"9.5%" }] } }, { text:"Implied price is $128." },
    { tool:"dcf_set_inputs", input:{ file_id:"TEMPLATE1", values:[{ cell:"Inputs!C8", value:"1%" }] } }, { text:"I can't edit your template." },
    { tool:"watchlist_add", input:{ symbol:"nvda", below:110 } }, { text:"Watching." },
    { tool:"build_comps", input:{ symbols:["NVDA", "AMD"] } }, { text:"Comps sheet created." } ] }, undefined, HTTP_PAGE);
  await p.evaluate(() => {
    window.__sheetsLog = [];
    window.__extraFetch = async (u, o, J) => {
      if(u.includes("sheets.googleapis.com") || u.includes("/drive/v3/files/")){
        window.__sheetsLog.push({ u, method:o?.method || "GET", body:o?.body ? JSON.parse(o.body) : null });
        if(u.includes("/copy")) return J({ id:"COPY1", name:"DCF copy" });
        if(u.includes("fields=properties.title")) return J({ properties:{ title:"My DCF" }, sheets:[{ properties:{ title:"Inputs" } }, { properties:{ title:"DCF" } }] });
        if(u.includes("valueRenderOption=FORMULA")) return J({ valueRanges:[{ values:[["Revenue growth Y1", 0.3], ["WACC", 0.09]] }, { values:[["Implied share price", "=H38/H39"]] }] });
        if(u.includes("DCF!H40")) return J({ valueRanges:[{ values:[["$128.40"]] }] });
        if(u.includes("valueRenderOption=FORMATTED_VALUE")) return J({ valueRanges:[{ values:[["Revenue growth Y1", "30%"], ["WACC", "9.0%"]] }, { values:[["Implied share price", "$128.40"]] }] });
        if(u.endsWith("/values:batchUpdate")) return J({ totalUpdatedCells:2 });
        if(/spreadsheets\/$/.test(u) && o?.method === "POST") return J({ spreadsheetId:"COMPS1" });
        return J({});
      }
      if(u.includes("finnhub.io")){
        window.__fh = (window.__fh || 0) + 1;
        if(u.includes("/quote")) return J({ c: u.includes("NVDA") ? 108.5 : 150, d:-2, dp:-1.8, pc:110.5, h:111, l:108 });
        if(u.includes("/stock/metric")) return J({ metric:{ peTTM:55.2, evEbitdaTTM:40.1, grossMarginTTM:75, beta:1.7, junkField:1 } });
        if(u.includes("/stock/profile2")) return J({ name:"NVIDIA Corp", shareOutstanding:24400, marketCapitalization:2650000 });
        return J([]);
      }
      return null;
    };
  });
  await p.click("#bootBtn"); await settle(p, 1000);
  await say(p, "jarvis do a dcf on nvidia", 600);
  check("DCF: without a template, Jarvis is told to ask for it first", /No DCF template saved yet/.test(JSON.stringify((await log(p)).at(-1).last.content)));
  await say(p, "it's called My DCF", 900);
  const insp = JSON.stringify((await log(p)).at(-1).last.content);
  check("DCF: reads your template and marks formulas vs inputs", /B1=\$128\.40 \[=H38\/H39\]/.test(insp) && /B2=9\.0%/.test(insp), insp.slice(0, 300));
  await say(p, "yes that's right, save it", 700);
  check("DCF: template map saved", /My DCF/.test(await p.evaluate(() => localStorage.getItem("jarvis.dcfTemplate"))));
  await say(p, "start the nvidia dcf", 700);
  check("DCF: asks before making a copy", await p.locator("#confirmBox").isVisible() && /copy of your DCF template/.test(await p.locator("#confirmText").textContent()));
  await say(p, "yes", 1200);
  const sl = await p.evaluate(() => window.__sheetsLog);
  check("DCF: copies your template (never edits it)", sl.some(x => /files\/TEMPLATE1\/copy/.test(x.u) && x.method === "POST") && (await p.evaluate(() => window.__opened)).some(u => /COPY1/.test(u)));
  await say(p, "35 percent growth and 9.5 percent wacc", 1200);
  const upd = (await p.evaluate(() => window.__sheetsLog)).find(x => /COPY1\/values:batchUpdate/.test(x.u));
  check("DCF: writes your assumptions into the copy", upd && upd.body.data.length === 2 && upd.body.data[0].range === "Inputs!C8" && upd.body.data[0].values[0][0] === "35%");
  check("DCF: reads back the implied share price", /Implied share price/.test(JSON.stringify((await log(p)).at(-1).last.content)) && /128\.40/.test(JSON.stringify((await log(p)).at(-1).last.content)));
  await say(p, "now change the template", 900);
  check("DCF: refuses to edit your original template", /only edits spreadsheets it created/.test(JSON.stringify((await log(p)).at(-1).last.content)) && !(await p.evaluate(() => window.__sheetsLog)).some(x => /TEMPLATE1\/values:batchUpdate/.test(x.u)));
  await say(p, "watch nvidia and tell me if it drops below 110", 1500);
  await p.waitForTimeout(800);
  check("markets: watchlist shows on the dashboard with the price", await p.locator("#marketsBox").isVisible() && /NVDA/.test(await p.locator("#marketsList").textContent()) && /108\.50/.test(await p.locator("#marketsList").textContent()));
  check("markets: speaks a price alert when it drops below your level", (await p.evaluate(() => window.__spoken)).some(t => /NVDA has dropped below 110: now 108\.50/.test(t)), (await p.evaluate(() => window.__spoken)).slice(-3).join(" | "));
  await say(p, "build comps for nvidia and amd", 700);
  check("comps: asks before creating a sheet", await p.locator("#confirmBox").isVisible());
  await say(p, "yes", 1500);
  const comps = (await p.evaluate(() => window.__sheetsLog)).find(x => /COMPS1\/values:batchUpdate/.test(x.u));
  check("comps: new sheet with tickers, P/E, EV/EBITDA and medians", comps && JSON.stringify(comps.body).includes("NVIDIA Corp") && JSON.stringify(comps.body).includes("55.2") && JSON.stringify(comps.body).includes("=MEDIAN(E2:E3)"));
  check("Jarvis is told it can do DCFs and markets, without investment advice", /DCF co-pilot/.test((await log(p))[0].system) && /Never present anything as investment advice/.test((await log(p))[0].system));
  check("no page errors", p.errs.length === 0, p.errs.join(" | "));
  await p.close();
}

console.log("Unfinished web-search steps don't break the conversation");
{
  const p = await open({ script:[
    { raw:{ stop_reason:"max_tokens", content:[ { type:"text", text:"Let me check the filings." }, { type:"server_tool_use", id:"srvtoolu_1", name:"code_execution", input:{ code:"..." } } ] } },
    { text:"Nvidia reports next week, sir." },
    { err:"messages.9: `code_execution` tool use with id `srvtoolu_01Us8n` was found without a corresponding `code_execution_tool_result` block" },
    { text:"Back with you, sir." } ] });
  await p.click("#bootBtn"); await settle(p);
  await say(p, "jarvis what is nvidia's revenue", 700);
  await say(p, "when do they report", 700);
  const l = (await log(p)).filter(x => x.msgs);
  const sent = JSON.stringify(l[1]?.msgs || []);
  check("a reply cut off mid-search is saved without the unfinished step", !/server_tool_use/.test(sent) && /Let me check the filings/.test(sent), sent.slice(0, 300));
  check("…so the next question works", /reports next week/.test((await p.evaluate(() => window.__spoken)).join(" ")));
  await say(p, "and what about apple", 900);
  const l2 = (await log(p)).filter(x => x.msgs);
  check("if Claude still rejects the history, Jarvis starts the conversation afresh and answers", /Back with you/.test((await p.evaluate(() => window.__spoken)).join(" ")) && l2.at(-1).msgs.length === 1, JSON.stringify(l2.at(-1)?.msgs).slice(0, 200));
  check("…without showing an Uplink error", !/Uplink error/.test(await p.locator("body").innerText()));
  check("no page errors", p.errs.length === 0, p.errs.join(" | "));
  await p.close();
}

console.log("Restaurant bookings (hand-off to Claude in Chrome)");
{
  const p = await open({ script:[
    { text:"Certainly, sir. How many of you, and if eight isn't free, what's the earliest and latest you'd accept?" },
    { tool:"book_restaurant", input:{ restaurant:"Nobu", city:"Madrid", date:"Friday 17 October 2026", time:"8:00 PM", party_size:2, earliest_time:"7:30 PM", latest_time:"9:00 PM", seating:"window table", occasion:"anniversary", dietary:"no shellfish", deposit:"skip", name:"Alex Test", phone:"+34 600 000 000", email:"alex@example.com" } },
    { text:"The booking search is open, sir. Copy the instructions, click the Claude icon in Chrome and paste; it will pick the closest time between half seven and nine and show you everything before booking." } ] }, undefined, HTTP_PAGE);
  await p.context().grantPermissions(["clipboard-read", "clipboard-write"], { origin: new URL(HTTP_PAGE).origin });
  await p.click("#bootBtn"); await settle(p);
  await say(p, "jarvis book me a table at nobu friday at 8", 900);
  check("booking: Jarvis asks follow-up questions by voice first", /earliest and latest/.test((await p.evaluate(() => window.__spoken)).at(-1) || ""));
  await say(p, "two of us, between seven thirty and nine, window table, it's our anniversary, no shellfish, skip it if there's a deposit", 900);
  const text = await p.locator("#handoffText").inputValue();
  check("booking: instructions card appears", await p.locator("#handoffBox").isVisible());
  check("…with restaurant, date, time, party size and your details", /Nobu in Madrid for 2 people on Friday 17 October 2026 at 8:00 PM/.test(text) && /Alex Test/.test(text), text);
  check("…with your time window, so Claude in Chrome doesn't need to ask", /closest to it between 7:30 PM and 9:00 PM without asking me/.test(text), text);
  check("…with seating, occasion and allergies as special requests", /window table/.test(text) && /anniversary/.test(text) && /no shellfish/.test(text));
  check("…with your deposit choice and the safety rules", /deposit or a card to hold the table, don't book/.test(text) && /wait for my OK/.test(text));
  check("…and opens a search for the booking page", (await p.evaluate(() => window.__opened)).some(u => /google\.com\/search\?q=Nobu%20Madrid%20reservations/.test(u)));
  await p.click("#handoffCopy"); await p.waitForTimeout(200);
  check("Copy puts the instructions on the clipboard", (await p.evaluate(() => navigator.clipboard.readText())) === text);
  check("…and says what to do next", /click the Claude icon/.test(await p.locator("#handoffNote").textContent()));
  check("Jarvis is told to interview you first and explain what happens next", /You do not click or type on websites yourself/.test((await log(p))[0].system) && /earliest and latest you'd accept/.test((await log(p))[0].system) && /offer to remember them/.test((await log(p))[0].system));
  check("no page errors", p.errs.length === 0, p.errs.join(" | "));
  await p.close();
}

console.log("Microphone indicator and mic check");
{
  const p = await open({ script:[ { text:"Yes, sir." } ] }, undefined, HTTP_PAGE);
  await p.click("#bootBtn"); await settle(p);
  check("header shows the mic is listening", /listening/.test(await p.locator("#micChipTxt").textContent()) && (await p.locator("#micChip").getAttribute("class")).includes("on"));
  await say(p, "jarvis what time is it");
  await p.click("#micChip"); await p.waitForTimeout(800);
  check("mic check shows what it last heard", /what time is it/.test(await p.locator("#mcHeard").textContent()));
  check("mic check shows which microphone Chrome is using", !/–|not available/.test(await p.locator("#mcDev").textContent()), await p.locator("#mcDev").textContent());
  check("mic check shows Chrome's permission", /allowed|not decided/.test(await p.locator("#mcPerm").textContent()), await p.locator("#mcPerm").textContent());
  await p.click("#closeBtn");
  await p.evaluate(() => window.__micError("not-allowed")); await p.waitForTimeout(300);
  check("blocked mic: header turns red and says why", /blocked/.test(await p.locator("#micChipTxt").textContent()) && /blocking the microphone/.test(await p.locator("#mcErr").textContent()));
  check("no page errors", p.errs.length === 0, p.errs.join(" | "));
  await p.close();
  const q = await open({ micBusy:true }, undefined, HTTP_PAGE);
  await q.click("#bootBtn"); await settle(q);
  await q.click("#micChip"); await q.waitForTimeout(500);
  check("mic in use by another app: says so plainly", /another app/.test(await q.locator("#mcErr").textContent()), await q.locator("#mcErr").textContent());
  check("no page errors", q.errs.length === 0, q.errs.join(" | "));
  await q.close();
}

console.log("Browsers without voice listening");
{
  const p = await open({ noSR:true });
  check("explains which browser it's in and to use Chrome, with the link", /Listening doesn't work in/.test(await p.locator("#capJ").textContent()) && /Google Chrome/.test(await p.locator("#capJ").textContent()) && /github\.io\/Jarvis/.test(await p.locator("#capJ").textContent()));
  check("no page errors", p.errs.length === 0, p.errs.join(" | "));
  await p.close();
}

console.log("Its own window (pop out / app)");
{
  const p = await open({}, undefined, HTTP_PAGE);
  await p.click("#bootBtn"); await settle(p);
  await p.click("#popBtn");
  const opened = await p.evaluate(() => window.__opened);
  check("⧉ pops Jarvis out into its own window", opened.some(u => /index\.html\?mini=1$/.test(u)), opened.join(" "));
  // simulate leaving the tab for a while, then coming back
  await p.evaluate(() => { Object.defineProperty(document, "visibilityState", { configurable:true, get:() => "hidden" }); document.dispatchEvent(new Event("visibilitychange")); });
  await p.evaluate(() => { window.__hiddenAt = Date.now(); });
  await p.evaluate(() => { const real = Date.now; Date.now = () => real() + 10000; Object.defineProperty(document, "visibilityState", { configurable:true, get:() => "visible" }); document.dispatchEvent(new Event("visibilitychange")); Date.now = real; });
  check("after being in a background tab, explains why and suggests ⧉", /own window/.test(await p.locator("#capJ").textContent()));
  check("app install details are published", (await p.evaluate(async () => (await fetch("manifest.webmanifest")).ok && (await fetch("icons/icon-512.png")).ok)));
  check("no page errors", p.errs.length === 0, p.errs.join(" | "));
  await p.close();
  const m = await open({}, { width:440, height:600 }, HTTP_PAGE + "?mini=1");
  check("the pop-out window shows just the reactor (compact layout)", await m.evaluate(() => document.documentElement.classList.contains("mini")) && await m.locator(".side.left").isHidden() && await m.locator("#reactor").isVisible());
  await m.click("#bootBtn"); await settle(m);
  check("…and works normally", (await m.evaluate(() => window.__spoken.length)) === 1 && /Say "Jarvis"|Go ahead|Yes, sir/.test(await m.locator("#mode").textContent()));
  check("…no sideways scrolling", (await m.evaluate(() => document.documentElement.scrollWidth)) <= 440);
  await m.screenshot({ path: path.join(shots, "popout.png") });
  check("no page errors", m.errs.length === 0, m.errs.join(" | "));
  await m.close();
}

console.log("Only one Jarvis at a time");
{
  const ctx = await browser.newContext();   // same browser profile, two tabs
  const errs = [];
  const tab = async () => { const p = await ctx.newPage(); p.on("pageerror", e => errs.push(e.message)); await p.addInitScript(...fakes({ script:[ { text:"Here, sir." }, { text:"Here, sir." } ] })); await p.goto(HTTP_PAGE); await p.waitForTimeout(600); return p; };
  const a = await tab(); await a.click("#bootBtn"); await settle(a);
  const b = await tab();
  await a.waitForTimeout(300);
  check("opening Jarvis in a second tab pauses the first one", await a.locator("#boot").isVisible() && /another tab/.test(await a.locator("#bootNote").textContent()));
  await a.evaluate(() => window.__say("jarvis what time is it")); await a.waitForTimeout(800);
  check("…the paused tab doesn't answer", (await a.evaluate(() => window.__log.length)) === 0 && (await a.evaluate(() => window.__spoken.length)) <= 1);
  await a.click("#bootBtn"); await a.waitForTimeout(400);
  check("clicking 'Use Jarvis in this tab' takes over and pauses the other", await b.locator("#boot").isVisible() && /another tab/.test(await b.locator("#bootNote").textContent()) && await a.locator("#boot").isHidden());
  check("no page errors", errs.length === 0, errs.join(" | "));
  await ctx.close();
}

console.log("Online version (claude.ai connectors)");
{
  const p = await open({ mcp:true });
  await p.click("#bootBtn"); await settle(p);
  await say(p, "jarvis draft pepper a note", 500);
  check("confirmation card appears", await p.locator("#confirmBox").isVisible());
  await p.click("#confirmYes"); await p.waitForTimeout(500);
  const c = (await p.evaluate(() => window.__calls)).find(c => c[1] === "create_draft");
  check("draft goes through the Gmail connector", c && c[0] === "Gmail" && c[2].to[0] === "pepper@example.com");
  check("no page errors", p.errs.length === 0, p.errs.join(" | "));
  await p.close();
}

await browser.close(); server.close();
console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
