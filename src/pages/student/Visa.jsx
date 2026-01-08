

const Visa = () => {
  return (
   
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Visa Status</h2>
        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
          <p className="font-medium text-blue-600">
            Your Visa Application is in Progress 🚀
          </p>
          <p className="text-gray-600">
            Hang tight! Our team is working on your documents.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-lg">Next Steps:</h3>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Submit financial proof</li>
            <li>Attend biometrics appointment</li>
            <li>Upload passport copy</li>
          </ul>
        </div>
      </div>
  );
};

export default Visa;
