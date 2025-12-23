import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logoutUser } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>CLYST</div>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/colleges" style={styles.link}>Colleges</Link>
        <Link to="/about" style={styles.link}>About</Link>
      </div>

      <div style={styles.actions}>
        <Link to="/colleges" style={styles.findBtn}>Find Colleges</Link>

        {loggedIn ? (
          <button onClick={handleLogout} style={styles.logoutBtn}>
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 40px",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "white"
  },
  logo: {
    fontWeight: "bold",
    fontSize: "20px"
  },
  links: {
    display: "flex",
    gap: "20px"
  },
  link: {
    textDecoration: "none",
    color: "#111827",
    fontWeight: "500"
  },
  actions: {
    display: "flex",
    gap: "15px",
    alignItems: "center"
  },
  findBtn: {
    textDecoration: "none",
    padding: "8px 14px",
    border: "1px solid #2563eb",
    borderRadius: "6px",
    color: "#2563eb"
  },
  signupBtn: {
    textDecoration: "none",
    padding: "8px 14px",
    background: "#2563eb",
    color: "white",
    borderRadius: "6px"
  },
  logoutBtn: {
    padding: "8px 14px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500"
  }
};

export default Navbar;
