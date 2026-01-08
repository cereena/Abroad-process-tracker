import { Navigate, Outlet } from "react-router-dom";

const RoleRoute = ({ role }) => {
  const adminId = localStorage.getItem("adminId");
  const studentId = localStorage.getItem("studentId");
  const docId = localStorage.getItem("docId");

  if (role === "admin" && adminId) return <Outlet />;
  if (role === "student" && studentId) return <Outlet />;
  if (role === "doc" && docId) return <Outlet />;

  return <Navigate to="/login" replace />;
};

export default RoleRoute;
