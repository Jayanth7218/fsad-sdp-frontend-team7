import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Admin Pages
import AdminNavbar from "./components/AdminNavbar";
import FacultyNavbar from "./components/FacultyNavbar";
import Dashboard from "./pages/admin/Dashboard";
import AddFaculty from "./pages/admin/AddFaculty";
import StudentDetails from "./pages/admin/AddStudent";
import AddStudent from "./pages/admin/AddStudent"; // alias for backwards compatibility
import Subjects from "./pages/admin/AddSubject"; // renamed component
import StudentMarksPage from "./pages/admin/AddMarks"; // updated name
import Reports from "./pages/admin/Reports";

// Student Pages
import StudentNavbar from "./components/StudentNavbar";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentMarks from "./pages/student/StudentMarks";
import ErrorBoundary from "./components/ErrorBoundary";

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
      {user?.userType === "lecturer" && <FacultyNavbar />}
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
          path="/admin/lecturers"
          element={
            <ProtectedRoute userType="admin">
              <AddFaculty />
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
          path="/admin/reports"
          element={
            <ProtectedRoute userType="admin">
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Lecturer Routes */}
        <Route
          path="/lecturer/dashboard"
          element={
            <ProtectedRoute userType="lecturer">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lecturer/students"
          element={
            <ProtectedRoute userType="lecturer">
              <StudentDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lecturer/subjects"
          element={
            <ProtectedRoute userType="lecturer">
              <Subjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lecturer/marks"
          element={
            <ProtectedRoute userType="lecturer">
              <ErrorBoundary>
                <StudentMarksPage />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route
          path="/lecturer/reports"
          element={
            <ProtectedRoute userType="lecturer">
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