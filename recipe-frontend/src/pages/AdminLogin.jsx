import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api";
import Footer from "../components/Footer";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For showing validation messages
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const res = await api.post("/api/admin/login", { username, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/admin");
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err) {
      console.error(err);

      // Server-side validation messages
      if (err.response) {
        // Error response from backend
        if (err.response.status === 400) {
          setError(err.response.data.message || "Invalid credentials.");
        } else if (err.response.status === 401) {
          setError("Unauthorized access.");
        } else {
          setError("Server error. Please try again later.");
        }
      } else {
        // Network or other errors
        setError("Unable to connect to server.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container px-4 py-8">
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          {error && <div className="mb-3 text-red-600 font-medium">{error}</div>}
          <form onSubmit={submit} className="flex flex-col gap-3">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="border p-2 rounded"
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="border p-2 rounded"
              required
            />
            <button className="bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition">
              Login
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-600">
            Default admin: <strong>admin</strong> / <strong>password123</strong>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
