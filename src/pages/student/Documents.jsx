import { useState, useEffect } from "react";

// Predefined document slots
const beforeDocs = [
  "10th Certificate",
  "12th Certificate",
  "Passport",
  "Degree Certificate (if any)",
  "LOR (if any)",
  "MOI (if any)",
  "IELTS / English Test (if any)",
  "Work Experience (if any)",
  "Resume / CV (if any)",
];

const afterDocs = [
  "Offer Letter",
  "Covering Letter",
  "Payment Proof",

  "Sponsor 1 – Aadhaar Card",
  "Sponsor 1 – Bank Statement (3 months)",
  "Sponsor 1 – Sponsorship Affidavit",

  "Sponsor 2 – Aadhaar Card",
  "Sponsor 2 – Bank Statement (3 months)",
  "Sponsor 2 – Sponsorship Affidavit",

  "Relationship Certificate",
  "Self Affidavit",
];

// Upload function
const uploadFile = async (file, name, type) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);
  formData.append("type", type);

  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:5000/api/documents/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.document; // Return the saved document object
};

function Documents() {
  // 🔴 These will eventually come from backend
  const [hasOfferLetter, setHasOfferLetter] = useState(false);
  const [beforeUploadedDocs, setBeforeUploadedDocs] = useState([]);
  const [afterUploadedDocs, setAfterUploadedDocs] = useState([]);

  // Fetch previously uploaded documents on mount
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/documents/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        // Split by type
        setBeforeUploadedDocs(data.filter((d) => d.type === "before"));
        setAfterUploadedDocs(data.filter((d) => d.type === "after"));
        // Example logic to check if offer letter is uploaded
        if (data.some((d) => d.name === "Offer Letter")) setHasOfferLetter(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDocs();
  }, []);

  // Document card component
  const DocCard = ({ name, type, locked }) => {
    const [status, setStatus] = useState("Pending"); // Pending / Under Review / Verified / Rejected
    const [uploading, setUploading] = useState(false);
    const [comment, setComment] = useState(""); // For rejected documents

    // Check if already uploaded
    useEffect(() => {
      const uploaded =
        type === "before"
          ? beforeUploadedDocs.find((d) => d.name === name)
          : afterUploadedDocs.find((d) => d.name === name);
      if (uploaded) {
        const mapStatus = {
          pending: "Under Review",
          verified: "Verified",
          rejected: "Rejected",
        };

        setStatus(mapStatus[uploaded.status] || "Under Review");

        setComment(uploaded.rejectionReason || "");
      }
    }, [beforeUploadedDocs, afterUploadedDocs, name, type]);

    const handleUpload = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        setUploading(true);
        const uploadedDoc = await uploadFile(file, name, type);
        setStatus(uploadedDoc.status || "Under Review");
        setComment(uploadedDoc.rejectionReason || "");
        if (type === "before") {
          setBeforeUploadedDocs((prev) => [...prev.filter(d => d.name !== name), uploadedDoc]);
        } else {
          setAfterUploadedDocs((prev) => [...prev.filter(d => d.name !== name), uploadedDoc]);
        }
      } catch (err) {
        console.error(err);
        alert("Upload failed");
      } finally {
        setUploading(false);
      }
    };

    const getStatusBadge = () => {
      switch (status) {
        case "Pending":
          return <span className="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-600">Pending</span>;
        case "Under Review":
          return <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-600">Under Review</span>;
        case "Verified":
          return <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600">Verified</span>;
        case "Rejected":
          return <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-600">Rejected</span>;
        default:
          return null;
      }
    };

    return (
      <div className={`border rounded-lg p-4 bg-white shadow-sm space-y-2 ${locked ? "opacity-50 pointer-events-none" : ""}`}>
        <div className="flex justify-between items-center">
          <p className="font-medium text-blue-900">{name}</p>
          {getStatusBadge()}
        </div>

        {status === "Rejected" && comment && (
          <p className="text-xs text-red-600">Reason: {comment}</p>
        )}

        <div className="flex gap-3 items-center">
          <input
            type="file"
            className="border rounded-md px-3 py-2 text-sm w-full"
            disabled={locked || uploading}
            onChange={handleUpload}
          />
          {uploading && <span className="text-xs text-gray-500">Uploading...</span>}
        </div>
      </div>
    );
  };

  // Save before application documents
  const handleSaveBefore = () => {
    alert("Before application documents saved!");
    // Backend: mark section as saved if required
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-blue-900">Documents</h1>
        <p className="text-sm text-gray-500 mt-1">
          Upload documents as per your application stage
        </p>
      </div>

      {/* BEFORE APPLICATION */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-blue-800">Before Application</h2>
        {beforeDocs.map((doc, i) => (
          <DocCard key={i} name={doc} type="before" />
        ))}
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-2"
          onClick={handleSaveBefore}
        >
          Save Before Application Documents
        </button>
      </section>

      {/* AFTER OFFER LETTER */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-blue-800">After Receiving Offer Letter</h2>
          {!hasOfferLetter && (
            <span className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full">Locked</span>
          )}
        </div>

        {!hasOfferLetter && (
          <div className="text-sm text-orange-600 bg-orange-50 border border-orange-200 p-3 rounded-lg">
            Upload of these documents will be enabled after you receive an official offer letter.
          </div>
        )}

        {afterDocs.map((doc, i) => (
          <DocCard key={i} name={doc} type="after" locked={!hasOfferLetter} />
        ))}
      </section>
    </div>
  );
}

export default Documents;
