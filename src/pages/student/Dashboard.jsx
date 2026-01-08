import { useEffect, useState } from "react";

function Dashboard() {
  const studentId = localStorage.getItem("studentId");

  if (!studentId) {
    window.location.href = "/login";
  }

  const [progress, setProgress] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/progress/${studentId}`)
      .then((res) => res.json())
      .then((data) => {
        setProgress(data?.stepsCompleted || []);
      })
      .catch(() => {
        alert("Unable to fetch progress");
      });
  }, [studentId]);

  const steps = [
    "Initial Payment",
    "Registration Completed",
    "Student Documents",
    "Application Submission",
    "Visa Documents Preparation",
    "Interview preparation",
    "Visa Applied",
    "Final Approval",
  ];

  const payments = [
    { title: "Registration Fee", key: "Registration Completed" },
    { title: "Second Installment", key: "Documents Uploaded" },
    { title: "Final Payment", key: "Final Approval" },
  ];

  return (
    <div className="space-y-8 mx-3 mb-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-900 mt-6">
          Student Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Track your application, payments & progress
        </p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard title="Application Status" value="In Progress" />
        <InfoCard title="University Applied" value="0" />
        <InfoCard title="Payments Pending" value="2" />
      </div>

      {/* Progress + Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Application Progress */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold text-blue-800 mb-6">
            Application Progress
          </h2>

          <div className="space-y-5">
            {steps.map((step, index) => {
              const completed = progress.includes(step);

              return (
                <div key={index} className="flex gap-4 items-start">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold
                    ${completed ? "bg-green-600" : "bg-gray-300"}`}
                  >
                    {index + 1}
                  </div>

                  <div>
                    <p
                      className={`font-medium ${
                        completed ? "text-blue-900" : "text-gray-500"
                      }`}
                    >
                      {step}
                    </p>
                    {completed && (
                      <span className="text-xs text-green-600">
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment Status */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold text-blue-800 mb-6">
            Payment Status
          </h2>

          <div className="space-y-4">
            {payments.map((pay, index) => {
              const done = progress.includes(pay.key);

              return (
                <div
                  key={index}
                  className="flex justify-between items-center border rounded-lg p-4"
                >
                  <div>
                    <p className="font-medium">{pay.title}</p>
                    <p className="text-xs text-gray-400">
                      {done ? "Payment Completed" : "Pending"}
                    </p>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold
                    ${done
                      ? "bg-green-100 text-green-600"
                      : "bg-orange-100 text-orange-600"}`}
                  >
                    {done ? "Paid" : "Pending"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Small reusable card */
function InfoCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-sm text-gray-400">{title}</p>
      <h3 className="text-2xl font-bold text-blue-800 mt-2">
        {value}
      </h3>
    </div>
  );
}

export default Dashboard;
