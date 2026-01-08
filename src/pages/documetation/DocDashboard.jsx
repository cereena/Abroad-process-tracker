import { useState } from "react";

export default function DocDashboard() {
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState("");

  const updateDocStatus = async () => {
    if (!studentId || !status) {
      alert("Enter student ID and select status");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/docs/update-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ studentId, status })
        }
      );

      const data = await res.json();
      alert(data.message || "Updated successfully");
    } catch {
      alert("Error updating status");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[420px]">
        <h2 className="text-2xl font-bold text-blue-900 text-center">
          Documentation Dashboard
        </h2>
        <p className="text-sm text-orange-600 text-center mb-6">
          Manage student documents
        </p>

        <input
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">Select Status</option>
          <option>Documents Pending</option>
          <option>Documents Verified</option>
          <option>Sent to Embassy</option>
          <option>Visa Approved</option>
        </select>

        <button
          onClick={updateDocStatus}
          className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold"
        >
          Update Status
        </button>
      </div>
    </div>
  );
}
