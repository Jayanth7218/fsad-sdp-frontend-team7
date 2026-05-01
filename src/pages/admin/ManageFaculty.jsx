import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getAllFaculty,
  addFaculty,
  deleteFaculty,
} from "../../services/adminService";
import toast, { Toaster } from "react-hot-toast";

const ManageFaculty = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });

  const fetchFaculty = async () => {
    try {
      const data = await getAllFaculty();
      setFacultyList(data || []);
    } catch (e) {
      console.error(e);
      setFacultyList([]);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await addFaculty(form);

      console.log("Add Faculty Response:", res);

      toast.success("Faculty Added Successfully");

      setForm({
        name: "",
        email: "",
        password: "",
        contact: "",
      });

      fetchFaculty();
    } catch (e) {
      console.error("Add Faculty Error:", e);
      toast.error("Error adding faculty");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFaculty(id);
      toast.success("Faculty Deleted");
      fetchFaculty();
    } catch (e) {
      console.error("Delete Faculty Error:", e);
      toast.error("Error deleting faculty");
    }
  };

  return (
    <DashboardLayout>
      <Toaster />

      <h1 className="text-2xl font-bold mb-4">Manage Faculty</h1>

      <form
        onSubmit={handleAdd}
        className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="p-2 border rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="p-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="p-2 border rounded"
          required
        />

        <input
          type="text"
          placeholder="Contact"
          value={form.contact}
          onChange={(e) =>
            setForm({ ...form, contact: e.target.value })
          }
          className="p-2 border rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Adding..." : "Add Faculty"}
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {facultyList.length > 0 ? (
              facultyList.map((f) => (
                <tr key={f.id}>
                  <td className="p-2 border">{f.name}</td>
                  <td className="p-2 border">{f.email}</td>
                  <td className="p-2 border">{f.contact}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleDelete(f.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No Faculty Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default ManageFaculty;