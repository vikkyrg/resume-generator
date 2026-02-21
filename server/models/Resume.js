const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    // User who owns this resume
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    themeKey: {
    type: String,   // "theme1", "theme2"
    default: "theme1"
  },

    // Basic Info
    name: String,
    email: String,

    // Template Used
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template"
    },

    // Resume Sections
    personalData: Object,
    projectData: Object,
    educationData: Object,
    workData: Object,
    awardData: Object
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", ResumeSchema);
