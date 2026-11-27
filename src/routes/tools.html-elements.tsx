import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import elements from "../html-elements";

export const Route = createFileRoute("/tools/html-elements")({
  head: () => ({ meta: [{ title: "HTML Elements | Zachary Betz" }] }),
  component: HtmlElements,
});

const categories = [...new Set(elements.map((element) => element.category))];

function HtmlElements() {
  const [search, setSearch] = useState("");
  const query = search.trim().toLowerCase().replace(/[<>/]/g, "");
  const matches = elements.filter((element) =>
    `${element.tag} ${element.description} ${element.category}`
      .toLowerCase()
      .includes(query),
  );

  return (
    <main>
      <p>
        <Link to="/tools">Tools</Link>
      </p>
      <h1>HTML Elements</h1>
      <p>
        Every current HTML element, grouped by purpose. Open an example to see
        its markup and a browser preview.
      </p>
      <p>
        Based on the{" "}
        <a href="https://html.spec.whatwg.org/multipage/indices.html#elements-3">
          HTML Living Standard
        </a>
        . Obsolete tags, SVG, and MathML are excluded. Browser support varies
        for newer elements. Media examples show controls without loading files;
        canvas drawing requires JavaScript.
      </p>
      <label className="element-search">
        Search elements
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Try <input>, heading, or table"
        />
      </label>
      <p role="status">
        {matches.length} of {elements.length} elements
      </p>
      {matches.length === 0 && (
        <p>No elements found. Try another tag or description.</p>
      )}
      {categories.map((category) => {
        const items = matches.filter(
          (element) => element.category === category,
        );
        if (items.length === 0) return null;
        return (
          <section
            className="element-group"
            key={category}
            aria-label={category}
          >
            <h2>{category}</h2>
            {items.map((element) => (
              <ElementExample key={element.tag} element={element} />
            ))}
          </section>
        );
      })}
    </main>
  );
}

function ElementExample({ element }: { element: (typeof elements)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <details
      className="element-example"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary>
        <code>{`<${element.tag}>`}</code>
        <span>{element.description}</span>
      </summary>
      <div className="element-example-body">
        <pre>
          <code>{element.example}</code>
        </pre>
        {element.preview ? (
          open && (
            <iframe
              title={`Preview of the ${element.tag} element`}
              sandbox=""
              loading="lazy"
              srcDoc={`<!doctype html><html lang="en"><head><meta charset="utf-8"><style>:root{color-scheme:light dark}body{font:16px/1.5 system-ui;margin:16px;overflow-wrap:anywhere}img,video,canvas,iframe{max-width:100%}table{border-collapse:collapse}td,th{border:1px solid;padding:8px}input,select,textarea,button{font:inherit;max-width:100%}dialog{position:static}a{color:LinkText}</style></head><body>${element.example}</body></html>`}
            />
          )
        ) : (
          <p>
            This element needs a document, resource, or scripting context. See
            the markup above.
          </p>
        )}
      </div>
    </details>
  );
}
