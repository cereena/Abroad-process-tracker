import { NavLink } from "react-router-dom";
import { X, LayoutDashboard, User, GraduationCap, FileText, Folder, IndianRupee, Plane, Bell } from "lucide-react";

const links = [
  { name: "Dashboard", path: "/student/dashboard", icon: <LayoutDashboard size={18} /> },
  { name: "My Profile", path: "/student/profile", icon: <User size={18} /> },
  { name: "Study Abroad Apply", path: "/student/my-profile", icon: <GraduationCap size={18} /> },
  { name: "My Applications", path: "/student/applications", icon: <FileText size={18} /> },
  { name: "Documents", path: "/student/documents", icon: <Folder size={18} /> },
  { name: "Payments", path: "/student/payments", icon: <IndianRupee size={18} /> },
  { name: "Visa Status", path: "/student/visa", icon: <Plane size={18} /> },
  { name: "Notifications", path: "/student/notifications", icon: <Bell size={18} /> }
];

function Sidebar({ open, setOpen }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
    fixed top-0 left-0 h-screen w-64 bg-blue-900 text-white p-5
    transform transition-transform duration-300 z-50
    ${open ? "translate-x-0" : "-translate-x-full"}
    lg:sticky lg:top-0 lg:translate-x-0
  `}
      >
        {/* Mobile close button */}
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="text-xl font-bold">Student Portal</h2>
          <button onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-8 border-b border-blue-800 pb-4 hidden lg:block">
          Student Portal
        </h1>

        <nav className="flex flex-col gap-2 text-sm">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive
                  ? "bg-blue-800 text-orange-300 font-semibold"
                  : "hover:bg-blue-800 text-gray-200 hover:text-white"
                }`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;