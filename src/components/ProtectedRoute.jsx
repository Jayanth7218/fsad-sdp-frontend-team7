import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function ProtectedRoute({ children, userType }) {
  const { user } = useContext(AppContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (userType && user.userType !== userType) {
    return <Navigate to="/" replace />;
  }
  return children;
}
