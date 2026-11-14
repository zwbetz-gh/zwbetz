import { Markdown } from "@tanstack/markdown/react";
import { createFileRoute } from "@tanstack/react-router";
import source from "../content/pages/license.md?raw";

export const Route = createFileRoute("/license")({ component: Page });

function Page() {
  return (
    <main>
      <h1>{"License"}</h1>
      <div className="prose">
        <Markdown>{source}</Markdown>
      </div>
    </main>
  );
}
