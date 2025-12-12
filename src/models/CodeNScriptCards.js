import mongoose from "mongoose";

const codeNScriptCardsSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    // Images Array
    images: {
      type: [String],
      required: [true, "At least one image is required"],
      validate: {
        validator: function (arr) {
          return (
            arr.length > 0 &&
            arr.every((img) => typeof img === "string" && img.trim().length > 0)
          );
        },
        message: "At least one valid image URL is required",
      },
    },

    // Code Languages Array
    codeLanguages: {
      type: [String],
      required: [true, "At least one code language is required"],
      validate: {
        validator: function (arr) {
          return (
            arr.length > 0 &&
            arr.every(
              (lang) => typeof lang === "string" && lang.trim().length > 0
            )
          );
        },
        message: "At least one valid programming language is required",
      },
    },

    // Links
    codeLink: {
      type: String,
      required: [true, "Code link is required"],
      trim: true,
      // match: [/^https?:\/\/.+/, "Please provide a valid URL"],
    },

    codePreview: {
      type: String,
      trim: true,
      // match: [/^https?:\/\/.+/, "Please provide a valid URL"],
    },

    previousLink: {
      type: String,
      trim: true,
      // match: [/^https?:\/\/.+/, "Please provide a valid URL"],
    },

    // Requirements
    clientSideRequirements: {
      type: String,
      required: [true, "Client side requirements are required"],
      trim: true,
    },

    // Installation Type Array
    installationType: {
      type: [String],
      required: [true, "At least one installation type is required"],
      enum: {
        values: ["Web", "Android", "iOS", "Desktop", "Server"],
        message: "{VALUE} is not a valid installation type",
      },
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "At least one installation type is required",
      },
    },

    // Pricing
    basePrice: {
      type: Number,
      required: [true, "Base price is required"],
      min: [0, "Base price cannot be negative"],
      default: 1500,
    },

    // Additional Charges (Nested Object)
    additionalCharges: {
      installation: {
        type: Number,
        min: [0, "Installation price cannot be negative"],
        default: 500,
      },
      customization: {
        type: Number,
        min: [0, "Customization price cannot be negative"],
        default: 2000,
      },
      branding: {
        type: Number,
        min: [0, "Branding price cannot be negative"],
        default: 1000,
      },
      paymentGatewayIntegration: {
        type: Number,
        min: [0, "Payment gateway integration price cannot be negative"],
        default: 1500,
      },
      deployment: {
        type: Number,
        min: [0, "Deployment price cannot be negative"],
        default: 800,
      },
      cloudSetup: {
        type: Number,
        min: [0, "Cloud setup price cannot be negative"],
        default: 1200,
      },
      playConsoleUpload: {
        type: Number,
        min: [0, "Play console upload price cannot be negative"],
        default: 300,
      },
      iosConsoleUpload: {
        type: Number,
        min: [0, "iOS console upload price cannot be negative"],
        default: 400,
      },
    },

    // Description
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,

    // Remove __v field from output
    versionKey: false,
  }
);

// Indexes for better query performance
codeNScriptCardsSchema.index({ slug: 1 });
codeNScriptCardsSchema.index({ codeLanguages: 1 });
codeNScriptCardsSchema.index({ installationType: 1 });
codeNScriptCardsSchema.index({ basePrice: 1 });
codeNScriptCardsSchema.index({ createdAt: -1 });

// Create and export the model
const CodeNScriptCards = mongoose.model(
  "CodeNScriptCards",
  codeNScriptCardsSchema
);

module.exports = CodeNScriptCards;
