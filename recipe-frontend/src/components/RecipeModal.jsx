import React from "react";

export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-lg w-[90%] md:w-2/3 lg:w-1/2 overflow-hidden" onClick={(e)=>e.stopPropagation()}>
        {recipe.image && <img src={`${import.meta.env.VITE_API_BASE}${recipe.image}`} alt={recipe.title} className="w-full h-64 object-cover" />}
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">{recipe.title}</h2>
            <button onClick={onClose} className="text-gray-500">Close</button>
          </div>
          <p className="mt-4 text-gray-700">{recipe.description}</p>
          <div className="mt-4 text-sm text-gray-500">Created: {new Date(recipe.createdAt).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
