import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  return (
    <nav className="bg-white/80 backdrop-blur sticky top-0 z-20 shadow">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="text-2xl font-bold text-amber-700">RecipeBox</Link>
          <span className="text-sm text-gray-600">— Kelsey House | Bar & Kitchen</span>
        </div>

        {/* Mobile menu toggle */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 hover:text-amber-600 focus:outline-none"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Menu items */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full sm:flex sm:w-auto sm:items-center gap-3 mt-2 sm:mt-0`}
        >
          <Link to="/" className="block sm:inline-block text-gray-700 hover:text-amber-600 px-2 py-1">
            Home
          </Link>

          {!token ? (
            <button
              onClick={() => navigate("/admin-login")}
              className="block sm:inline-block bg-amber-500 text-white px-3 py-1 rounded mt-2 sm:mt-0"
            >
              Login as Admin
            </button>
          ) : (
            <>
              <Link
                to="/admin"
                className="block sm:inline-block bg-amber-400 text-white px-3 py-1 rounded mt-2 sm:mt-0"
              >
                Admin
              </Link>
              <button
                onClick={handleLogout}
                className="block sm:inline-block bg-red-500 text-white px-3 py-1 rounded mt-2 sm:mt-0"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
