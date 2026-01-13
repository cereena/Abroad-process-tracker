import Table from "../../components/Table";

const courses = [
  {
    id: 32,
    name: "BSB 80120",
    university: "Griffin College",
    country: "Australia",
    duration: "24 months",
  },
];

export default function CourseFinder() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">University Course Finder</h2>

      {/* Filters */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <select className="border p-2 rounded">
            <option>Postgraduate</option>
          </select>
          <select className="border p-2 rounded">
            <option>Select Country</option>
          </select>
          <select className="border p-2 rounded">
            <option>Select Intake</option>
          </select>
          <input className="border p-2 rounded" placeholder="IELTS Score" />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {courses.map((c) => (
          <div key={c.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold text-blue-700">{c.name}</h3>
            <p className="text-sm">{c.university}</p>
            <p className="text-sm">{c.country}</p>
            <p className="text-sm">{c.duration}</p>

            <div className="mt-3 flex gap-2">
              <button className="px-3 py-1 bg-yellow-500 text-white rounded text-xs">
                Suggest to Student
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs">
                Add to Preference
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
