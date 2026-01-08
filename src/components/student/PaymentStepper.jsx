const PaymentStepper = () => {
  const steps = ["Registration", "Service Fee", "Visa Fee"];

  return (
    <div className="bg-white p-6 rounded-xl shadow flex justify-between">
      {steps.map((step, i) => (
        <div key={step} className="text-center flex-1">
          <div
            className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center text-white ${
              i === 0 ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            {i + 1}
          </div>
          <p className="mt-2 text-sm">{step}</p>
        </div>
      ))}
    </div>
  );
};

export default PaymentStepper;
