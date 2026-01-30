export default function FileInput({ label, value, onChange, editMode = true, accept }) {
  return (
    <div className="mb-4">
      <label className="text-sm font-medium">{label}</label>
      <input
        type="file"
        disabled={!editMode}
        accept={accept || "*"}
        onChange={e => onChange(e.target.files[0])}
        className="w-full mt-1 border rounded-lg px-3 py-2"
      />
      {value && <p className="text-xs text-gray-500 mt-1">{value.name}</p>}
    </div>
  );
}

