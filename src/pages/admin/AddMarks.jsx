import { useState, useEffect } from "react";
import "../../styles/forms.css";

function StudentMarksPage() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [improvementSuggestion, setImprovementSuggestion] = useState("");

  useEffect(() => {
    setStudents(JSON.parse(localStorage.getItem("students")) || []);
    setSubjects(JSON.parse(localStorage.getItem("subjects")) || []);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedStudents = students.map((student) => {
      if (student.id === Number(selectedStudent)) {
        const newMark = {
          subject: selectedSubject,
          score: Number(marks)
        };
        // Add improvement suggestion only if marks < 50
        if (Number(marks) < 50) {
          newMark.improvementSuggestion = improvementSuggestion;
        }
        student.marks.push(newMark);
      }
      return student;
    });

    localStorage.setItem("students", JSON.stringify(updatedStudents));
    setStudents(updatedStudents);
    alert("Marks Added Successfully!");
    setSelectedStudent("");
    setSelectedSubject("");
    setMarks("");
    setImprovementSuggestion("");
  };

  // aggregate marks for table
  const marksList = [];
  students.forEach((s) => {
    s.marks.forEach((m) => {
      marksList.push({ 
        student: s.name, 
        subject: m.subject, 
        score: m.score,
        improvementSuggestion: m.improvementSuggestion || ""
      });
    });
  });

  return (
    <div className="container">
      <div className="page-grid">
        <div className="listing-card card">
          <h2>Student Marks</h2>
          {marksList.length > 0 ? (
            <table className="list-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>Suggestion</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {marksList.map((m, idx) => (
                  <tr key={idx}>
                    <td>{m.student}</td>
                    <td>{m.subject}</td>
                    <td>{m.score}</td>
                    <td>
                      {m.score < 50 && m.improvementSuggestion ? (
                        <span style={{ fontSize: "0.9rem", color: "#666", maxWidth: "200px", display: "block" }}>
                          {m.improvementSuggestion.substring(0, 50)}...
                        </span>
                      ) : m.score < 50 ? (
                        <span style={{ color: "#999", fontStyle: "italic" }}>No suggestion</span>
                      ) : (
                        <span style={{ color: "#ccc" }}>--</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn-danger"
                        onClick={() => {
                          // remove mark from student data
                          const updated = students.map((st) => {
                            if (st.name === m.student) {
                              st.marks = st.marks.filter(
                                (mk) => !(mk.subject === m.subject && mk.score === m.score)
                              );
                            }
                            return st;
                          });
                          setStudents(updated);
                          localStorage.setItem("students", JSON.stringify(updated));
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
            <p>No marks recorded yet.</p>
          )}
        </div>
        <div className="form-wrapper card">
          <h2 className="form-title">📝 Add Marks</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="student">Select Student</label>
              <select
                id="student"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                required
              >
                <option value="">-- Choose a student --</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Select Subject</label>
              <select
                id="subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                required
              >
                <option value="">-- Choose a subject --</option>
                {subjects.map((sub, i) => (
                  <option key={i} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="marks">Marks (0-100)</label>
              <input
                id="marks"
                type="number"
                min="0"
                max="100"
                placeholder="Enter marks"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                required
              />
            </div>

            {Number(marks) < 50 && marks !== "" && (
              <div className="form-group">
                <label htmlFor="suggestion">⚠️ Improvement Suggestion</label>
                <textarea
                  id="suggestion"
                  placeholder="Provide constructive feedback for improvement"
                  value={improvementSuggestion}
                  onChange={(e) => setImprovementSuggestion(e.target.value)}
                  rows="3"
                  style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ddd", fontFamily: "inherit" }}
                  required
                />
              </div>
            )}

            <button type="submit" className="btn-primary form-submit">Submit Marks</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StudentMarksPage;