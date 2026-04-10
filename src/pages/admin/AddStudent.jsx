import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { addStudent } from "../../services/adminService";
import toast, { Toaster } from "react-hot-toast";

const AddStudent = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addStudent(form);
      toast.success("Student Added Successfully");

      setForm({
        name: "",
        email: "",
        password: "",
        contact: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Error adding student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Toaster />

      <h1 className="text-2xl font-bold mb-6">Add Student</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow grid grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="p-3 border rounded-lg"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="p-3 border rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="p-3 border rounded-lg"
          required
        />

        <input
          type="text"
          placeholder="Contact"
          value={form.contact}
          onChange={(e) =>
            setForm({ ...form, contact: e.target.value })
          }
          className="p-3 border rounded-lg"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="col-span-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Adding..." : "Add Student"}
        </button>
      </form>
    </DashboardLayout>
  );
};

export default AddStudent;