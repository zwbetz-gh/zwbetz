import { createFileRoute, Link } from "@tanstack/react-router";
import { posts } from "../wiki";

export const Route = createFileRoute("/wiki/")({ component: Wiki });

function Wiki() {
  return (
    <main>
      <h1>Wiki</h1>
      <ul className="posts">
        {posts.map((post) => (
          <li key={post.id}>
            <time dateTime={post.date}>{post.date}</time>
            <Link to="/wiki/$id" params={{ id: post.id }}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
