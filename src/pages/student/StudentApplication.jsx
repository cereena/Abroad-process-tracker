import React, { useEffect, useState } from "react";
import {
  Globe,
  BookOpen,
  GraduationCap,
  Clock,
  CheckCircle,
  Star,
} from "lucide-react";

const StudentApplications = () => {
  /* ================= STATE ================= */
  const [suggestions, setSuggestions] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [loading, setLoading] = useState(true);

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

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      setPreferences(data.preferences || []);
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


  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-6 space-y-8">

      {/* ================= STATUS ================= */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-blue-700">
          <CheckCircle size={22} />
          Application Status
        </h2>

        <p className="text-gray-500">
          No applications submitted yet.
        </p>

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

                  <span className="text-gray-600">
                    Priority #{i + 1}
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

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-blue-700">
          <BookOpen size={22} />
          Suggested by Executive
        </h2>

        {suggestions.length === 0 ? (
          <p className="text-gray-500">No suggestions yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {suggestions.map((s) => (
              <div
                key={s._id}
                className="border p-4 rounded shadow"
              >
                <h3 className="font-semibold text-blue-700">
                  {s.university?.universityName}
                </h3>

                <p className="text-sm">
                  Course: {s.course}
                </p>

                <p className="text-xs text-gray-400">
                  Suggested by {s.suggestedBy?.name}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};

export default StudentApplications;
