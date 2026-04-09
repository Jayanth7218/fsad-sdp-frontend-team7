import { useState, useEffect } from "react";
import { getAllStudents, deleteStudent } from "../../services/api";
import "../../styles/forms.css";

function StudentDetails() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    const result = await getAllStudents();
    if (result.success) {
      setStudents(result.data);
    } else {
      setError(result.error  "Failed to fetch students");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    setLoading(true);
    const result = await deleteStudent(id);
    if (result.success) {
      setSuccess(result.message  "Student deleted successfully");
      fetchStudents();
    } else {
      setError(result.error  "Failed to delete student");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="page-grid">
        <div className="listing-card card">
          <h2>Students</h2>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          {students.length > 0 ? (
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
                {students.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.contact  "N/A"}</td>
                    <td>
                      <button
                        className="btn-danger"
                        onClick={() => handleDelete(s.id)}
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
            <p>{loading ? "Loading students..." : "No students registered yet."}</p>
          )}
        </div>
        <div className="form-wrapper card">
          <h2 className="form-title">📚 Students Information</h2>
          <p>Students can register themselves through the signup page.</p>
          <p>You can view and manage registered students in the list above.</p>
          <button onClick={fetchStudents} className="btn-primary form-submit" disabled={loading}>
            {loading ? "Refreshing..." : "Refresh Student List"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;