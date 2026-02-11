import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function DocDocuments() {
  const [documents, setDocuments] = useState([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewType, setPreviewType] = useState(""); // image | pdf
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const [params] = useSearchParams();
  const studentId = params.get("student");

  /* ================= FETCH DOCUMENTS ================= */

  const fetchDocs = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("docToken");

      const url = studentId
        ? `http://localhost:5000/api/documents/student/${studentId}`
        : "http://localhost:5000/api/documents/assigned";

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setDocuments(data);
      } else {
        setDocuments([]);
      }
    } catch (err) {
      console.error("Fetch docs error:", err);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, [studentId]);

  /* ================= UPDATE STATUS ================= */

  const updateStatus = async (id, status, reason = "") => {
    try {
      const token = localStorage.getItem("docToken");

      await fetch(`http://localhost:5000/api/documents/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, reason }),
      });

      fetchDocs();
    } catch (err) {
      console.error("Update status error:", err);
      alert("Failed to update status");
    }
  };

  /* ================= PREVIEW ================= */

  const handlePreview = (url) => {
    if (!url) {
      alert("File not uploaded properly. No URL found.");
      return;
    }

    const cleanUrl = url.trim();

    setPreviewUrl(cleanUrl);

    // Detect file type
    if (
      cleanUrl.toLowerCase().includes(".pdf") ||
      cleanUrl.includes("/raw/")
    ) {
      setPreviewType("pdf");
    } else {
      setPreviewType("image");
    }
  };
  /* ================= FILTER ================= */

  const filteredDocs = documents.filter((doc) => {
    if (filter === "all") return true;
    return doc.status === filter;
  });

  /* ================= UI ================= */

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">

      {/* ================= LEFT ================= */}
      <div className="lg:col-span-2 space-y-4">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Student Documents</h2>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-1 rounded"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">
            Loading documents...
          </p>
        )}

        {/* Cards */}
        {!loading &&
          filteredDocs.map((doc) => (
            <div
              key={doc._id}
              className="bg-white rounded-xl shadow p-4 border"
            >

              {/* Student */}
              <div className="text-sm text-gray-600 mb-2">
                <b>{doc.student?.name}</b> •{" "}
                {doc.student?.studentEnquiryCode}
              </div>

              {/* Info */}
              <div className="flex justify-between items-center">

                <div>
                  <p className="font-semibold">
                    {doc.docType || doc.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    Status:{" "}
                    <span className="capitalize">
                      {doc.status}
                    </span>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 flex-wrap">

                  {/* Preview */}
                  <button
                    onClick={() => handlePreview(doc.fileUrl)}
                    className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Preview
                  </button>

                  {/* Approve */}
                  {doc.status === "pending" && (
                    <button
                      onClick={() =>
                        updateStatus(doc._id, "verified")
                      }
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                  )}

                  {/* Reject */}
                  {doc.status === "pending" && (
                    <button
                      onClick={() => {
                        const r = prompt("Rejection reason");
                        if (r) {
                          updateStatus(doc._id, "rejected", r);
                        }
                      }}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>

              {/* Reject reason */}
              {doc.status === "rejected" && (
                <p className="text-sm text-red-600 mt-2">
                  Reason: {doc.rejectReason}
                </p>
              )}
            </div>
          ))}

        {/* Empty */}
        {!loading && filteredDocs.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No documents found
          </p>
        )}
      </div>

      {/* ================= RIGHT ================= */}
      <div className="bg-white rounded-xl shadow border p-4 sticky top-4">

        <h3 className="font-semibold mb-3">Preview</h3>

        {!previewUrl && (
          <p className="text-gray-500 text-sm">
            Select a document to preview
          </p>
        )}

        {/* IMAGE */}
        {previewUrl && previewType === "image" && (
          <div className="w-full h-[400px] border flex items-center justify-center overflow-auto">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-full max-h-full object-contain"
              onError={() =>
                alert("Failed to load image")
              }
            />
          </div>
        )}

        {/* PDF */}
        {previewUrl && previewType === "pdf" && (
          <iframe
            src={previewUrl.replace("/upload/", "/upload/fl_inline/")}
            title="PDF Preview"
            className="w-full h-[400px] border"
          />

        )}
      </div>
    </div>
  );
}
