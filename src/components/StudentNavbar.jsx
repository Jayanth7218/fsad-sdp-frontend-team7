import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import "../styles/navbar.css";

function StudentNavbar() {
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
          <h3 className="navbar-title">👤 Student Portal</h3>
        </div>
        <div className="navbar-links">
          <Link to="/student/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/student/marks" className="nav-link">My Marks</Link>
        </div>
        <div className="navbar-user">
          <span className="user-info">{user?.name}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default StudentNavbar;
