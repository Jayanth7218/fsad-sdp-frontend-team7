import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { getAllSubjects } from "../../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import "../../styles/dashboard.css";

function StudentDashboard() {
  const { user } = useContext(AppContext);
  const [chartData, setChartData] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [subjectError, setSubjectError] = useState("");

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
    loadSubjects();
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      loadCurrentStudent();
      loadSubjects();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [user]);

  const loadSubjects = async () => {
    setSubjectError("");
    const result = await getAllSubjects();
    if (result.success && Array.isArray(result.data)) {
      setSubjects(result.data);
    } else {
      const fallback = JSON.parse(localStorage.getItem("subjects")) || [];
      setSubjects(fallback);
      if (!result.success && fallback.length === 0) {
        setSubjectError(result.error || "Unable to load available subjects.");
      }
    }
  };

  useEffect(() => {
    // Prepare chart data (subject-wise marks)
    if (currentStudent?.marks?.length > 0) {
      const subjectData = {};
      currentStudent.marks.forEach((m) => {
        if (!subjectData[m.subject]) {
          subjectData[m.subject] = [];
        }
        subjectData[m.subject].push(m.score);
      });

      const data = Object.entries(subjectData).map(([subject, scores]) => ({
        subject,
        average: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      }));
      setChartData(data);
    } else {
      setChartData([]);
    }
  }, [currentStudent]);

  const calculateGrade = (marks) => {
    if (marks >= 80) return "A";
    if (marks >= 60) return "B";
    if (marks >= 50) return "C";
    return "F";
  };

  const averageMarks = currentStudent?.marks?.length > 0
    ? Math.round(
        currentStudent.marks.reduce((sum, m) => sum + m.score, 0) / currentStudent.marks.length
      )
    : 0;

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h2>Welcome, {currentStudent?.name}! 👋</h2>
          <p className="subtitle">Your Academic Performance</p>
        </div>

        <div className="grid grid-3 mb-4">
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <h4>Total Subjects</h4>
            <p className="stat-value">{new Set(currentStudent?.marks?.map(m => m.subject)).size || 0}</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <h4>Average Score</h4>
            <p className="stat-value">{averageMarks}%</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <h4>Overall Grade</h4>
            <p className="stat-value">{calculateGrade(averageMarks)}</p>
          </div>
        </div>

        {/* Performance Analytics Section */}
        {currentStudent?.marks?.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
            {/* Subject-wise Performance Bar Chart */}
            <div className="card" style={{ animation: "fadeIn 0.6s ease-in-out" }}>
              <h3 style={{ marginBottom: "1.5rem" }}>📈 Subject Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #3b82f6", borderRadius: "4px", color: "white" }}
                    cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
                  />
                  <Bar 
                    dataKey="average" 
                    fill="#3b82f6" 
                    radius={[8, 8, 0, 0]}
                    animationDuration={1200}
                    animationEasing="ease-in-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Overall Performance Circular Progress */}
            <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.8s ease-in-out" }}>
              <h3 style={{ marginBottom: "2rem", width: "100%" }}>🎯 Overall Performance</h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Score", value: averageMarks },
                      { name: "Remaining", value: 100 - averageMarks }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    startAngle={180}
                    endAngle={0}
                    dataKey="value"
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                  >
                    <Cell fill="#3b82f6" />
                    <Cell fill="#e5e7eb" />
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ textAlign: "center", marginTop: "-2rem" }}>
                <p style={{ fontSize: "2.5rem", fontWeight: "700", color: "#3b82f6", margin: "0" }}>
                  {averageMarks}%
                </p>
                <p style={{ color: "#6b7280", margin: "0.5rem 0 0 0" }}>Overall Score</p>
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <h3>Available Subjects</h3>
          {subjectError && <div className="error-message">{subjectError}</div>}
          {subjects.length > 0 ? (
            <ul style={{ marginTop: "1rem", paddingLeft: "1.2rem" }}>
              {subjects.map((sub, idx) => {
                const label =
                  typeof sub === "string"
                    ? sub
                    : sub.subjectName || sub.name || sub.subjectCode || `Subject ${idx + 1}`;
                return <li key={sub.id ?? sub.subjectCode ?? idx}>{label}</li>;
              })}
            </ul>
          ) : (
            <p style={{ color: "#6b7280", marginTop: "1rem" }}>No subjects are available yet.</p>
          )}
        </div>

        <div className="card">
          <h3>Your Marks</h3>
          {currentStudent?.marks?.length > 0 ? (
            <table style={{ width: "100%", marginTop: "1.5rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#3b82f6", color: "white" }}>
                  <th style={{ padding: "1rem", textAlign: "left" }}>Subject</th>
                  <th style={{ padding: "1rem" }}>Marks</th>
                  <th style={{ padding: "1rem" }}>Grade</th>
                </tr>
              </thead>
              <tbody>
                {currentStudent.marks.map((mark, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "1rem" }}>{mark.subject}</td>
                    <td style={{ padding: "1rem", textAlign: "center", fontWeight: "600", color: "#3b82f6" }}>
                      {mark.score}
                    </td>
                    <td style={{ padding: "1rem", textAlign: "center" }}>
                      <span style={{
                        backgroundColor: calculateGrade(mark.score) === "A" ? "#10b981" :
                                        calculateGrade(mark.score) === "B" ? "#3b82f6" :
                                        calculateGrade(mark.score) === "C" ? "#f59e0b" : "#ef4444",
                        color: "white",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "4px",
                        fontWeight: "700"
                      }}>
                        {calculateGrade(mark.score)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ textAlign: "center", color: "#6b7280", marginTop: "2rem" }}>
              No marks assigned yet. Check back soon!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;