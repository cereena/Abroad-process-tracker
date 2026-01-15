import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminNotifications() {
  const [addedLeads, setAddedLeads] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const addLead = async (enquiryId) => {
    try {
      const res = await fetch("http://localhost:5000/api/leads/from-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enquiryId })
      });

      const data = await res.json();

      if (!res.ok) {
        s
        alert(data.message || "Failed to add lead");
        return;
      }

      setAddedLeads(prev => [...prev, enquiryId]);

    } catch (err) {
      alert("Something went wrong while adding lead");
    }
  };


  useEffect(() => {
    fetch("http://localhost:5000/api/notifications/admin")
      .then(res => res.json())
      .then(data => {
        console.log("ADMIN NOTES:", data);
        setNotifications(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/leads")
      .then(res => res.json())
      .then(leads => {
        const ids = leads.map(l => l.enquiryId);
        setAddedLeads(ids);
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
          {notifications.map((note) => (
            <div
              key={note._id}
              className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-600"
            >
              <h4 className="font-bold mb-2">{note.title}</h4>

              {note.enquiryId ? (
                <>
                  <p><strong>Name:</strong> {note.enquiryId.name}</p>
                  <p><strong>Email:</strong> {note.enquiryId.email}</p>
                  <p><strong>Phone:</strong> {note.enquiryId.phone}</p>
                  <p><strong>Country:</strong> {note.enquiryId.countryPreference}</p>

                  {note.enquiryId.message && (
                    <p><strong>Message:</strong> {note.enquiryId.message}</p>
                  )}

                  <button
                    onClick={() => addLead(note.enquiryId._id)}
                    disabled={addedLeads.includes(note.enquiryId._id)}
                    className={`mt-3 px-4 py-1.5 rounded
                        ${addedLeads.includes(note.enquiryId._id)
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-orange-500 text-white hover:bg-orange-600"}`}
                  >
                    {addedLeads.includes(note.enquiryId._id)
                      ? "Already Added"
                      : "Add Lead"}
                  </button>


                </>
              ) : (
                <p className="text-red-500">Enquiry details not available</p>
              )}

              <small className="text-gray-400 block mt-2">
                {new Date(note.createdAt).toLocaleString()}
              </small>
            </div>
          ))}


        </div>
      )}
    </div>
  );
}
