import { useEffect, useState } from "react";
import axios from "axios";

export default function DocApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      console.log("FULL RESPONSE:", res.data);

      setApplications(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleApply = async (id) => {
    try {
      const token = localStorage.getItem("docToken");

      await axios.post(
        "http://localhost:5000/api/application/apply",
        { suggestionId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Applied Successfully");
      fetchApplications();

    } catch {
      alert("Apply failed");
    }
  };
  const updateProgress = async (appId, status) => {
    try {
      const token = localStorage.getItem("docToken");

      await axios.put(
        "http://localhost:5000/api/application/progress",
        { appId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Status updated");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

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
          Filter
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
                <th className="p-3 border">University</th>
                <th className="p-3 border">Course</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Visa</th>
              </tr>
            </thead>

            <tbody>
              {applications.map(app =>
                app.executiveSuggestions
                  ?.filter(s => s.interested)
                  .map(s => (
                    <tr key={s._id} className="hover:bg-gray-50 text-sm">

                      <td className="p-3 border font-semibold">
                        <div>
                          {app.studentId?.personalInfo?.firstName}{" "}
                          {app.studentId?.personalInfo?.lastName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {app.studentId?.studentEnquiryCode || ""}
                        </div>
                      </td>

                      <td className="p-3 border">
                        {s.university?.universityName || "N/A"}
                      </td>

                      <td className="p-3 border">
                        {s.course || "-"}
                      </td>

                      <td className="p-3 border">
                        <select
                          value={s.applicationStatus}
                          onChange={(e) =>
                            updateProgress(app._id, e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Applied">Applied</option>
                          <option value="Offer_Received">Offer Received</option>
                          <option value="Acceptance_Received">Acceptance Letter</option>
                          <option value="Fee_Paid">Fee Paid</option>
                          <option value="Visa_Submitted">Visa Submitted</option>
                          <option value="Visa_Approved">Visa Approved</option>
                          <option value="Visa_Rejected">Visa Rejected</option>
                          <option value="Student_Rejected">Student Rejected</option>
                        </select>

                      </td>

                      <td className="p-3 border">
                        <StatusBadge value={app.visaStatus} />
                      </td>

                    </tr>

                  ))
              )}
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
