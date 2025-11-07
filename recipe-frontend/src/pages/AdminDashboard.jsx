import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import RecipeForm from "../components/RecipeForm";

export default function AdminDashboard() {
  const [recipes, setRecipes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState("");
  const token = localStorage.getItem("token");

  const fetchRecipes = async (search="") => {
    try {
      const res = await api.get("/api/recipes", { params: { q: search } });
      setRecipes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchRecipes(); }, []);

  const handleDelete = async (id) => {
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
      <div className="container px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <RecipeForm recipe={editing} onSaved={() => { setEditing(null); fetchRecipes(q); }} />
          </div>

          <div className="md:flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Manage Recipes</h2>
              <input value={q} onChange={(e)=>{ setQ(e.target.value); fetchRecipes(e.target.value); }} placeholder="Search..." className="border p-2 rounded w-48" />
            </div>

            <div className="space-y-3">
              {recipes.map(r => (
                <div key={r._id} className="bg-white p-3 rounded shadow flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {r.image ? <img src={`${import.meta.env.VITE_API_BASE}${r.image}`} alt={r.title} className="w-20 h-14 object-cover rounded" /> : <div className="w-20 h-14 bg-amber-100 flex items-center justify-center text-gray-500">No Image</div>}
                    <div>
                      <div className="font-semibold">{r.title}</div>
                      <div className="text-sm text-gray-500">{new Date(r.createdAt).toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={()=>setEditing(r)} className="bg-yellow-400 text-white px-3 py-1 rounded">Edit</button>
                    <button onClick={()=>handleDelete(r._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
