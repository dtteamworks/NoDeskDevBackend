import TechnicalMaintenance from "../../models/bookings/TechnicalMaintenance.js";

// CREATE Request
export const createTechnicalMaintenance = async (req, res) => {
  try {
    const requestData = req.body;

    const newRequest = new TechnicalMaintenance(requestData);
    await newRequest.save();

    res.status(201).json({
      success: true,
      message: "Technical maintenance request submitted successfully!",
      data: newRequest,
    });
  } catch (error) {
    console.error("Create TechnicalMaintenance Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to submit request",
    });
  }
};

// GET ALL Requests
export const getAllTechnicalMaintenances = async (req, res) => {
  try {
    const requests = await TechnicalMaintenance.find().sort({ submittedAt: -1 });
    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET Single Request
export const getTechnicalMaintenanceById = async (req, res) => {
  try {
    const request = await TechnicalMaintenance.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }
    res.status(200).json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE Request (mainly status)
export const updateTechnicalMaintenance = async (req, res) => {
  try {
    const updatedRequest = await TechnicalMaintenance.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    res.status(200).json({
      success: true,
      message: "Request updated successfully",
      data: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE Request
export const deleteTechnicalMaintenance = async (req, res) => {
  try {
    const request = await TechnicalMaintenance.findByIdAndDelete(req.params.id);
    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }
    res.status(200).json({ success: true, message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};