import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { 
  Banknote, 
  UploadCloud, 
  Copy, 
  ArrowLeft, 
  Info,
  HelpCircle,
  ShieldCheck
} from "lucide-react";
import toast from "react-hot-toast";

function TuitionPaymentPage() {
  const { appliedId } = useParams();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const uploadReceipt = async () => {
    if (!receipt) return toast.error("Please select a file first");
    setLoading(true);
    const formData = new FormData();
    formData.append("receipt", receipt);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/student/upload-tuition-receipt/${appliedId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );
      toast.success("Receipt uploaded successfully!");
      navigate(-1);
    } catch (error) {
      toast.error("Failed to upload receipt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4 md:p-8">
      {/* Header Area - Using Blue & Orange accents */}
      <div className="max-w-5xl mx-auto mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-4 text-sm font-semibold group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Dashboard
        </button>
        <div className="border-l-4 border-orange-500 pl-4">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            International Tuition <span className="text-blue-600">Payment Guide</span>
          </h1>
          <p className="text-slate-500 mt-1 font-medium">Follow this sample structure to complete your university wire transfer.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Sample Instructions */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Bank Details Sample */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-blue-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Banknote className="text-white" size={20} />
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">Example Bank Details</h3>
              </div>
              <span className="text-[10px] bg-blue-500 text-white px-2 py-1 rounded font-bold uppercase">Swift / Wire Transfer</span>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Beneficiary Bank", value: "Example University Bank Name" },
                  { label: "Account Name", value: "Example University Official Account" },
                  { label: "Account Number / IBAN", value: "XXXXXXXXXXXXXXX" },
                  { label: "SWIFT / BIC Code", value: "XXXX XXXX" },
                  { label: "Payment Reference", value: appliedId, highlight: true }
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-4 rounded-xl border ${item.highlight ? 'bg-orange-50 border-orange-200' : 'bg-slate-50 border-slate-100'}`}>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-slate-400 font-black">{item.label}</p>
                      <p className={`text-sm font-bold mt-1 ${item.highlight ? 'text-orange-700' : 'text-slate-700'}`}>{item.value}</p>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(item.value)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all shadow-sm"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Step-by-Step Tutorial (Green accents for success path) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h3 className="text-slate-800 font-black text-lg mb-8 flex items-center gap-2">
              <HelpCircle size={22} className="text-orange-500" />
              How to pay your Tuition Fee
            </h3>
            
            <div className="relative space-y-12">
              {/* Vertical Connector Line */}
              <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-100" />

              {[
                { title: "Visit your Bank", desc: "Take the bank details above to your local bank or use your international banking app.", color: "bg-blue-600" },
                { title: "Use Reference ID", desc: "Crucial: Include your Application ID in the payment reference field.", color: "bg-orange-500" },
                { title: "Confirm Transfer", desc: "The bank will provide a SWIFT copy or a transaction receipt once done.", color: "bg-blue-600" },
                { title: "Upload & Verify", desc: "Upload that receipt here. Our team will verify it with the university.", color: "bg-emerald-500" }
              ].map((step, idx) => (
                <div key={idx} className="relative flex gap-6 items-start">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full ${step.color} text-white flex items-center justify-center text-sm font-black shadow-lg z-10`}>
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1 uppercase tracking-tight">{step.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Upload (Orange Primary Action) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm sticky top-8">
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="text-emerald-500" size={20} />
              <h3 className="text-slate-800 font-black text-xs uppercase tracking-widest">Secure Submission</h3>
            </div>
            
            <div className="relative group mb-6">
              <input
                type="file"
                id="receipt-upload"
                className="hidden"
                onChange={(e) => setReceipt(e.target.files[0])}
              />
              <label 
                htmlFor="receipt-upload"
                className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 cursor-pointer group-hover:bg-orange-50 group-hover:border-orange-200 transition-all p-6 text-center"
              >
                <div className="p-4 bg-white rounded-2xl shadow-sm mb-4 text-slate-400 group-hover:text-orange-500 transition-all group-hover:rotate-6">
                  <UploadCloud size={28} />
                </div>
                <p className="text-xs font-bold text-slate-700">
                  {receipt ? receipt.name : "Select Transfer Receipt"}
                </p>
                <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase">PDF or Image (Max 5MB)</p>
              </label>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <Info size={16} className="text-blue-500 flex-shrink-0" />
                <p className="text-[10px] text-blue-700 leading-normal font-bold">
                  University verification typically takes 2-3 business days after receipt submission.
                </p>
              </div>

              <button
                onClick={uploadReceipt}
                disabled={loading || !receipt}
                className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all active:scale-95 disabled:opacity-40 shadow-xl shadow-orange-100"
              >
                {loading ? "Processing..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TuitionPaymentPage;