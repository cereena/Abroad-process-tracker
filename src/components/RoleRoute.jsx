import { Navigate, Outlet } from "react-router-dom";

const RoleRoute = ({ role }) => {
  let token = null;

  if (role === "admin") token = localStorage.getItem("adminToken");
  if (role === "docExecutive") token = localStorage.getItem("docToken");
  if (role === "student") token = localStorage.getItem("studentToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
