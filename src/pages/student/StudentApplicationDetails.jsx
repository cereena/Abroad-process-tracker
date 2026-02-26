import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const StudentApplicationDetails = () => {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchApplication = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/application/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setApp(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load application");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  const downloadOffer = () => {
    window.open(app.offerLetter, "_blank");
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!app) return <p className="p-6">Application not found</p>;

  return (
    <div className="p-6 space-y-6 bg-blue-50 min-h-screen">

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold text-blue-700">
          Application Details
        </h2>

        <div className="mt-4 space-y-2 text-sm">
          <p><b>University:</b> {app.university?.universityName}</p>
          <p><b>Country:</b> {app.university?.country}</p>
          <p><b>Course:</b> {app.course}</p>
          <p><b>Status:</b> {app.status}</p>
        </div>
      </div>

      {/* OFFER LETTER SECTION */}
      {app.status === "Offer Received" && (
        <div className="bg-white p-6 rounded-xl shadow space-y-3">
          <h3 className="font-semibold text-green-700">
            Offer Letter
          </h3>

          {app.paymentStatus !== "Paid" ? (
            <div className="text-red-500 text-sm">
              Complete payment to unlock offer letter.
            </div>
          ) : (
            <>
              <button
                onClick={downloadOffer}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                View Offer Letter
              </button>

              <button
                onClick={downloadOffer}
                className="px-4 py-2 bg-green-600 text-white rounded ml-2"
              >
                Download Offer Letter
              </button>
            </>
          )}
        </div>
      )}

    </div>
  );
};

export default StudentApplicationDetails;