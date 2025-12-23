import { useSearchParams, useNavigate } from "react-router-dom";

const collegesData = [
  {
    name: "Anna University",
    category: "Engineering",
    location: "Chennai"
  },
  {
    name: "Loyola College",
    category: "Arts",
    location: "Chennai"
  },
  {
    name: "PSG College of Technology",
    category: "Engineering",
    location: "Coimbatore"
  },
  {
    name: "Madurai Medical College",
    category: "Medical",
    location: "Madurai"
  },
  {
    name: "Vellore Institute of Technology",
    category: "Technology",
    location: "Vellore"
  }
];

function Colleges() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";
  const selectedCollege = searchParams.get("college");

  const filteredColleges = collegesData.filter((college) => {
    const matchesSearch = college.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory = categoryQuery
      ? college.category === categoryQuery
      : true;

    return matchesSearch && matchesCategory;
  });

  const collegeDetails = collegesData.find(
    (college) => college.name === selectedCollege
  );

  return (
    <div style={styles.page}>
      {/* DETAIL VIEW */}
      {selectedCollege && collegeDetails ? (
        <>
          <button style={styles.backBtn} onClick={() => navigate(-1)}>
            ← Back to Colleges
          </button>

          <div style={styles.detailCard}>
            <h1>{collegeDetails.name}</h1>
            <p style={styles.location}>{collegeDetails.location}</p>
            <span style={styles.category}>{collegeDetails.category}</span>

            <p style={styles.detailText}>
              {collegeDetails.name} is one of the well-known colleges in Tamil
              Nadu, offering quality education and strong academic programs.
            </p>
          </div>
        </>
      ) : (
        <>
          {/* LIST VIEW */}
          <h1 style={styles.heading}>Colleges</h1>

          {filteredColleges.length === 0 ? (
            <p style={styles.empty}>No colleges found.</p>
          ) : (
            <div style={styles.grid}>
              {filteredColleges.map((college) => (
                <div
                  key={college.name}
                  style={styles.card}
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
                  <h3 style={styles.name}>{college.name}</h3>
                  <p style={styles.location}>{college.location}</p>
                  <span style={styles.category}>{college.category}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "40px 20px"
  },
  heading: {
    fontSize: "32px",
    marginBottom: "30px",
    textAlign: "center",
    color: "#111827"
  },
  empty: {
    textAlign: "center",
    fontSize: "16px",
    color: "#6b7280"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
    maxWidth: "1100px",
    margin: "0 auto"
  },
  card: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    cursor: "pointer",
    transition: "all 0.25s ease",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
  },
  name: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px"
  },
  location: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "10px"
  },
  category: {
    display: "inline-block",
    fontSize: "13px",
    padding: "4px 10px",
    borderRadius: "20px",
    backgroundColor: "#e0f2fe",
    color: "#0369a1"
  },
  backBtn: {
    marginBottom: "20px",
    background: "none",
    border: "none",
    color: "#2563eb",
    cursor: "pointer",
    fontSize: "16px"
  },
  detailCard: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "30px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    backgroundColor: "white",
    textAlign: "center"
  },
  detailText: {
    marginTop: "20px",
    fontSize: "15px",
    color: "#374151",
    lineHeight: "1.6"
  }
};

export default Colleges;
