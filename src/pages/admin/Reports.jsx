export default function Reports() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Monthly Admissions</h2>
          <p className="text-gray-600 text-sm">45 students joined this month</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Visa Success Rate</h2>
          <p className="text-gray-600 text-sm">82% approval rate</p>
        </div>
      </div>
    </div>
  );
}
