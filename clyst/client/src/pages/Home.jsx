import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Home.css";

/* ===================== DATA ===================== */

const categories = [
  { name: "Engineering", icon: "⚙️" },
  { name: "Medical", icon: "🩺" },
  { name: "Arts", icon: "🎨" },
  { name: "Science", icon: "🔬" },
  { name: "Management", icon: "📊" },
  { name: "Technology", icon: "💻" }
];

const topColleges = [
  {
    name: "National Institute of Technology",
    location: "Tiruchirappalli",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=1200&q=60"
  },
  {
    name: "Loyola College",
    location: "Chennai",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=60"
  },
  {
    name: "Vellore Institute of Technology",
    location: "Vellore",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=60"
  },
  {
    name: "PSG College of Technology",
    location: "Coimbatore",
    rating: "4.6",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=60"
  }
];

function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e?.preventDefault?.();
    if (query.trim()) {
      navigate(`/colleges?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <main className="home-page">
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">Find the Perfect College in Tamil Nadu</h1>
          <p className="hero-sub">Discover top colleges across Tamil Nadu to shape your future. Compare programs, facilities, and more to make the right choice.</p>

          <form className="hero-search" onSubmit={handleSearch}>
            <input
              className="search-input"
              placeholder="Search for colleges in Tamil Nadu..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search colleges"
            />
            <button className="search-btn">Search</button>
          </form>
        </div>
      </section>

      <section className="section container">
        <h2 className="section-title">Browse by Category</h2>
        <p className="section-sub">Explore colleges in Tamil Nadu by your preferred field of study</p>

        <div className="categories">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="category-card"
              onClick={() => navigate(`/colleges?category=${encodeURIComponent(cat.name)}`)}
            >
              <div className="cat-icon">{cat.icon}</div>
              <div className="cat-name">{cat.name}</div>
              <div className="cat-sub">Find Top {cat.name} Colleges</div>
            </button>
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Top Rated Colleges</h2>
            <button className="view-all">View All</button>
          </div>

          <div className="college-grid">
            {topColleges.map((college) => (
              <article
                key={college.name}
                className="college-card"
                onClick={() => navigate(`/colleges?college=${encodeURIComponent(college.name)}`)}
              >
                <div className="card-media">
                  <img src={college.image} alt={college.name} />
                  <div className="rating">{college.rating} ★</div>
                </div>
                <div className="card-body">
                  <h3 className="college-name">{college.name}</h3>
                  <div className="college-meta">{college.location}</div>
                  <p className="college-desc">Brief overview about the college, programs and facilities to help students decide quickly.</p>
                  <div className="tags">
                    <span className="tag">Engineering</span>
                    <span className="tag">Technology</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section container why-choose">
        <h2 className="section-title">Why Choose CLYST?</h2>
        <div className="choose-grid">
          <div className="choose-card">
            <div className="choose-icon">🏛️</div>
            <h4>Comprehensive College Database</h4>
            <p>Access detailed information about hundreds of colleges across Tamil Nadu</p>
          </div>
          <div className="choose-card">
            <div className="choose-icon">💡</div>
            <h4>Expert Guidance</h4>
            <p>Make informed decisions with detailed insights and college comparisons</p>
          </div>
          <div className="choose-card">
            <div className="choose-icon">✅</div>
            <h4>Verified Information</h4>
            <p>Trust our carefully verified data about colleges, courses, and facilities</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
