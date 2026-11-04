import { Link } from "@tanstack/react-router";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/wiki">Wiki</Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
