import React from "react";

export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Modal Content */}
        <div className="p-6 flex flex-col gap-4 h-full">
          <h2 className="text-2xl font-bold">{recipe.title}</h2>
          <p className="text-gray-600 text-sm">{new Date(recipe.createdAt).toLocaleString()}</p>

          {/* Description */}
          <div className="overflow-y-auto max-h-[50vh] border-t border-gray-200 pt-4">
            <p className="text-gray-700 whitespace-pre-wrap">{recipe.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
