import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <nav className="space-y-3">
          <NavLink to="/admin/dashboard" className="block hover:text-orange-300">
            Dashboard
          </NavLink>
          <NavLink to="/admin/students" className="block hover:text-orange-300">
            Students
          </NavLink>
          <NavLink to="/admin/applications" className="block hover:text-orange-300">
            Applications
          </NavLink>
          <NavLink to="/admin/docs-team" className="block hover:text-orange-300">
            Docs Team
          </NavLink>
          <NavLink to="/admin/reports" className="block hover:text-orange-300">
            Reports
          </NavLink>
        </nav>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
  );
}
