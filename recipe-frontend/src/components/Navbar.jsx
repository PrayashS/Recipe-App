import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  return (
    <nav className="bg-white/80 backdrop-blur sticky top-0 z-20 shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-2xl font-bold text-amber-700">RecipeBox</Link>
          <span className="text-sm text-gray-600">— simple, tasty recipes</span>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/" className="text-gray-700 hover:text-amber-600">Home</Link>
          {!token ? (
            <button onClick={() => navigate("/admin-login")} className="bg-amber-500 text-white px-3 py-1 rounded-md">Login as Admin</button>
          ) : (
            <>
              <Link to="/admin" className="bg-amber-400 text-white px-3 py-1 rounded-md">Admin</Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded-md">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
