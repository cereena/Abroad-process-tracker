import { useSearchParams } from "react-router-dom";


const [params] = useSearchParams();
const studentId = params.get("student");
// Fetch documents
const fetchDocs = async () => {

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
  setDocuments(data);
};

// Run once when page loads
useEffect(() => {
  fetchDocs();
}, []);


// Approve document
const approveDoc = async (id) => {
  const token = localStorage.getItem("docToken");

  await fetch(`http://localhost:5000/api/documents/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      status: "verified",
    }),
  });

  fetchDocs(); // refresh list
};


// Reject document
const rejectDoc = async (id, reason) => {
  const token = localStorage.getItem("docToken");

  await fetch(`http://localhost:5000/api/documents/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      status: "rejected",
      reason,
    }),
  });

  fetchDocs(); // refresh list
};

return (
  <div>
    <h2>Uploaded Documents</h2>

    {documents.map((doc) => (
      <div key={doc._id} className="doc-card">

        <p><b>Student:</b> {doc.student?.name}</p>
        <p><b>Type:</b> {doc.docType || doc.name}</p>

        <a href={doc.fileUrl} target="_blank" rel="noreferrer">
          View Document
        </a>

        <p>Status: {doc.status}</p>


        {/* Show buttons only if pending */}
        {doc.status === "pending" && (
          <div style={{ marginTop: "10px" }}>

            <button
              onClick={() => approveDoc(doc._id)}
            >
              Approve
            </button>

            <button
              onClick={() => {
                const reason = prompt("Enter rejection reason");
                if (reason) rejectDoc(doc._id, reason);
              }}
              style={{ marginLeft: "10px" }}
            >
              Reject
            </button>

          </div>
        )}


        {/* Show reason if rejected */}
        {doc.status === "rejected" && (
          <p style={{ color: "red" }}>
            Rejected: {doc.rejectReason}
          </p>
        )}

      </div>
    ))}
  </div>
);
