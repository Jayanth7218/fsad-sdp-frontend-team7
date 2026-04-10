import { useState, useEffect } from "react";
import { addFaculty, getAllFaculty, deleteFaculty } from "../../services/api";
import "../../styles/forms.css";

function AddFaculty() {
  const [facultyList, setFacultyList] = useState([]);
  const [faculty, setFaculty] = useState({ name: "", email: "", password: "", contact: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    setLoading(true);
    const result = await getAllFaculty();
    if (result.success) {
      setFacultyList(result.data);
    } else {
      setError(result.error || "Failed to fetch faculty");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const facultyData = {
      name: faculty.name,
      email: faculty.email,
      password: faculty.password,
      contact: faculty.contact,
    };

    const result = await addFaculty(facultyData);
    if (result.success) {
      setSuccess(result.message || "Faculty added successfully");
      setFaculty({ name: "", email: "", password: "", contact: "" });
      fetchFaculty();
    } else {
      setError(result.error || "Failed to add faculty");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this faculty member?")) {
      return;
    }

    setLoading(true);
    const result = await deleteFaculty(id);
    if (result.success) {
      setSuccess(result.message || "Faculty deleted successfully");
      fetchFaculty();
    } else {
      setError(result.error || "Failed to delete faculty");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="page-grid">
        <div className="form-card card">
          <h2>Add Faculty</h2>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter faculty name"
                value={faculty.name}
                onChange={(e) => setFaculty({ ...faculty, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter faculty email"
                value={faculty.email}
                onChange={(e) => setFaculty({ ...faculty, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={faculty.password}
                onChange={(e) => setFaculty({ ...faculty, password: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact">Contact</label>
              <input
                id="contact"
                type="tel"
                placeholder="Enter contact number"
                value={faculty.contact}
                onChange={(e) => setFaculty({ ...faculty, contact: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Adding..." : "Add Faculty"}
            </button>
          </form>
        </div>

        <div className="listing-card card">
          <h2>Faculty</h2>
          {facultyList.length > 0 ? (
            <table className="list-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {facultyList.map((f) => (
                  <tr key={f.id}>
                    <td>{f.name}</td>
                    <td>{f.email}</td>
                    <td>{f.contact || "N/A"}</td>
                    <td>
                      <button
                        className="btn-danger"
                        onClick={() => handleDelete(f.id)}
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>{loading ? "Loading faculty..." : "No faculty added yet."}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddFaculty;