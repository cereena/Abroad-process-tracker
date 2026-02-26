const PaymentCard = ({
  title,
  amount,
  status,
  description,
  buttonText,
  disabled,
  onPay,
}) => {
  const getStatusColor = () => {
    if (status === "Paid") return "text-green-600";
    if (status === "Pending") return "text-red-500";
    if (status === "Locked") return "text-gray-400";
    return "text-gray-500";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>

        <p className="text-2xl font-bold mt-2">{amount}</p>

        <p className={`mt-2 font-medium ${getStatusColor()}`}>
          {status}
        </p>

        {description && (
          <p className="text-sm text-gray-500 mt-2">
            {description}
          </p>
        )}
      </div>

      {/* Button Section */}
      {onPay && (
        <button
          onClick={onPay}
          disabled={disabled}
          className={`mt-5 w-full py-2 rounded-lg font-medium transition
            ${
              disabled
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
        >
          {buttonText || "Pay Now"}
        </button>
      )}
    </div>
  );
};

export default PaymentCard;