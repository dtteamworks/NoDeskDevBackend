import Developer from "../models/developers.js";

// Add new developer → slug manually bana denge
export const addDeveloper = async (req, res) => {
  try {
    // Manually generate slug before create
    const slug = req.body.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");

    // Check if slug already exists
    const existing = await Developer.findOne({ slug });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Developer with this name already exists (slug conflict)",
      });
    }

    const newDev = await Developer.create({
      ...req.body,
      slug, // manually set
    });

    res.status(201).json({
      success: true,
      message: "Developer successfully added!",
      data: newDev,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message.includes("duplicate key")
        ? "Developer with this name already exists"
        : "Invalid data provided",
      error: error.message,
    });
  }
};

// Get all developers
export const getAllDevelopers = async (req, res) => {
  try {
    const allDevs = await Developer.find();
    res.status(200).json({
      success: true,
      count: allDevs.length,
      data: allDevs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching developers",
    });
  }
};

// =================================================================================
// =============== Get single developer by ID ===============
// =================================================================================
export const getDeveloperById = async (req, res) => {
  try {
    const developer = await Developer.findById(req.params.id);
    if (!developer) {
      return res.status(404).json({
        success: false,
        message: "Developer not found",
      });
    }

    res.status(200).json({
      success: true,
      data: developer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get single developer by slug
export const getDeveloperBySlug = async (req, res) => {
  try {
    const developer = await Developer.findOne({ slug: req.params.slug });
    if (!developer) {
      return res.status(404).json({
        success: false,
        message: "Developer not found",
      });
    }

    res.status(200).json({
      success: true,
      data: developer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update developer → agar name change ho to slug bhi update
export const updateDeveloper = async (req, res) => {
  try {
    const developer = await Developer.findById(req.params.id);
    if (!developer) {
      return res.status(404).json({
        success: false,
        message: "Developer not found",
      });
    }

    // Agar name change ho raha hai to naya slug banao
    if (req.body.name && req.body.name !== developer.name) {
      const newSlug = req.body.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");

      const existing = await Developer.findOne({ slug: newSlug });
      if (existing && existing._id.toString() !== req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Another developer with this name already exists",
        });
      }

      req.body.slug = newSlug; // update slug
    }

    Object.assign(developer, req.body);
    const updatedDev = await developer.save();

    res.status(200).json({
      success: true,
      message: "Developer updated successfully",
      data: updatedDev,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid data or validation failed",
      error: error.message,
    });
  }
};

// Delete developer by ID
export const deleteDeveloper = async (req, res) => {
  try {
    const deletedDev = await Developer.findByIdAndDelete(req.params.id);

    if (!deletedDev) {
      return res.status(404).json({
        success: false,
        message: "Developer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Developer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
