import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/admin/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container px-4 py-8">
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <form onSubmit={submit} className="flex flex-col gap-3">
            <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" className="border p-2 rounded" required />
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="border p-2 rounded" required />
            <button className="bg-amber-500 text-white py-2 rounded">Login</button>
          </form>
          <div className="mt-4 text-sm text-gray-600">
            Default admin: <strong>admin</strong> / <strong>password123</strong>
          </div>
        </div>
      </div>
    </>
  );
}
