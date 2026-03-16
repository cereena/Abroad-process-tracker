// src/layouts/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/student/sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-blue-50">

  <Sidebar />

  <div className="flex-1 flex flex-col">

    <Topbar />

    <main className="p-6">
      <Outlet />
    </main>

  </div>
<Footer/>
</div>
    
  );
}
