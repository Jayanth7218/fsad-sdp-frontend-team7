import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerStudent } from "../../services/studentService";
import toast, { Toaster } from "react-hot-toast";
import { User, Mail, Lock, Phone } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    await registerStudent(form);

    toast.success("Registered successfully 🎉");

    setTimeout(() => navigate("/login"), 1000);
  } catch (err) {
    console.error(err);
    toast.error("Registration failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex">
      <Toaster />

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-blue-600 text-white flex-col justify-center px-12">
        <h1 className="text-4xl font-bold mb-4">
          🎓 Join Student Performance Management System
        </h1>

        <p className="text-lg opacity-90 mb-6">
          Create your account and start tracking your academic performance with smart analytics.
        </p>

        <ul className="space-y-3">
          <li>📊 View performance insights</li>
          <li>📘 Track subject-wise marks</li>
          <li>💬 Get feedback from faculty</li>
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create Account
          </h2>

          <div className="space-y-4">

            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Contact Number"
                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                onChange={(e) =>
                  setForm({ ...form, contact: e.target.value })
                }
                required
              />
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <p className="text-sm text-center mt-4 text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;