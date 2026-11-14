import { Markdown } from "@tanstack/markdown/react";
import { createFileRoute } from "@tanstack/react-router";
import source from "../content/pages/contact.md?raw";

export const Route = createFileRoute("/contact")({ component: Page });

function Page() {
  return (
    <main>
      <h1>{"Contact"}</h1>
      <div className="prose">
        <Markdown>{source}</Markdown>
      </div>
    </main>
  );
}
