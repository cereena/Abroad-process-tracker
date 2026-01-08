import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "My Applications", path: "/applications" },
  { name: "Documents", path: "/documents" },
  { name: "Payments", path: "/payments" },
  { name: "Universities", path: "/universities" },
  { name: "Visa Status", path: "/visa" },
  { name: "Notifications", path: "/notifications" },
  { name: "Profile", path: "/profile" },
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
