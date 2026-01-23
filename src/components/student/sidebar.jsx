import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/student/dashboard" },
  { name: "My Applications", path: "/student/applications" },
  { name: "Documents", path: "/student/documents" },
  { name: "Payments", path: "/student/payments" },
  { name: "Universities", path: "/student/universities" },
  { name: "Visa Status", path: "/student/visa" },
  { name: "Notifications", path: "/student/notifications" },
  { name: "Profile", path: "/student/profile" },
];

function Sidebar() {
  return (
    <aside className="w-64 bg-blue-900 text-white min-h-screen p-5">
      <h1 className="text-3xl font-bold mb-8 mt-7">Student Portal</h1>

      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition ${
                isActive ? "bg-blue-700" : "hover:bg-blue-800"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
