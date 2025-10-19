// === Stupid.js — The Dumbest Framework That Actually Works ===

function Header() {
  const sizeEl = create("span", { class: "size-info" }, "Checking size...");
  fetch("stupid.js")
    .then(r => r.text())
    .then(js => {
      const kb = (js.length / 1024).toFixed(2);
      sizeEl.textContent = `Framework Size: ${kb} KB`;
    })
    .catch(() => (sizeEl.textContent = "Framework Size: under 1 KB"));

  return create(
    "header",
    { class: "header" },
    create("img", { src: "StupidJS.png", alt: "Stupid.js Logo", class: "logo" }),
    create("h1", null, "Stupid.js — The Dumbest Framework That Actually Works"),
    create(
      "p",
      { class: "subtitle" },
      "A zero-dependency JavaScript micro-framework built by Fishy. Stupid.js focuses on simplicity, clarity, and learning — for both coders and non-coders."
    ),
    sizeEl
  );
}

function Navbar() {
  const links = [
    ["#intro", "Introduction"],
    ["#why", "Why Stupid.js?"],
    ["#getting-started", "Getting Started"],
    ["#concepts", "Core Concepts"],
    ["#api", "API Reference"],
    ["#examples", "Examples"],
    ["#credits", "Credits"]
  ];
  return create(
    "nav",
    { class: "navbar" },
    links.map(([href, label]) => create("a", { href, class: "nav-link" }, label))
  );
}

function Intro() {
  return create(
    "section",
    { id: "intro" },
    create("h2", null, "Introduction"),
    create(
      "p",
      null,
      "Stupid.js is a small JavaScript framework that helps you build websites without any setup, build tools, or complicated syntax. It’s designed to show how modern JavaScript can create and control HTML content directly in the browser."
    ),
    create(
      "p",
      null,
      "It is ideal for beginners who want to understand how web pages are built, and for developers who prefer simplicity. Everything on this page — including buttons, forms, and examples — is created entirely using Stupid.js itself."
    )
  );
}

function Why() {
  return create(
    "section",
    { id: "why" },
    create("h2", null, "Why Stupid.js Exists"),
    create("p", null, "Most frameworks today are powerful but require complex setup steps — you need package managers, build tools, and large downloads just to start. Stupid.js is intentionally simple: it uses the language that browsers already understand — plain JavaScript."),
    create("p", null, "It helps you focus on how the browser works under the hood. If you understand Stupid.js, you’ll understand how React, Vue, and other frameworks build user interfaces — but without all the extra layers.")
  );
}

function GettingStarted() {
  const code = `
<!-- Step 1: Include Stupid.js -->
<script src="stupid.js"></script>

<!-- Step 2: Write your app -->
<script>
  const message = create("h1", null, "Hello, Stupid.js!");
  mount("#root", message);
</script>

<!-- Step 3: Add a container -->
<div id="root"></div>
`;
  return create(
    "section",
    { id: "getting-started" },
    create("h2", null, "Getting Started"),
    create("p", null, "You don’t need Node.js, React, or build tools to use Stupid.js. All you need is one small file and a browser."),
    create("pre", { class: "code-block" }, code),
    create("p", null, "When you load this page in your browser, it will create a heading that says “Hello, Stupid.js!” directly from JavaScript.")
  );
}

function Concepts() {
  return create(
    "section",
    { id: "concepts" },
    create("h2", null, "Core Concepts"),
    create("p", null, "Stupid.js has only two core ideas — 'create' and 'mount'. Understanding these gives you full control over building dynamic web content."),
    create("h3", null, "1. create(tag, props, ...children)"),
    create("p", null, "This function builds an element. You tell it what kind of element to make, what details or settings it should have, and what should go inside."),
    create("pre", { class: "code-block" }, `
const button = create("button", { onClick: () => alert("Hello!") }, "Click Me");
`),
    create("p", null, "Here, 'create' makes a button that says 'Click Me'. When the button is clicked, it runs a small function that shows an alert."),
    create("h3", null, "2. mount(target, element)"),
    create("p", null, "Once you’ve created something, you need to attach it to the page so people can see it. The 'mount' function takes a target — such as a CSS selector — and puts your element there."),
    create("pre", { class: "code-block" }, `
mount("#root", button);
`),
    create("p", null, "This tells Stupid.js to take the button you made and place it inside the element with id='root'. That’s how every part of this site is built.")
  );
}

