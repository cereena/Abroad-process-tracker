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

        setNotifications(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Notification fetch error:", err);
        setError("Unauthorized or forbidden");
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, []);


  const markAsRead = async (id) => {
    const token = localStorage.getItem("docToken");

    await fetch(`http://localhost:5000/api/notifications/${id}/read`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setNotifications((prev) =>
      prev.map((n) =>
        n._id === id ? { ...n, isRead: true } : n
      )
    );
  };

  const goToInterestPage = async (note) => {
    await markAsRead(note._id);

    const highlightId = note.preferenceId?.toString();

    if (note.suggestionId) {
      sessionStorage.setItem("highlightId", note.suggestionId);
    }

    navigate("/docExecutive/preferences");
  };

  const goToDocuments = (note) => {
    const sid = note.studentId?._id;

    if (!sid) {
      alert("Student ID missing!");
      return;
    }
    markAsRead(note._id);
    navigate(`/docExecutive/documents?student=${sid}`);
  };

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
            className={`bg-white rounded-xl shadow-md border p-5 transition hover:shadow-lg
            ${note.isRead ? "opacity-70" : ""}`}
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-blue-700">
                  {student.name || "Student"}
                </h3>

                <p className="text-sm text-gray-500">
                  Enquiry ID:{" "}
                  {note.enquiryId || student.studentEnquiryCode || "N/A"}
                </p>
              </div>

              {!note.isRead && (
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  New
                </span>
              )}
            </div>

            {/* University Info */}
            {(note.universityName || note.course || note.country) && (
              <div className="mt-3 space-y-1 text-sm">
                <p>
                  <strong>University:</strong>{" "}
                  {note.universityName || "N/A"}
                </p>

                <p>
                  <strong>Country:</strong> {note.country || "N/A"}
                </p>

                <p>
                  <strong>Course:</strong> {note.course || "N/A"}
                </p>
              </div>
            )}

            {/* Student Email */}
            {student.email && (
              <p className="text-sm text-gray-600 mt-2">
                <strong>Email:</strong> {student.email}
              </p>
            )}

            {/* Actions */}
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-400">
                {new Date(note.createdAt).toLocaleString()}
              </span>

              <div className="flex gap-2">
                {/* View Interest */}
                {note.title === "Student Interested" && (
                  <button
                    onClick={() => goToInterestPage(note)}
                    className="bg-green-600 hover:bg-green-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium"
                  >
                    View Interest
                  </button>
                )}

                {/* View Documents */}
                {note.title === "New Document Uploaded" && (
                  <button
                    onClick={() => goToDocuments(note)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium"
                  >
                    View Documents
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
