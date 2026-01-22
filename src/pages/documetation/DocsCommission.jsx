

const commissions = [
  {
    id: 577875,
    commission: 60000,
    deduction: 0,
    netPay: 60000,
    status: "Pending",
  },
];

const columns = [
  { header: "Appl ID", accessor: "id" },
  {
    header: "Commission",
    render: (r) => `₹${r.commission}`,
  },
  {
    header: "Deduction",
    render: (r) => `₹${r.deduction}`,
  },
  {
    header: "Net Pay",
    render: (r) => `₹${r.netPay}`,
  },
  {
    header: "Status",
    render: (r) => (
      <span className="text-orange-600 font-medium">{r.status}</span>
    ),
  },
];

export default function DocsCommission() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Commission</h2>

      <Table columns={columns} data={commissions} />
    </div>
  );
}
