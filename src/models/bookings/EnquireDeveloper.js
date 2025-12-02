import mongoose from "mongoose";

const enquireDeveloperSchema = new mongoose.Schema(
  {
    // Client Information
    clientName: {
      type: String,
      required: [true, "Your name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
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
    
    // Project Details
    projectType: {
      type: String,
      required: [true, "Project type is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    
    // Developer Information
    developer: {
      id: {
        type: String,
        required: [true, "Developer ID is required"],
      },
      name: {
        type: String,
        required: [true, "Developer name is required"],
        trim: true,
      },
      level: {
        type: String,
        required: true,
        enum: ["Beginner", "Intermediate", "Expert"],
      },
      experience: {
        type: Number,
        required: [true, "Experience in years is required"],
        min: [0, "Experience cannot be negative"],
      },
      hourlyRate: {
        type: Number,
        required: [true, "Hourly rate is required"],
        min: [1, "Rate must be at least 1"],
      },
    },
    
    // Enquiry Status
    status: {
      type: String,
      default: "New",
      enum: ["New", "Reviewed", "Contacted", "Closed"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Indexes for faster searches
enquireDeveloperSchema.index({ email: 1 });
enquireDeveloperSchema.index({ "developer.id": 1 });
enquireDeveloperSchema.index({ status: 1 });

const EnquireDeveloper = mongoose.model("EnquireDeveloper", enquireDeveloperSchema);

export default EnquireDeveloper;