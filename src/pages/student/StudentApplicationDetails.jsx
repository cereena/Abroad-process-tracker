import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const StudentApplicationDetails = () => {
  const { appliedId } = useParams();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchApplication = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/application/${appliedId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log("API RESPONSE:", data);

      setApp(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load application");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (appliedId) fetchApplication();
  }, [appliedId]);

  const viewOffer = () => {
    if (!app?.offerLetter?.url) {
      toast.error("Offer letter not available");
      return;
    }

    window.open(app.offerLetter.url, "_blank");
  };

  const downloadOffer = async () => {
    try {
      const response = await fetch(app.offerLetter.url);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Offer-Letter.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error("Download failed");
    }
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

          {app.paymentStatus !== "Registration Paid" ? (
            <div className="text-red-500 text-sm">
              Complete payment to unlock offer letter.
            </div>
          ) : (
            <>
              <button
                onClick={viewOffer}
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