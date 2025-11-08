import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import RecipeForm from "../components/RecipeForm";
import Footer from "../components/Footer";

export default function AdminDashboard() {
  const [recipes, setRecipes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchRecipes = async (search = "") => {
    setLoading(true);
    try {
      const res = await api.get("/api/recipes", { params: { q: search } });
      setRecipes(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch recipes:", err);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    if (!token) return alert("Unauthorized");
    if (!confirm("Delete this recipe?")) return;

    try {
      await api.delete(`/api/recipes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchRecipes(q);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow overflow-y-auto pb-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Form Section */}
            <div className="w-full lg:w-1/3">
              <RecipeForm
                recipe={editing}
                onSaved={() => {
                  setEditing(null);
                  fetchRecipes(q);
                }}
              />
            </div>

            {/* Recipes List */}
            <div className="w-full lg:flex-1">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                <h2 className="text-2xl font-bold">Manage Recipes</h2>
                <input
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    fetchRecipes(e.target.value);
                  }}
                  placeholder="Search..."
                  className="border p-2 rounded w-full sm:w-48"
                />
              </div>

              {/* Recipe Cards */}
              {loading ? (
                <div className="text-gray-500">Loading...</div>
              ) : recipes.length === 0 ? (
                <div className="text-gray-500">No recipes found</div>
              ) : (
                <div className="flex flex-col gap-3">
                  {recipes.map((r) => (
                    <div
                      key={r._id}
                      className="bg-white p-3 rounded shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      {/* Image + Info */}
                      <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto min-w-0">
                        {/* Image */}
                        {r.image ? (
                          <img
                            src={`${import.meta.env.VITE_API_BASE}${r.image}`}
                            alt={r.title}
                            className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 object-cover rounded flex-shrink-0"
                          />
                        ) : (
                          <div className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 bg-amber-100 flex items-center justify-center text-gray-500 text-xs sm:text-sm flex-shrink-0">
                            No Image
                          </div>
                        )}

                        {/* Title & Description */}
                        <div className="flex flex-col min-w-0 flex-1">
                          <div className="font-semibold text-lg md:text-xl break-words">{r.title}</div>
                          <div className="text-sm text-gray-500 mt-1 md:mt-2 break-words">
                            {new Date(r.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 flex-wrap mt-2 sm:mt-0">
                        <button
                          onClick={() => setEditing(r)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(r._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
