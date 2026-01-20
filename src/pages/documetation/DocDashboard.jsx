import StatCard from "../../components/doc/StatCard";

export default function DocDashboard() {
  const stats = [
    { title: "Pending Documents", count: 3, color: "bg-red-500" },
    { title: "Visa Docs Ready", count: 1, color: "bg-orange-500" },
    { title: "Application Submitted", count: 0, color: "bg-blue-600" },
    { title: "Offer Letter Received", count: 0, color: "bg-green-600" },
    { title: "Acceptance Letter Received", count: 0, color: "bg-emerald-600" },
    { title: "Second Payment Done", count: 0, color: "bg-indigo-600" },
    { title: "Final Payment Done", count: 0, color: "bg-purple-600" },
    { title: "Visa File Submitted", count: 0, color: "bg-sky-600" },
    { title: "Visa Success", count: 0, color: "bg-teal-600" },
  ];

  const handleLogout = () => {
  localStorage.clear();
  navigate("/login");
};

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, Documentation Executive!
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Track student application progress at every stage
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>
    </div>
  );
}
