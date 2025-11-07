import express from "express";
import Recipe from "../models/Recipe.js";
import multer from "multer";
import path from "path";
import auth from "../middleware/authmiddleware.js";

const router = express.Router();

// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// GET /api/recipes?q=searchTerm  (public)
router.get("/", async (req, res) => {
  try {
    const q = req.query.q || "";
    const recipes = await Recipe.find({ title: { $regex: q, $options: "i" } }).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/recipes  (admin)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const recipe = new Recipe({
      title: req.body.title,
      description: req.body.description,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });
    await recipe.save();
    res.json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/recipes/:id  (admin)
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const update = {
      title: req.body.title,
      description: req.body.description,
    };
    if (req.file) update.image = `/uploads/${req.file.filename}`;
    const updated = await Recipe.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/recipes/:id  (admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
