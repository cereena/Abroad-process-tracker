import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

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
      sticky top-0 lg:static
      w-64 min-h-screen bg-blue-900 text-white p-5
      transform transition-transform duration-300
      ${open ? "translate-x-0" : "-translate-x-full"}
      lg:translate-x-0
      z-50
      `}
      >

        {/* MOBILE CLOSE */}
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="text-xl font-bold">Admin</h2>

          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-8 hidden lg:block">
          Admin Panel
        </h2>

        <nav className="space-y-3 text-l">

          {[
            ["Dashboard", "/admin/dashboard"],
            ["Students", "/admin/students"],
            ["Applications", "/admin/applications"],
            ["Docs Team", "/admin/docs-team"],
            ["Universities", "/admin/universities"],
            ["Reports", "/admin/reports"],
            ["Notifications", "/admin/notifications"],
            ["Leads", "/admin/leads"],
          ].map(([label, path]) => (

            <NavLink
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded hover:bg-blue-800 ${isActive ? "bg-blue-800 text-orange-300" : ""
                }`
              }
            >
              {label}
            </NavLink>

          ))}

        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* TOPBAR */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            {/* HAMBURGER */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-gray-600"
            >
              <Menu size={24} />
            </button>

            <span className="text-gray-600 font-medium hidden sm:block">
              Welcome, Administrator
            </span>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-sm font-semibold text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition"
            >
              Logout
            </button>

            <div className="h-8 w-8 bg-blue-900 rounded-full text-white flex items-center justify-center text-sm">
              A
            </div>

          </div>

        </header>

        {/* CONTENT */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
