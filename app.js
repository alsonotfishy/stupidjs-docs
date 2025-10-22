document.addEventListener("DOMContentLoaded", () => {

  (function injectStyles() {
    const css = `
:root{
  --bg: #f7fbff;
  --card: #ffffff;
  --muted: #6b7280;
  --accent: #0b74ff;
  --accent-2: #0056b3;
  --glass: rgba(255,255,255,0.6);
  --code-bg: #07111b;
  --accent-3: #eaf4ff;
  --radius: 12px;
  --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace;
  --shadow: 0 10px 30px rgba(11,74,187,0.06);
}
*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0;
  padding:0;
  font-family: Inter, "Segoe UI", Roboto, system-ui, -apple-system, "Helvetica Neue", Arial;
  background: linear-gradient(180deg,#f7fbff 0%,#f0f7ff 100%);
  color:#0f172a;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  line-height:1.45;
  padding-bottom:80px;
}
.container{
  max-width:1200px;
  margin:28px auto;
  padding:20px;
}
.header{
  background: linear-gradient(90deg, rgba(10,79,255,0.06), rgba(0,142,255,0.02));
  border-radius: var(--radius);
  padding:24px;
  position:relative;
  box-shadow: var(--shadow);
  display:flex;
  gap:20px;
  align-items:center;
}
.logo{ width:80px; height:80px; object-fit:contain; border-radius:10px; background:var(--glass); padding:10px; }
.header h1{ margin:0; font-size:20px; letter-spacing:-0.2px; }
.subtitle{ color:var(--muted); margin-top:6px; margin-bottom:0; font-size:14px; }
.size-info{ display:block; margin-top:8px; color:var(--muted); font-size:13px; }

.navbar{
  display:flex;
  gap:10px;
  flex-wrap:wrap;
  margin:18px 0;
  padding:12px;
  background:var(--accent-3);
  border-radius:10px;
  justify-content:center;
}
.nav-link{ color:var(--accent); text-decoration:none; padding:6px 10px; font-weight:600; border-radius:8px; }
.nav-link:hover{ background:rgba(11,118,255,0.06); color:var(--accent-2) }

.main-grid{
  display:grid;
  grid-template-columns: 1fr 320px;
  gap:20px;
  align-items:start;
}

/* Cards & sections */
.section-card{
  background:var(--card);
  border-radius:12px;
  padding:18px;
  box-shadow: 0 6px 18px rgba(12,34,64,0.04);
  margin-bottom:18px;
}
.side-card{
  background:var(--card);
  border-radius:12px;
  padding:16px;
  box-shadow: 0 6px 18px rgba(12,34,64,0.04);
  position:sticky;
  top:20px;
}

/* code blocks */
pre.code-block{
  background: linear-gradient(180deg, #07111b, #06121b);
  color: #d8f0ff;
  padding:14px;
  border-radius:10px;
  font-family: var(--mono);
  font-size:13px;
  overflow:auto;
  margin-top:12px;
  white-space:pre;
}
.code-inline{ font-family:var(--mono); background:#eef6ff; padding:2px 6px; border-radius:6px; font-size:13px; color:#012a5a; }

.copy-btn{
  position:absolute;
  right:8px;
  top:8px;
  padding:6px 10px;
  background:var(--accent);
  color:white;
  border-radius:8px;
  border:0;
  cursor:pointer;
  font-size:12px;
  box-shadow:0 4px 12px rgba(11,74,187,0.12);
}
.copy-small{ padding:4px 8px; font-size:11px; border-radius:6px; }

/* examples grid + improved card visuals */
.examples-header{
  display:flex; align-items:center; justify-content:space-between; gap:12px;
}
.example-grid{
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap:16px;
  margin-top:16px;
}
.example-card{
  background: linear-gradient(180deg,#ffffff,#fbfdff);
  border:1px solid #f0f5ff;
  border-radius:12px;
  padding:14px;
  transition: transform 180ms ease, box-shadow 180ms ease;
  box-shadow: 0 6px 18px rgba(12,34,64,0.02);
  display:flex;
  flex-direction:column;
  min-height:150px;
}
.example-card:hover{ transform: translateY(-6px); box-shadow: 0 18px 42px rgba(11,74,187,0.08); }
.example-card h3{ margin:0 0 8px 0; font-size:16px; }
.example-preview{ background:#fbfeff; border-radius:8px; padding:10px; border:1px dashed #eef8ff; min-height:48px; display:flex; align-items:center; gap:8px; }
.example-meta{ margin-top:10px; display:flex; gap:8px; align-items:center; justify-content:space-between; }

/* small UI elements */
.btn{ padding:8px 12px; border-radius:8px; border:0; cursor:pointer; background:var(--accent); color:white; font-weight:600; }
.btn-ghost{ background:transparent; border: 1px solid rgba(2,6,23,0.06); color:var(--accent-2); padding:7px 10px; border-radius:8px; }
.kv{ font-size:13px; color:var(--muted); }

/* helpers */
.small-muted{ font-size:12px; color:var(--muted); }
.flex{ display:flex; gap:10px; align-items:center; }

/* patch notes */
.patch-card{
  display:flex; gap:16px; align-items:center; padding:16px; border-radius:12px; background: linear-gradient(90deg,#eaf6ff,#ffffff);
  border-left:6px solid var(--accent);
  transform: translateY(12px);
  opacity:0;
  transition: all 700ms cubic-bezier(.2,.9,.3,1);
}
.patch-card.visible{ transform: translateY(0); opacity:1; }

/* footer */
.footer{ text-align:center; margin-top:24px; color:var(--muted); font-size:13px; padding:12px; }

/* responsive */
@media (max-width:1000px){
  .main-grid{ grid-template-columns: 1fr; }
  .logo{ display:none; }
  .header{ padding:16px; gap:12px; }
}
`;
    const s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
  })();

  function el(tag, props, ...children) {
    if (props == null || typeof props !== "object" || Array.isArray(props)) {
      return create(tag, {}, props, ...children);
    }
    return create(tag, props || {}, ...children);
  }
  function text(t) { return typeof t === "string" ? document.createTextNode(t) : t; }

  function SectionCard(id, title, ...content) {
    const card = el("section", { id, class: "section-card" },
      el("h2", null, title),
      ...content
    );
    return card;
  }

  function codeBlock(codeStr, opts = {}) {
    const safeCode = (codeStr || "").toString().trim();
    const pre = el("pre", { class: "code-block" }, safeCode);
    const wrapper = el("div", { style: { position: "relative", marginTop: "12px" } }, pre);

    const btn = el("button", {
      class: "copy-btn",
      onClick: () => {
        navigator.clipboard.writeText(safeCode).then(() => {
          const old = btn.textContent;
          btn.textContent = "Copied!";
          setTimeout(() => (btn.textContent = old), 900);
        }).catch(() => {
          btn.textContent = "Failed";
          setTimeout(() => (btn.textContent = "Copy"), 900);
        });
      }
    }, "Copy");

    const label = opts.label ? el("div", { class: "small-muted", style: { marginBottom: "6px" } }, opts.label) : null;
    if (label) wrapper.insertBefore(label, pre);
    wrapper.appendChild(btn);
    return wrapper;
  }

  function demoWithCode(title, description, demoEl, codeStr) {
    const card = el("div", { class: "example-card" },
      el("h3", null, title),
      description ? el("div", { class: "small-muted", style: { marginBottom: 8 } }, description) : null,
      el("div", { class: "example-preview" }, demoEl),
      el("div", { class: "example-meta" },
        el("div", { class: "kv" }, "Live demo"),
        el("div", null,
          el("a", { href: "#", onClick: (e) => { e.preventDefault(); const node = card.querySelector('pre'); if (node) copyPre(node); }, class: "btn-ghost" }, "Copy code")
        )
      ),
      codeBlock(codeStr, { label: "Code" })
    );
    return card;
  }
  function copyPre(preEl) {
    if (!preEl) return;
    const text = preEl.textContent || "";
    navigator.clipboard.writeText(text).then(() => {
      const btn = preEl.parentElement.querySelector(".copy-btn");
      if (btn) {
        const old = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => (btn.textContent = old), 900);
      }
    }).catch(()=>{});
  }

  function Header() {
    const sizeEl = el("span", { class: "size-info" }, "Checking size...");
    fetch("stupid.js").then(r => r.text()).then(js => {
      const kb = (js.length / 1024).toFixed(2);
      sizeEl.textContent = `Framework Size: ${kb} KB`;
    }).catch(() => (sizeEl.textContent = "Framework Size: under 1 KB"));

    const downloadBtn = el("a", {
      href: "stupid.js",
      download: "stupid.js",
      class: "btn",
      style: { position: "absolute", right: "18px", top: "18px" }
    }, "⬇ Download Stupid.js");

    const smallNote = el("div", { style: { marginLeft: "auto", textAlign: "right" } },
      sizeEl,
      el("div", { class: "small-muted" }, "Single-file, zero-deps")
    );

    const header = el("header", { class: "header" },
      el("img", { src: "StupidJS.png", alt: "logo", class: "logo" }),
      el("div", null,
        el("h1", null, "Stupid.js — The Dumbest Framework That Actually Works"),
        el("p", { class: "subtitle" }, "A tiny micro-framework for learning DOM & UI basics — no build step, no nonsense.")
      ),
      smallNote,
      downloadBtn
    );

    return header;
  }

  function Navbar() {
    const links = [
      ["#intro", "Introduction"],
      ["#getting-started", "Getting Started"],
      ["#concepts", "Core Concepts"],
      ["#api", "API Reference"],
      ["#benchmark", "Benchmark"],
      ["#patchnotes", "Patch Notes"],
      ["#faq", "FAQ"],
      ["#contribute", "Contribute"]
    ];
    const nav = el("nav", { class: "navbar" },
      ...links.map(([href, label]) => el("a", { href, class: "nav-link" }, label))
    );
    return nav;
  }

  function Intro() {
    return SectionCard("intro", "Introduction",
      el("p", null, "Stupid.js is intentionally tiny — one file that helps you create elements and mount them to the DOM with a readable API."),
      el("p", null, "This documentation showcases many live examples with code you can copy and adapt.")
    );
  }

  function GettingStarted() {
    const code = `
<!-- include -->
<script src="stupid.js"></script>

<!-- write -->
<script>
  const message = create("h1", null, "Hello, Stupid.js!");
  mount("#root", message);
</script>

<div id="root"></div>
`.trim();
    return SectionCard("getting-started", "Getting Started",
      el("p", null, "No build tools required — drop `stupid.js` into your project and start writing vanilla JS that constructs the DOM."),
      codeBlock(code, { label: "Basic inclusion" })
    );
  }

  function Concepts() {
    return SectionCard("concepts", "Core Concepts",
      el("h3", null, "create(tag, props, ...children)"),
      el("p", null, "Create elements easily. Props can include event handlers (onClick), style object, class, etc."),
      codeBlock(`const button = create("button", { onClick: () => alert("Hi!") }, "Click me");`, { label: "create example" }),
      el("h3", null, "mount(root, ...elements)"),
      el("p", null, "Mount accepts a selector or element and multiple children — it batches multiple elements into a DocumentFragment for improved performance."),
      codeBlock(`mount("#app", el1, el2, el3);`, { label: "mount example" })
    );
  }

  function APIReference() {
    const body = el("div", null,
      el("p", null, "Minimal API surface — intentionally tiny."),
      el("table", { style: { width: "100%", borderCollapse: "collapse" } },
        el("thead", null,
          el("tr", null,
            el("th", { style: thStyle() }, "Name"),
            el("th", { style: thStyle() }, "Type"),
            el("th", { style: thStyle() }, "Description")
          )
        ),
        el("tbody", null,
          apiRow("create(tag, props, ...children)", "Function", "Create an element. Props support onEvent handlers (onClick), style object, class, and attributes."),
          apiRow("mount(root, ...elements)", "Function", "Mount elements into a root (selector or Node). Accepts multiple elements and uses a DocumentFragment."),
          apiRow("children can be strings or nodes", " — ", "Pass string content or Node elements as children."),
          apiRow("props.style", "Object", "A plain object applied via Object.assign to element.style."),
          apiRow("props.class", "String", "Set element's className.")
        )
      )
    );

    return SectionCard("api", "API Reference", body);
  }

  function thStyle(){
    return { textAlign: "left", padding: "8px", fontWeight:700, borderBottom: "1px solid #eff6ff" };
  }
  function tdStyle(){
    return { padding: "8px", verticalAlign: "top", borderBottom: "1px dashed #f3f8ff", fontSize:13, color:"#0b1724" };
  }
  function apiRow(name, type, desc) {
    return el("tr", null,
      el("td", { style: tdStyle() }, el("div", { class: "code-inline" }, name)),
      el("td", { style: tdStyle() }, type),
      el("td", { style: tdStyle() }, desc)
    );
  }

function Benchmark() {
  const info = el("p", null, "This microbenchmark compares mounting many elements one-by-one (old style) vs batching via DocumentFragment (new mount). Results are runtime in milliseconds measured by the browser.");
  const benchOut = el("pre", { class: "code-block", style: { height: "160px" } }, "Click run to measure...");
  const runBtn = el("button", { class: "btn", onClick: runBench }, "Run benchmark (1000 items)");

  const container = el("div", null, runBtn, benchOut);

  function runOldMount(items) {
    const root = document.createElement("div");
    root.style.display = "none";
    document.body.appendChild(root);

    const t0 = performance.now();
    for (let i = 0; i < items; i++) {
      root.appendChild(create("div", null, "item " + i));
    }
    const t1 = performance.now();

    root.remove();
    return t1 - t0;
  }

  function runNewMount(items) {
    const root = document.createElement("div");
    root.style.display = "none";
    document.body.appendChild(root);

    const frag = document.createDocumentFragment();
    const t0 = performance.now();
    for (let i = 0; i < items; i++) {
      frag.appendChild(create("div", null, "item " + i));
    }
    root.appendChild(frag);
    const t1 = performance.now();

    root.remove();
    return t1 - t0;
  }

  async function runBench() {
    benchOut.textContent = "Running...";
    await new Promise(r => setTimeout(r, 50));

    const items = 1000;
    const runs = 3;

    const resultsOld = [];
    const resultsNew = [];

    for (let i = 0; i < runs; i++) {
      resultsOld.push(runOldMount(items));
      await new Promise(r => setTimeout(r, 50));
    }

    for (let i = 0; i < runs; i++) {
      resultsNew.push(runNewMount(items));
      await new Promise(r => setTimeout(r, 50));
    }

    const avg = arr => Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);

    benchOut.textContent = [
      `Items per run: ${items}`,
      `Old append (one-by-one): ${resultsOld.join(", ")} ms (avg ${avg(resultsOld)} ms)`,
      `New append (DocumentFragment): ${resultsNew.join(", ")} ms (avg ${avg(resultsNew)} ms)`,
      `Approx speedup: ${(avg(resultsOld)/avg(resultsNew)).toFixed(2)}× 🚀`
    ].join("\n");
  }

  return SectionCard("benchmark", "Micro-Benchmark", info, container);
}

  function PatchNotes() {
    const patch = el("div", { class: "patch-card", id: "patch-card" },
      el("div", null,
        el("h3", null, "v1.1 — Performance Focus"),
        el("p", { class: "small-muted" }, "This release is exclusively about making Stupid.js faster and more robust."),
        el("ul", null,
          el("li", null, "mount() switched to DocumentFragment for batching DOM inserts (dramatic reduction in reflows)."),
          el("li", null, "Reduced per-element style mutations to avoid layout thrashing."),
          el("li", null, "Simplified event listener attachment to be predictable and lightweight."),
          el("li", null, "Benchmarks added to let you measure improvements on your browser.")
        )
      ),
      el("div", { style: { minWidth:120, textAlign:"center" } },
        el("div", { style: { fontSize:28, fontWeight:800, color:"var(--accent-2)" } }, "⚡"),
        el("div", { class: "small-muted" }, "Fewer reflows")
      )
    );

    const reveal = () => {
      const elRect = patch.getBoundingClientRect();
      if (elRect.top < window.innerHeight - 80) {
        patch.classList.add("visible");
        window.removeEventListener("scroll", reveal);
      }
    };
    setTimeout(reveal, 200);
    window.addEventListener("scroll", reveal);

    return SectionCard("patchnotes", "Patch Notes — Performance", patch);
  }

  function FAQ() {
    const q1 = Q("Is Stupid.js production-ready?", "It's intended for learning, small apps, prototypes and docs. For very large apps, consider a fuller framework but you can still use Stupid.js for micro-interactions.");
    const q2 = Q("Why is mount faster now?", "Because it batches DOM operations into a single append using DocumentFragment, avoiding many reflows/repaints.");
    const q3 = Q("How do events work?", "Pass props like onClick: () => {} and Stupid.js adds DOM listeners (lower-level and explicit).");
    return SectionCard("faq", "FAQ", q1, q2, q3);
  }
  function Q(q, a) {
    return el("div", { style: { marginBottom:8 } }, el("strong", null, q), el("div", { class: "small-muted" }, a));
  }

  function Contribute() {
    const content = el("div", null,
      el("p", null, "Stupid.js is open-source. Fork the repo, open PRs, and file issues. Small, readable code gets accepted quickly."),
      el("p", null, "Helpful contributions: more examples, bug fixes, improved docs.")
    );
    return SectionCard("contribute", "Contribute", content);
  }

  function Footer() {
    return el("footer", { class: "footer" }, el("div", null, `© ${new Date().getFullYear()} Fishy — Made with ❤️ Stupid.js`));
  }

  const leftCol = el("div", null,
    Header(),
    Navbar(),
    Intro(),
    GettingStarted(),
    Concepts(),
    APIReference(),
    Benchmark(),
    PatchNotes(),
    FAQ(),
    Contribute(),
    Footer()
  );

  const app = el("div", { class: "container" },
    el("div", { class: "main-grid" },
      leftCol,
      el("aside", { class: "side-card" },
        el("h4", null, "Quick Links"),
        el("ul", null,
          el("li", null, el("a", { href:"#benchmark" }, "Benchmark")),
          el("li", null, el("a", { href:"#patchnotes" }, "Patch Notes")),
          el("li", null, el("a", { href:"#api" }, "API Reference"))
        ),
        el("hr", null),
        el("h4", null, "Tips"),
        el("p", { class: "small-muted" }, "Dont take shit seriously in life just fucking enjoy your life")
      )
    )
  );

  try {
    mount("#app", app);
  } catch (err) {
    console.error("Failed to mount app:", err);
    const fallback = document.getElementById("app");
    if (fallback) fallback.textContent = "Failed to load docs UI — check console for errors.";
  }

});
