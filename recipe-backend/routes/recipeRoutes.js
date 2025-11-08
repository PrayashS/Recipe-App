import express from "express";
import Recipe from "../models/Recipe.js";
import multer from "multer";
import path from "path";
import auth from "../middleware/authmiddleware.js";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// GET recipes
router.get("/", async (req, res) => {
  try {
    const q = req.query.q || "";
    const recipes = await Recipe.find({ title: { $regex: q, $options: "i" } })
                                .sort({ createdAt: -1 });
    // Force array
    res.json(Array.isArray(recipes) ? recipes : []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// POST recipe (admin)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const recipe = new Recipe({
      title: req.body.title,
      description: req.body.description,
      image: imagePath,
    });
    await recipe.save();
    res.json({ success: true, recipe, message: "Recipe added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// PUT recipe (admin)
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const update = { title: req.body.title, description: req.body.description };
    if (req.file) update.image = `/uploads/${req.file.filename}`;
    const updated = await Recipe.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json({ success: true, recipe: updated, message: "Recipe updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE recipe (admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Recipe deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
