import React from "react";

export default function RecipeCard({ recipe, onOpen }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden cursor-pointer" onClick={()=>onOpen(recipe)}>
      {recipe.image ? (
        <img src={`${import.meta.env.VITE_API_BASE}${recipe.image}`} alt={recipe.title} className="w-full h-44 object-cover" />
      ) : (
        <div className="w-full h-44 bg-amber-100 flex items-center justify-center text-gray-500">No image</div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{recipe.title}</h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">{recipe.description}</p>
      </div>
    </div>
  );
}
