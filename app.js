// === Stupid.js Core ===
function create(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  for (let key in props) {
    if (key.startsWith("on") && typeof props[key] === "function")
      el.addEventListener(key.slice(2).toLowerCase(), props[key]);
    else if (key === "style" && typeof props[key] === "object")
      Object.assign(el.style, props[key]);
    else if (props[key] != null)
      el.setAttribute(key, props[key]);
  }
  for (const child of children.flat()) {
    if (typeof child === "string" || typeof child === "number")
      el.appendChild(document.createTextNode(child));
    else if (child instanceof Node)
      el.appendChild(child);
  }
  return el;
}

const theme = { primary: "#4a90e2", secondary: "#f5f5f5", accent: "#ff7f50", text: "#333" };

// === UI Helpers ===
function Section(id, title, content) {
  return create("section", { id },
    create("h2", null, title),
    typeof content === "string" ? create("p", null, content) : content
  );
}

function Button(text, onClick, styleClass = "btn-primary") {
  return create("button", { class: styleClass, onClick }, text);
}

function CodeTabs(stupidCode, vanillaCode, reactCode) {
  const tabContainer = create("div");
  const btnStupid = Button("Stupid.js", () => switchTab("stupid"), "btn-tab active");
  const btnVanilla = Button("Vanilla JS", () => switchTab("vanilla"), "btn-tab");
  const btnReact = Button("React", () => switchTab("react"), "btn-tab");

  const contentStupid = create("pre", { class: "code-tab-content active", id: "stupid" }, stupidCode);
  const contentVanilla = create("pre", { class: "code-tab-content", id: "vanilla" }, vanillaCode);
  const contentReact = create("pre", { class: "code-tab-content", id: "react" }, reactCode);

  tabContainer.append(btnStupid, btnVanilla, btnReact, contentStupid, contentVanilla, contentReact);

  function switchTab(tab) {
    [btnStupid, btnVanilla, btnReact].forEach(b => b.classList.remove("active"));
    [contentStupid, contentVanilla, contentReact].forEach(c => c.classList.remove("active"));
    if (tab === "stupid") { btnStupid.classList.add("active"); contentStupid.classList.add("active"); }
    else if (tab === "vanilla") { btnVanilla.classList.add("active"); contentVanilla.classList.add("active"); }
    else { btnReact.classList.add("active"); contentReact.classList.add("active"); }
  }

  return tabContainer;
}

function Example(id, title, liveDemo, stupidCode, vanillaCode, reactCode) {
  return Section(id, title, [
    create("div", { class: "live-demo" },
      create("p", null, "Live Demo:"),
      liveDemo
    ),
    create("p", null, "Code:"),
    CodeTabs(stupidCode, vanillaCode, reactCode)
  ]);
}

// === Navbar ===
const nav = create("nav", {},
  create("div", { style: { display: "flex", alignItems: "center", gap: "10px", fontWeight: "bold", fontSize: "1.3em" } },
    create("img", {
      src: "StupidJS.png",   // 👈 Replace with your actual logo file name or URL
      alt: "Stupid.js Logo",
      style: { height: "32px", width: "32px", objectFit: "contain" }
    }),
    "Stupid.js"
  ),
  create("div", null,
    [["Home", "welcome"], ["Docs", "docs-syntax"], ["Flow", "docs-flow"], ["Examples", "basic-example"], ["Compare", "comparison"]]
      .map(([n, id]) => create("a", { href: "#" + id, class: "nav-link" }, n))
  )
);


// === Hero Banner ===
const hero = create(
  "div", { class: "hero" },
  create("div", { class: "hero-content" },
    create("h1", null, "Stupid.js"),
    create("p", null, "A ridiculously simple way to build DOM trees in JavaScript.")
  )
);

// === Sections ===
const welcome = Section("welcome", "Welcome to Stupid.js",
  "Build DOM trees in JS easily, no JSX needed!"
);

