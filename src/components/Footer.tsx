import { Link } from "@tanstack/react-router";
export default function Footer() {
  return (
    <footer className="site-footer">
      <span>Zachary Betz</span>
      <nav aria-label="Footer">
        <Link to="/contact">Contact</Link>
        <Link to="/built-with">Built with</Link>
        <Link to="/license">License</Link>
      </nav>
    </footer>
  );
}
