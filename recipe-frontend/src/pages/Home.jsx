import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";
import api from "../api";
import Footer from "../components/Footer";


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

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Hero image: Chef garnishing English food
  const heroImage =
    "https://png.pngtree.com/thumb_back/fw800/background/20251008/pngtree-professional-chef-garnishing-dish-in-modern-restaurant-kitchen-image_19804215.webp";

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh] lg:min-h-screen flex items-center justify-center">
        <img
          src={heroImage}
          alt="Chef garnishing English food"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white">
              Discover Delicious Recipes
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-white mt-4">
              Explore, search, and savor our curated English dishes.
            </p>
          </div>
        </div>
      </section>

      {/* Recipes Section */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            fetchRecipes(e.target.value);
          }}
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
      <Footer />

    </>
    
  );
}
