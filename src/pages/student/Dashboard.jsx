import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle, 
  Clock, 
  CreditCard, 
  User, 
  Rocket, 
  GraduationCap, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

function Dashboard() {
  const [profileCompleted, setProfileCompleted] = useState(null);
  const [progress, setProgress] = useState([]);
  const studentId = localStorage.getItem("studentId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!studentId) navigate("/student/login");
  }, [studentId, navigate]);

  useEffect(() => {
    fetch("http://localhost:5000/api/student/profile-status", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => res.json())
      .then(data => setProfileCompleted(data.profileCompleted))
      .catch(err => {
        console.error("Profile status error", err);
        setProfileCompleted(false);
      });
  }, []);

  useEffect(() => {
    if (studentId) {
      fetch(`http://localhost:5000/api/progress/${studentId}`)
        .then((res) => res.json())
        .then((data) => {
          setProgress(data?.stepsCompleted || []);
        })
        .catch(() => {
          console.error("Unable to fetch progress");
        });
    }
  }, [studentId]);

  const steps = [
    "Initial Payment",
    "Registration Completed",
    "Student Documents",
    "Application Submission",
    "Visa Documents Preparation",
    "Interview preparation",
    "Visa Applied",
    "Final Approval",
  ];

  const payments = [
    { title: "Registration Fee", key: "Registration Completed" },
    { title: "Second Installment", key: "Documents Uploaded" },
    { title: "Final Payment", key: "Final Approval" },
  ];

  // PROFILE INCOMPLETE VIEW
  if (profileCompleted === false) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[32px] shadow-xl shadow-blue-100/50 p-10 border border-blue-100 text-center">
          <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center text-orange-500 mx-auto mb-6">
            <User size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 leading-tight">
            Complete your profile <br/><span className="text-blue-600">to continue</span>
          </h2>
          <p className="text-slate-500 text-sm mt-4 font-medium leading-relaxed">
            Your dashboard features will unlock once your academic profile is verified.
          </p>
          <button
            onClick={() => navigate("/student/my-profile")}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 group"
          >
            Go to Profile <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="border-l-4 border-orange-500 pl-6">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Student <span className="text-blue-600">Dashboard</span>
            </h1>
            <p className="text-slate-500 mt-1 font-medium">Track your application, payments & milestone progress.</p>
          </div>
          <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3 self-start">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Active</span>
          </div>
        </div>

        {/* TOP METRIC CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard 
            title="Application Status" 
            value="Active" 
            icon={<Rocket size={20} />} 
            color="text-blue-600" 
            bgColor="bg-blue-50"
          />
          <InfoCard 
            title="Steps Completed" 
            value={`${progress.length} / ${steps.length}`} 
            icon={<CheckCircle size={20} />} 
            color="text-emerald-600" 
            bgColor="bg-emerald-50"
          />
          <InfoCard 
            title="Payments Status" 
            value={progress.includes("Final Approval") ? "Paid" : "Pending"} 
            icon={<CreditCard size={20} />} 
            color="text-orange-600" 
            bgColor="bg-orange-50"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* APPLICATION PROGRESS (THE TIMELINE) */}
          <div className="lg:col-span-2 bg-white rounded-[40px] p-8 md:p-10 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <ShieldCheck size={24} className="text-blue-600" />
                Application Roadmap
              </h2>
              <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase">
                Phase 01
              </span>
            </div>

            <div className="relative space-y-2">
              {/* Vertical Connector Line */}
              <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-slate-100" />

              {steps.map((step, index) => {
                const completed = progress.includes(step);
                const isNext = !completed && (index === 0 || progress.includes(steps[index - 1]));

                return (
                  <div key={index} className="relative flex gap-6 items-center p-3 rounded-2xl transition-all">
                    <div className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-sm
                      ${completed ? "bg-emerald-500 text-white scale-110" : 
                        isNext ? "bg-blue-600 text-white ring-4 ring-blue-50" : "bg-white text-slate-300 border border-slate-100"}`}
                    >
                      {completed ? <CheckCircle size={18} /> : <span className="text-xs font-black">{index + 1}</span>}
                    </div>

                    <div className="flex-1">
                      <p className={`text-sm font-black tracking-tight ${completed ? "text-slate-900" : isNext ? "text-blue-600" : "text-slate-400"}`}>
                        {step}
                      </p>
                      {isNext && <span className="text-[9px] font-black uppercase text-blue-400 tracking-widest">In Progress</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* PAYMENT STATUS COLUMN */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-xl relative overflow-hidden">
               {/* Background Decoration */}
               <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <CreditCard size={120} />
               </div>

               <h2 className="text-lg font-black mb-8 relative z-10 uppercase tracking-widest text-orange-400">
                 Financial Summary
               </h2>

               <div className="space-y-4 relative z-10">
                 {payments.map((pay, index) => {
                   const done = progress.includes(pay.key);
                   return (
                     <div key={index} className={`p-5 rounded-3xl border transition-all ${done ? "bg-white/10 border-white/10" : "bg-white/5 border-white/5 opacity-60"}`}>
                       <div className="flex justify-between items-start mb-1">
                         <p className="text-xs font-black uppercase tracking-tight">{pay.title}</p>
                         {done ? <CheckCircle size={14} className="text-emerald-400" /> : <Clock size={14} className="text-orange-400" />}
                       </div>
                       <p className={`text-[10px] font-bold ${done ? "text-emerald-400" : "text-slate-400"}`}>
                         {done ? "TRANSACTION VERIFIED" : "PAYMENT AWAITING"}
                       </p>
                     </div>
                   );
                 })}
               </div>

               <button className="w-full mt-10 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                 View All Invoices
               </button>
            </div>

            {/* NEED HELP CARD */}
            <div className="bg-white rounded-[32px] p-6 border border-slate-200 flex items-center gap-4">
               <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <AlertCircle size={24} />
               </div>
               <div>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Support Desk</h4>
                  <p className="text-xs text-slate-500 font-medium">Get help with your applications.</p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* UI COMPONENTS */
function InfoCard({ title, value, icon, color, bgColor }) {
  return (
    <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group">
      <div className={`w-12 h-12 ${bgColor} ${color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</p>
      <h3 className={`text-2xl font-black text-slate-900 tracking-tight`}>
        {value}
      </h3>
    </div>
  );
}

export default Dashboard;