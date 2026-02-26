import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Admin Pages
import AdminNavbar from "./components/AdminNavbar";
import Dashboard from "./pages/admin/Dashboard";
import StudentDetails from "./pages/admin/AddStudent";
import AddStudent from "./pages/admin/AddStudent"; // alias for backwards compatibility
import Subjects from "./pages/admin/AddSubject"; // renamed component
import StudentMarksPage from "./pages/admin/AddMarks"; // updated name
import Reports from "./pages/admin/Reports";

// Student Pages
import StudentNavbar from "./components/StudentNavbar";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentMarks from "./pages/student/StudentMarks";

// Protected Route Component
function ProtectedRoute({ children, userType }) {
  const { user } = useContext(AppContext);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (userType && user.userType !== userType) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

function App() {
  const { user } = useContext(AppContext);

  return (
    <BrowserRouter>
      {/* Conditional Navbar */}
      {user?.userType === "admin" && <AdminNavbar />}
      {user?.userType === "student" && <StudentNavbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute userType="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute userType="admin">
              <StudentDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/subjects"
          element={
            <ProtectedRoute userType="admin">
              <Subjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/marks"
          element={
            <ProtectedRoute userType="admin">
              <StudentMarksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute userType="admin">
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute userType="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/marks"
          element={
            <ProtectedRoute userType="student">
              <StudentMarks />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;