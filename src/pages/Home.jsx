import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Navigation Bar for Home */}
      <nav className="home-navbar">
        <div className="home-navbar-content">
          <h1 className="home-logo">📊 Student Performance Analysis System</h1>
          <div className="home-nav-buttons">
            <button className="btn-login" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="btn-signup" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2 className="hero-title">Welcome to Student Performance Analysis System</h2>
          <p className="hero-subtitle">
            A comprehensive platform for tracking student performance and generating insightful reports
          </p>
          <div className="hero-buttons">
            <button className="btn-primary btn-large" onClick={() => navigate("/login")}>
              Login Now
            </button>
            <button className="btn-secondary btn-large" onClick={() => navigate("/signup")}>
              Create Account
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="placeholder-icon">📈</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👨‍🎓</div>
            <h3>Student Management</h3>
            <p>Easily add and manage student profiles and their academic information</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Subject Tracking</h3>
            <p>Organize subjects and keep track of curriculum across different semesters</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Marks Entry</h3>
            <p>Quick and efficient entry of student marks for various subjects and exams</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analytics & Reports</h3>
            <p>Generate detailed performance reports and analytics for student progress tracking</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Grade Calculation</h3>
            <p>Automatic grade assignment based on marks with customizable grading scales</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Report Cards</h3>
            <p>View comprehensive report cards with subject-wise performance and grades</p>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="user-types">
        <h2 className="section-title">Different Access Levels</h2>
        <div className="user-types-grid">
          <div className="user-type-card">
            <div className="user-type-icon">🔐</div>
            <h3>Admin Access</h3>
            <p className="user-type-description">
              Teachers and administrators can:
            </p>
            <ul className="user-type-features">
              <li>Add and manage students</li>
              <li>Create and manage subjects</li>
              <li>Enter and update marks</li>
              <li>Generate comprehensive reports</li>
              <li>View student analytics</li>
            </ul>
            <button className="btn-primary" onClick={() => navigate("/login")}>
              Admin Login
            </button>
          </div>
          <div className="user-type-card">
            <div className="user-type-icon">👤</div>
            <h3>Student Access</h3>
            <p className="user-type-description">
              Students can:
            </p>
            <ul className="user-type-features">
              <li>View their marks</li>
              <li>Track academic progress</li>
              <li>View grades and ratings</li>
              <li>Download report cards</li>
              <li>Monitor performance trends</li>
            </ul>
            <button className="btn-secondary" onClick={() => navigate("/signup")}>
              Create Student Account
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2 className="section-title">About This System</h2>
        <div className="about-content">
          <p>
            The Marks Analysis System is designed to streamline the process of tracking and analyzing 
            student academic performance. Whether you're an educator looking to manage student records 
            or a student wanting to track your progress, this system provides all the tools you need.
          </p>
          <p>
            With an intuitive interface and powerful analytics, you can make data-driven decisions 
            to improve learning outcomes and student engagement.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2024 Marks Analysis System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
