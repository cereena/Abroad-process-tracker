import { useEffect, useState } from "react";
import axios from "axios";
import { UploadCloud } from "lucide-react";
import toast from "react-hot-toast";

export default function DocApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const downloadOfferLetter = async (url, fileName = "Offer_Letter.pdf") => {
    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/pdf",
        },
      });

      const blob = await response.blob();

      // Force PDF type even if server sends wrong one
      const pdfBlob = new Blob([blob], { type: "application/pdf" });

      const blobUrl = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");

      
      link.href = blobUrl;
      link.download = fileName.endsWith(".pdf")
        ? fileName
        : `${fileName}.pdf`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error(error);
      toast.error("Download failed");
    }
  };


  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("docToken");

      if (!token) {
        setError("Login required");
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/api/application/assigned",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("FULL RESPONSE:", res.data);

      setApplications(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleApply = async (id) => {
    try {
      const token = localStorage.getItem("docToken");

      await axios.post(
        "http://localhost:5000/api/application/apply",
        { suggestionId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Applied successfully");
      fetchApplications();

    } catch {
      toast.error("Apply failed");
    }
  };
  const updateProgress = async (appId, universityId, status) => {
    try {
      const token = localStorage.getItem("docToken");

      await axios.put(
        "http://localhost:5000/api/progress/offer",
        { appId, universityId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Status updated");
      fetchApplications()
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  const STATUS = [
    "Pending",
    "Applied",
    "Offer Received",
    "Acceptance Letter",
    "Fee Paid",
    "Visa Submitted",
    "Visa Approved",
    "Visa Rejected",
    "University Rejected"
  ];

  /* ================= STATES ================= */

  if (loading) {
    return <p className="p-6">Loading applications...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  /* ================= TABLE ================= */

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">University Applications</h2>

        <button className="border border-blue-600 text-blue-600 px-3 py-1 rounded">
          Filter
        </button>
      </div>

      {/* EMPTY */}
      {applications.length === 0 && (
        <p className="text-gray-500 bg-white p-4 rounded shadow">
          No assigned applications
        </p>
      )}


      {/* TABLE */}
      {applications.length > 0 && (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full border-collapse">

            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="p-3 border">Student</th>
                <th className="p-3 border">University</th>
                <th className="p-3 border">Course</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Visa</th>
                <th className="p-3 border">Documents</th>
              </tr>
            </thead>

            <tbody>
              {applications.map(app =>

                app.appliedUniversities?.map(applied => (

                  <tr key={applied._id} className="hover:bg-gray-50 text-sm">

                    <td className="p-3 border font-semibold">
                      <div>
                        {app.studentId?.personalInfo?.firstName}{" "}
                        {app.studentId?.personalInfo?.lastName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {app.studentId?.studentEnquiryCode || ""}
                      </div>
                    </td>

                    <td className="p-3 border">
                      {applied.university?.universityName || "N/A"}
                    </td>

                    <td className="p-3 border">
                      {applied.course || "-"}
                    </td>

                    <td className="p-3 border">
                      <select
                        value={applied.status}
                        onChange={(e) =>
                          updateProgress(app._id, applied._id, e.target.value)
                        }
                      >
                        {STATUS.map(s => (

                          <option key={s} value={s}>{s}</option>

                        ))}
                      </select>
                    </td>

                    <td className="p-3 border">
                      <StatusBadge value={app.visaStatus} />
                    </td>

                    <td className="p-3 border">

                      {applied.status?.trim() === "Applied" && !applied.offerLetter?.url && (
                        <UploadOfferLetter
                          appId={app._id}
                          universityId={applied._id}
                          refresh={fetchApplications}
                        />
                      )}

                      {applied.offerLetter?.url && (
                        <a
                          href={`https://docs.google.com/gview?embedded=true&url=${applied.offerLetter?.url}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 font-semibold hover:underline"
                        >
                          View Offer Letter
                        </a>
                      )}

                      {applied.offerLetter?.url && (
                        <button
                          onClick={() =>
                            downloadOfferLetter(
                              applied.offerLetter.url,
                              `${app.studentId?.personalInfo?.firstName}_Offer_Letter.pdf`
                            )}
                          className="text-blue-600 ml-2 text-xs hover:underline"
                        >
                          Download Offer Letter
                        </button>
                      )}


                      {applied.status === "Offer Received" && !applied.offerLetter?.url && (
                        <span className="text-orange-500 text-xs">
                          Offer received (No file)
                        </span>
                      )}

                      {applied.status === "Fee Paid" && (
                        <UploadAcceptanceLetter
                          appId={app._id}
                          universityId={applied._id}
                        />
                      )}

                      {applied.acceptanceLetter?.url && (
                        <a
                          href={applied.acceptanceLetter.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-green-600 font-semibold hover:underline"
                        >
                          View Acceptance Letter
                        </a>
                      )}

                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      )}

    </div>
  );
}

/* ================= STATUS BADGE ================= */

function StatusBadge({ value }) {
  if (!value) return "--";

  const base =
    "px-2 py-1 rounded text-xs font-semibold inline-block";

  if (value === "Pending")
    return (
      <span className={`${base} bg-yellow-100 text-yellow-700`}>
        {value}
      </span>
    );

  if (value === "Submitted")
    return (
      <span className={`${base} bg-blue-100 text-blue-700`}>
        {value}
      </span>
    );

  if (value === "Success")
    return (
      <span className={`${base} bg-green-100 text-green-700`}>
        {value}
      </span>
    );

  return (
    <span className={`${base} bg-gray-100 text-gray-600`}>
      {value}
    </span>
  );
}

function UploadOfferLetter({ appId, universityId, refresh }) {
  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const token = localStorage.getItem("docToken");

    const formData = new FormData();
    formData.append("document", file);
    formData.append("appId", appId);
    formData.append("universityId", universityId);

    try {
      const id = toast.loading("Uploading...");

      await axios.post(
        "http://localhost:5000/api/progress/upload-offer",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Offer letter uploaded", { id });
      refresh()
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  return (
    <label className="group inline-flex items-center gap-1.5 cursor-pointer bg-white border border-blue-600 hover:border-blue-500 hover:bg-blue-50 text-blue-700 hover:text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all active:scale-95">
      <UploadCloud size={14} />
      <span>Upload Offer</span>
      <input type="file" onChange={uploadFile} className="hidden" />
    </label>
  );
}

function UploadAcceptanceLetter({ appId, universityId }) {
  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const token = localStorage.getItem("docToken");

    const formData = new FormData();
    formData.append("document", file);
    formData.append("appId", appId);
    formData.append("universityId", universityId);

    try {
      await axios.post(
        "http://localhost:5000/api/progress/upload-acceptance",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Acceptance Letter Uploaded");
    } catch {
      toast.error("Upload failed");
    }
  };

  return (
    <label className="group inline-flex items-center gap-1.5 cursor-pointer bg-white border border-blue-600 hover:border-blue-500 hover:bg-blue-50 text-blue-700 hover:text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all active:scale-95">
      <UploadCloud size={14} className="text-blue-600 group-hover:text-blue-600 transition-colors" />
      <span>Upload Acceptance</span>
      <input type="file" onChange={uploadFile} className="hidden" />
    </label>
  );
}
