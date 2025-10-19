function create(tag, props = {}, ...children) {
  const el = document.createElement(tag);

  for (let key in props) {
    const value = props[key];

    if (key.startsWith("on") && typeof value === "function") {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key === "style" && typeof value === "object") {
      Object.assign(el.style, value);
    } else if (key === "class") {
      el.className = value;
    } else {
      el.setAttribute(key, value);
    }
  }

  children.flat().forEach(child => {
    if (typeof child === "string") el.appendChild(document.createTextNode(child));
    else if (child instanceof Node) el.appendChild(child);
  });

  return el;
}

function mount(root, element) {
  const container = typeof root === "string" ? document.querySelector(root) : root;
  if (container) container.appendChild(element);
}
