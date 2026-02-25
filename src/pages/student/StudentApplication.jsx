import React, { useEffect, useState } from "react";
import {
  Globe,
  BookOpen,
  GraduationCap,
  Clock,
  CheckCircle,
  Star,
} from "lucide-react";
import { toast } from 'react-toastify';

const StudentApplications = () => {


  // On student side
  const markInterested = async (prefId, courseChosen) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `http://localhost:5000/api/application/interested/${prefId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ course: courseChosen }),
        });

      let data = {};
      try {
        data = await res.json(); // try parse JSON
      } catch (err) {
        data = {}; // fallback to empty object if not JSON
      }

      if (!res.ok) throw new Error(data.message || "Failed to mark interest");

      toast.success('Interest saved!', {
        style: { border: '1px solid #10b981', padding: '16px', color: '#065f46', fontWeight: 'bold' },
        iconTheme: { primary: '#10b981', secondary: '#FFFAEE' }
      });

      // update suggestions UI
      setSuggestions(prev =>
        prev.map(s =>
          s._id === prefId ? { ...s, interested: true } : s
        )
      );

      setPreferences(prev => {
        const exists = prev.find(p => p._id === prefId);
        if (exists) return prev;

        return [
          ...prev,
          { _id: prefId, course: courseChosen, status: "interested" }
        ];
      });

    } catch (err) {
      alert(err.message || "Failed to mark interest");
    }
  };


  /* ================= STATE ================= */
  const [suggestions, setSuggestions] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState([]);

  /* ================= FETCH ================= */
  const fetchSuggestions = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        return;
      }

      const res = await fetch(
        "http://localhost:5000/api/application/suggestions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Unauthorized");
      }

      const data = await res.json();

      setSuggestions(Array.isArray(data) ? data : []);

    } catch (err) {
      console.error("Suggestions error:", err);
      setSuggestions([]);
    }
  };


  const fetchMyApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await fetch(
        "http://localhost:5000/api/application/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();

      setPreferences(data.preferences || []);
      setApplied(data.appliedUniversities || []);

    } catch (err) {
      console.error(err);
      alert("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };


  const movePriority = async (from, to) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/application/reorder",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fromIndex: from,
            toIndex: to,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();

      setPreferences(data);
    } catch (err) {
      alert("Failed to update priority");
    }
  };

  useEffect(() => {
    fetchMyApplications();
    fetchSuggestions();
  }, []);

  const goToPayment = (app) => {
    window.location.href = `/student/payment/${app._id}`;
  };

  const viewOffer = (app) => {
    window.location.href = `/student/application/${app._id}`;
  };


  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-6 space-y-8">

      {/* ================= APPLIED ================= */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-700">
          <CheckCircle size={22} />
          Applied Universities
        </h2>

        {applied.length === 0 ? (
          <p className="text-gray-500">
            No applications submitted yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {applied.map((u) => (
              <div
                key={u._id}
                className="bg-blue-50 p-4 rounded-lg border shadow-sm"
              >
                <h3 className="font-bold text-blue-800">
                  {u.university?.universityName || "Unknown University"}
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  {u.course || "Unknown Course"}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {u.university?.country || u.country || "N/A"}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Intake: {u.university?.intakes?.join(", ") || "N/A"}
                </p>

                {/* STATUS */}
                <div className="mt-2">

                  <span className="text-sm font-semibold text-blue-600">
                    {u.status}
                  </span>

                  {/* PAYMENT REQUIRED */}
                  {u.status === "Offer Received" && u.paymentStatus !== "Paid" && (
                    <button
                      onClick={() => goToPayment(u)}
                      className="block mt-2 text-white bg-green-600 px-3 py-1 rounded text-xs"
                    >
                      Pay Tuition Fees
                    </button>
                  )}

                  {/* VIEW OFFER */}
                  {u.status === "Offer Received" && u.paymentStatus === "Paid" && (
                    <button
                      onClick={() => viewOffer(u)}
                      className="block mt-2 text-blue-600 font-semibold text-xs underline"
                    >
                      View Offer Letter
                    </button>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}


      </div>

      {/* ================= PREFERENCES ================= */}

      <div>

        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-700">
          <Star size={22} />
          My Preferences
        </h2>

        {loading && <p>Loading...</p>}

        {!loading && preferences.length === 0 && (
          <p className="text-gray-500 bg-white p-4 rounded shadow">
            No preferences added yet.
          </p>
        )}


        {!loading && preferences.length > 0 && (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {preferences.map((p, i) => (

              <div
                key={p._id}
                className="bg-white rounded-xl shadow border hover:shadow-lg transition flex flex-col justify-between"
              >

                {/* CARD HEADER */}
                <div className="p-4 border-b bg-blue-50 rounded-t-xl">

                  <h3 className="font-bold text-blue-800 text-lg break-words">
                    {p.university?.universityName || "Unknown University"}
                  </h3>


                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Globe size={14} />
                    {p.university?.country || "N/A"}
                  </p>

                </div>

                {/* CARD BODY */}
                <div className="p-4 space-y-2 text-sm">

                  <p className="flex items-center gap-2">
                    <GraduationCap size={14} />
                    {p.university?.degree || "N/A"} • {p.university?.stream || "N/A"}
                  </p>

                  <p className="flex items-center gap-2">
                    <BookOpen size={14} />
                    {p.course || p.university?.courseName || "N/A"}
                  </p>


                  <p className="flex items-center gap-2">
                    <Clock size={14} />
                    Intake: {p.university?.intakes?.length
                      ? p.university.intakes.join(", ")
                      : "N/A"}
                  </p>
                </div>

                {/* CARD FOOTER */}
                <div className="p-3 border-t bg-gray-50 flex justify-between items-center text-xs rounded-b-xl">

                  <span
                    className={`font-semibold ${p.status === "preferred"
                      ? "text-blue-600"
                      : p.status === "interested"
                        ? "text-orange-600"
                        : "text-green-600"
                      }`}
                  >
                    {p.status?.toUpperCase()}
                  </span>


                  <div className="flex gap-2">

                    <button
                      disabled={i === 0}
                      onClick={() => movePriority(i, i - 1)}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded disabled:opacity-40"
                    >
                      ↑
                    </button>

                    <button
                      disabled={i === preferences.length - 1}
                      onClick={() => movePriority(i, i + 1)}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded disabled:opacity-40"
                    >
                      ↓
                    </button>

                  </div>

                </div>


              </div>

            ))}

          </div>
        )}

      </div>

      {/* ================= SUGGESTIONS ================= */}

      <div>

        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-700">
          <BookOpen size={22} />
          Suggested by Executive
        </h2>

        {suggestions.length === 0 ? (

          <p className="text-gray-500 bg-white p-4 rounded shadow">
            No suggestions yet.
          </p>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {suggestions.map((s) => (

              <div
                key={s._id}
                className="bg-white rounded-xl shadow border hover:shadow-lg transition flex flex-col justify-between"
              >

                {/* HEADER */}
                <div className="p-4 border-b bg-orange-50 rounded-t-xl">

                  <h3 className="font-bold text-orange-700 text-lg break-words">
                    {s.university?.universityName || "Unknown University"}
                  </h3>

                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Globe size={14} />
                    {s.university?.country || "N/A"}
                  </p>

                </div>

                {/* BODY */}
                <div className="p-4 space-y-2 text-sm">

                  <p className="flex items-center gap-2">
                    <GraduationCap size={14} />
                    {s.university?.degree} • {s.university?.stream}
                  </p>

                  <p className="flex items-center gap-2">
                    <BookOpen size={14} />
                    {s.course || "N/A"}
                  </p>


                  <p className="flex items-center gap-2">
                    <Clock size={14} />
                    Intake: {s.university?.intakes?.join(", ") || "N/A"}
                  </p>

                </div>

                {/* FOOTER */}
                <div className="p-3 border-t bg-gray-50 flex justify-between items-center text-xs rounded-b-xl">

                  {/* Status */}
                  {s.interested ? (

                    <span className="text-green-600 font-semibold flex items-center gap-1">
                      <CheckCircle size={14} />
                      Interested
                    </span>

                  ) : (

                    <span className="text-gray-400">
                      Not decided
                    </span>

                  )}
                  {/* Button */}
                  {!s.interested && (
                    <button
                      onClick={() => markInterested(s._id, s.course)}
                      className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-400 text-xs"
                    >
                      I'm Interested
                    </button>


                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>



  );
};

export default StudentApplications;
