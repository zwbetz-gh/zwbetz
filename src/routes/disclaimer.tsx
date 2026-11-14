import { Markdown } from "@tanstack/markdown/react";
import { createFileRoute } from "@tanstack/react-router";
import source from "../content/pages/disclaimer.md?raw";

export const Route = createFileRoute("/disclaimer")({ component: Page });

function Page() {
  return (
    <main>
      <h1>{"Disclaimer"}</h1>
      <div className="prose">
        <Markdown>{source}</Markdown>
      </div>
    </main>
  );
}
