import { useEffect, useState } from "react";
import axios from "axios";

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("docToken"); // or student/admin

      const res = await axios.get(
        "http://localhost:5000/api/notifications/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(res.data);
    } catch (err) {
      console.error("Notification fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((note) => (
            <li
              key={note._id}
              className="p-3 bg-gray-50 border-l-4 border-blue-600 rounded"
            >
              <p className="font-medium">{note.title}</p>
              <p className="text-sm text-gray-600">{note.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentNotifications;
