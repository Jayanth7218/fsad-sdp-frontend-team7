import { useState, useEffect } from "react";
import "../../styles/forms.css";

function StudentDetails() {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    setStudents(JSON.parse(localStorage.getItem("students")) || []);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("students")) || [];
    existing.push({ ...student, id: Date.now(), marks: [] });
    localStorage.setItem("students", JSON.stringify(existing));
    setStudents(existing);
    setStudent({ name: "", email: "", password: "" });
  };

  return (
    <div className="container">
      <div className="page-grid">
        <div className="listing-card card">
          <h2>Students</h2>
          {students.length > 0 ? (
            <table className="list-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Registered</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{new Date(s.id).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn-danger"
                        onClick={() => {
                          const filtered = students.filter((x) => x.id !== s.id);
                          setStudents(filtered);
                          localStorage.setItem("students", JSON.stringify(filtered));
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No students added yet.</p>
          )}
        </div>
        <div className="form-wrapper card">
          <h2 className="form-title">👤 Add Student</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter student name"
                value={student.name}
                onChange={(e) => setStudent({ ...student, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={student.email}
                onChange={(e) => setStudent({ ...student, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={student.password}
                onChange={(e) => setStudent({ ...student, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn-primary form-submit">Add Student</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;