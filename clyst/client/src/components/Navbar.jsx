import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logoutUser } from "../utils/auth";
import logo from "../assets/logo.svg";

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <img src={logo} alt="CLYST logo" style={styles.logoImg} />
        <div style={styles.logoText}>CLYST</div>
      </div>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/colleges" style={styles.link}>Colleges</Link>
        <Link to="/about" style={styles.link}>About</Link>
      </div>

      <div style={styles.actions}>
        {loggedIn ? (
          <button
            style={styles.logoutBtn}
            onClick={() => {
              logoutUser();
              navigate("/login");
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.signupBtn}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "12px",
    padding: "18px 22px",
    alignItems: "center",
    background: "#ffffff",
    boxShadow: "0 6px 20px rgba(15,23,42,0.04)",
    borderBottom: "1px solid rgba(15,23,42,0.04)"
  },
  logo: {
    fontWeight: "700",
    fontSize: "20px",
    color: "#0f1724"
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoImg: {
    width: "36px",
    height: "36px",
    display: "block",
  },
  logoText: {
    fontWeight: "700",
    fontSize: "18px",
    color: "#0f1724",
  },
  links: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap"
  },
  link: {
    textDecoration: "none",
    color: "#0f1724",
    padding: "6px 8px",
    fontWeight: 500
  },
  actions: {
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },
  signupBtn: {
    padding: "8px 14px",
    background: "#0f7fcf",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
    boxShadow: "0 8px 26px rgba(15,127,207,0.12)"
  },
  logoutBtn: {
    padding: "8px 14px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 8px 24px rgba(239,68,68,0.12)"
  }
};

export default Navbar;
