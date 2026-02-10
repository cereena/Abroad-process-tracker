import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DocExecutiveNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const markAsRead = async (id) => {
    const token = localStorage.getItem("docToken");

    await fetch(`http://localhost:5000/api/notifications/${id}/read`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Update UI instantly
    setNotifications((prev) =>
      prev.map((n) =>
        n._id === id ? { ...n, isRead: true } : n
      )
    );
  };


  return (
    <div className="space-y-4">
      {notifications.length === 0 && (
        <p className="text-gray-500">No notifications</p>
      )}

      {notifications.map((note) => {
        const student = note.studentId || {};
        console.log("NOTE OBJECT:", note);

        return (
          <div
            key={note._id}
            className={`bg-white p-4 rounded-lg shadow border-l-4 
        ${note.isRead ? "border-gray-400" : "border-blue-600"}`}
          >
            <h4 className="font-bold text-lg">{note.title}</h4>
            <p className="text-gray-700">{note.message}</p>


            {/* Student info */}
            {student._id && (
              <div className="mt-2 text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Student:</strong> {student.name || "N/A"}
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


            {/* View button for document uploads */}
            {note.title === "New Document Uploaded" && (
              <button
                className="mt-3 bg-blue-600 text-white px-3 py-1 rounded"
                onClick={() => {
                  const sid = note.studentId?._id;

                  if (!sid) {
                    alert("Student ID missing!");
                    return;
                  }

                  markAsRead(note._id);

                  navigate(`/docExecutive/documents?student=${sid}`);
                }}
              >
                View Documents
              </button>
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
