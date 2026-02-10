import { Navigate, Outlet } from "react-router-dom";

const RoleRoute = ({ role }) => {
  let token = null;

  if (role === "admin") token = localStorage.getItem("adminToken");
  if (role === "DocExecutive") token = localStorage.getItem("docToken");
  if (role === "student") token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