function APIReference() {
  const table = create(
    "table",
    { class: "api-table" },
    create(
      "thead",
      null,
      create("tr", null,
        create("th", null, "Property"),
        create("th", null, "Type"),
        create("th", null, "Description"),
        create("th", null, "Example")
      )
    ),
    create(
      "tbody",
      null,
      create("tr", null,
        create("td", null, "onClick"),
        create("td", null, "Function"),
        create("td", null, "Runs a function when clicked."),
        create("td", null, `create("button", { onClick: () => alert("Clicked!") }, "Click")`)
      ),
      create("tr", null,
        create("td", null, "class"),
        create("td", null, "String"),
        create("td", null, "Applies a CSS class."),
        create("td", null, `create("div", { class: "box" }, "Hello")`)
      ),
      create("tr", null,
        create("td", null, "style"),
        create("td", null, "Object"),
        create("td", null, "Adds inline styling."),
        create("td", null, `create("p", { style: { color: "red" } }, "Text")`)
      ),
      create("tr", null,
        create("td", null, "children"),
        create("td", null, "String or Node"),
        create("td", null, "The content inside the element."),
        create("td", null, `create("h1", null, "Heading")`)
      )
    )
  );

  return create(
    "section",
    { id: "api" },
    create("h2", null, "API Reference"),
    create("p", null, "The Stupid.js API is extremely small — intentionally. This makes it easy to remember and ideal for beginners."),
    table,
    create("h3", null, "Example: Combining Everything"),
    create("pre", { class: "code-block" }, `
const box = create("div", { class: "box", style: { padding: "10px", background: "#def" } },
  create("h3", null, "My Box"),
  create("p", null, "This text lives inside a box!")
);
mount("#app", box);
`)
  );
}

function Examples() {

  const value = create("span", { class: "counter-value" }, "0");
  const add = () => (value.textContent = parseInt(value.textContent) + 1);
  const reset = () => (value.textContent = "0");
  const counter = create("div", { class: "counter" },
    value,
    create("button", { onClick: add }, "Add"),
    create("button", { onClick: reset }, "Reset")
  );

  const themeBtn = create("button", {
    onClick: () => {
      document.body.classList.toggle("dark");
      themeBtn.textContent = document.body.classList.contains("dark")
        ? "Switch to Light Mode"
        : "Switch to Dark Mode";
    }
  }, "Switch to Dark Mode");

  const input = create("input", { placeholder: "Enter your name" });
  const result = create("p", null, "");
  const button = create("button", {
    onClick: () => {
      result.textContent = input.value
        ? "Hello, " + input.value + "!"
        : "Please enter your name.";
    }
  }, "Submit");
  const form = create("div", null, input, button, result);

  const clock = create("p", { class: "clock" });
  setInterval(() => (clock.textContent = new Date().toLocaleTimeString()), 1000);

  return create(
    "section",
    { id: "examples" },
    create("h2", null, "Examples"),
    create("p", null, "Below are examples you can try. Each one demonstrates how you can make an interactive part of a webpage with Stupid.js."),

    create("h3", null, "Counter"),
    counter,
    create("pre", { class: "code-block" }, `
const value = create("span", null, "0");
const add = () => value.textContent = parseInt(value.textContent) + 1;
const reset = () => value.textContent = "0";
mount("#app", create("div", null, value,
  create("button", { onClick: add }, "Add"),
  create("button", { onClick: reset }, "Reset")
));`),

    create("h3", null, "Theme Toggle"),
    themeBtn,
    create("pre", { class: "code-block" }, `
const themeBtn = create("button", {
  onClick: () => document.body.classList.toggle("dark")
}, "Switch Theme");
mount("#app", themeBtn);`),

    create("h3", null, "Simple Form"),
    form,
    create("pre", { class: "code-block" }, `
const input = create("input", { placeholder: "Enter your name" });
const output = create("p");
const button = create("button", {
  onClick: () => output.textContent = input.value || "Please type your name."
}, "Submit");
mount("#app", create("div", null, input, button, output));`),

    create("h3", null, "Live Clock"),
    clock,
    create("pre", { class: "code-block" }, `
const clock = create("p");
setInterval(() => clock.textContent = new Date().toLocaleTimeString(), 1000);
mount("#app", clock);`)
  );
}

function Credits() {
  return create(
    "section",
    { id: "credits" },
    create("h2", null, "Credits"),
    create("p", null, "Stupid.js was created by Fishy."),
    create("p", null, "The goal of this framework is to show that programming can be clear, fun, and understandable — even for people who have never written code before.")
  );
}

function Footer() {
  return create(
    "footer",
    { class: "footer" },
    create("p", null, "Built with Stupid.js — a lightweight JavaScript framework for learning and creativity."),
    create("p", null, "© " + new Date().getFullYear() + " Created by Fishy")
  );
}

const app = create(
  "div",
  { class: "container" },
  Header(),
  Navbar(),
  Intro(),
  Why(),
  GettingStarted(),
  Concepts(),
  APIReference(),
  Examples(),
  Credits(),
  Footer()
);

mount("#app", app);
