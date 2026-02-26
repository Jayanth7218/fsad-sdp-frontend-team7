import { useState, useEffect } from "react";
import "../../styles/forms.css";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");

  useEffect(() => {
    setSubjects(JSON.parse(localStorage.getItem("subjects")) || []);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("subjects")) || [];
    if (subject.trim()) {
      existing.push(subject.trim());
      localStorage.setItem("subjects", JSON.stringify(existing));
      setSubjects(existing);
      setSubject("");
    }
  };

  return (
    <div className="container">
      <div className="page-grid">
        <div className="listing-card card">
          <h2>Subjects</h2>
          {subjects.length > 0 ? (
            <ul className="list-simple">
              {subjects.map((sub, i) => (
                <li key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>{sub}</span>
                  <button
                    className="btn-danger"
                    onClick={() => {
                      const filtered = subjects.filter((x) => x !== sub);
                      setSubjects(filtered);
                      localStorage.setItem("subjects", JSON.stringify(filtered));
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No subjects added yet.</p>
          )}
        </div>
        <div className="form-wrapper card" style={{ maxWidth: "500px" }}>
          <h2 className="form-title">📚 Add Subject</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="subject">Subject Name</label>
              <input
                id="subject"
                type="text"
                placeholder="Enter subject name"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-primary form-submit">Add Subject</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Subjects;