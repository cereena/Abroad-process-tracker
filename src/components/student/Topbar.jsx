import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("studentId");
    navigate("/login");
  };

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold text-blue-900">
        Student Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Welcome, Student
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded-lg text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Topbar;
