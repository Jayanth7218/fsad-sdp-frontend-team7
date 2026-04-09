import { useState, useEffect } from "react";
import "../../styles/forms.css";

function AddFaculty() {
  const [facultyList, setFacultyList] = useState([]);
  const [faculty, setFaculty] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const storedFaculty =
      JSON.parse(localStorage.getItem("faculty")) ||
      JSON.parse(localStorage.getItem("lecturers")) ||
      [];
    setFacultyList(storedFaculty);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing =
      JSON.parse(localStorage.getItem("faculty")) ||
      JSON.parse(localStorage.getItem("lecturers")) ||
      [];
    existing.push({ ...faculty, id: Date.now() });
    localStorage.setItem("faculty", JSON.stringify(existing));
    setFacultyList(existing);
    setFaculty({ name: "", email: "", password: "" });
  };

  return (
    <div className="container">
      <div className="page-grid">
        <div className="form-card card">
          <h2>Add Faculty</h2>
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
            <button type="submit" className="btn-primary">Add Faculty</button>
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
                  <th>Added</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {facultyList.map((f) => (
                  <tr key={f.id}>
                    <td>{f.name}</td>
                    <td>{f.email}</td>
                    <td>{new Date(f.id).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn-danger"
                        onClick={() => {
                          const filtered = facultyList.filter((x) => x.id !== f.id);
                          setFacultyList(filtered);
                          localStorage.setItem("faculty", JSON.stringify(filtered));
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
            <p>No faculty added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddLecturer;