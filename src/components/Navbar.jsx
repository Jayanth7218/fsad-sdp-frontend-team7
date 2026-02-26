import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: 15, background: "#222", color: "white" }}>
      <Link to="/admin/dashboard" style={{ margin: 10 }}>Dashboard</Link>
      <Link to="/admin/add-student" style={{ margin: 10 }}>Add Student</Link>
      <Link to="/admin/add-subject" style={{ margin: 10 }}>Add Subject</Link>
      <Link to="/admin/add-marks" style={{ margin: 10 }}>Add Marks</Link>
      <Link to="/admin/reports" style={{ margin: 10 }}>Reports</Link>
    </nav>
  );
}