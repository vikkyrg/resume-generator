const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("./config/db");

// ✅ USE CLOUDINARY MULTER (NOT LOCAL MULTER)
const upload = require("./config/multerCloudinary");

dotenv.config();

// ================= APP INIT =================
const app = express();

// ✅ IMPORTANT FOR RENDER (behind proxy)
app.set("trust proxy", 1);

// ================= CORS FIX (VERCEL + LOCALHOST + PREFLIGHT) =================
app.use(
  cors({
    origin: true, // allow all origins (needed for dynamic vercel URLs)
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight (fixes 405 error)
app.options(/.*/, cors());

// ================= BODY PARSER =================
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ================= DATABASE =================
connectDB();

// ================= TEMPLATE MODEL =================
const TemplateSchema = new mongoose.Schema({
  name: String,

  // ✅ THIS NOW STORES CLOUDINARY URL (NOT filename)
  image: String,

  componentKey: String
});

const Template = mongoose.model("Template", TemplateSchema);

// ================= ROUTES =================

// Auth Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Resume Routes
app.use("/api/resumes", require("./routes/resumeRoutes"));

// Admin Routes
app.use("/api/admin", require("./routes/adminRoutes"));

// User Routes
app.use("/api/users", require("./routes/userRoutes"));

// ================= TEMPLATE ROUTES =================

// ✅ GET ALL TEMPLATES
app.get("/api/templates", async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching templates" });
  }
});

// ✅ ADD TEMPLATE (UPLOADS IMAGE TO CLOUDINARY)
app.post("/api/templates", upload.single("image"), async (req, res) => {
  try {
    const newTemplate = new Template({
      name: req.body.name,

      // ✅ CLOUDINARY RETURNS FULL URL HERE
      image: req.file ? req.file.path : null,

      componentKey: req.body.componentKey
    });

    await newTemplate.save();

    res.json({
      message: "Template Added",
      template: newTemplate
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding template" });
  }
});

// ✅ UPDATE TEMPLATE
app.put("/api/templates/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      componentKey: req.body.componentKey
    };

    // if new image uploaded → replace URL
    if (req.file) {
      updateData.image = req.file.path;
    }

    await Template.findByIdAndUpdate(req.params.id, updateData);

    res.json({ message: "Template Updated" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating template" });
  }
});

// ✅ DELETE TEMPLATE
app.delete("/api/templates/:id", async (req, res) => {
  try {
    await Template.findByIdAndDelete(req.params.id);
    res.json({ message: "Template Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting template" });
  }
});

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});