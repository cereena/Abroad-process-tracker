import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function UploadDocument() {
  const [selectedFile, setSelectedFile] = useState(null);

  const token = localStorage.getItem("token"); // student token

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("name", "10th Certificate");
      formData.append("type", "before");

      await axios.post(
        "http://localhost:5000/api/documents/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Document uploaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        Upload Document
      </button>
    </div>
  );
}
