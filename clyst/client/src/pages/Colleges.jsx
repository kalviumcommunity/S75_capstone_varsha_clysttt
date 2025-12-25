import { useSearchParams, useNavigate } from "react-router-dom";

const collegesData = [
  { name: "Anna University", category: "Engineering", location: "Chennai" },
  { name: "Loyola College", category: "Arts", location: "Chennai" },
  { name: "PSG College of Technology", category: "Engineering", location: "Coimbatore" },
  { name: "Madurai Medical College", category: "Medical", location: "Madurai" },
  { name: "Vellore Institute of Technology", category: "Technology", location: "Vellore" }
];

function Colleges() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const selectedCollege = params.get("college");

  const collegeDetails = collegesData.find(
    (c) => c.name === selectedCollege
  );

  return (
    <div style={styles.page}>
      {collegeDetails ? (
        <>
          <button style={styles.backBtn} onClick={() => navigate(-1)}>
            ← Back
          </button>
          <div style={styles.detailCard}>
            <h1>{collegeDetails.name}</h1>
            <p>{collegeDetails.location}</p>
            <span>{collegeDetails.category}</span>
          </div>
        </>
      ) : (
        <>
          <h1 style={styles.heading}>Colleges</h1>
          <div style={styles.grid}>
            {collegesData.map((college) => (
              <div
                key={college.name}
                style={styles.card}
                onClick={() =>
                  navigate(`/colleges?college=${encodeURIComponent(college.name)}`)
                }
              >
                <h3>{college.name}</h3>
                <p>{college.location}</p>
                <span>{college.category}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "40px 16px",
    maxWidth: "1200px",
    margin: "0 auto"
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px"
  },
  card: {
    padding: "20px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    cursor: "pointer"
  },
  backBtn: {
    marginBottom: "20px",
    background: "none",
    border: "none",
    color: "#2563eb",
    cursor: "pointer"
  },
  detailCard: {
    padding: "30px",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    textAlign: "center"
  }
};

export default Colleges;
