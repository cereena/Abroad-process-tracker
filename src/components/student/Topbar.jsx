import { Menu, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Topbar({ setOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("studentId");
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">

      <div className="flex items-center gap-3">

        {/* Hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden text-gray-700"
        >
          <Menu size={24} />
        </button>

        <h2 className="text-lg font-semibold text-blue-900">
          Student Dashboard
        </h2>

      </div>

      <div className="flex items-center gap-6">

        {/* Contact */}
        <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">

          <div className="flex items-center gap-1">
            <Phone size={16} />
            +91 9876543210
          </div>

          <div className="flex items-center gap-1">
            <Mail size={16} />
            support@studyabroad.com
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-1.5 text-sm font-semibold text-red-600 border border-red-200 rounded-md hover:bg-red-50"
        >
          Logout
        </button>

      </div>
    </header>
  );
}

export default Topbar;