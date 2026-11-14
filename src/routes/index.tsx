import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main>
      <h1>Home</h1>
      <p>My name is Zachary Betz and I’m a software developer by trade.</p>
      <p>
        Husband. Father. I enjoy good talks and long walks, good food and film,
        and taking things slow.
      </p>
    </main>
  );
}
