import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function DocPreferences() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [highlightedRow, setHighlightedRow] = useState(null);


  const navigate = useNavigate();

  // ================= FETCH DATA =================
  const fetchPreferences = async () => {
    try {
      const token = localStorage.getItem("docToken");
      if (!token) {
        toast.error("Session expired. Login again.");
        navigate("/login");
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
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, []);


  // ================= HIGHLIGHT HANDLER =================
  useEffect(() => {
    if (loading || applications.length === 0) return;

    const highlightId = sessionStorage.getItem("highlightId");
    if (!highlightId) return;

    setHighlightedRow(highlightId);

    setTimeout(() => {
      setHighlightedRow(null);
      sessionStorage.removeItem("highlightId");
    }, 3000);
  }, [applications, loading]);

  // ================= STATUS CHANGE =================
  const handleStatusChange = async (prefId, status) => {
    
    try {
      const token = localStorage.getItem("docToken");

      await axios.put(
        "http://localhost:5000/api/application/preference/status",
        { prefId, status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Updated");
      fetchPreferences();
    } catch (e) {
      toast.error("Update failed");
    }
  };

  // ================= APPLY HANDLER =================
  const handleApply = async (suggestionId) => {
    try {
      const token = localStorage.getItem("docToken");

      await axios.post(
        "http://localhost:5000/api/application/apply",
        { suggestionId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Applied successfully");
      fetchPreferences();
    } catch (err) {
      console.error(err);
      toast.error("Apply failed");
    }
  };

  // ================= UI =================
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-5">
        Student Preferences & Applications
      </h2>

      {applications.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No applications found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm text-left">
            {/* ===== HEADER ===== */}
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="p-3 border">Enquiry ID</th>
                <th className="p-3 border">Student</th>
                <th className="p-3 border">University</th>
                <th className="p-3 border">Course</th>
                <th className="p-3 border">Country</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Visa</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>

            {/* ===== BODY ===== */}
            <tbody>
              {applications.map((app) =>
                [
                  ...(app.preferences || []).map(p => ({ ...p, type: "preference" })),
                  ...(app.executiveSuggestions || []).map(p => ({ ...p, type: "suggestion" }))
                ].map((pref) => {

                  return (
                    <tr
                      key={pref._id}
                      className={`hover:bg-gray-50 transition ${highlightedRow === pref._id.toString() && pref.type === "suggestion"
                        ? "bg-yellow-200 ring-2 ring-yellow-400"
                        : ""
                        }`}>

                      <td className="p-3 border font-medium">
                        {app.studentId?.studentEnquiryCode || "-"}
                      </td>
                      <td className="p-3 border">
                        {app.studentId?.personalInfo?.firstName}{" "}
                        {app.studentId?.personalInfo?.lastName}
                      </td>
                      <td className="p-3 border font-semibold">
                        {pref.university?.universityName || "-"}
                      </td>
                      <td className="p-3 border text-gray-600">
                        {pref.course || pref.university?.courseName || "-"}
                      </td>
                      <td className="p-3 border">
                        {pref.university?.country || "-"}
                      </td>
                      <td className="p-3 border">
                        <select
                          disabled={pref.type === "suggestion"}
                          value={
                            pref.status === "pending" ? "interested" : pref.status
                          }
                          onChange={(e) =>
                            handleStatusChange(pref._id, e.target.value)
                          }
                          className="border rounded px-2 py-1 text-sm bg-white"
                        >

                          <option value="preferred">Preferred</option>
                          <option value="interested">Interested</option>
                          <option value="applied">Applied</option>
                          <option value="not_eligible">Not Eligible</option>
                        </select>
                      </td>
                      <td className="p-3 border text-gray-700">
                        {app.visaStatus || "Pending"}
                      </td>
                      <td className="p-3 border text-center">
                        {pref.status === "applied" ? (
                          <button
                            onClick={() =>
                              navigate(`/docExecutive/applications/`)
                            }
                            className="text-blue-600 hover:underline text-sm font-medium"
                          >
                            View
                          </button>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>

                    </tr>
                  );
                })
              )}

            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
