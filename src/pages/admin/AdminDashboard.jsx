import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getAllStudents,
  getAllFaculty,
} from "../../services/adminService";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    getAllStudents().then((res) => setStudents(res || []));
    getAllFaculty().then((res) => setFaculty(res || []));
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">📊 Admin Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card">
          <p className="text-gray-500">Total Students</p>
          <h2 className="text-4xl font-bold text-blue-600">
            {students.length}
          </h2>
        </div>

        <div className="card">
          <p className="text-gray-500">Total Faculty</p>
          <h2 className="text-4xl font-bold text-indigo-600">
            {faculty.length}
          </h2>
        </div>

        <div className="card">
          <p className="text-gray-500">System Status</p>
          <h2 className="text-xl font-semibold text-green-600">
            Active
          </h2>
        </div>
      </div>

      {/* QUICK INSIGHTS */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="font-semibold mb-3">📌 Insights</h2>
          <p className="text-gray-600 text-sm">
            • Total users in system:{" "}
            <span className="font-bold">
              {students.length + faculty.length}
            </span>
          </p>
          <p className="text-gray-600 text-sm">
            • Student to Faculty ratio:{" "}
            <span className="font-bold">
              {faculty.length
                ? (students.length / faculty.length).toFixed(1)
                : "N/A"}
            </span>
          </p>
        </div>

        <div className="card">
          <h2 className="font-semibold mb-3">⚡ Quick Actions</h2>
          <p className="text-sm text-gray-600">
            Manage students, faculty, and monitor performance from the sidebar.
          </p>
        </div>
      </div>

      {/* RECENT STUDENTS */}
      <div className="card">
        <h2 className="font-semibold mb-4">📋 Recent Students</h2>

        {students.length > 0 ? (
          students.slice(0, 5).map((s) => (
            <div
              key={s.id}
              className="flex justify-between py-2 border-b text-sm"
            >
              <span>{s.name}</span>
              <span className="text-gray-500">{s.email}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No students available</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;