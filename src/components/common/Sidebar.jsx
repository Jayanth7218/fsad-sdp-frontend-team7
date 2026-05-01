import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  BarChart,
  GraduationCap,
} from "lucide-react";

const Sidebar = () => {
  const { auth } = useAuth();

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6 fixed">
      <h2 className="text-2xl font-bold mb-8">SPMS</h2>

      <div className="space-y-4">
        {auth.role === "ROLE_ADMIN" && (
          <>
            <Link to="/admin" className="flex items-center gap-2 hover:text-gray-300">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link to="/admin/faculty" className="flex items-center gap-2 hover:text-gray-300">
              <Users size={18} /> Faculty
            </Link>
            <Link to="/admin/students" className="flex items-center gap-2 hover:text-gray-300">
              <GraduationCap size={18} /> Students
            </Link>
            <Link to="/admin/marks" className="flex items-center gap-2 hover:text-gray-300">
              <BarChart size={18} /> Marks
            </Link>
          </>
        )}

        {auth.role === "ROLE_FACULTY" && (
          <>
            <Link to="/faculty" className="flex items-center gap-2 hover:text-gray-300">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link to="/faculty/subjects" className="flex items-center gap-2 hover:text-gray-300">
              <BookOpen size={18} /> Subjects
            </Link>
            <Link to="/faculty/marks" className="flex items-center gap-2 hover:text-gray-300">
              <Users size={18} /> Marks
            </Link>
            <Link to="/faculty/analytics" className="flex items-center gap-2 hover:text-gray-300">
              <BarChart size={18} /> Analytics
            </Link>
          </>
        )}

        {auth.role === "ROLE_STUDENT" && (
          <>
            <Link to="/student" className="flex items-center gap-2 hover:text-gray-300">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link to="/student/marks" className="flex items-center gap-2 hover:text-gray-300">
              <BookOpen size={18} /> Marks
            </Link>
            <Link to="/student/analytics" className="flex items-center gap-2 hover:text-gray-300">
              <BarChart size={18} /> Analytics
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;