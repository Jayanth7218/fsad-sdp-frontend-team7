import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "../pages/auth/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageFaculty from "../pages/admin/ManageFaculty";
import ManageStudents from "../pages/admin/ManageStudents";
import ViewMarks from "../pages/admin/ViewMarks";

import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import Subjects from "../pages/faculty/Subjects";
import MarksManagement from "../pages/faculty/MarksManagement";
import FacultyAnalytics from "../pages/faculty/FacultyAnalytics";

import StudentDashboard from "../pages/student/StudentDashboard";
import StudentMarks from "../pages/student/StudentMarks";
import StudentAnalytics from "../pages/student/StudentAnalytics";


import ProtectedRoute from "../components/common/ProtectedRoute";
import RoleRoute from "../components/common/RoleRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="ROLE_ADMIN">
                <AdminDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/faculty"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="ROLE_ADMIN">
                <ManageFaculty />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="ROLE_ADMIN">
                <ManageStudents />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/marks"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="ROLE_ADMIN">
                <ViewMarks />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* FACULTY ROUTES */}
        <Route
          path="/faculty"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="ROLE_FACULTY">
                <FacultyDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/subjects"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="ROLE_FACULTY">
                <Subjects />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/marks"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="ROLE_FACULTY">
                <MarksManagement />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/analytics"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="ROLE_FACULTY">
                <FacultyAnalytics />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* STUDENT ROUTES */}
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="ROLE_STUDENT">
                <StudentDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/marks"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="ROLE_STUDENT">
                <StudentMarks />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/analytics"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="ROLE_STUDENT">
                <StudentAnalytics />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
};

export default AppRoutes;