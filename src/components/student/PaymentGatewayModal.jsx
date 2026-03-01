import { useState } from "react";

const PaymentGatewayModal = ({ onClose, applicationId, universityId }) => {
  const [method, setMethod] = useState("upi");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/payment/service-fee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            appId: applicationId,
            universityId: universityId,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Payment failed");
        setLoading(false);
        return;
      }

      // Redirect to Stripe checkout
      window.location.href = data.url;

    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[420px] p-6 space-y-4">

        <h2 className="text-lg font-semibold">
          Complete Payment
        </h2>

        <div className="space-y-2">
          <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer">
            <input
              type="radio"
              checked={method === "upi"}
              onChange={() => setMethod("upi")}
            />
            UPI
          </label>

          <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer">
            <input
              type="radio"
              checked={method === "card"}
              onChange={() => setMethod("card")}
            />
            Credit / Debit Card
          </label>

          <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer">
            <input
              type="radio"
              checked={method === "netbanking"}
              onChange={() => setMethod("netbanking")}
            />
            Net Banking
          </label>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg"
        >
          {loading ? "Redirecting to secure payment..." : "Proceed to Payment"}
        </button>

        <button
          onClick={onClose}
          className="w-full text-sm text-gray-500"
        >
          Cancel
        </button>

      </div>
    </div>
  );
};

export default PaymentGatewayModal;