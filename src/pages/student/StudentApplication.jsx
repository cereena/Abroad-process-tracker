import React, { useEffect, useState } from "react";
import {
  Globe,
  BookOpen,
  GraduationCap,
  Clock,
  CheckCircle,
  Star,
  Wallet,
  FileText,
  CreditCard,
  ArrowUpRight,
  ChevronUp,
  ChevronDown,
  LayoutGrid
} from "lucide-react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentApplications = () => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState([]);

  /* ================= LOGIC (PRESERVED) ================= */
  const markInterested = async (prefId, courseChosen) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/application/interested/${prefId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ course: courseChosen }),
      });
      let data = {};
      try { data = await res.json(); } catch (err) { data = {}; }
      if (!res.ok) throw new Error(data.message || "Failed to mark interest");

      toast.success('Interest saved!');
      setSuggestions(prev => prev.map(s => s._id === prefId ? { ...s, interested: true } : s));
      setPreferences(prev => {
        const exists = prev.find(p => p._id === prefId);
        if (exists) return prev;
        return [...prev, { _id: prefId, course: courseChosen, status: "interested" }];
      });
    } catch (err) { alert(err.message || "Failed to mark interest"); }
  };

  const fetchSuggestions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch("http://localhost:5000/api/application/suggestions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      setSuggestions(Array.isArray(data) ? data : []);
    } catch (err) { setSuggestions([]); }
  };

  const fetchMyApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch("http://localhost:5000/api/application/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setPreferences(data.preferences || []);
      setApplied(data.appliedUniversities || []);
    } catch (err) { alert("Failed to load applications"); } finally { setLoading(false); }
  };

  const movePriority = async (from, to) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/application/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ fromIndex: from, toIndex: to }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setPreferences(data);
    } catch (err) { alert("Failed to update priority"); }
  };

  useEffect(() => {
    fetchMyApplications();
    fetchSuggestions();
  }, []);

  const goToPayment = (u) => navigate(`/student/payment/${u._id}`);
  const viewOffer = (app) => navigate(`/student/applications/${app._id}`);

  /* ================= UI RENDER ================= */
  return (
    <div className="min-h-screen bg-blue-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* HEADER AREA */}
        <div className="border-l-4 border-orange-500 pl-4">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Education <span className="text-blue-600">Console</span>
          </h1>
          <p className="text-slate-500 mt-1 font-medium">Manage your applications and university suggestions in one place.</p>
        </div>

        {/* 1. APPLIED UNIVERSITIES */}
        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800 tracking-tight">
            <CheckCircle size={22} className="text-emerald-500" /> Applied Universities
          </h2>

          {loading && (
            <p className="text-slate-500 font-medium">Loading applications...</p>
          )}

          {applied.length === 0 ? (
            <div className="bg-white p-10 rounded-3xl border border-slate-200 text-center text-slate-400 font-bold">
              No applications submitted yet.
            </div>
          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applied.map((u) => (
                <div key={u._id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-lg font-bold uppercase tracking-widest border border-blue-100">
                        {u.university?.country || u.country || "N/A"}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          Status: <span className="text-blue-600">{u.status?.replace("_", " ")}</span>
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1">{u.university?.universityName || "Unknown University"}</h3>
                    <p className="text-sm font-bold text-blue-600 mb-4">{u.course || "Unknown Course"}</p>

                    <div className="space-y-2 mb-6 pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                        <Clock size={14} className="text-slate-400" /> Intake: <span className="text-slate-800 font-bold">{u.university?.intakes?.join(", ") || "N/A"}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {/* PRIMARY ACTION: SERVICE CHARGE */}
                      {u.status === "Offer Received" && !u.serviceFeePaid && (
                        <button onClick={() => goToPayment(u)} className="w-full bg-[#3361FF] hover:bg-blue-700 text-white py-3.5 rounded-2xl text-xs font-bold uppercase tracking-[0.1em] transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2">
                          <CreditCard size={15} /> Pay Service Charge
                        </button>
                      )}

                      {/* SECONDARY LINKS */}
                      <div className="flex flex-col gap-2">
                        {u.serviceFeePaid && (
                          <button onClick={() => viewOffer(u)} className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors group text-xs font-bold">
                            <FileText size={15} className="text-slate-400 group-hover:text-blue-600" />
                            <span>View Offer Letter</span>
                            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        )}

                        {u.acceptanceLetter?.url && (
                          <a href={u.acceptanceLetter.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-600 font-bold text-[11px] hover:text-blue-700 transition-colors group">
                            <CheckCircle size={14} className="text-emerald-500" />
                            <span className="underline underline-offset-4 decoration-blue-200">View Acceptance Letter</span>
                            <ArrowUpRight size={12} />
                          </a>
                        )}
                      </div>

                      {/* TUITION ACTION */}
                      {u.serviceFeePaid && !u.tuitionFeePaid && (
                        <button onClick={() => navigate(`/student/tuition-payment/${u._id}`)} className="w-full mt-2 bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-600 hover:text-white py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                          <Wallet size={14} /> Confirm Tuition Payment
                        </button>
                      )}

                      {u.tuitionStatus === "Pending_Verification" && (
                        <div className="text-xs text-yellow-600 font-bold mt-2">
                          Tuition Verification Pending
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 2. MY PREFERENCES */}
        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-700 tracking-tight">
            <Star size={22} /> My Preferences
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {preferences.map((p, i) => (
              <div key={p._id} className="group bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:border-blue-400 transition-all relative">
                {/* Priority Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => {
                    if (i === 0) return;
                    movePriority(i, i - 1);
                  }} disabled={i === 0} className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white disabled:opacity-20 transition-colors"><ChevronUp size={14} /></button>
                  <button onClick={() => {
                    if (i === 0) return;
                    movePriority(i, i + 1);
                  }} disabled={i === preferences.length - 1} className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white disabled:opacity-20 transition-colors"><ChevronDown size={14} /></button>
                </div>

                <div className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 text-slate-900 text-[10px] font-bold mb-4 tracking-tighter">0{i + 1}</div>

                <h3 className="font-bold text-slate-900 text-md leading-tight mb-1">{p.university?.universityName || "Unknown University"}</h3>
                <div className="flex items-center gap-1 text-slate-400 mb-4">
                  <Globe size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{p.university?.country || "N/A"}</span>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-50 text-[11px] font-bold text-slate-600">
                  <p className="flex items-center gap-2"><GraduationCap size={14} className="text-slate-300" /> {p.university?.degree || "N/A"} • {p.university?.stream || "N/A"}</p>
                  <p className="flex items-center gap-2 text-blue-600"><BookOpen size={14} className="text-blue-300" /> {p.course || p.university?.courseName || "N/A"}</p>
                  <p className="flex items-center gap-2"><Clock size={14} className="text-slate-300" /> Intake: {p.university?.intakes?.join(", ") || "N/A"}</p>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <span className={`text-[9px] font-bold uppercase tracking-[0.1em] px-3 py-1 rounded-full border ${p.status === 'preferred' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                    }`}>
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 rounded-[40px] p-8 md:p-12 relative overflow-hidden">

          <h2 className="text-white text-xl font-bold mb-10 flex items-center gap-2 relative z-10 tracking-tight">
            <BookOpen size={22} className="text-orange-500" /> Suggested by Executive
          </h2>

          {suggestions.length === 0 ? (
            <p className="text-white/60 text-sm relative z-10">
              No suggestions available yet.
            </p>
          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {suggestions.map((s) => (
                <div key={s._id} className="bg-white/5 border border-white/10 backdrop-blur-md p-7 rounded-3xl hover:bg-white/10 transition-all group">
                  <h3 className="text-white font-bold text-lg mb-1">{s.university?.universityName}</h3>
                  <p className="text-orange-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">{s.university?.country || "N/A"}</p>

                  <div className="space-y-3 mb-8 text-slate-400 text-xs font-bold">
                    <div className="flex items-center gap-2"><GraduationCap size={15} /> {s.university?.degree} • {s.university?.stream}</div>
                    <div className="flex items-center gap-2 text-white"><BookOpen size={15} /> {s.course || "N/A"}</div>
                    <div className="flex items-center gap-2"><Clock size={15} /> Intake: {s.university?.intakes?.join(", ") || "N/A"}</div>
                  </div>

                  {s.interested ? (
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-[10px] uppercase tracking-widest">
                      <CheckCircle size={14} /> Interest Confirmed
                    </div>
                  ) : (
                    <button onClick={() => markInterested(s._id, s.course)} className="w-full bg-orange-500 text-white py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-orange-600 transition-all">
                      I'm Interested
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default StudentApplications;