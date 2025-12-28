import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>

        <div>
          <h3>CLYST</h3>
          <p style={styles.text}>
            Helping 12th grade students find the perfect college in Tamil Nadu for their future.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/colleges" style={styles.link}>Colleges</Link>
          <Link to="/about" style={styles.link}>About Us</Link>
        </div>

        <div>
          <h4>Categories</h4>
          <p>Engineering</p>
          <p>Medical</p>
          <p>Arts & Science</p>
          <p>Management</p>
        </div>

        <div>
          <h4>Contact</h4>
          <p>Have questions? Reach out to us.</p>
          <p>Email: info@clyst.edu</p>
        </div>

        <div>
          <h4>Contribution</h4>
          <p>Contribute to the developer for more such products.</p>
          <a
            href="https://buymeacoffee.com/varshakannan"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.contributionBtn}
          >
            Donate
          </a>
        </div>

      </div>

      <div style={styles.bottom}>
        © 2025 CLYST. All rights reserved.
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: "60px",
    padding: "40px 60px",
    backgroundColor: "#f9fafb",
    borderTop: "1px solid #e5e7eb",
    color: "#111827"   // ✅ CORRECT PLACE
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "40px"
  },
  text: {
    maxWidth: "250px",
    fontSize: "14px"
  },
  bottom: {
    marginTop: "30px",
    textAlign: "center",
    fontSize: "14px",
    color: "#6b7280"
  }
  ,
  contributionBtn: {
    display: "inline-block",
    marginTop: "12px",
    padding: "8px 14px",
    backgroundColor: "#0ea5e9",
    color: "#ffffff",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 600
  }
  ,
  link: {
    display: "block",
    marginTop: "8px",
    color: "#0f1724",
    textDecoration: "none",
    fontWeight: 500
  }
};



export default Footer;
