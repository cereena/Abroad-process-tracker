import { useState } from "react";

const PaymentGatewayModal = ({ onClose, onSuccess }) => {
  const [method, setMethod] = useState("upi");

  
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[420px] p-6 space-y-4">

        <h2 className="text-lg font-semibold">
          Complete Payment
        </h2>

        {/* Payment Options */}
        <div className="space-y-2">

          <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer">
            <input
              type="radio"
              checked={method === "upi"}
              onChange={() => setMethod("upi")}
            />
            UPI Payment
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
          onClick={onSuccess}
          className="w-full bg-black text-white py-2 rounded-lg"
        >
          Confirm Payment
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