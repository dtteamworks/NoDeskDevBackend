import mongoose from "mongoose";

const technicalMaintenanceSchema = new mongoose.Schema(
  {
    // Project Information
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    projectLink: {
      type: String,
      required: [true, "Project link is required"],
      trim: true,
    },
    codeTypes: {
      type: [String], // Array of code types like ["PHP", "JavaScript", "Flutter"]
      required: [true, "At least one code type is required"],
      default: [],
    },

    // Communication Details
    language: {
      type: String,
      required: [true, "Language is required"],
      trim: true,
    },
    discussionTime: {
      type: String,
      required: [true, "Discussion time is required"],
      trim: true,
    },

    // Submission Tracking
    submittedAt: {
      type: Date,
      default: Date.now,
    },

    // Request Status
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Under Review", "In Progress", "Completed", "Cancelled"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Indexes for faster searches
technicalMaintenanceSchema.index({ category: 1 });
technicalMaintenanceSchema.index({ status: 1 });
technicalMaintenanceSchema.index({ submittedAt: 1 });

const TechnicalMaintenance = mongoose.model("TechnicalMaintenance", technicalMaintenanceSchema);

export default TechnicalMaintenance;