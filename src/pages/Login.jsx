import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);
  const [userType, setUserType] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (userType === "admin") {
      // Admin login logic
      // In a real app, this would validate against a backend
      if (email && password) {
        login({ email, userType: "admin", name: "Admin User" });
        navigate("/admin/dashboard");
      }
    } else {
      // Student login logic
      const students = JSON.parse(localStorage.getItem("students")) || [];
      const student = students.find(
        (s) => s.email === email && s.password === password
      );

      if (student) {
        login({ ...student, userType: "student" });
        navigate("/student/dashboard");
      } else {
        setError("Invalid email or password");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Login to your account</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          <div className="user-type-selector">
            <label className="radio-group">
              <input
                type="radio"
                value="admin"
                checked={userType === "admin"}
                onChange={(e) => setUserType(e.target.value)}
              />
              <span className="radio-label">🔐 Admin Login</span>
            </label>
            <label className="radio-group">
              <input
                type="radio"
                value="student"
                checked={userType === "student"}
                onChange={(e) => setUserType(e.target.value)}
              />
              <span className="radio-label">👤 Student Login</span>
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary auth-btn">
            Login
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <button
              type="button"
              className="link-button"
              onClick={() => navigate("/signup")}
            >
              Create one here
            </button>
          </p>
          <p>
            <button
              type="button"
              className="link-button"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
