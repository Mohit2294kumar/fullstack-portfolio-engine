import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navStyle = ({ isActive }) => (isActive ? { color: "var(--text)" } : undefined);

  return (
    <header className="nav" style={{ boxShadow: scrolled ? "var(--shadow)" : "none" }}>
      <div className="nav-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          MERN Portfolio
        </Link>

        <button className="btn btn-ghost mobile-menu-btn" onClick={() => setOpen((v) => !v)} type="button">
          {open ? <FiX /> : <FiMenu />}
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          <a href="/#about" onClick={() => setOpen(false)}>About</a>
          <a href="/#skills" onClick={() => setOpen(false)}>Skills</a>
          <a href="/#projects" onClick={() => setOpen(false)}>Projects</a>
          <a href="/#contact" onClick={() => setOpen(false)}>Contact</a>
          <NavLink to="/admin/login" style={navStyle} onClick={() => setOpen(false)}>Admin</NavLink>
        </nav>

        <div className="nav-tools">
          <ThemeToggle />
          <a className="btn btn-primary" href="/#contact">
            Hire Me
          </a>
        </div>
      </div>
    </header>
  );
}