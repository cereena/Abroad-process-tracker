
const StudentNotifications = () => {
  const notifications = [
    "Your document upload is approved",
    "Payment reminder: Service Fee",
    "New course suggestions available",
  ];

  return (
  
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>

        <ul className="space-y-3">
          {notifications.map((note, i) => (
            <li
              key={i}
              className="p-3 bg-gray-50 border-l-4 border-blue-600 rounded"
            >
              {note}
            </li>
          ))}
        </ul>
      </div>
  );
};

export default StudentNotifications;
