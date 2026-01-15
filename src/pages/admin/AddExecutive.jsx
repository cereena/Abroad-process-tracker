function AddExecutive() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    password: "",
    countries: []
  });

  const handleSubmit = async () => {
    await axios.post(
      "http://localhost:5000/api/admin/create-doc-executive",
      form
    );
    alert("Executive created successfully");
  };

  return (
    <div className="bg-white p-6 rounded shadow w-[500px]">
      <h2 className="text-xl font-bold mb-4">Add Documentation Executive</h2>

      <input placeholder="Name" />
      <input placeholder="Email" />
      <input placeholder="Phone" />
      <input placeholder="Branch" />
      <input placeholder="Password" type="password" />

      <select multiple>
        <option>UK</option>
        <option>Canada</option>
        <option>Poland</option>
        <option>Germany</option>
        <option>France</option>
        <option>Ireland</option>
      </select>

      <button onClick={handleSubmit}>
        Create Executive
      </button>
    </div>
  );
}
