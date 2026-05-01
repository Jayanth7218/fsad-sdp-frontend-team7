import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getAllStudents,
  deleteStudent,
} from "../../services/adminService";
import toast, { Toaster } from "react-hot-toast";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data || []);
    } catch {
      setStudents([]);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      toast.success("Student Deleted");
      fetchStudents();
    } catch {
      toast.error("Error deleting student");
    }
  };

  return (
    <DashboardLayout>
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Manage Students</h1>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td className="p-2">{s.name}</td>
              <td>{s.email}</td>
              <td>{s.contact}</td>
              <td>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
};

export default ManageStudents;