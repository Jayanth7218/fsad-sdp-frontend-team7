import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getSubjectsByFaculty } from "../../services/facultyService";
import { useAuth } from "../../context/AuthContext";

const FacultyDashboard = () => {
  const { auth } = useAuth();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    getSubjectsByFaculty(auth.userId).then(setSubjects);
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl mb-6">👨‍🏫 Faculty Dashboard</h1>

      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <h2 className="text-gray-500">Subjects Assigned</h2>
        <p className="text-3xl font-bold">{subjects.length}</p>
      </div>
    </DashboardLayout>
  );
};

export default FacultyDashboard;