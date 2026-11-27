import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import elements from "../html-elements";

export const Route = createFileRoute("/tools/html-elements")({
  head: () => ({ meta: [{ title: "Style Guide | Zachary Betz" }] }),
  component: HtmlElements,
});

const groups = [
  {
    name: "Typography",
    id: "typography",
    number: "01",
    description:
      "The shape of a sentence. From a big first impression to the smallest fine print.",
  },
  {
    name: "Form Elements",
    id: "forms",
    number: "02",
    description:
      "An invitation to interact. Try the inputs, make a selection, and find your focus.",
  },
] as const;

function HtmlElements() {
  const [search, setSearch] = useState("");
  const query = search.trim().toLowerCase().replace(/[<>/]/g, "");
  const matches = elements.filter((element) =>
    `${element.tag} ${element.description} ${element.category}`
      .toLowerCase()
      .includes(query),
  );

  return (
    <main className="style-guide" onSubmit={(event) => event.preventDefault()}>
      <Link to="/tools" className="guide-back">
        ← Tools
      </Link>
      <div className="guide-intro">
        <div>
          <p className="guide-eyebrow">The building blocks / HTML</p>
          <h1>
            A little
            <br />
            style guide.
          </h1>
          <p className="guide-lede">
            Type with character. Controls with purpose. A living collection of
            the everyday elements that make a page.
          </p>
        </div>
        <div className="guide-monogram" aria-hidden="true">
          Aa<span>← → &amp; 123</span>
        </div>
      </div>
      <div className="guide-toolbar">
        <nav aria-label="Style guide sections">
          {groups.map((group) => (
            <a key={group.id} href={`#${group.id}`}>
              <span>{group.number}</span> {group.name}
            </a>
          ))}
        </nav>
        <label className="element-search">
          <span className="sr-only">Search elements</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Find an element…"
          />
        </label>
      </div>
      <p className="guide-count" role="status">
        {matches.length} specimens{query && ` matching “${search}”`}
      </p>
      {matches.length === 0 && (
        <p>No elements found. Try another tag or description.</p>
      )}
      {groups.map((group) => {
        const items = matches.filter(
          (element) => element.category === group.name,
        );
        if (items.length === 0) return null;
        return (
          <section
            className="guide-section"
            id={group.id}
            key={group.id}
            aria-labelledby={`${group.id}-heading`}
          >
            <div className="guide-section-intro">
              <span className="guide-section-number">{group.number}</span>
              <div>
                <h2 id={`${group.id}-heading`}>{group.name}</h2>
                <p>{group.description}</p>
              </div>
            </div>
            <div className={`specimen-grid specimen-grid-${group.id}`}>
              {items.map((element) => (
                <ElementExample key={element.tag} element={element} />
              ))}
            </div>
          </section>
        );
      })}
      <p className="guide-colophon">
        Set in Bricolage &amp; JetBrains Mono. Built with{" "}
        <a href="https://html.spec.whatwg.org/multipage/indices.html#elements-3">
          HTML
        </a>
        . Try switching themes to see these elements in another light.
      </p>
    </main>
  );
}

function ElementExample({ element }: { element: (typeof elements)[number] }) {
  // Keep each specimen's form associations separate from the other examples.
  const markup = element.example.replace(
    /\b(id|for|list)="([^"]+)"/g,
    `$1="specimen-${element.tag}-$2"`,
  );
  return (
    <div className="specimen">
      <div className="specimen-caption">
        <h3>
          <code>{`<${element.tag}>`}</code>
        </h3>
        <span>{element.description}</span>
      </div>
      <div
        className="specimen-preview"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Specimens are trusted static markup from the local TypeScript module.
        dangerouslySetInnerHTML={{ __html: markup }}
      />
      <pre className="specimen-source">
        <code>{element.example}</code>
      </pre>
    </div>
  );
}
