import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY || "1d";

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ success: false, message: "Username and password required" });

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
    res.json({ success: true, message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
