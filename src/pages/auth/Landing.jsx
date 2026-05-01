import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Users,
  BookOpen,
  Shield,
  GraduationCap,
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-10 py-5 bg-blue-600 text-white">
        <h1 className="text-2xl font-bold">🎓 SPMS</h1>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 border border-white rounded-lg"
          >
            Register
          </button>
        </div>
      </div>

      {/* HERO */}
      <div className="bg-blue-600 text-white py-20 px-10 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Student Performance Management System
        </h2>

        <p className="text-lg mb-6">
          Track performance, manage marks, and gain insights through analytics.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold"
        >
          Get Started
        </button>
      </div>

      {/* FEATURES */}
      <div className="py-16 px-10 grid md:grid-cols-3 gap-10 text-center">
        <div>
          <BarChart size={40} className="mx-auto text-blue-600 mb-3" />
          <h3 className="font-bold text-lg">Analytics</h3>
          <p className="text-gray-500 text-sm">
            Visualize performance with charts and insights.
          </p>
        </div>

        <div>
          <Users size={40} className="mx-auto text-blue-600 mb-3" />
          <h3 className="font-bold text-lg">User Management</h3>
          <p className="text-gray-500 text-sm">
            Manage students and faculty efficiently.
          </p>
        </div>

        <div>
          <BookOpen size={40} className="mx-auto text-blue-600 mb-3" />
          <h3 className="font-bold text-lg">Marks Tracking</h3>
          <p className="text-gray-500 text-sm">
            Record and track subject-wise marks.
          </p>
        </div>
      </div>

      {/* ROLE SECTION */}
      <div className="bg-gray-100 py-16 px-10 grid md:grid-cols-3 gap-10 text-center">
        <div className="bg-white p-6 rounded-xl shadow">
          <Shield className="mx-auto text-blue-600 mb-3" size={35} />
          <h3 className="font-semibold">Admin</h3>
          <p className="text-sm text-gray-500">
            Manage system users and monitor performance.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <GraduationCap className="mx-auto text-blue-600 mb-3" size={35} />
          <h3 className="font-semibold">Faculty</h3>
          <p className="text-sm text-gray-500">
            Add marks and provide feedback to students.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <Users className="mx-auto text-blue-600 mb-3" size={35} />
          <h3 className="font-semibold">Students</h3>
          <p className="text-sm text-gray-500">
            View marks, analytics, and feedback.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 px-10 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Ready to get started?
        </h2>

        <button
          onClick={() => navigate("/register")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Create Account
        </button>
      </div>

      {/* FOOTER */}
      <div className="bg-blue-600 text-white text-center py-4">
        © 2026 Student Performance System
      </div>

    </div>
  );
};

export default Landing;