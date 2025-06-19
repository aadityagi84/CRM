import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  useEffect(() => {}, [user]);
  const navigate = useNavigate();
  const isAuthenticated = user && user !== "null" && user !== "undefined";

  return isAuthenticated ? children : navigate("/login", { replace: true });
};

export default ProtectedRoute;
