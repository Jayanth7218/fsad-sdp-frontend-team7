import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import "../styles/navbar.css";

function FacultyNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AppContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h3 className="navbar-title">📚 Faculty Panel</h3>
        </div>
        <div className="navbar-links">
          <Link to="/lecturer/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/lecturer/students" className="nav-link">Student Details</Link>
          <Link to="/lecturer/subjects" className="nav-link">Subjects</Link>
          <Link to="/lecturer/marks" className="nav-link">Student Marks</Link>
          <Link to="/lecturer/reports" className="nav-link">Reports</Link>
        </div>
        <div className="navbar-user">
          <span className="user-info">{user?.email}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default FacultyNavbar;