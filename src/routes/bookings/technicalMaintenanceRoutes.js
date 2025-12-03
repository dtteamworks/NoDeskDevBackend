import express from "express";
import { createTechnicalMaintenance, deleteTechnicalMaintenance, getAllTechnicalMaintenances, getTechnicalMaintenanceById, updateTechnicalMaintenance } from "../../controllers/bookings/technicalMaintenanceController.js";

const router = express.Router();

// CREATE - Client submits maintenance request
router.post("/technical-maintenance", createTechnicalMaintenance);

// GET ALL - Admin panel
router.get("/technical-maintenances", getAllTechnicalMaintenances);

// GET SINGLE
router.get("/technical-maintenance/:id", getTechnicalMaintenanceById);

// UPDATE (status, etc.)
router.put("/technical-maintenance/:id", updateTechnicalMaintenance);

// DELETE
router.delete("/technical-maintenance/:id", deleteTechnicalMaintenance);

export default router;