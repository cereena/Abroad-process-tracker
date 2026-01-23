import { useEffect, useState } from "react";

export default function DocExecutiveNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/notifications/doc-executive", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("docToken")}`,
      },
    })
      .then(res => res.json())
      .then(setNotifications);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Notifications
      </h1>

      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map(note => (
          <div key={note._id} className="bg-white p-4 rounded shadow mb-3">
            <h4 className="font-semibold">{note.title}</h4>
            <p>{note.message}</p>

            {note.studentId && (
              <p className="text-sm text-gray-500">
                Student: {note.studentId.name}
              </p>
            )}

            <small className="text-gray-400">
              {new Date(note.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}
