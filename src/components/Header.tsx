import { Link } from "@tanstack/react-router";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header>
      <Link className="brand" to="/">
        Zachary Betz
      </Link>
      <nav aria-label="Main navigation">
        <Link to="/" activeOptions={{ exact: true }}>
          Home
        </Link>
        <Link to="/wiki">Wiki</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/links">Links</Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
