import { useNavigate } from "react-router-dom";
import { useState } from "react";

/* ===================== DATA ===================== */

const categories = [
  { name: "Engineering", icon: "🛠️" },
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
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b"
  },
  {
    name: "Loyola College",
    location: "Chennai",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
  },
  {
    name: "Vellore Institute of Technology",
    location: "Vellore",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
  },
  {
    name: "PSG College of Technology",
    location: "Coimbatore",
    rating: "4.6",
    image: "https://images.unsplash.com/photo-1562774053-701939374585"
  }
];

/* ===================== COMPONENT ===================== */

function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/colleges?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.title}>Find the Perfect College in Tamil Nadu</h1>

        <p style={styles.subtitle}>
          Discover top colleges across Tamil Nadu to shape your future. Compare
          programs, facilities, and more to make the right choice.
        </p>

        <div style={styles.searchBox}>
          <input
            type="text"
            aria-label="Search colleges"
            placeholder="Search for colleges in Tamil Nadu..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleSearch} style={styles.button}>
            Search
          </button>
        </div>
      </div>

      {/* CATEGORIES */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Browse by Category</h2>

        <div style={styles.categories}>
          {categories.map((cat) => (
            <div
              key={cat.name}
              style={styles.categoryCard}
              onClick={() =>
                navigate(`/colleges?category=${encodeURIComponent(cat.name)}`)
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 20px rgba(0,0,0,0.12)";
                e.currentTarget.style.borderColor = "#2563eb";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 2px 6px rgba(0,0,0,0.06)";
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}
            >
              <span style={styles.categoryIcon}>{cat.icon}</span>
              <p style={styles.categoryText}>{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TOP COLLEGES */}
      <div style={{ ...styles.section, backgroundColor: "#f9fafb" }}>
        <h2 style={styles.sectionTitle}>Top Rated Colleges</h2>

        <div style={styles.collegeGrid}>
          {topColleges.map((college) => (
            <div
              key={college.name}
              style={styles.collegeCard}
              onClick={() =>
                navigate(
                  `/colleges?college=${encodeURIComponent(college.name)}`
                )
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 24px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 2px 6px rgba(0,0,0,0.08)";
              }}
            >
              <img
                src={college.image}
                alt={college.name || "College image"}
                style={styles.collegeImage}
              />

              <div style={styles.collegeInfo}>
                <span style={styles.collegeName}>{college.name}</span>
                <span style={styles.collegeLocation}>
                  {college.location}
                </span>
                <span style={styles.collegeRating}>
                  ⭐ {college.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ===================== STYLES ===================== */

const styles = {
  hero: {
    background: "linear-gradient(to right, #0f4c81, #0b6fb3)",
    padding: "100px 20px",
    textAlign: "center",
    color: "white"
  },
  title: {
    fontSize: "42px",
    marginBottom: "20px"
  },
  subtitle: {
    maxWidth: "700px",
    margin: "0 auto 40px",
    fontSize: "18px",
    lineHeight: "1.6"
  },
  searchBox: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    maxWidth: "600px",
    margin: "0 auto"
  },
  input: {
    flex: 1,
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none"
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  section: {
    padding: "60px 20px"
  },
  sectionTitle: {
    fontSize: "28px",
    marginBottom: "40px",
    textAlign: "center",
    color: "#111827"
  },

  categories: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "20px",
    maxWidth: "900px",
    margin: "0 auto"
  },
  categoryCard: {
    backgroundColor: "#ffffff",
    padding: "30px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    border: "1px solid #e5e7eb",
    textAlign: "center",
    fontWeight: "500",
    color: "#111827",
    transition: "all 0.25s ease",
    boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
  },
  categoryIcon: {
    fontSize: "28px",
    display: "block",
    marginBottom: "10px"
  },
  categoryText: {
    marginTop: "6px"
  },

  collegeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    maxWidth: "1100px",
    margin: "0 auto"
  },
  collegeCard: {
    backgroundColor: "white",
    borderRadius: "10px",
    overflow: "hidden",
    border: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    transition: "all 0.25s ease",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
  },
  collegeImage: {
    width: "100%",
    height: "160px",
    objectFit: "cover"
  },
  collegeInfo: {
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  collegeName: {
    fontSize: "16px",
    fontWeight: "600"
  },
  collegeLocation: {
    fontSize: "14px",
    color: "#6b7280"
  },
  collegeRating: {
    fontSize: "14px",
    color: "#f59e0b"
  }
};

export default Home;
