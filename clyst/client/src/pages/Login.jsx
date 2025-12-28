import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/auth";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      let data;
      try {
        data = await res.json();
      } catch (err) {
        const text = await res.text();
        data = { message: text || `HTTP ${res.status}` };
      }

      if (!res.ok) {
        console.error("Login failed", res.status, data);
        setError(data.message || `Login failed (status ${res.status})`);
        return;
      }

      // ✅ STORE JWT USING AUTH UTILS
      loginUser(data.token);

      // ✅ REDIRECT
      navigate("/");
    } catch (err) {
      console.error("Login error", err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="auth-input"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="auth-input"
        />

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="auth-switch">
        Don’t have an account?{" "}
        <span onClick={() => navigate("/signup")} className="auth-link">
          Sign Up
        </span>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "80px auto",
    padding: "30px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    textAlign: "center",
    backgroundColor: "white"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px"
  },
  input: {
    padding: "12px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #d1d5db"
  },
  button: {
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "10px"
  },
  switch: {
    marginTop: "20px",
    fontSize: "14px"
  },
  link: {
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: "500"
  }
};

export default Login;
