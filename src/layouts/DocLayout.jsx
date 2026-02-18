import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LayoutDashboard, Users, Settings, FileText, IndianRupee, Search, Bell } from "lucide-react";

export default function DocLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("docId");
    localStorage.removeItem("docToken");
    navigate("/login");
  };

  // Helper for NavLink styling
  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded transition-colors ${
      isActive ? "bg-blue-800 text-orange-300 font-semibold" : "text-gray-200 hover:bg-blue-800 hover:text-white"
    }`;

  const navItems = [
    { label: "Dashboard", path: "dashboard", icon: <LayoutDashboard size={18} /> },
    { label: "Students", path: "students", icon: <Users size={18} /> },
    { label: "Applications", path: "applications", icon: <FileText size={18} /> },
    { label: "Preferences", path: "preferences", icon: <Settings size={18} /> },
    { label: "Commission", path: "commission", icon: <IndianRupee size={18} /> },
    { label: "Course Finder", path: "course-finder", icon: <Search size={18} /> },
    { label: "Notifications", path: "notification", icon: <Bell size={18} /> },
  ];

  return (
    <div className="min-h-screen flex bg-blue-50 relative">
      
      {/* MOBILE OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-blue-900 text-white p-5
          transform transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0 lg:sticky lg:h-screen
        `}
      >
        {/* MOBILE CLOSE HEADER */}
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="text-xl font-bold italic">Doc Exec</h2>
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* DESKTOP LOGO */}
        <h2 className="text-2xl font-bold mb-8 hidden lg:block border-b border-blue-800 pb-4">
          Doc Executive
        </h2>

        <nav className="space-y-2 text-l">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={navClass}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* MAIN SECTION */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* TOPBAR */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30">
          
          <div className="flex items-center gap-3">
            {/* MOBILE HAMBURGER */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-gray-600 hover:bg-gray-100 p-1 rounded"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-gray-700 font-semibold hidden sm:block">
              Documentation Executive Panel
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={logout}
              className="px-4 py-1.5 text-sm font-semibold text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}