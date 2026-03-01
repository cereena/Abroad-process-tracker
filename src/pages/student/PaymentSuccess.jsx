import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { appliedId } = useParams();

  useEffect(() => {
    console.log("Applied ID:", appliedId);

    if (!appliedId) return;

    const timer = setTimeout(() => {
      navigate(`/student/application/${appliedId}`);
    }, 2500);

    return () => clearTimeout(timer);
  }, [appliedId, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500" size={48} />
        </div>

        <h2 className="text-2xl font-semibold text-green-600">
          Payment Successful 🎉
        </h2>

        <p className="text-gray-500 mt-3">
          Your service charge has been received.
        </p>

        <div className="mt-6 animate-pulse text-sm text-gray-500">
          Redirecting...
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;