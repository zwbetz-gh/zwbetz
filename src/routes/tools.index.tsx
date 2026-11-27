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
          <Link to="/tools/html-elements">Style Guide</Link>
          <p>A living collection of typography and form elements.</p>
        </li>
      </ul>
    </main>
  );
}
