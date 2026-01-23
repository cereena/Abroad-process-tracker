import { useEffect, useState } from "react";

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loadingIds, setLoadingIds] = useState([]);

  // 🔹 Add lead (ONE TIME ONLY)
  const addLead = async (enquiryId) => {
    try {
      setLoadingIds((prev) => [...prev, enquiryId]);

      const res = await fetch(
        "http://localhost:5000/api/leads/from-enquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ enquiryId }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add lead");
        return;
      }

      // ✅ Update enquiry locally as converted
      setNotifications((prev) =>
        prev.map((note) =>
          note.enquiryId?._id === enquiryId
            ? {
                ...note,
                enquiryId: {
                  ...note.enquiryId,
                  convertedToLead: true,
                },
              }
            : note
        )
      );
    } catch (err) {
      alert("Something went wrong while adding lead");
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== enquiryId));
    }
  };

  // 🔹 Fetch admin notifications
  useEffect(() => {
    fetch("http://localhost:5000/api/notifications/admin")
      .then((res) => res.json())
      .then((data) => {
        setNotifications(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setNotifications([]);
      });
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
            const enquiry = note.enquiryId;

            if (!enquiry || !enquiry._id) return null;

            const isConverted = enquiry.convertedToLead === true;
            const isLoading = loadingIds.includes(enquiry._id);

            return (
              <div
                key={note._id}
                className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-600"
              >
                <h4 className="font-bold mb-2">{note.title}</h4>

                <p><strong>Name:</strong> {enquiry.name}</p>
                <p><strong>Email:</strong> {enquiry.email}</p>
                <p><strong>Phone:</strong> {enquiry.phone}</p>
                <p><strong>Country:</strong> {enquiry.countryPreference}</p>

                {enquiry.message && (
                  <p><strong>Message:</strong> {enquiry.message}</p>
                )}

                <button
                  disabled={isConverted || isLoading}
                  onClick={() => addLead(enquiry._id)}
                  className={`mt-3 px-4 py-1.5 rounded ${
                    isConverted
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-orange-500 text-white hover:bg-orange-600"
                  }`}
                >
                  {isConverted ? "Already Added" : "Add Lead"}
                </button>

                <small className="text-gray-400 block mt-2">
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
