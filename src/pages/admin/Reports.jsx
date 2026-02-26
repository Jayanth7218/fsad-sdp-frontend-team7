import { useState, useEffect } from "react";
import "../../styles/reports.css";

function Reports() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    setStudents(JSON.parse(localStorage.getItem("students")) || []);
  }, []);

  const generateGrade = (mark) => {
    if (mark >= 80) return "A";
    if (mark >= 60) return "B";
    if (mark >= 50) return "C";
    return "F";
  };

  const getGradeColor = (grade) => {
    const colors = {
      "A": "#10b981",
      "B": "#3b82f6",
      "C": "#f59e0b",
      "F": "#ef4444"
    };
    return colors[grade] || "#6b7280";
  };

  return (
    <div className="reports-container">
      <div className="container">
        <div className="reports-header">
          <h2>📊 Student Reports</h2>
          <p className="subtitle">View student performance and grades</p>
        </div>

        <div className="reports-selector card mb-4">
          <label htmlFor="student-select">Select Student:</label>
          <select 
            id="student-select"
            onChange={(e) =>
              setSelectedStudent(students.find(s => s.id === Number(e.target.value)))
            }
          >
            <option value="">-- Choose a student --</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        {selectedStudent && (
          <div className="report-card card">
            <div className="report-header">
              <h3>Report Card</h3>
              <p className="student-name">Student: <strong>{selectedStudent.name}</strong></p>
              <p className="student-email">Email: {selectedStudent.email}</p>
            </div>

            {selectedStudent.marks.length > 0 ? (
              <div className="marks-table">
                <table>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Marks</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStudent.marks.map((m, i) => {
                      const grade = generateGrade(m.score);
                      return (
                        <tr key={i}>
                          <td className="subject-cell">{m.subject}</td>
                          <td className="marks-cell">{m.score}</td>
                          <td className="grade-cell">
                            <span 
                              className="grade-badge" 
                              style={{ backgroundColor: getGradeColor(grade) }}
                            >
                              {grade}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="no-marks-message">⚠️ No marks assigned yet</p>
            )}
          </div>
        )}

        {!selectedStudent && students.length > 0 && (
          <div className="empty-state card">
            <p className="text-center">👆 Please select a student to view their report</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;