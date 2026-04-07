import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { adminLogin, facultyLogin, studentLogin } from "../services/api";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);
  const [userType, setUserType] = useState("admin");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (userType === "admin") {
        const usernameTrimmed = username.trim();
        const passwordTrimmed = password.trim();

        if (!usernameTrimmed || !passwordTrimmed) {
          setError("Please fill in all fields");
          setLoading(false);
          return;
        }

        const result = await adminLogin(usernameTrimmed, passwordTrimmed);
        if (result.success) {
          login({ ...result.user, userType: "admin" });
          navigate("/admin/dashboard");
        } else {
          setError(result.error || "Invalid admin credentials");
        }
        return;
      }

      if (userType === "lecturer") {
        const emailTrimmed = email.trim();
        const passwordTrimmed = password.trim();

        if (!emailTrimmed || !passwordTrimmed) {
          setError("Please fill in all fields");
          setLoading(false);
          return;
        }

        const result = await facultyLogin(emailTrimmed, passwordTrimmed);
        if (result.success) {
          login({ ...result.user, userType: "lecturer" });
          navigate("/lecturer/dashboard");
        } else {
          setError(result.error || "Invalid faculty credentials");
        }
        return;
      }

      // Student login
      const emailTrimmed = email.trim();
      const passwordTrimmed = password.trim();

      if (!emailTrimmed || !passwordTrimmed) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      const result = await studentLogin(emailTrimmed, passwordTrimmed);
      if (result.success) {
        login({ ...result.user, userType: "student" });
        navigate("/student/dashboard");
      } else {
        setError(result.error || "Invalid student credentials");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
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
                value="lecturer"
                checked={userType === "lecturer"}
                onChange={(e) => setUserType(e.target.value)}
              />
              <span className="radio-label">👨‍🏫 Faculty Login</span>
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

          {userType === "admin" ? (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          ) : (
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
          )}

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

          <button type="submit" className="btn-primary auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
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
