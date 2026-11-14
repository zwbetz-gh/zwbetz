import { Link } from "@tanstack/react-router";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/wiki">Wiki</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/links">Links</Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
