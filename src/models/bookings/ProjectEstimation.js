import mongoose from "mongoose";

const projectEstimationSchema = new mongoose.Schema(
  {
    // Client Information
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    whatsapp: {
      type: String,
      required: [true, "WhatsApp number is required"],
      trim: true,
    },

    // Project Details
    aboutProduct: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    productType: {
      type: String,
      required: [true, "Product type is required"],
      trim: true,
    },
    codingLangs: {
      type: [String], // Array of coding languages like ["React", "Node", "Flutter"]
      required: [true, "At least one coding language is required"],
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

    // Estimation Status
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Under Review", "Estimated", "Approved", "Rejected"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Indexes for faster searches
projectEstimationSchema.index({ email: 1 });
projectEstimationSchema.index({ phone: 1 });
projectEstimationSchema.index({ status: 1 });
projectEstimationSchema.index({ submittedAt: 1 });

const ProjectEstimation = mongoose.model("ProjectEstimation", projectEstimationSchema);

export default ProjectEstimation;