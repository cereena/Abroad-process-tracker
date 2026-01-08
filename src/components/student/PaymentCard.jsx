const PaymentCard = ({ title, amount, status }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-xl font-bold mb-2">{amount}</p>

      <span
        className={`text-sm font-medium ${
          status === "Paid"
            ? "text-green-600"
            : status === "Pending"
            ? "text-red-600"
            : "text-gray-400"
        }`}
      >
        {status}
      </span>
    </div>
  );
};

export default PaymentCard;
