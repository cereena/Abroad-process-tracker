import { useEffect, useState } from "react";
import axios from "axios";

export default function DocExecutiveNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("docToken");

        if (!token) {
          setError("Login required");
          return;
        }

        const res = await axios.get(
          "http://localhost:5000/api/notifications/doc-executive",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // 🔒 Always normalize response
        setNotifications(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Notification fetch error:", err);
        setError("Unauthorized or forbidden");
        setNotifications([]); // 🔒 prevent crash
      }
    };

    fetchNotifications();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-4">
      {notifications.length === 0 && (
        <p className="text-gray-500">No notifications</p>
      )}

      {notifications.map((note) => {
        const student = note.studentId || {};

        return (
          <div
            key={note._id}
            className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-600"
          >
            <h4 className="font-bold text-lg">{note.title}</h4>
            <p className="text-gray-700">{note.message}</p>

            {/* 🔑 STUDENT DETAILS */}
            {student._id && (
              <div className="mt-2 text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Student:</strong>{" "}
                  {student.name || "N/A"}
                </p>

                {student.studentEnquiryCode && (
                  <p>
                    <strong>Enquiry ID:</strong>{" "}
                    {student.studentEnquiryCode}
                  </p>
                )}

                {student.email && (
                  <p>
                    <strong>Email:</strong> {student.email}
                  </p>
                )}
              </div>
            )}

            <small className="text-gray-400 block mt-3">
              {new Date(note.createdAt).toLocaleString()}
            </small>
          </div>
        );
      })}
    </div>
  );
}
