// src/pages/Navbar.jsx
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Spaceport</Link>
      <Link to="/telescope">Telescope</Link>
      <Link to="/tracker">Mission Tracker</Link>
    </nav>
  );
};

export default Navbar;
