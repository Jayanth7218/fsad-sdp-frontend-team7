import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import "../../styles/dashboard.css";

function StudentMarks() {
  const { user } = useContext(AppContext);
  const [currentStudent, setCurrentStudent] = useState(null);

  const getUserId = () => String(user?.id ?? user?._id ?? "");
  const getStudentId = (student) => String(student?.id ?? student?._id ?? "");

  const loadCurrentStudent = () => {
    const userId = getUserId();
    if (!userId) {
      setCurrentStudent(user);
      return;
    }

    const students = JSON.parse(localStorage.getItem("students")) || [];
    const fresh = students.find((s) => getStudentId(s) === userId);
    if (fresh) {
      setCurrentStudent(fresh);
    } else {
      setCurrentStudent(user);
    }
  };

  useEffect(() => {
    loadCurrentStudent();
  }, [user]);

  useEffect(() => {
    const handleStorage = () => {
      loadCurrentStudent();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [user]);

  const calculateGrade = (marks) => {
    if (marks >= 80) return "A";
    if (marks >= 60) return "B";
    if (marks >= 50) return "C";
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
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h2>📋 My Marks</h2>
          <p className="subtitle">View your detailed marks and grades</p>
        </div>

        {currentStudent?.marks?.length > 0 ? (
          <div className="card">
            <table style={{ width: "100%" }}>
              <thead>
                <tr style={{ backgroundColor: "#3b82f6", color: "white" }}>
                  <th style={{ padding: "1rem", textAlign: "left" }}>Subject</th>
                  <th style={{ padding: "1rem", textAlign: "center" }}>Marks</th>
                  <th style={{ padding: "1rem", textAlign: "center" }}>Grade</th>
                  <th style={{ padding: "1rem", textAlign: "center" }}>Status</th>
                  <th style={{ padding: "1rem", textAlign: "center" }}>Suggestion</th>
                </tr>
              </thead>
              <tbody>
                {currentStudent.marks.map((mark, idx) => {
                  const grade = calculateGrade(mark.score);
                  const status = mark.score >= 50 ? "Pass" : "Fail";
                  return (
                    <tr key={idx} style={{ borderBottom: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "1rem", fontWeight: "500" }}>{mark.subject}</td>
                      <td style={{ padding: "1rem", textAlign: "center", fontWeight: "600", color: "#3b82f6", fontSize: "1.1rem" }}>
                        {mark.score}
                      </td>
                      <td style={{ padding: "1rem", textAlign: "center" }}>
                        <span style={{
                          backgroundColor: getGradeColor(grade),
                          color: "white",
                          padding: "0.4rem 0.8rem",
                          borderRadius: "4px",
                          fontWeight: "700",
                          display: "inline-block"
                        }}>
                          {grade}
                        </span>
                      </td>
                      <td style={{ padding: "1rem", textAlign: "center" }}>
                        <span style={{
                          backgroundColor: status === "Pass" ? "#10b981" : "#ef4444",
                          color: "white",
                          padding: "0.4rem 0.8rem",
                          borderRadius: "4px",
                          fontWeight: "600",
                          display: "inline-block",
                          fontSize: "0.9rem"
                        }}>
                          {status}
                        </span>
                      </td>
                      <td style={{ padding: "1rem", textAlign: "center", color: mark.improvementSuggestion ? "#1e40af" : "#6b7280", fontStyle: mark.improvementSuggestion ? "normal" : "italic" }}>
                        {mark.improvementSuggestion || "No Suggestion"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              {currentStudent?.marks?.some(m => m.score < 50) && (
                <tbody>
                  {currentStudent.marks.map((mark, idx) => {
                    if (mark.score < 50 && mark.improvementSuggestion) {
                      return (
                        <tr key={`sug-${idx}`} style={{ borderBottom: "1px solid #e5e7eb", backgroundColor: "#fef3c7" }}>
                          <td colSpan="4" style={{ padding: "1rem" }}>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                              <span style={{ fontSize: "1.2rem" }}>💡</span>
                              <div>
                                <p style={{ margin: "0", marginBottom: "0.5rem", fontWeight: "600", color: "#92400e" }}>
                                  Improvement Suggestion for {mark.subject}
                                </p>
                                <p style={{ margin: "0", color: "#78350f", lineHeight: "1.5" }}>
                                  {mark.improvementSuggestion}
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                    return null;
                  })}
                </tbody>
              )}
            </table>
          </div>
        ) : (
          <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
            <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
              📭 No marks assigned yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentMarks;
