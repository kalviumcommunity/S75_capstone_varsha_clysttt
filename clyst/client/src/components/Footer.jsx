import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">

        <div className="col about">
          <h3>CLYST</h3>
          <p className="text">
            Helping 12th grade students find the perfect college in Tamil Nadu for their future.
          </p>
        </div>

        <div className="col">
          <h4>Quick Links</h4>
          <Link to="/" className="link">Home</Link>
          <Link to="/colleges" className="link">Colleges</Link>
          <Link to="/about" className="link">About Us</Link>
        </div>

        <div className="col">
          <h4>Categories</h4>
          <p>Engineering</p>
          <p>Medical</p>
          <p>Arts &amp; Science</p>
          <p>Management</p>
        </div>

        <div className="col">
          <h4>Contact</h4>
          <p>Have questions? Reach out to us.</p>
          <p>Email: info@clyst.edu</p>
        </div>

        <div className="col">
          <h4>Contribution</h4>
          <p>Contribute to the developer for more such products.</p>
          <a
            href="https://buymeacoffee.com/varshakannan"
            target="_blank"
            rel="noopener noreferrer"
            className="contributionBtn"
          >
            Donate
          </a>
        </div>

      </div>

      <div className="bottom">
        © 2025 CLYST. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
