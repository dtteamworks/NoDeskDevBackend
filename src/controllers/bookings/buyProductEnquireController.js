// src/controllers/buyProductEnquireController.js
import BuyProductEnquire from "../../models/bookings/BuyProductEnquire.js";

// CREATE Enquiry
export const createBuyEnquiry = async (req, res) => {
  try {
    const enquiryData = req.body;
    const newEnquiry = new BuyProductEnquire(enquiryData);
    await newEnquiry.save();

    res.status(201).json({
      success: true,
      message: "Buy enquiry submitted successfully!",
      data: newEnquiry,
    });
  } catch (error) {
    console.error("Create Buy Enquiry Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to submit enquiry",
    });
  }
};

// GET ALL Enquiries
export const getAllBuyEnquiries = async (req, res) => {
  try {
    const enquiries = await BuyProductEnquire.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET Single Enquiry
export const getBuyEnquiryById = async (req, res) => {
  try {
    const enquiry = await BuyProductEnquire.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }
    res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE Enquiry (status, quote, etc.)
export const updateBuyEnquiry = async (req, res) => {
  try {
    const updatedEnquiry = await BuyProductEnquire.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedEnquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry updated successfully",
      data: updatedEnquiry,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE Enquiry
export const deleteBuyEnquiry = async (req, res) => {
  try {
    const enquiry = await BuyProductEnquire.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }
    res.status(200).json({ success: true, message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};