const docsSyntax = Section(
  "docs-syntax",
  "Stupid.js Basic Syntax",
  [
    create("p", null, "The core of Stupid.js is the `create()` function."),
    create("p", null, "Syntax:"),
    create("pre", null,
`create(tag, props = {}, ...children)
- tag: string — HTML tag name, e.g., "div"
- props: object — attributes, styles, event listeners
- children: any — strings, numbers, or other DOM nodes`
    ),
    create("p", null, "Example:"),
    CodeTabs(
`const box = create("div", { style: { backgroundColor: "#f0f0f0" } }, "Hello World!", Button("Click Me"));`,
`const box = document.createElement("div");
box.style.backgroundColor = "#f0f0f0";
box.textContent = "Hello World!";
const btn = document.createElement("button");
btn.textContent = "Click Me";
btn.onclick = () => alert("Hello!");
box.appendChild(btn);
document.body.appendChild(box);`,
`function App() {
  return <div style={{backgroundColor:"#f0f0f0"}}>
    Hello World!
    <button onClick={()=>alert("Hello!")}>Click Me</button>
  </div>;
}`
    )
  ]
);

const docsFlow = Section(
  "docs-flow",
  "How `create()` Works",
  [
    create("p", null, "Step-by-step visual of how `create()` builds a DOM node:"),
    create("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px"
      }
    },
      create("div", { style: { padding: "10px 20px", backgroundColor: theme.primary, color: "white", borderRadius: "5px", marginBottom: "10px" } }, "create('div', {style:{color:'red'}}, 'Hello')"),
      create("div", { style: { width: "2px", height: "20px", backgroundColor: "#333", marginBottom: "10px" } }),
      create("div", { style: { display: "flex", gap: "20px", marginBottom: "10px" } },
        create("div", { style: { padding: "10px", border: "1px solid #ccc", borderRadius: "5px" } }, "DOM Element <div>"),
        create("div", { style: { padding: "10px", border: "1px solid #ccc", borderRadius: "5px" } }, "Props applied"),
        create("div", { style: { padding: "10px", border: "1px solid #ccc", borderRadius: "5px" } }, "Child nodes added")
      ),
      create("div", { style: { width: "2px", height: "20px", backgroundColor: "#333", marginBottom: "10px" } }),
      create("div", { style: { padding: "10px 20px", backgroundColor: theme.accent, color: "white", borderRadius: "5px" } }, "Returns fully constructed DOM node!")
    )
  ]
);

// === Examples ===
const basicExample = Example(
  "basic-example", "Basic Example",
  create("div", null,
    create("p", null, "Hello World!"),
    Button("Click Me", () => alert("Hello!"))
  ),
  `const box=create("div",{},"Hello World!",Button("Click Me"));`,
  `const box=document.createElement("div");
box.textContent="Hello World!";
const btn=document.createElement("button");
btn.textContent="Click Me";
btn.onclick=()=>alert("Hello!");
box.appendChild(btn);
document.body.appendChild(box);`,
  `function App(){
  return <div>Hello World!
    <button onClick={()=>alert("Hello!")}>Click Me</button>
  </div>;
}`
);

const listExample = Example(
  "list-example", "Dynamic List Example",
  (() => {
    const items = ["Apples", "Bananas", "Cherries"];
    const ul = create("ul", {});
    items.forEach(i => {
      const li = create("li", null, i);
      li.onclick = () => alert(i);
      ul.appendChild(li);
    });
    return ul;
  })(),
  `const items=["Apples","Bananas","Cherries"];
const list=create("ul",{},items.map(i=>create("li",null,i)));`,
  `const items=["Apples","Bananas","Cherries"];
const ul=document.createElement("ul");
items.forEach(i=>{
  const li=document.createElement("li");
  li.textContent=i;
  li.onclick=()=>alert(i);
  ul.appendChild(li);
});
document.body.appendChild(ul);`,
  `function List(){
  const items=["Apples","Bananas","Cherries"];
  return <ul>{items.map(i=>
    <li key={i} onClick={()=>alert(i)}>{i}</li>
  )}</ul>;
}`
);

const counterExample = Example(
  "counter-example", "Interactive Counter",
  (() => {
    let count = 0;
    const countText = create("span", {}, count);
    return create("div", null,
      Button("Increment", () => { count++; countText.textContent = count; }),
      create("p", null, "Count: ", countText)
    );
  })(),
  `let count=0; const countText=create("span",{},count);
Button("Increment",()=>{count++; countText.textContent=count;});`,
  `let count=0;
const span=document.createElement("span");
span.textContent=count;
const btn=document.createElement("button");
btn.textContent="Increment";
btn.onclick=()=>{count++; span.textContent=count;};`,
  `function Counter(){
  const [count,setCount]=React.useState(0);
  return <div>
    <button onClick={()=>setCount(count+1)}>Increment</button>
    <p>Count: {count}</p>
  </div>;
}`
);

