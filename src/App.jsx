// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import MainLayout from "./layouts/MainLayout.jsx";
import StudentLayout from "./layouts/StudentLayout.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import DocLayout from "./layouts/DocLayout.jsx";

// Public Pages
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Courses from "./pages/Courses.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import Applications from "./pages/admin/Applications.jsx";
import Universities_admin from "./pages/admin/Universities-admin.jsx";
import Reports from "./pages/admin/Reports.jsx";
import AdminNotifications from "./pages/admin/AdminNotifications.jsx";
import AdminLeads from "./pages/admin/AdminLeads.jsx";
import AddStudent from "./pages/admin/AddStudents.jsx";
import Students from "./pages/admin/Students.jsx";
import DocsTeam from "./pages/admin/DocsTeam.jsx";
import AddExecutive from "./pages/admin/AddExecutive.jsx";

// Documentation Executive Pages
import DocDashboard from "./pages/documetation/DocDashboard.jsx";
import DocStudents from "./pages/documetation/DocStudents.jsx";
import DocApplications from "./pages/documetation/DocApplications.jsx";
import CourseFinder from "./pages/documetation/CourseFinder.jsx";
import DocsCommission from "./pages/documetation/DocsCommission.jsx";

// student pages
import StudentProfileGaurd from "./pages/student/studentProfileGuard.jsx";
import Dashboard from "./pages/student/Dashboard.jsx";
import StudentApplications from "./pages/student/StudentApplication.jsx";
import Documents from "./pages/student/Documents.jsx";
import Payments from "./pages/student/Payments.jsx";
import Profile from "./pages/student/Profile.jsx";
import Universities from "./pages/student/Universities.jsx";
import Visa from "./pages/student/Visa.jsx";
import Notifications from "./pages/student/Notifications.jsx";



// Route Protection
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RoleRoute from "./components/RoleRoute.jsx";
import DocStudentProfile from "./pages/documetation/DocStudentProfile.jsx";
import StudentProfileGuard from "./pages/student/studentProfileGuard.jsx";
import DocExecutiveNotifications from "./pages/documetation/DocNotification.jsx";
import StudentProfilePage from "./pages/student/StudentProfilePage.jsx";
import DocDocuments from "./pages/documetation/DocDocuments.jsx";

function App() {
  return (
    <BrowserRouter>
      {/* ✅ Toast must be outside Routes */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />

      <Routes>
        {/* ================= PUBLIC WEBSITE ================= */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="courses" element={<Courses />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* ================= ADMIN ================= */}
        <Route element={<RoleRoute role="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students/add" element={<AddStudent />} />
            <Route path="students" element={<Students />} />
            <Route path="docs-team" element={<DocsTeam />} />
            <Route path="docs-team/add" element={<AddExecutive />} />
            <Route path="applications" element={<Applications />} />
            <Route path="universities" element={<Universities_admin />} />
            <Route path="reports" element={<Reports />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="/admin/students/:id" element={<DocStudentProfile />} />
          </Route>
        </Route>

        {/* ================= DOCUMENTATION EXECUTIVE ================= */}
        <Route element={<RoleRoute role="docexecutive" />}>
          <Route path="/docExecutive" element={<DocLayout />}>
            <Route index element={<DocDashboard />} />
            <Route path="dashboard" element={<DocDashboard />} />
            <Route path="students" element={<DocStudents />} />
            <Route path="students/:id" element={<DocStudentProfile />} />   
            <Route path="applications" element={<DocApplications />} />
            <Route path="commission" element={<DocsCommission />} />
            <Route path="course-finder" element={<CourseFinder />} />
            <Route path="documents" element={<DocDocuments />} />         
            <Route path="notification" element={<DocExecutiveNotifications />} />
          </Route>
        </Route>


        {/* Student */}
        <Route path="/student/login" element={<Login />} />

        <Route path="/student" element={<StudentLayout />}>
          <Route element={<ProtectedRoute role="student" />}>

            {/* EDIT PROFILE (form) */}
            <Route path="my-profile" element={<Profile />} />

            {/* GUARD */}
            <Route element={<StudentProfileGuard />}>

              <Route path="dashboard" element={<Dashboard />} />
              <Route path="applications" element={<StudentApplications />} />
              <Route path="documents" element={<Documents />} />
              <Route path="payments" element={<Payments />} />
              <Route path="universities" element={<Universities />} />
              <Route path="visa" element={<Visa />} />
              <Route path="notifications" element={<Notifications />} />

              {/* VIEW PROFILE */}
              <Route path="profile" element={<StudentProfilePage />} />

            </Route>
          </Route>
        </Route>




      </Routes>
    </BrowserRouter>
  );
}

export default App;
