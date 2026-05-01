import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RoleRoute = ({ children, allowedRole }) => {
  const { auth } = useAuth();

  if (!auth.token) {
    return <Navigate to="/" replace />;
  }

  if (auth.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;