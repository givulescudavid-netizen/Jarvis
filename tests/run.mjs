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
const browser = await chromium.launch(exe ? { executablePath: exe } : {});

let failed = 0, passed = 0;
function check(name, ok, info = ""){ if(ok){ passed++; console.log("  ✓", name); } else { failed++; console.log("  ✗", name, info); } }

// Fakes injected before the page loads. `script` is the list of replies the fake Claude gives, in order.
function fakes({ mcp = false, script = [] } = {}){
  return [({ mcp, script }) => {
    localStorage.setItem("jarvis.key", '"sk-ant-test"'); localStorage.setItem("jarvis.gclient", '"x.apps.googleusercontent.com"');
    window.__spoken = []; window.__log = [];
    const synth = { speaking:false, pending:false, cancel(){}, resume(){}, getVoices(){ return [{ name:"Daniel", lang:"en-GB" }]; },
      speak(u){ window.__spoken.push(u.text); setTimeout(() => { u.onstart && u.onstart(); setTimeout(() => u.onend && u.onend(), 20); }, 5); } };
    Object.defineProperty(window, "speechSynthesis", { value: synth });
    window.SpeechSynthesisUtterance = function(t){ this.text = t; };
    class FakeSR { constructor(){ window.__rec = this; } start(){ setTimeout(() => this.onstart && this.onstart(), 5); } stop(){ this.onend && this.onend(); } abort(){ this.onend && this.onend(); } }
    window.SpeechRecognition = FakeSR; window.webkitSpeechRecognition = FakeSR;
    window.__say = txt => { const r = [{ transcript: txt }]; r.isFinal = true; window.__rec && window.__rec.onresult({ resultIndex:0, results:[r] }); };
    window.google = { accounts:{ oauth2:{ initTokenClient: o => ({ requestAccessToken: () => setTimeout(() => o.callback({ access_token:"tok", expires_in:3600 }), 5) }) } } };
    let call = 0; const realFetch = window.fetch;
    window.fetch = async (u, o) => {
      u = String(u); const J = (x, st = 200) => new Response(JSON.stringify(x), { status: st });
      if(u.includes("api.anthropic.com")){
        const body = JSON.parse(o.body); window.__log.push({ tools: body.tools.map(t => t.name), last: body.messages.at(-1) });
        const st = script[call++] || { text: "Done." };
        if(st.err) return J({ error:{ message: st.err } }, st.status || 400);
        if(st.tool) return J({ stop_reason:"tool_use", content:[{ type:"tool_use", id:"t" + call, name: st.tool, input: st.input }] });
        return J({ stop_reason:"end_turn", content:[{ type:"text", text: st.text }] });
      }
      if(u.includes("gmail.googleapis.com") && u.includes("/drafts")){ window.__log.push({ draft: JSON.parse(o.body) }); return J({ id:"d1" }); }
      if(u.includes("calendar/v3") && o && o.method === "POST"){ window.__log.push({ event: JSON.parse(o.body), url: u }); return J({ id:"e1" }); }
      if(u.includes("calendar/v3")) return J({ items:[] });
      if(u.includes("gmail.googleapis.com")) return J({ messages:[] });
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
  }, { mcp, script }];
}
async function open(opts, viewport = { width:1440, height:900 }){
  const p = await browser.newPage({ viewport }); const errs = [];
  p.on("pageerror", e => errs.push(e.message));
  await p.addInitScript(...fakes(opts));
  await p.goto(PAGE); await p.waitForTimeout(600);
  p.errs = errs; return p;
}
const say = async (p, t, wait = 700) => { await p.evaluate(t => window.__say(t), t); await p.waitForTimeout(wait); };
const log = p => p.evaluate(() => window.__log);

console.log("Start screen, voice, wake word, conversation");
{
  const p = await open({ script:[{ text:"It is noon. Anything else?" }, { text:"Tomorrow is clear." }, { text:"Fine, thank you." }] });
  check("start screen shows", await p.locator("#boot").isVisible());
  await p.click("#bootBtn"); await p.waitForTimeout(300);
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
  const box = await p.locator("#reactor").boundingBox();
  check("reactor centred horizontally", Math.abs(box.x + box.width / 2 - 720) < 4, box.x + box.width / 2);
  await p.screenshot({ path: path.join(shots, "desktop.png") });
  await p.setViewportSize({ width:400, height:850 }); await p.waitForTimeout(300);
  check("no sideways scroll on phones", (await p.evaluate(() => document.documentElement.scrollWidth)) <= 400);
  await p.screenshot({ path: path.join(shots, "phone.png") });
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
  await p.click("#bootBtn"); await p.waitForTimeout(200);
  await p.click("#gearBtn"); await p.click("#gBtn"); await p.waitForTimeout(400); await p.click("#closeBtn");
  await say(p, "jarvis remember that acme is my biggest client", 900);
  let L = await log(p);
  check("offers web search first", L[0].tools.includes("web_search"));
  check("retries without web search when it's disabled", !L[1].tools.includes("web_search"));
  check("local version doesn't offer brokerage tools", !L[0].tools.some(t => t.startsWith("portfolio_")));
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
  check("report link targets the repo's issues", href.startsWith("https://github.com/givulescudavid-netizen/jarvis/issues/new?"));
  const report = decodeURIComponent(href);
  check("report includes the logged bug and the error log", report.includes("music") && report.includes("[api]"));
  check("report never contains keys", !/sk-ant-/.test(report));
  check("no page errors", p.errs.length === 0, p.errs.join(" | "));
  await p.close();
}

console.log("Online version (claude.ai connectors)");
{
  const p = await open({ mcp:true });
  await p.click("#bootBtn"); await p.waitForTimeout(200);
  await say(p, "jarvis draft pepper a note", 500);
  check("confirmation card appears", await p.locator("#confirmBox").isVisible());
  await p.click("#confirmYes"); await p.waitForTimeout(500);
  const c = (await p.evaluate(() => window.__calls)).find(c => c[1] === "create_draft");
  check("draft goes through the Gmail connector", c && c[0] === "Gmail" && c[2].to[0] === "pepper@example.com");
  check("no page errors", p.errs.length === 0, p.errs.join(" | "));
  await p.close();
}

await browser.close();
console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
