export default function StatusBadge({ status }) {
  const colors = {
    Pending: "bg-red-100 text-red-700",
    Paid: "bg-green-100 text-green-700",
    Processing: "bg-blue-100 text-blue-700"
  };

  return (
    <span className={`px-2 py-1 text-xs rounded ${colors[status] || "bg-gray-100"}`}>
      {status}
    </span>
  );
}
