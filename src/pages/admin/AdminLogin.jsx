import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:5000/api/admin/login", {
      email, password
    });

    localStorage.setItem("adminToken", data.token);

    nav("/admin/dashboard");
  };

  return (
    <form onSubmit={login}>
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
}
