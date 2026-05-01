import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff, User, Lock } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser(form.username, form.password);

      setAuth({
        token: data.token,
        role: data.role,
        userId: data.userId,
        username: data.username,
      });

      toast.success("Welcome!");

      if (data.role === "ROLE_ADMIN") navigate("/admin");
      else if (data.role === "ROLE_FACULTY") navigate("/faculty");
      else navigate("/student");
    } catch {
      toast.error("Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      <Toaster />

      {/* LEFT PANEL */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white items-center justify-center p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            📊 Student Performance System
          </h1>
          <p className="text-lg opacity-90">
            📈 Track performance, 📝 manage marks, and gain insights with analytics.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
          <h2 className="text-3xl font-bold text-center mb-2">
            🔐 Login
          </h2>

          <p className="text-center text-gray-500 mb-6 text-sm">
            Access your dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* USERNAME */}
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Username / Email"
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="w-full pl-10 pr-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "⏳ Logging in..." : "🚀 Login"}
            </button>
          </form>

          {/* REGISTER LINK */}
          <p className="text-sm text-center mt-4 text-gray-500">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;