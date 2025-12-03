import express from "express";
import { createBuyEnquiry, deleteBuyEnquiry, getAllBuyEnquiries, getBuyEnquiryById, updateBuyEnquiry } from "../../controllers/bookings/buyProductEnquireController.js";

const router = express.Router();

// CREATE
router.post("/buy-product-enquire", createBuyEnquiry);

// READ ALL (Admin)
router.get("/buy-enquiries", getAllBuyEnquiries);

// READ SINGLE
router.get("/buy-enquiry/:id", getBuyEnquiryById);

// UPDATE (status, etc.)
router.put("/buy-enquiry/:id", updateBuyEnquiry);

// DELETE
router.delete("/buy-enquiry/:id", deleteBuyEnquiry);

export default router;