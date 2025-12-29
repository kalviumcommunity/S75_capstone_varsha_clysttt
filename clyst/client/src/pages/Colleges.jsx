import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Colleges.css";

const COURSE_OPTIONS = [
  { id: 'college', label: 'All Colleges', icon: '🏫' },
  { id: 'engineering', label: 'Engineering', icon: '⚙️' },
  { id: 'architecture', label: 'Architecture', icon: '🏗️' },
  { id: 'agriculture', label: 'Agriculture', icon: '🌾' },
  { id: 'dental', label: 'Dental', icon: '🦷' },
  { id: 'pharmacy', label: 'Pharmacy', icon: '💊' },
  { id: 'law', label: 'Law', icon: '⚖️' },
  { id: 'medical', label: 'Medical', icon: '🏥' },
  { id: 'research', label: 'Research', icon: '🔬' }
];

function Colleges() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allStates, setAllStates] = useState([]);

  // Filter states
  const [selectedCourse, setSelectedCourse] = useState(params.get("course") || 'college');
  const [selectedStates, setSelectedStates] = useState([]);
  const [searchQuery, setSearchQuery] = useState(params.get("search") || "");
  const [sortBy, setSortBy] = useState("rank");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  // Fetch colleges data
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);
        
        let data = [];

        // Try to fetch from backend first
        try {
          const queryParams = new URLSearchParams();
          
          queryParams.append("course", selectedCourse);
          
          if (selectedStates.length > 0) {
            queryParams.append("state", selectedStates[0]);
          }
          
          if (searchQuery.trim()) {
            queryParams.append("search", searchQuery);
          }
          
          queryParams.append("limit", 200);

          const response = await fetch(
            `http://localhost:5000/api/colleges?${queryParams.toString()}`,
            { timeout: 5000 }
          );

          if (response.ok) {
            const result = await response.json();
            data = result.data || result;
          } else {
            throw new Error("Backend failed");
          }
        } catch (backendErr) {
          console.warn("Backend failed, loading from local data...", backendErr);
          // Fallback: load from public data
          try {
            const fileMap = {
              'college': 'college_ranking.json',
              'engineering': 'engineering_ranking.json',
              'architecture': 'architecture_ranking.json',
              'agriculture': 'overall_ranking.json', // Fallback
              'dental': 'dental_ranking.json',
              'pharmacy': 'pharmacy_ranking.json',
              'law': 'law_ranking.json',
              'medical': 'medical_ranking.json',
              'research': 'research_ranking.json',
              'university': 'university_ranking.json'
            };
            
            const fileName = fileMap[selectedCourse] || fileMap['college'];
            const response = await fetch(`/${fileName}`);
            if (response.ok) {
              data = await response.json();
            }
          } catch (fallbackErr) {
            throw new Error("Could not load college data");
          }
        }

        // Filter based on selected states and search
        let filteredData = [...data];
        
        if (selectedStates.length > 0) {
          filteredData = filteredData.filter((c) =>
            selectedStates.includes(c.state)
          );
        }
        
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          filteredData = filteredData.filter((c) =>
            c.name.toLowerCase().includes(query) ||
            c.city.toLowerCase().includes(query)
          );
        }

        // Extract unique states
        const states = [...new Set(data.map((c) => c.state))].sort();
        setAllStates(states);

        // Apply sorting
        if (sortBy === "rank") {
          filteredData = filteredData.sort((a, b) => a.rank - b.rank);
        } else if (sortBy === "name") {
          filteredData = filteredData.sort((a, b) => a.name.localeCompare(b.name));
        }

        setColleges(filteredData);
        setError(null);
      } catch (err) {
        console.error("Error fetching colleges:", err);
        setError("Unable to load colleges. Please try again later.");
        setColleges([]);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, [selectedCourse, selectedStates, searchQuery, sortBy]);

  const handleStateChange = (state) => {
    setSelectedStates((prev) =>
      prev.includes(state) ? prev.filter((s) => s !== state) : [...prev, state]
    );
  };

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
    setSelectedStates([]);
    if (course !== 'college') {
      params.set("course", course);
    } else {
      params.delete("course");
    }
    setParams(params);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    setParams(params);
  };

  const handleResetFilters = () => {
    setSelectedCourse('college');
    setSelectedStates([]);
    setSearchQuery("");
    setSortBy("rank");
    setCurrentPage(1);
    setMobileFiltersOpen(false);
    params.delete("search");
    params.delete("course");
    setParams(params);
  };

  // Calculate pagination
  const totalPages = Math.ceil(colleges.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const paginatedColleges = colleges.slice(startIdx, endIdx);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="colleges-page">
      {/* Hero Section */}
      <section className="colleges-hero">
        <div className="colleges-hero-content">
          <h1>Explore Top Colleges</h1>
          <p>Discover and compare India's finest educational institutions</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="colleges-container">
        {/* Mobile Filter Toggle */}
        <button
          className="mobile-filter-toggle"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
          Filters
        </button>

        {/* Sidebar Filters */}
        <aside className={`filters-sidebar ${mobileFiltersOpen ? 'open' : ''}`}>
          {/* Course Filter - Second */}
          <div className="filter-section">
            <h3>Filter by Course</h3>
            <div className="filter-group course-filter">
              {COURSE_OPTIONS.map((course) => (
                <button
                  key={course.id}
                  className={`course-btn ${selectedCourse === course.id ? 'active' : ''}`}
                  onClick={() => {
                    handleCourseChange(course.id);
                    setMobileFiltersOpen(false);
                  }}
                  title={course.label}
                >
                  <span className="course-icon">{course.icon}</span>
                  <span className="course-label">{course.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* State Filter - Third */}
          <div className="filter-section">
            <h3>Filter by State</h3>
            <div className="filter-group states-list">
              {allStates.length > 0 ? (
                allStates.map((state) => (
                  <div key={state} className="filter-item">
                    <input
                      type="checkbox"
                      id={`state-${state}`}
                      checked={selectedStates.includes(state)}
                      onChange={() => handleStateChange(state)}
                    />
                    <label htmlFor={`state-${state}`}>{state}</label>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: "13px", color: "#6b7280" }}>
                  Loading states...
                </p>
              )}
            </div>
          </div>

          {/* Reset Button */}
          <button className="reset-filters" onClick={handleResetFilters}>
            Reset All Filters
          </button>
        </aside>

        {/* Main Content Area */}
        <div className="colleges-content">
          {/* Results Header */}
          <div className="results-header">
              {/* Mobile header search (kept for mobile) */}
              <div className="header-search">
                <input
                  type="text"
                  className="header-search-input"
                  placeholder="College name or city..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button
                  className="search-btn"
                  aria-label="Search"
                  onClick={() => { /* live search; button kept for UX */ }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="6"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>

                {/* Mobile-only filter button next to search */}
                <button
                  className="header-filter-btn"
                  aria-label="Open filters"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 3H2l8.5 9V21l3-2v-7L22 3z" />
                  </svg>
                  <span className="visually-hidden">Filters</span>
                </button>
              </div>

              {/* Desktop-only search positioned above results count */}
              <div className="desktop-search">
                <input
                  type="text"
                  className="desktop-search-input"
                  placeholder="College name or city..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button
                  className="search-btn"
                  aria-label="Search"
                  onClick={() => {}}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="6"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>

            <div className="results-meta">
              <span className="results-count">
                {loading ? "Loading..." : `${colleges.length} colleges found`}
              </span>
              <div className="sort-control">
                <label htmlFor="sort-select">Sort:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="rank">Rank (Low to High)</option>
                  <option value="name">College Name (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Colleges Grid or Loading/Error State */}
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p style={{ marginTop: "16px", color: "#6b7280" }}>
                Loading colleges...
              </p>
            </div>
          ) : error ? (
            <div className="empty-state">
              <h2>⚠️ Something went wrong</h2>
              <p>{error}</p>
            </div>
          ) : colleges.length === 0 ? (
            <div className="empty-state">
              <h2>No colleges found</h2>
              <p>Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <>
              <div className="colleges-grid">
                {paginatedColleges.map((college) => (
                  <div key={`${college.name}-${college.rank}`} className="college-card">
                    <div className="card-header">
                      <div className="college-rank">#{college.rank}</div>
                      <div className="card-header-info">
                        <h3 className="college-name">{college.name}</h3>
                        <p className="college-city">📍 {college.city}</p>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="college-meta-row">
                        <span className="meta-label">State</span>
                        <span className="meta-value state">{college.state}</span>
                      </div>
                    </div>

                    <div className="card-footer">
                      <button
                        className="view-details-btn"
                        onClick={() =>
                          navigate(
                            `/colleges?college=${encodeURIComponent(college.name)}`
                          )
                        }
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  {/* <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                  >
                    ← First
                  </button> */}
                  <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    ←
                  </button>

                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, i) => {
                      const pageNum = i + 1;
                      // Show first 3, last 3, and surrounding pages
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            className={`pagination-number ${
                              currentPage === pageNum ? 'active' : ''
                            }`}
                            onClick={() => handlePageChange(pageNum)}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (
                        pageNum === 2 ||
                        pageNum === totalPages - 1
                      ) {
                        return <span key={pageNum} className="pagination-dots">...</span>;
                      }
                      return null;
                    })}
                  </div>

                  <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    →
                  </button>
                  {/* <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    Last →
                  </button> */}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Colleges;
