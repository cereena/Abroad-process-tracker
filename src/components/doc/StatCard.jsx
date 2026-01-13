export default function StatCard({ title, count, color }) {
  return (
    <div className={`p-4 rounded-lg text-white shadow ${color}`}>
      <p className="text-sm">{title}</p>
      <h2 className="text-2xl font-bold">{count}</h2>
    </div>
  );
}
