import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getMarksByStudent } from "../../services/studentService";
import { useAuth } from "../../context/AuthContext";
import { getCategory } from "../../utils/categoryUtils";

const StudentDashboard = () => {
  const { auth } = useAuth();
  const [marks, setMarks] = useState([]);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    getMarksByStudent(auth.userId).then((res) => {
      const data = res || [];
      setMarks(data);

      if (data.length) {
        const total = data.reduce((sum, m) => sum + m.marksObtained, 0);
        setAvg((total / data.length).toFixed(2));
      }
    });
  }, []);

  return (
    <DashboardLayout>
      <h1 className="title">🎓 My Dashboard</h1>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="card">
          <p className="subtitle">Average</p>
          <h2 className="text-4xl font-bold text-blue-600">{avg}</h2>
        </div>

        <div className="card">
          <p className="subtitle">Subjects</p>
          <h2 className="text-3xl font-bold">{marks.length}</h2>
        </div>

        <div className="card">
          <p className="subtitle">Top Category</p>
          <h2 className="text-xl font-semibold">
            {marks[0] ? getCategory(marks[0].marksObtained) : "-"}
          </h2>
        </div>
      </div>

      {/* RECENT PERFORMANCE */}
      <div className="card">
        <h2 className="font-semibold mb-4">📊 Recent Performance</h2>

        {marks.map((m) => (
          <div
            key={m.id}
            className="flex justify-between border-b py-2 text-sm"
          >
            <span>{m.subject.subjectName}</span>
            <span className="font-bold">{m.marksObtained}</span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;