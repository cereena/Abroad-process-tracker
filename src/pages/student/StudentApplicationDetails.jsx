import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  Eye, 
  Download, 
  FileText, 
  LockOpen, 
  Lock, 
  ShieldAlert, 
  Check, 
  ArrowLeft, 
  Globe, 
  GraduationCap, 
  BookOpen, 
  Clock, 
  CreditCard, 
  ShieldCheck
} from "lucide-react";

const StudentApplicationDetails = () => {
  const { appliedId } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchApplication = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/application/${appliedId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-semibold text-sm">Fetching Details...</p>
        </div>
      </div>
    );

  if (!app)
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center max-w-sm">
          <ShieldAlert size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-black text-slate-900">Application not found</h2>
          <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 font-semibold flex items-center gap-2 mx-auto">
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-blue-50 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* TOP NAVIGATION / HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <button 
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 font-semibold text-xs uppercase tracking-widest mb-4 transition-colors"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Applications
            </button>
            <div className="border-l-4 border-orange-500 pl-4">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Application <span className="text-blue-600">Details</span>
              </h1>
              <p className="text-slate-500 text-sm font-medium">Review your status and academic documents.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm self-start">
             <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
               <ShieldCheck size={20} />
             </div>
             <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter leading-none">Status</p>
               <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{app.status?.replace("_", " ")}</p>
             </div>
          </div>
        </div>

        {/* MAIN DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN: INFO CARD */}
          <div className="lg:col-span-2 space-y-6 ">
            <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-8 mb-22">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-12 w-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 leading-tight">
                      {app.university?.universityName || "N/A"}
                    </h3>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Globe size={14} />
                      <span className="text-[10px] font-black uppercase tracking-[0.15em]">{app.university?.country || "N/A"}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                  <DetailItem label="Course" value={app.course} icon={<BookOpen size={16} />} />
                  <DetailItem label="Degree Type" value={app.university?.degree} icon={<GraduationCap size={16} />} />
                  <DetailItem label="Stream" value={app.university?.stream} icon={<LayoutGrid size={16} />} />
                  <DetailItem label="Intake Cycle" value={app.university?.intakes?.join(", ")} icon={<Clock size={16} />} />
                </div>
              </div>

              {/* STATUS FOOTER BAR */}
              <div className="bg-slate-50/50 border-t border-slate-100 p-6 grid grid-cols-2 gap-4">
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Payment Status</p>
                   <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-[11px] font-black uppercase border border-purple-100">
                      <CreditCard size={12} /> {app.paymentStatus || "Pending"}
                   </span>
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Verification</p>
                   <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[11px] font-black uppercase border ${
                     app.documentsVerified ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-yellow-50 text-yellow-700 border-yellow-100"
                   }`}>
                      {app.documentsVerified ? <Check size={12} /> : <Clock size={12} />} 
                      {app.documentsVerified ? "Verified" : "Pending"}
                   </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: OFFER LETTER */}
          <div className="lg:col-span-1">
            {(app.status === "Offer Received" || app.status === "Service_Paid") && (
              <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm h-full flex flex-col">
                <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText size={18} className="text-blue-600" />
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Offer Letter</h3>
                  </div>
                  {app.serviceFeePaid && (
                    <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 uppercase tracking-widest">
                      Unlocked
                    </span>
                  )}
                </div>

                <div className="p-8 flex-1 flex flex-col items-center justify-center">
                  {!app.serviceFeePaid ? (
                    <div className="text-center">
                      <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-4">
                        <Lock size={28} />
                      </div>
                      <h4 className="text-slate-900 font-black text-sm mb-2 uppercase tracking-tight">Access Locked</h4>
                      <p className="text-slate-400 text-xs font-semibold leading-relaxed max-w-[180px]">
                        Please complete your <span className="text-blue-600 uppercase">service fee</span> to download this document.
                      </p>
                    </div>
                  ) : (
                    <div className="w-full space-y-6">
                      <div className="p-8 bg-blue-50/50 rounded-2xl border-2 border-dashed border-blue-100 flex flex-col items-center">
                         <div className="h-20 w-14 bg-white rounded-lg shadow-sm border border-blue-100 relative flex items-center justify-center mb-2">
                            <span className="text-[10px] font-black text-blue-500">PDF</span>
                            <div className="absolute -top-2 -right-2 h-6 w-6 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-sm border-2 border-white">
                              <Check size={12} strokeWidth={4} />
                            </div>
                         </div>
                         <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Document Ready</p>
                      </div>

                      <div className="space-y-3">
                        <button
                          onClick={viewOffer}
                          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-100"
                        >
                          <Eye size={18} /> View Document
                        </button>
                        <button
                          onClick={downloadOffer}
                          className="w-full flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
                        >
                          <Download size={16} /> Save Offline
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* REUSABLE MINI COMPONENT */
const DetailItem = ({ label, value, icon }) => (
  <div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{label}</p>
    <div className="flex items-center gap-2">
       <span className="text-blue-300">{icon}</span>
       <span className="text-sm font-black text-slate-700 tracking-tight">{value || "N/A"}</span>
    </div>
  </div>
);

const LayoutGrid = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);

export default StudentApplicationDetails;