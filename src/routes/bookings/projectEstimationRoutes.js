import express from "express";
import { createProjectEstimation, deleteProjectEstimation, getAllProjectEstimations, getProjectEstimationById, updateProjectEstimation } from "../../controllers/bookings/projectEstimationController.js";

const router = express.Router();

// CREATE - Client submits estimation request
router.post("/project-estimation", createProjectEstimation);

// GET ALL - Admin panel
router.get("/project-estimations", getAllProjectEstimations);

// GET SINGLE
router.get("/project-estimation/:id", getProjectEstimationById);

// UPDATE (status, notes, etc.)
router.put("/project-estimation/:id", updateProjectEstimation);

// DELETE
router.delete("/project-estimation/:id", deleteProjectEstimation);

export default router;
