// import React, { useEffect, useState } from "react";
// import api from "../api";

// export default function RecipeForm({ recipe, onSaved }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (recipe) {
//       setTitle(recipe.title);
//       setDescription(recipe.description);
//       setPreview(recipe.image ? `${import.meta.env.VITE_API_BASE}${recipe.image}` : null);
//       setFile(null);
//     } else {
//       setTitle("");
//       setDescription("");
//       setFile(null);
//       setPreview(null);
//     }
//   }, [recipe]);

//   useEffect(() => {
//     if (!file) return;
//     const url = URL.createObjectURL(file);
//     setPreview(url);
//     return () => URL.revokeObjectURL(url);
//   }, [file]);

//   const submit = async (e) => {
//     e.preventDefault();
//     if (!token) return alert("Unauthorized. Login as admin.");
//     if (!title.trim() || !description.trim()) return alert("Title and description cannot be empty.");

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     if (file) formData.append("image", file);

//     try {
//       let res;
//       if (recipe) {
//         res = await api.put(`/api/recipes/${recipe._id}`, formData, { headers: { Authorization: `Bearer ${token}` } });
//       } else {
//         res = await api.post("/api/recipes", formData, { headers: { Authorization: `Bearer ${token}` } });
//       }
//       alert(res.data.message);

//       // Clear form after save
//       setTitle("");
//       setDescription("");
//       setFile(null);
//       setPreview(null);
//       onSaved();
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Save failed");
//     }
//   };

//   return (
//     <form onSubmit={submit} className="p-4 bg-white rounded shadow-md">
//       <h3 className="text-lg font-semibold mb-2">{recipe ? "Edit Recipe" : "Add Recipe"}</h3>

//       <input
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Title"
//         className="w-full border p-2 rounded mb-2"
//         required
//       />
//       <textarea
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         placeholder="Description"
//         className="w-full border p-2 rounded mb-2"
//         rows="4"
//         required
//       />

//       {/* CAMERA & GALLERY UPLOAD */}
//       <div className="flex gap-2 mb-2">
//         {/* Take Photo (camera) */}
//         <label className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer">
//           Take Photo
//           <input
//             type="file"
//             accept="image/*"
//             capture="environment" // triggers back camera
//             onChange={(e) => setFile(e.target.files[0])}
//             className="hidden"
//           />
//         </label>

//         {/* Choose from Gallery */}
//         <label className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer">
//           Choose from Gallery
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="hidden"
//           />
//         </label>
//       </div>

//       {/* Preview selected image */}
//       {preview && <img src={preview} alt="preview" className="w-full h-40 object-cover rounded mb-2" />}

//       <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">
//         Save
//       </button>
//     </form>
//   );
// }
