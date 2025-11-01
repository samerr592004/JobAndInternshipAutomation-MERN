import useAuthStore from "@/stores/authStore";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";


const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
