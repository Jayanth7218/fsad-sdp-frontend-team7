import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { auth, logout } = useAuth();

  return (
    <div className="ml-64 h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">
        {auth.role === "ROLE_ADMIN" && "Admin Dashboard"}
        {auth.role === "ROLE_FACULTY" && "Faculty Dashboard"}
        {auth.role === "ROLE_STUDENT" && "Student Dashboard"}
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">{auth.username}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;