import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import RecipeForm from "../components/RecipeForm";

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
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">

          {/* Form Section */}
          <div className="md:w-1/2">
            <RecipeForm
              recipe={editing}
              onSaved={() => {
                setEditing(null);
                fetchRecipes(q);
              }}
            />
          </div>

          {/* Recipes List */}
          <div className="md:flex-1">
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

            {loading ? (
              <div className="text-gray-500">Loading...</div>
            ) : recipes.length === 0 ? (
              <div className="text-gray-500">No recipes found</div>
            ) : (
              <div className="space-y-3">
                {recipes.map((r) => (
                  <div
                    key={r._id}
                    className="bg-white p-3 rounded shadow flex flex-col sm:flex-row items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      {r.image ? (
                        <img
                          src={`${import.meta.env.VITE_API_BASE}${r.image}`}
                          alt={r.title}
                          className="w-full sm:w-20 h-14 object-cover rounded"
                        />
                      ) : (
                        <div className="w-full sm:w-20 h-14 bg-amber-100 flex items-center justify-center text-gray-500">
                          No Image
                        </div>
                      )}
                      <div className="truncate">
                        <div className="font-semibold truncate">{r.title}</div>
                        <div className="text-sm text-gray-500 truncate">
                          {new Date(r.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => setEditing(r)}
                        className="bg-yellow-400 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
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
    </>
  );
}
