import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clear session data (if you use localStorage/cookies)
    localStorage.removeItem("userToken"); 
    
    // 2. Redirect to Login page
    navigate("/login"); 
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-5 sticky top-0 h-screen">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-3">
          <NavLink to="/admin/dashboard" className="block hover:text-orange-300">Dashboard</NavLink>
          <NavLink to="/admin/students" className="block hover:text-orange-300">Students</NavLink>
          <NavLink to="/admin/applications" className="block hover:text-orange-300">Applications</NavLink>
          <NavLink to="/admin/docs-team" className="block hover:text-orange-300">Docs Team</NavLink>
          <NavLink to="/admin/reports" className="block hover:text-orange-300">Reports</NavLink>
          <NavLink to="/admin/notifications" className="block hover:text-orange-300">Notifications</NavLink>
          <NavLink to="/admin/leads" className="block hover:text-orange-300">Leads</NavLink>

        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        
        {/* TOPBAR */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="text-gray-600 font-medium">Welcome, Administrator</div>
          
          <div className="flex items-center gap-4">
            {/* LOGOUT BUTTON - Replaced notification icon */}
            <button 
              onClick={handleLogout}
              className="px-4 py-1.5 text-sm font-semibold text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
            <div className="h-8 w-8 bg-blue-900 rounded-full text-white flex items-center justify-center text-sm">A</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
