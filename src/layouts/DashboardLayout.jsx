// src/layouts/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/student/sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen">
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
    <Footer/>
    </div>
  );
}
