import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getMarksByStudent } from "../../services/studentService";
import { useAuth } from "../../context/AuthContext";
import { getCategory, getColor } from "../../utils/categoryUtils";

const StudentMarks = () => {
  const { auth } = useAuth();
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    getMarksByStudent(auth.userId).then((res) => {
      setMarks(res || []);
    });
  }, []);

  return (
    <DashboardLayout>
      <h1 className="title">📘 My Marks</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marks.map((m) => {
          const category = getCategory(m.marksObtained, m.maxMarks);

          return (
            <div key={m.id} className="card">
              <h2 className="font-semibold text-lg mb-2">
                {m.subject.subjectName}
              </h2>

              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-600">Marks</span>
                <span className="text-xl font-bold">
                  {m.marksObtained}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                {m.feedback || "No feedback"}
              </p>

              <span
                className={`text-white text-xs px-3 py-1 rounded-full ${getColor(
                  category
                )}`}
              >
                {category}
              </span>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default StudentMarks;