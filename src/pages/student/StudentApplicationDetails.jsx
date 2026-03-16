import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, Download } from "lucide-react";

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

    const viewer = `https://docs.google.com/gview?embedded=true&url=${app.offerLetter.url}`;
    window.open(viewer, "_blank");
  };

  const downloadOffer = async () => {
    try {
      if (!app?.offerLetter?.url) {
        toast.error("Offer letter not available");
        return;
      }

      const response = await fetch(app.offerLetter.url);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "Offer-Letter.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      toast.error("Download failed");
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center text-gray-500">
        Loading application...
      </div>
    );

  if (!app)
    return (
      <div className="p-10 text-center text-red-500">
        Application not found
      </div>
    );

  return (
    <div className="p-8 bg-blue-50 min-h-screen">

      {/* PAGE HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-700">
          Student Application
        </h1>
        <p className="text-sm text-gray-500">
          View application details and documents
        </p>
      </div>

      {/* APPLICATION CARD */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Application Details
        </h2>

        <div className="grid md:grid-cols-2 gap-4 text-sm">

          <div>
            <p className="text-gray-500">University</p>
            <p className="font-semibold">
              {app.university?.universityName}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Country</p>
            <p className="font-semibold">
              {app.university?.country}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Course</p>
            <p className="font-semibold">
              {app.course}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>

            <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
              {app.status}
            </span>
          </div>

        </div>
      </div>

      {/* OFFER LETTER CARD */}
      {app.status === "Offer Received" && (
        <div className="mt-6 bg-white rounded-xl shadow-md p-6 border border-gray-100">

          <h3 className="text-lg font-semibold text-green-700 mb-3">
            Offer Letter
          </h3>

          {app.paymentStatus !== "Registration Paid" ? (

            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 rounded-lg">
              Complete registration payment to unlock the offer letter.
            </div>

          ) : (

            <div className="flex flex-wrap gap-3">

              {/* VIEW */}
              <button
                onClick={viewOffer}
                disabled={!app.offerLetter?.url}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
              >
                <Eye size={16} />
                View Offer Letter
              </button>

              {/* DOWNLOAD */}
              <button
                onClick={downloadOffer}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
              >
                <Download size={16} />
                Download Offer Letter
              </button>

            </div>

          )}

        </div>
      )}

    </div>
  );
};

export default StudentApplicationDetails;