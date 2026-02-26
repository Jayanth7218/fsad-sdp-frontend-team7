import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import "../styles/navbar.css";

function AdminNavbar() {
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
          <h3 className="navbar-title">📊 Admin Panel</h3>
        </div>
        <div className="navbar-links">
          <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/admin/students" className="nav-link">Student Details</Link>
          <Link to="/admin/subjects" className="nav-link">Subjects</Link>
          <Link to="/admin/marks" className="nav-link">Student Marks</Link>
          <Link to="/admin/reports" className="nav-link">Reports</Link>
        </div>
        <div className="navbar-user">
          <span className="user-info">{user?.email}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;