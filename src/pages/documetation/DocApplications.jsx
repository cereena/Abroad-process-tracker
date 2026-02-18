import { useEffect, useState } from "react";
import axios from "axios";

export default function DocApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("docToken");

        if (!token) {
          setError("Login required");
          return;
        }

        const res = await axios.get(
          "http://localhost:5000/api/application/assigned",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setApplications(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  /* ================= STATES ================= */

  if (loading) {
    return <p className="p-6">Loading applications...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  /* ================= TABLE ================= */

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">University Applications</h2>

        <button className="border border-blue-600 text-blue-600 px-3 py-1 rounded">
          🔍 Filter
        </button>
      </div>

      {/* EMPTY */}
      {applications.length === 0 && (
        <p className="text-gray-500 bg-white p-4 rounded shadow">
          No assigned applications
        </p>
      )}

      {/* TABLE */}
      {applications.length > 0 && (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="p-3 border">Student</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Visa Status</th>
                <th className="p-3 border">Created</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app) => (
                <tr
                  key={app._id}
                  className="hover:bg-gray-50 text-sm"
                >
                  {/* Student */}
                  <td className="p-3 border font-semibold">
                    {app.studentId?.name || "N/A"}
                  </td>

                  {/* Email */}
                  <td className="p-3 border">
                    {app.studentId?.email || "N/A"}
                  </td>

                  {/* App Status */}
                  <td className="p-3 border">
                    <StatusBadge value={app.applicationStatus} />
                  </td>

                  {/* Visa */}
                  <td className="p-3 border">
                    <StatusBadge value={app.visaStatus} />
                  </td>

                  {/* Date */}
                  <td className="p-3 border">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>

                  {/* Action */}
                  <td className="p-3 border">
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded text-xs"
                      onClick={() =>
                        alert(`View ${app.studentId?.name}`)
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ================= STATUS BADGE ================= */

function StatusBadge({ value }) {
  if (!value) return "--";

  const base =
    "px-2 py-1 rounded text-xs font-semibold inline-block";

  if (value === "Pending")
    return (
      <span className={`${base} bg-yellow-100 text-yellow-700`}>
        {value}
      </span>
    );

  if (value === "Submitted")
    return (
      <span className={`${base} bg-blue-100 text-blue-700`}>
        {value}
      </span>
    );

  if (value === "Success")
    return (
      <span className={`${base} bg-green-100 text-green-700`}>
        {value}
      </span>
    );

  return (
    <span className={`${base} bg-gray-100 text-gray-600`}>
      {value}
    </span>
  );
}
