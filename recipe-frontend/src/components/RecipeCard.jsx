import React from "react";

export default function RecipeCard({ recipe, onOpen }) {
  const imageUrl = recipe.image
    ? `${import.meta.env.VITE_API_BASE}${recipe.image}`
    : null;

  return (
    <div
      className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:-translate-y-1"
      onClick={() => onOpen(recipe)}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={recipe.title}
          className="w-full h-40 sm:h-44 md:h-48 object-cover"
        />
      ) : (
        <div className="w-full h-40 sm:h-44 md:h-48 bg-amber-100 flex items-center justify-center text-gray-500">
          No image
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{recipe.title}</h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-3">{recipe.description}</p>
      </div>
    </div>
  );
}
