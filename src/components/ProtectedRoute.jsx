import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function ProtectedRoute({ children, role }) {
  const { user } = useContext(AppContext);

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }
  return children;
}
