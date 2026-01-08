// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";

// Public Pages
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Courses from "./pages/Courses.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";

// Student Pages
import Dashboard from "./pages/student/Dashboard.jsx";
import Documents from "./pages/student/Documents.jsx";
import Universities from "./pages/student/Universities.jsx";
import Notifications from "./pages/student/Notifications.jsx";
import Payments from "./pages/student/Payments.jsx";
import Visa from "./pages/student/Visa.jsx";
import Profile from "./pages/student/Profile.jsx";
import StudentApplications from "./pages/student/StudentApplication.jsx";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

// Route Protection
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RoleRoute from "./components/RoleRoute.jsx";
import DocDashboard from "./pages/documetation/DocDashboard.jsx";

// Admin pages
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Students from "./pages/admin/Students.jsx";
import Applications from "./pages/admin/Applications.jsx";
import Universities_admin from "./pages/admin/Universities-admin.jsx";
import Reports from "./pages/admin/Reports.jsx";
import DocsTeam from "./pages/admin/DocsTeam.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= ADMIN ================= */}
        <Route element={<RoleRoute role="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="applications" element={<Applications />} />
            <Route path="universities" element={<Universities_admin />} />
            <Route path="docs-team" element={<DocsTeam />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Route>

        <Route element={<RoleRoute role="doc" />}>
          <Route path="/doc/dashboard" element={<DocDashboard />} />
        </Route>

        {/* ================= PUBLIC WEBSITE ================= */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* ================= STUDENT DASHBOARD ================= */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/applications" element={<StudentApplications />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/visa" element={<Visa />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
