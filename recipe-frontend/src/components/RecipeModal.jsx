import React from "react";

export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  const imageUrl = recipe.image ? `${import.meta.env.VITE_API_BASE}${recipe.image}` : null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-lg sm:max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={recipe.title}
            className="w-full h-64 sm:h-80 object-cover"
          />
        )}
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-xl sm:text-2xl font-bold">{recipe.title}</h2>
            <button onClick={onClose} className="text-gray-500">Close</button>
          </div>
          <p className="mt-4 text-gray-700">{recipe.description}</p>
          <div className="mt-4 text-sm text-gray-500">
            Created: {new Date(recipe.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
