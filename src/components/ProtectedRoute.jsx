import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const studentId = localStorage.getItem("studentId");

  if (!studentId) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
