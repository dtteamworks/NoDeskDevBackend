// src/routes/userRoutes.js
import express from "express";
import { getAllUsers, loginUser, registerUser } from "../controllers/userController.js";

const router = express.Router();

// POST /api/register  → Signup
router.post("/register", registerUser);

// POST /api/login     → Login
router.post("/login", loginUser);

// GET /api/users      → Get all users
router.get("/users", getAllUsers);

export default router;
