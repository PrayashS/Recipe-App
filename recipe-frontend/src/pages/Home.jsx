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

  const fetchRecipes = async (search="") => {
    setLoading(true);
    try {
      const res = await api.get("/api/recipes", { params: { q: search } });
      setRecipes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRecipes(); }, []);

  const onSearch = (e) => {
    const val = e.target.value;
    setQ(val);
    fetchRecipes(val);
  };

  return (
    <>
      <Navbar />
      <div className="container px-4 py-8">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-amber-700">Discover Recipes</h1>
          <p className="text-gray-600 mt-2">Browse, search and view delicious recipes.</p>
        </header>

        <div className="mb-6">
          <input value={q} onChange={onSearch} placeholder="Search recipes..." className="w-full p-3 border rounded" />
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map(r => (
              <RecipeCard key={r._id} recipe={r} onOpen={setOpenRecipe} />
            ))}
          </div>
        )}
      </div>

      <RecipeModal recipe={openRecipe} onClose={() => setOpenRecipe(null)} />
    </>
  );
}
