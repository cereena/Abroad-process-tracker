import Table from "../../components/Table";

const applications = [
  {
    id: 779981,
    date: "25-04-2023",
    student: "Ks Bharat",
    country: "Netherlands",
    details: "University: Hongkong, Course: M.A, Intake: 2023-May",
    status: "Pending",
    assignedTo: "--",
  },
  {
    id: 838675,
    date: "25-04-2023",
    student: "Mohmad Siraj",
    country: "Germany",
    details: "University: sdfa, Course: asdfa, Intake: 2024-Jun",
    status: "Pending",
    assignedTo: "--",
  },
  {
    id: 796278,
    date: "20-03-2023",
    student: "Yuzvendra Chahal",
    country: "Australia",
    details: "University: french, Course: PhD, Intake: 2024-Mar",
    status: "Application Fee Paid",
    assignedTo: "--",
  },
];

const columns = [
  { header: "ID", accessor: "id" },
  { header: "Date Created", accessor: "date" },
  {
    header: "Student",
    render: (row) => <span className="font-semibold">{row.student}</span>,
  },
  { header: "Country", accessor: "country" },
  {
    header: "Details",
    render: (row) => (
      <div className="text-sm text-gray-600 leading-5">
        {row.details.split(",").map((d, i) => (
          <div key={i}>{d.trim()}</div>
        ))}
      </div>
    ),
  },
  {
    header: "Status",
    render: (row) => {
      const base =
        "px-2 py-1 rounded text-xs font-semibold inline-block";

      if (row.status === "Pending")
        return (
          <span className={`${base} bg-red-100 text-red-600`}>
            {row.status}
          </span>
        );

      if (row.status === "Application Fee Paid")
        return (
          <span className={`${base} bg-blue-100 text-blue-600`}>
            {row.status}
          </span>
        );

      return (
        <span className={`${base} bg-green-100 text-green-600`}>
          {row.status}
        </span>
      );
    },
  },
  { header: "Assigned To", accessor: "assignedTo" },
];

export default function DocApplications() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">University Applications</h2>

        <button className="border border-blue-600 text-blue-600 px-3 py-1 rounded">
          🔍 Filter
        </button>
      </div>

      {/* TABLE */}
      <Table
        columns={columns}
        data={applications}
        actions={(row) => (
          <button
            className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-xs"
            onClick={() => alert(`Viewing application of ${row.student}`)}
          >
            View
          </button>
        )}
      />
    </div>
  );
}
