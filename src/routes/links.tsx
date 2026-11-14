import { Markdown } from "@tanstack/markdown/react";
import { createFileRoute } from "@tanstack/react-router";
import source from "../content/pages/links.md?raw";

export const Route = createFileRoute("/links")({ component: Page });

function Page() {
  return (
    <main>
      <h1>{"Links"}</h1>
      <div className="prose">
        <Markdown>{source}</Markdown>
      </div>
    </main>
  );
}
