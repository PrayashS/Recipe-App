import React, { useState, useEffect } from "react";
import api from "../api";

export default function RecipeForm({ recipe, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDescription(recipe.description);
      setPreview(recipe.image ? `${import.meta.env.VITE_API_BASE}${recipe.image}` : null);
      setImage(null);
    } else {
      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
    }
  }, [recipe]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized. Please login as admin.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) formData.append("image", image);

      if (recipe) {
        await api.put(`/api/recipes/${recipe._id}`, formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/api/recipes", formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
      }

      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
      onSave();
    } catch (err) {
      console.error(err);
      alert("Failed to save recipe.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 border rounded shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-2">{recipe ? "Edit Recipe" : "Add New Recipe"}</h2>
      <input type="text" placeholder="Recipe Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-2 rounded" required />
      <textarea placeholder="Recipe Description" value={description} onChange={e => setDescription(e.target.value)} className="border p-2 rounded" rows="4" required />
      <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 rounded" />
      {preview && <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded mb-2" />}
      <button type="submit" className={`text-white p-2 rounded ${recipe ? "bg-yellow-500" : "bg-green-500"}`}>
        {recipe ? "Update Recipe" : "Add Recipe"}
      </button>
    </form>
  );
}
