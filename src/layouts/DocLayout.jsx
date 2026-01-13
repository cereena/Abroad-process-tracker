import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function DocLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("docId");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ===== SIDEBAR ===== */}
      <aside className="w-64 bg-blue-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">Doc Executive</h2>

        <nav className="space-y-4 text-sm">
          <NavLink to="/doc/dashboard" className="block hover:text-orange-300">
            Dashboard
          </NavLink>
          <NavLink to="/doc/students" className="block hover:text-orange-300">
            Students
          </NavLink>
          <NavLink to="/doc/applications" className="block hover:text-orange-300">
            Applications
          </NavLink>
          <NavLink to="/doc/commission" className="block hover:text-orange-300">
            Commission
          </NavLink>
          <NavLink to="/doc/course-finder" className="block hover:text-orange-300">
            Course Finder
          </NavLink>
        </nav>
      </aside>

      {/* ===== RIGHT SECTION ===== */}
      <div className="flex-1 flex flex-col">

        {/* ===== TOP HEADER ===== */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-800">
            Documentation Executive Panel
          </h1>

          <div className="flex items-center gap-4">

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm"
            >
              Logout
            </button>
          </div>
        </header>

        {/* ===== PAGE CONTENT ===== */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
