import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ role }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/student/login" replace />;
  }

  return <Outlet />;
}

