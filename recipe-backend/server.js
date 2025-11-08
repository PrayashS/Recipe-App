import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import bcrypt from "bcryptjs";
import helmet from "helmet";
import morgan from "morgan";

import adminRoutes from "./routes/adminRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import Admin from "./models/Admin.js";
import Recipe from "./models/Recipe.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Frontend URL
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Helmet with cross-origin images allowed
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(morgan("dev"));
app.use(express.json());

// CORS for frontend
app.use(cors({ origin: FRONTEND_URL }));

// Ensure uploads folder exists
const uploadsPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath);

// Serve uploads folder with explicit CORS headers
app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", FRONTEND_URL);
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS");
    next();
  },
  express.static(uploadsPath)
);

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/recipes", recipeRoutes);

app.get("/", (req, res) => res.send("✅ Recipe backend running"));

// MongoDB connection + seed
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");

    const existingAdmin = await Admin.findOne({ username: "admin" });
    if (!existingAdmin) {
      const hashed = await bcrypt.hash("password123", 10);
      await Admin.create({ username: "admin", password: hashed });
      console.log("👑 Default admin created: admin/password123");
    }

    const count = await Recipe.countDocuments();
    if (count === 0) {
      await Recipe.insertMany([
        { title: "Classic Spaghetti", description: "Delicious spaghetti tossed in tomato sauce.", image: null },
        { title: "Avocado Toast", description: "Smashed avocado on toasted bread.", image: null },
        { title: "Chicken Curry", description: "Warm chicken curry with spices.", image: null },
      ]);
      console.log("🍽 Sample recipes seeded");
    }

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error(err));
