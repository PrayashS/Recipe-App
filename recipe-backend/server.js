import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import bcrypt from "bcryptjs";

import adminRoutes from "./routes/adminRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import Admin from "./models/Admin.js";
import Recipe from "./models/Recipe.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ensure uploads folder exists
if (!fs.existsSync(path.join(__dirname, "uploads"))) {
  fs.mkdirSync(path.join(__dirname, "uploads"));
}

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/recipes", recipeRoutes);

app.get("/", (req, res) => res.send("✅ Recipe backend running"));

// Connect and seed
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");

    // create default admin if missing
    const existingAdmin = await Admin.findOne({ username: "admin" });
    if (!existingAdmin) {
      const hashed = await bcrypt.hash("password123", 10);
      await Admin.create({ username: "admin", password: hashed });
      console.log("👑 Default admin created: username=admin | password=password123");
    }

    // Seed sample recipes if empty
    const count = await Recipe.countDocuments();
    if (count === 0) {
      await Recipe.insertMany([
        {
          title: "Classic Spaghetti",
          description: "Delicious spaghetti tossed in a simple tomato and basil sauce.",
          image: null,
        },
        {
          title: "Avocado Toast",
          description: "Smashed avocado on toasted sourdough with sea salt and chili flakes.",
          image: null,
        },
        {
          title: "Chicken Curry",
          description: "Warm, spicy chicken curry made with coconut milk and fragrant spices.",
          image: null,
        },
      ]);
      console.log("🍽 Sample recipes seeded");
    }

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`));
  })
  .catch((err) => console.error(err));
