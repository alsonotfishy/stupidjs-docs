function create(tag, props = {}, ...children) {
  if (typeof tag === "function") {
    return tag({ ...props, children: children.flat() });
  }

  const el = document.createElement(tag);

  for (let key in props) {
    if (key.startsWith("on") && typeof props[key] === "function") {
      el.addEventListener(key.slice(2).toLowerCase(), props[key]);
    } else if (key === "style" && typeof props[key] === "object") {
      Object.assign(el.style, props[key]);
    } else if (props[key] != null) {
      el.setAttribute(key, props[key]);
    }
  }

  for (const child of children.flat()) {
    if (typeof child === "string" || typeof child === "number") {
      el.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  }

  return el;
}
