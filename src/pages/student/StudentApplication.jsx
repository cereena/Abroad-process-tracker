
const StudentApplications = () => {
  const apps = [
    { university: "Harvard University", status: "Submitted" },
    { university: "University of Toronto", status: "Under Review" },
  ];

  return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Applications</h2>

        {apps.map((app, i) => (
          <div key={i} className="p-4 border rounded-lg mb-3 flex justify-between">
            <span className="font-medium">{app.university}</span>
            <span className="text-blue-600">{app.status}</span>
          </div>
        ))}
      </div>
  );
};

export default StudentApplications;
