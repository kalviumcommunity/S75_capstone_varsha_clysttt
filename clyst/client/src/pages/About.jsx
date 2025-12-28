import "./About.css";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="container">
          <div className="icon-circle">
            <img src={logo} alt="cap" />
          </div>
          <h1 className="about-title">About CLYST</h1>
          <p className="about-sub">Helping 12th grade students find the perfect college in Tamil Nadu</p>
        </div>
      </section>

      <section className="container">
        <div className="about-content">
          <p><strong>Our Mission</strong><br />At CLYST, our mission is to simplify the college search process for 12th grade students in Tamil Nadu. We understand that choosing the right college is one of the most important decisions in a student's life, and we're here to provide comprehensive, accurate information to help make that decision easier.</p>

          <h4>What We Offer</h4>
          <p><strong>Comprehensive College Database:</strong> Detailed information about hundreds of colleges across Tamil Nadu, including engineering, medical, arts, science, and management institutions.</p>
          <p><strong>Easy Search & Filter:</strong> Find colleges based on location, courses, facilities, and more.</p>
          <p><strong>Verified Information:</strong> All college listings are carefully verified to ensure accuracy.</p>
          <p><strong>User-Friendly Interface:</strong> Simple, intuitive design making it easy to find what you're looking for.</p>

          <h4>Why Choose CLYST?</h4>
          <p>CLYST was created by education experts who understand the challenges students face when searching for colleges. Our platform is specifically designed for Tamil Nadu students, focusing on local institutions and considerations that matter most to students in the region.</p>

          <p>We're committed to helping students make informed decisions about their education and future careers. By providing clear, organized information about colleges, we aim to reduce the stress and confusion often associated with the college search process.</p>

          <div className="about-cta">
            <Link className="btn" to="/colleges">Browse Colleges</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
