import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", recipeSchema);
