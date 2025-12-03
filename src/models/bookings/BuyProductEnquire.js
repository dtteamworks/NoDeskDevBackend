import mongoose from "mongoose";

const buyProductEnquireSchema = new mongoose.Schema(
  {
    // Client Information
    name: {
      type: String,
      required: [true, "Your name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    contact: {
      type: String,
      required: [true, "Contact (Email or Phone) is required"],
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: [500, "Message cannot exceed 500 characters"],
    },

    // Product Details
    productId: {
      type: String,
      required: [true, "Product ID is required"],
    },
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    demoLink: {
      type: String,
      trim: true,
    },
    platforms: {
      type: [String], // Array of platforms like ["Web", "Android", "iOS"]
      default: [],
    },
    technologies: {
      type: [String], // Array of tech stack
      default: [],
    },

    // Pricing Information
    basePrice: {
      type: Number,
      required: [true, "Base price is required"],
      min: [0, "Price cannot be negative"],
    },

    // Selected Add-ons (stored as array of objects)
    selectedAddons: [
      {
        label: {
          type: String,
          required: true,
        },
        cost: {
          type: Number,
          required: true,
          min: [0, "Cost cannot be negative"],
        },
      },
    ],

    addonsTotal: {
      type: Number,
      default: 0,
      min: [0, "Addons total cannot be negative"],
    },
    serviceFee: {
      type: Number,
      default: 0,
      min: [0, "Service fee cannot be negative"],
    },
    finalTotal: {
      type: Number,
      required: [true, "Final total is required"],
      min: [0, "Total cannot be negative"],
    },

    // Enquiry Status
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "In Review", "Contacted", "Quoted", "Closed"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Indexes for faster searches
buyProductEnquireSchema.index({ contact: 1 });
buyProductEnquireSchema.index({ productId: 1 });
buyProductEnquireSchema.index({ status: 1 });

const BuyProductEnquire = mongoose.model("BuyProductEnquire", buyProductEnquireSchema);

export default BuyProductEnquire;