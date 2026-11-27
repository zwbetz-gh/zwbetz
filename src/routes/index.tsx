import { Markdown } from "@tanstack/markdown/react";
import { createFileRoute } from "@tanstack/react-router";
import source from "../content/pages/home.md?raw";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main>
      <h1>Home</h1>
      <div className="prose">
        <Markdown>{source}</Markdown>
      </div>
    </main>
  );
}
