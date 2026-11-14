import { Markdown } from "@tanstack/markdown/react";
import { createFileRoute } from "@tanstack/react-router";
import source from "../content/pages/projects.md?raw";

export const Route = createFileRoute("/projects")({ component: Page });

function Page() {
  return (
    <main>
      <h1>{"Projects"}</h1>
      <div className="prose">
        <Markdown>{source}</Markdown>
      </div>
    </main>
  );
}
