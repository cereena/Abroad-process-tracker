import { useEffect, useState } from "react";

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/notifications/admin")
      .then(res => res.json())
      .then(data => {
        console.log("ADMIN NOTES:", data); // 🔍 debug
        setNotifications(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">
        Admin Notifications
      </h1>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications yet.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((note) => {
            const e = note.enquiryId;   // shortcut

            return (
              <div
                key={note._id}
                className="bg-white border-l-4 border-blue-600 shadow rounded p-4"
              >
                <h4 className="font-semibold text-lg mb-2">
                  {note.title}
                </h4>

                {e ? (
                  <div className="space-y-1 text-sm">
                    <p><strong>Name:</strong> {e.name || "-"}</p>
                    <p><strong>Email:</strong> {e.email || "-"}</p>
                    <p><strong>Phone:</strong> {e.phone || "-"}</p>
                    <p><strong>Country:</strong> {e.countryPreference || "-"}</p>

                    {e.message && (
                      <p><strong>Message:</strong> {e.message}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-red-500">
                    Enquiry data missing (not populated)
                  </p>
                )}

                <small className="block mt-2 text-gray-400">
                  {new Date(note.createdAt).toLocaleString()}
                </small>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
