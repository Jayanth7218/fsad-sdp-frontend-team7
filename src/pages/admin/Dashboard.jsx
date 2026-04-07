import "../../styles/dashboard.css";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [avgScore, setAvgScore] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem("students")) || [];
    const sub = JSON.parse(localStorage.getItem("subjects")) || [];
    setStudents(s);
    setSubjects(sub);

    // overall average across all marks
    const allMarks = s.flatMap((st) => (st.marks || []).map((m) => m.score));
    let overall = 0;
    if (allMarks.length > 0) {
      overall = Math.round(allMarks.reduce((a, b) => a + b, 0) / allMarks.length);
    }
    setAvgScore(overall);

    // compute average per subject
    const subjectAverages = sub.map((subj) => {
      const marksForSubj = s
        .flatMap((st) => (st.marks || []))
        .filter((m) => m.subject === subj)
        .map((m) => m.score);
      const avg =
        marksForSubj.length > 0
          ? Math.round(marksForSubj.reduce((a, b) => a + b, 0) / marksForSubj.length)
          : 0;
      return { subject: subj, average: avg };
    });
    setChartData(subjectAverages);
  }, []);

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h2>Admin Dashboard</h2>
          <p className="subtitle">Welcome to the Marks Analysis System</p>
        </div>

        <div className="grid grid-3 mb-4">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <h4>Students</h4>
            <p className="stat-value">{students.length}</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <h4>Subjects</h4>
            <p className="stat-value">{subjects.length}</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <h4>Average Score</h4>
            <p className="stat-value">{avgScore || "--"}</p>
          </div>
        </div>

        <div className="chart-container card">
          <h3>Subject Averages</h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="average" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center mt-4">No subject data available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;