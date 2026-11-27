import { Link } from "@tanstack/react-router";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header>
      <details className="header-menu">
        <summary className="header-menu-trigger" aria-label="Menu">
          <span className="header-menu-icon" aria-hidden="true" />
        </summary>
        <div className="header-content">
          <nav aria-label="Main navigation">
            <Link to="/" activeOptions={{ exact: true }}>
              Home
            </Link>
            <Link to="/wiki">Wiki</Link>
            <Link to="/tools">Tools</Link>
            <Link to="/links">Links</Link>
          </nav>
          <div className="header-theme">
            <ThemeToggle />
          </div>
        </div>
      </details>
    </header>
  );
}
