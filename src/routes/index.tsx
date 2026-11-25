import { createFileRoute, Link } from "@tanstack/react-router";
export const Route = createFileRoute("/")({ component: Home });
function Home() {
  return (
    <main className="home">
      <section className="intro">
        <p className="eyebrow">Software developer · Husband · Father</p>
        <h1>
          Zachary <mark>Betz</mark>.
        </h1>
        <p className="lede">
          My name is Zachary Betz and I’m a software developer by trade.
        </p>
        <p>
          I enjoy good talks and long walks, good food and film, and taking
          things slow.
        </p>
      </section>
      <section className="home-cards" aria-label="Explore">
        <Link to="/wiki">
          <span className="eyebrow">Notes & discoveries</span>
          <h2>Wiki</h2>
          <p>Things learned, recipes saved, and ideas worth keeping.</p>
        </Link>
        <Link to="/projects">
          <span className="eyebrow">Made along the way</span>
          <h2>Projects</h2>
          <p>A collection of things I’ve built.</p>
        </Link>
        <Link to="/links">
          <span className="eyebrow">Stay a while</span>
          <h2>Links</h2>
          <p>More about this site and ways to get in touch.</p>
        </Link>
      </section>
    </main>
  );
}
