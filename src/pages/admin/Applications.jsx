export default function Applications() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Applications</h1>

      <div className="bg-white rounded-xl shadow p-5">
        <p className="text-gray-600 mb-4">
          Track all student university & visa applications here.
        </p>

        <div className="space-y-3 text-sm">
          <div className="p-3 border rounded">Rahul – UK – Visa Submitted</div>
          <div className="p-3 border rounded">Aisha – Canada – Offer Received</div>
          <div className="p-3 border rounded">John – Australia – Documents Pending</div>
        </div>
      </div>
    </div>
  );
}