const nestedExample = Example(
  "nested-example", "Nested Components",
  create("div", null,
    create("h3", null, "Card Title"),
    create("p", null, "Nested paragraph."),
    Button("Like", () => alert("Liked!"))
  ),
  `const card=create("div",{},
  create("h3",null,"Card Title"),
  create("p",null,"Nested paragraph."),
  Button("Like"));`,
  `const card=document.createElement("div");
const h3=document.createElement("h3");
h3.textContent="Card Title";
const p=document.createElement("p");
p.textContent="Nested paragraph";
const btn=document.createElement("button");
btn.textContent="Like";
btn.onclick=()=>alert("Liked!");
card.appendChild(h3);
card.appendChild(p);
card.appendChild(btn);
document.body.appendChild(card);`,
  `function Card(){
  return <div>
    <h3>Card Title</h3>
    <p>Nested paragraph</p>
    <button onClick={()=>alert("Liked!")}>Like</button>
  </div>;
}`
);

const formExample = Example(
  "form-example", "Form Example",
  (() => {
    const input = create("input", { placeholder: "Type something" });
    const btn = Button("Submit", () => alert(input.value));
    return create("div", null, input, btn);
  })(),
  `const input=create("input",{placeholder:"Type"});
const btn=Button("Submit",()=>alert(input.value));`,
  `const input=document.createElement("input");
input.placeholder="Type";
const btn=document.createElement("button");
btn.textContent="Submit";
btn.onclick=()=>alert(input.value);
document.body.appendChild(input);
document.body.appendChild(btn);`,
  `function Form(){
  const [val,setVal]=React.useState("");
  return <div>
    <input value={val} onChange={e=>setVal(e.target.value)} />
    <button onClick={()=>alert(val)}>Submit</button>
  </div>;
}`
);

const comparison = Section("comparison", "Why Stupid.js?", [
  create("p", null, "Minimal code, easy to learn, perfect for small projects."),
  create("table", null,
    create("tr", null,
      create("th", null, "Feature"),
      create("th", null, "Stupid.js"),
      create("th", null, "Vanilla JS"),
      create("th", null, "React")
    ),
    create("tr", null, create("td", null, "Setup"), create("td", null, "1 <script> tag"), create("td", null, "Manual DOM"), create("td", null, "npm + build tools")),
    create("tr", null, create("td", null, "Syntax"), create("td", null, "create(tag,props,...)"), create("td", null, "document.createElement + appendChild"), create("td", null, "JSX + Components")),
    create("tr", null, create("td", null, "Bundle Size"), create("td", null, "~2KB"), create("td", null, "~0KB"), create("td", null, "~120KB+")),
    create("tr", null, create("td", null, "Learning Curve"), create("td", null, "Almost none"), create("td", null, "Basic DOM knowledge"), create("td", null, "Steep")),
    create("tr", null, create("td", null, "Best For"), create("td", null, "Quick prototypes & docs"), create("td", null, "Low-level DOM"), create("td", null, "Large-scale apps"))
  )
]);

const footer = create("footer", null, "© 2025 Stupid.js — Minimal JS Framework");

// === Floating Banner ===
const stupidPercent = 99;
const banner = create("div", { id: "banner" }, "This website was made 0% using Stupid.js");
document.body.appendChild(banner);

window.addEventListener("load", () => {
  let count = 0;
  const interval = setInterval(() => {
    count++;
    banner.textContent = `This website was made ${count}% using Stupid.js`;
    if (count >= stupidPercent) {
      clearInterval(interval);
      setTimeout(() => {
        banner.style.transition = "opacity 1s ease";
        banner.style.opacity = "0";
        setTimeout(() => banner.remove(), 1000);
      }, 2000);
    }
  }, 20);

  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  }, { threshold: 0.2 });
  sections.forEach(s => observer.observe(s));
});

// === App Root ===
const app = create(
  "div",
  null,
  nav,
  hero,
  welcome,
  docsSyntax,
  docsFlow,
  basicExample,
  listExample,
  counterExample,
  nestedExample,
  formExample,
  comparison,
  footer
);

document.getElementById("root").appendChild(app);
