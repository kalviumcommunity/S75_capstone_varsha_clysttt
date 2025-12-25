import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logoutUser } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>CLYST</div>

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
    padding: "16px",
    borderBottom: "1px solid #e5e7eb"
  },
  logo: {
    fontWeight: "bold",
    fontSize: "20px"
  },
  links: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap"
  },
  link: {
    textDecoration: "none",
    color: "#111827",
    padding: "6px"
  },
  actions: {
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },
  signupBtn: {
    padding: "8px 14px",
    background: "#2563eb",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none"
  },
  logoutBtn: {
    padding: "8px 14px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default Navbar;
