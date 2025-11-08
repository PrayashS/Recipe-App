import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";
import api from "../api";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [q, setQ] = useState("");
  const [openRecipe, setOpenRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => { fetchRecipes(); }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1950&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 space-y-2 sm:space-y-4 px-4">
          <h1 className="text-3xl sm:text-5xl font-serif font-bold">Discover Delicious Recipes</h1>
          <p className="text-sm sm:text-lg">Explore, search, and savor our curated recipes.</p>
        </div>
      </section>

      {/* Recipes Section */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); fetchRecipes(e.target.value); }}
          placeholder="Search recipes..."
          className="w-full p-3 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : recipes.length === 0 ? (
          <div className="text-center text-gray-500">No recipes found</div>
        ) : (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((r) => (
              <RecipeCard key={r._id} recipe={r} onOpen={setOpenRecipe} />
            ))}
          </div>
        )}
      </div>

      <RecipeModal recipe={openRecipe} onClose={() => setOpenRecipe(null)} />
    </>
  );
}
