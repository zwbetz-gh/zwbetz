import { Markdown } from "@tanstack/markdown/react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { posts } from "../wiki";

export const Route = createFileRoute("/wiki/$id")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.id === params.id);
    if (!post) throw notFound();

    return post;
  },
  component: Post,
});

function Post() {
  const post = Route.useLoaderData();

  return (
    <main>
      <article>
        <h1>{post.title}</h1>
        <time dateTime={post.date}>{post.date}</time>
        <div className="prose">
          <Markdown>{post.document}</Markdown>
        </div>
      </article>
    </main>
  );
}
