// src/pages/doc/DocDocuments.jsx

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
};

useEffect(() => {
  const fetchDocs = async () => {
    const token = localStorage.getItem("docToken");

    const res = await fetch(
      "http://localhost:5000/api/documents/my",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    setDocuments(data);
  };

  fetchDocs();
}, []);


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
};
