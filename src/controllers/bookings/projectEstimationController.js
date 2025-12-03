import ProjectEstimation from "../../models/bookings/ProjectEstimation.js";

// CREATE Estimation Request
export const createProjectEstimation = async (req, res) => {
  try {
    const estimationData = req.body;

    const newEstimation = new ProjectEstimation(estimationData);
    await newEstimation.save();

    res.status(201).json({
      success: true,
      message: "Project estimation request submitted successfully!",
      data: newEstimation,
    });
  } catch (error) {
    console.error("Create ProjectEstimation Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to submit estimation request",
    });
  }
};

// GET ALL Requests
export const getAllProjectEstimations = async (req, res) => {
  try {
    const estimations = await ProjectEstimation.find().sort({ submittedAt: -1 });
    res.status(200).json({
      success: true,
      count: estimations.length,
      data: estimations,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET Single Request
export const getProjectEstimationById = async (req, res) => {
  try {
    const estimation = await ProjectEstimation.findById(req.params.id);
    if (!estimation) {
      return res.status(404).json({ success: false, message: "Estimation request not found" });
    }
    res.status(200).json({ success: true, data: estimation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE Request (status, etc.)
export const updateProjectEstimation = async (req, res) => {
  try {
    const updatedEstimation = await ProjectEstimation.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedEstimation) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    res.status(200).json({
      success: true,
      message: "Estimation updated successfully",
      data: updatedEstimation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE Request
export const deleteProjectEstimation = async (req, res) => {
  try {
    const estimation = await ProjectEstimation.findByIdAndDelete(req.params.id);
    if (!estimation) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }
    res.status(200).json({ success: true, message: "Estimation request deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};