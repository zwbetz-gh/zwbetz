import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main>
      <h1>Home</h1>
      <p>Welcome to my corner of the internet.</p>
    </main>
  );
}
