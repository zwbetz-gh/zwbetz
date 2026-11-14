import { Markdown } from "@tanstack/markdown/react";
import { createFileRoute } from "@tanstack/react-router";
import source from "../content/pages/family.md?raw";

export const Route = createFileRoute("/family")({ component: Page });

function Page() {
  return (
    <main>
      <h1>{"Family"}</h1>
      <div className="prose">
        <Markdown>{source}</Markdown>
      </div>
    </main>
  );
}
