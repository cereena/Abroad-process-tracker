import { useState, useEffect, useMemo } from "react";
import {
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  UploadCloud,
  Eye,
} from "lucide-react";
import { toast } from "react-toastify";


/* AFTER DOCS */
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

/* UPLOAD API */
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

  const text = await res.text();

  if (!res.ok) {
    console.error("Upload error:", text);
    throw new Error(text);
  }

  return JSON.parse(text).document;
};

function Documents() {
  /* STATES */
  const [profile, setProfile] = useState(null);
  const [hasOfferLetter, setHasOfferLetter] = useState(false);

  const [beforeUploadedDocs, setBeforeUploadedDocs] = useState([]);
  const [afterUploadedDocs, setAfterUploadedDocs] = useState([]);

  const [selectedFiles, setSelectedFiles] = useState({});
  const [saving, setSaving] = useState(false);

  /* FETCH PROFILE */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:5000/api/student/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Profile fetch error", err);
      }
    };

    fetchProfile();
  }, []);

  /* BEFORE DOCS */
  const beforeDocs = useMemo(() => {
    if (!profile) return [];

    const docs = [
      { name: "Passport", type: "before" },
      { name: "Secondary School Certificate", type: "before" },
      { name: "Higher Secondary Certificate", type: "before" },
    ];

    const qualification =
      profile.academicInfo?.highestQualification?.toLowerCase() || "";

    if (
      qualification.includes("degree") ||
      qualification.includes("bachelor") ||
      qualification.includes("pg") ||
      qualification.includes("master")
    ) {
      docs.push(
        { name: "Main Degree Certificate", type: "before" },
        { name: "Provisional Certificate", type: "before" },
        { name: "Consolidated Marklist", type: "before" }
      );
    }

    docs.push(
      { name: "LOR (Letter of Recommendation)", type: "before" },
      { name: "Medium Of Instruction (MOI)", type: "before" },
      { name: "English Proficiency Test : IELTS / PTE / TOFEL", type: "before" },
      { name: "Updated Resume/CV", type: "after" },
      { name: "Statement of Purpose (SOP)", type: "after" }
    );

    if (profile.workExperience?.hasExperience) {
      docs.push({
        name: "Work Experience Certificate",
        type: "after",
      });
    }

    return docs;
  }, [profile]);


  /* FETCH DOCUMENTS */
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:5000/api/documents/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        setBeforeUploadedDocs(data.filter((d) => d.type === "before"));
        setAfterUploadedDocs(data.filter((d) => d.type === "after"));

        if (data.some((d) => d.name === "Offer Letter")) {
          setHasOfferLetter(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchDocs();
  }, []);

  /* DOC MAP (OPTIMIZED LOOKUP) */
  const docsMap = useMemo(() => {
    const map = {};

    [...beforeUploadedDocs, ...afterUploadedDocs].forEach((d) => {
      map[d.name] = d;
    });

    return map;
  }, [beforeUploadedDocs, afterUploadedDocs]);

  /* DOC CARD */
  const DocCard = ({ name, type, locked }) => {
    const [status, setStatus] = useState("Pending");
    const [comment, setComment] = useState("");
    const [uploaded, setUploaded] = useState(false);

    const selectedFile = selectedFiles[name];

    /* STATUS CHECK */
    useEffect(() => {
      const doc = docsMap[name];

      if (!doc) {
        setStatus("Pending");
        return;
      }

      const map = {
        pending: "Under Review",
        verified: "Verified",
        rejected: "Rejected",
      };

      setStatus(map[doc.status] || "Under Review");
      setComment(doc.rejectionReason || "");
      setUploaded(true);
    }, [docsMap, name]);


    const validateFile = (file) => {
      const max = 5 * 1024 * 1024;
      const allowed = ["image/jpeg", "image/png", "application/pdf"];

      if (!allowed.includes(file.type)) {
        alert("Only PDF, JPG, PNG allowed");
        return false;
      }

      if (file.size > max) {
        alert("Max size: 5MB");
        return false;
      }

      return true;
    };

    const handleSelect = (e) => {
      const file = e.target.files[0];

      if (!file || !validateFile(file)) return;

      setSelectedFiles((prev) => ({ ...prev, [name]: file }));
    };

    /* STATUS UI */
    const getStatusUI = () => {
      const config = {
        pending: {
          color: "text-slate-500 bg-slate-100",
          icon: <Clock size={12} />,
        },
        "Under Review": {
          color: "text-amber-600 bg-amber-50",
          icon: <Clock size={12} />,
        },
        Verified: {
          color: "text-emerald-600 bg-emerald-50",
          icon: <CheckCircle size={12} />,
        },
        Rejected: {
          color: "text-rose-600 bg-rose-50",
          icon: <AlertCircle size={12} />,
        },
      };

      const { color, icon } = config[status] || config.pending;

      return (
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${color}`}
        >
          {icon}
          {status}
        </div>
      );
    };

    return (
      <div
        className={`group transition-all duration-200 bg-white border rounded-xl overflow-hidden hover:shadow-md ${locked
          ? "opacity-40 grayscale pointer-events-none"
          : "border-slate-200"
          }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-50 bg-blue-400/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <FileText size={18} />
            </div>

            <h3 className="text-medium font-semibold text-slate-700 tracking-tight">
              {name}
            </h3>
          </div>

          {getStatusUI()}
        </div>

        <div className="p-5 space-y-4">
          {/* REJECTED MESSAGE */}
          {status === "Rejected" && (
            <div className="flex gap-2 p-3 text-xs rounded-lg bg-rose-50 border border-rose-100 text-rose-700">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />

              <p>
                <span className="font-bold">Feedback:</span> {comment}
              </p>
            </div>
          )}

          {/* FILE AREA */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              {uploaded && status === "Verified" ? (
                <a
                  href={docsMap[name]?.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline"
                >
                  <Eye size={14} />
                  View Verified Document
                </a>
              ) : (
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {uploaded ? "Uploaded" : selectedFile ? "Ready to upload" : "Awaiting selection"}</p>)}

              {selectedFile && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50/50 border border-blue-100 max-w-xs">
                  <UploadCloud
                    size={14}
                    className="text-blue-500 shrink-0"
                  />

                  <p className="text-[11px] font-medium text-blue-700 truncate">
                    {selectedFile.name}
                  </p>
                </div>
              )}
            </div>

            {/* BUTTON */}
            {status !== "Verified" && (
              <label className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold transition-all bg-white border-2 border-slate-200 rounded-lg cursor-pointer hover:border-blue-600 hover:text-blue-600 text-slate-600 active:scale-95">
                <UploadCloud size={14} />
                <span>{uploaded || selectedFile ? "Change" : "Browse"}</span>

                <input
                  type="file"
                  hidden
                  disabled={locked || saving}
                  onChange={handleSelect}
                />
              </label>
            )}
          </div>

          {/* FOOTER */}
          {status !== "Verified" && (
            <div className="pt-3 border-t border-slate-50">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                Required: PDF, JPG, PNG
                <span className="mx-2 text-slate-200">|</span>
                Max: 5MB
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  /* UPLOAD */
  const handleUploadAll = async () => {
    try {
      setSaving(true);

      const allDocs = [...beforeDocs];

      for (const [name, file] of Object.entries(selectedFiles)) {
        if (!file) continue;

        const docObj = allDocs.find((d) => d.name === name);

        if (!docObj) {
          console.error("Doc not found:", name);
          continue;
        }

        const newDoc = await uploadFile(
          file,
          docObj.name,
          docObj.type
        );

        if (docObj.type === "before") {
          setBeforeUploadedDocs((prev) => [...prev, newDoc]);
        } else {
          setAfterUploadedDocs((prev) => [...prev, newDoc]);
        }
      }

      toast.success("Documents uploaded. Under review ⏳");
      setSelectedFiles({});

    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setSaving(false);
    }
  };


  /* LOADING */
  if (!profile || beforeDocs.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-5 mx-3 mt-2">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-blue-800">Documents</h1>

        <p className="text-sm text-gray-500">
          Upload your required documents
        </p>
      </div>

      {/* BEFORE */}
      <section className="space-y-3">
        <h2 className="font-semibold text-lg">
          Required Documents List
        </h2>

        {beforeDocs.map((doc) => (
          <DocCard
            key={doc.name}
            name={doc.name}
            type={doc.type}
          />
        ))}

        <button
          disabled={
            saving || Object.keys(selectedFiles).length === 0
          }
          onClick={handleUploadAll}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          {saving ? "Uploading..." : "Upload"}
        </button>
      </section>

      {/* AFTER */}
      <section className="space-y-4">
        <h2 className="font-semibold text-lg">
          After Offer Letter
        </h2>

        {!hasOfferLetter && (
          <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded">
            Locked until offer letter uploaded
          </div>
        )}

        {afterDocs.map((doc) => (
          <DocCard
            key={doc}
            name={doc}
            type="after"
            locked={!hasOfferLetter}
          />
        ))}
      </section>
    </div>
  );
}

export default Documents;
