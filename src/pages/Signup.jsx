import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "../styles/auth.css";

function Signup() {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Check if email already exists
    const students = JSON.parse(localStorage.getItem("students")) || [];
    if (students.some((s) => s.email === formData.email)) {
      setError("Email already registered");
      return;
    }

    // Create new student account
    const newStudent = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      marks: [],
      createdAt: new Date().toISOString(),
    };

    students.push(newStudent);
    localStorage.setItem("students", JSON.stringify(students));

    // Auto login
    login({ ...newStudent, userType: "student" });
    setSuccess("Account created successfully! Redirecting...");

    setTimeout(() => {
      navigate("/student/dashboard");
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Student Registration</p>
        </div>

        <form onSubmit={handleSignup} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary auth-btn">
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <button
              type="button"
              className="link-button"
              onClick={() => navigate("/login")}
            >
              Login here
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

        <div className="signup-info">
          <h3>What You Get</h3>
          <ul>
            <li>✓ View your marks and grades</li>
            <li>✓ Track academic progress</li>
            <li>✓ Download report cards</li>
            <li>✓ Monitor performance trends</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Signup;
