import { Markdown } from "@tanstack/markdown/react";
import { createFileRoute } from "@tanstack/react-router";
import source from "../content/pages/photo.md?raw";

export const Route = createFileRoute("/photo")({ component: Page });

function Page() {
  return (
    <main>
      <h1>{"Photo"}</h1>
      <div className="prose">
        <Markdown>{source}</Markdown>
      </div>
    </main>
  );
}
