import express from "express";
import { getMe, loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);        // ← Protected route
router.post("/logout", logoutUser);

export default router;