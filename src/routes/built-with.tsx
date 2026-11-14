import { Markdown } from "@tanstack/markdown/react";
import { createFileRoute } from "@tanstack/react-router";
import source from "../content/pages/built-with.md?raw";

export const Route = createFileRoute("/built-with")({ component: Page });

function Page() {
  return (
    <main>
      <h1>{"Built With"}</h1>
      <div className="prose">
        <Markdown>{source}</Markdown>
      </div>
    </main>
  );
}
