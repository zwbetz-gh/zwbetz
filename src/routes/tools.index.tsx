import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/tools/")({
  head: () => ({ meta: [{ title: "Tools | Zachary Betz" }] }),
  component: Tools,
});

function Tools() {
  return (
    <main>
      <h1>Tools</h1>
      <p>Small tools and references for building things on the web.</p>
      <ul className="tool-list">
        <li>
          <Link to="/tools/html-elements">HTML Elements</Link>
          <p>Explore HTML tags, example markup, and browser previews.</p>
        </li>
      </ul>
    </main>
  );
}
