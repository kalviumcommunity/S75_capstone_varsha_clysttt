import { Link, useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated, logoutUser } from "../utils/auth";
import logo from "../assets/logo.svg";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const loggedIn = isAuthenticated();

  // close mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
    setOpen(false);
  };

  return (
    <nav className="nav">
      <div className="brand">
        <img src={logo} alt="CLYST logo" className="logoImg" />
        <div className="logoText">CLYST</div>
      </div>

      <button
        className={`hamburger ${open ? "is-open" : ""}`}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className="nav-links">
        <Link to="/" className="link">Home</Link>
        <Link to="/colleges" className="link">Colleges</Link>
        <Link to="/about" className="link">About</Link>
      </div>

      <div className="actions">
        {loggedIn ? (
          <button className="logoutBtn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="link">Login</Link>
            <Link to="/signup" className="signupBtn">Sign Up</Link>
          </>
        )}
      </div>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <Link to="/" className="mobile-link">Home</Link>
        <Link to="/colleges" className="mobile-link">Colleges</Link>
        <Link to="/about" className="mobile-link">About</Link>
        <div className="mobile-actions">
          {loggedIn ? (
            <button className="mobile-logout" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login" className="mobile-link">Login</Link>
              <Link to="/signup" className="mobile-signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
