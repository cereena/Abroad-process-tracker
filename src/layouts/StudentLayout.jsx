import Sidebar from "../components/student/sidebar.jsx";
import Topbar from "../components/student/Topbar.jsx";
import { Outlet } from "react-router-dom";

function StudentLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default StudentLayout;
