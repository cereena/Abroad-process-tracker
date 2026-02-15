import React, { useEffect, useState } from "react";

const AdminUniversities = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        "http://localhost:5000/api/admin/universities",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();

      setUniversities(data);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Not authorized or server error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this university?")) return;

    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `http://localhost:5000/api/admin/universities/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      fetchUniversities();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Manage Universities
      </h1>

      {/* Add Button */}
      <button
        className="mb-4 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
      >
        + Add University
      </button>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Table */}
      {!loading && (
        <div className="bg-white rounded-lg shadow overflow-x-auto">

          <table className="w-full border-collapse">

            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Country</th>
                <th className="p-3 text-left">Course</th>
                <th className="p-3 text-left">Fee</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {universities.map((u) => (
                <tr
                  key={u._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{u.universityName}</td>
                  <td className="p-3">{u.country}</td>
                  <td className="p-3">{u.courseName}</td>
                  <td className="p-3">${u.tuitionFee}</td>

                  <td className="p-3 flex gap-2">

                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(u._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400"
                    >
                      Delete
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
};

export default AdminUniversities;
