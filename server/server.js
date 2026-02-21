const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const connectDB = require("./config/db");

dotenv.config();

// ================= APP INIT =================
const app = express();
app.use(cors());
app.use(express.json());

// ================= DATABASE =================
connectDB(); // uses MONGO_URI from .env

// ================= ENSURE UPLOAD FOLDER EXISTS (IMPORTANT FOR RENDER) =================
const uploadPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// ================= STATIC UPLOADS =================
app.use("/uploads", express.static(uploadPath));

// ================= MULTER SETUP =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ================= TEMPLATE MODEL =================
const TemplateSchema = new mongoose.Schema({
  name: String,
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

// User Routes (separate from admin)
app.use("/api/users", require("./routes/userRoutes"));

// ================= TEMPLATE ROUTES =================

// Get Templates
app.get("/api/templates", async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching templates" });
  }
});

// Add Template
app.post("/api/templates", upload.single("image"), async (req, res) => {
  try {
    const newTemplate = new Template({
      name: req.body.name,
      image: req.file ? req.file.filename : null,
      componentKey: req.body.componentKey
    });

    await newTemplate.save();
    res.json({ message: "Template Added" });
  } catch (error) {
    res.status(500).json({ message: "Error adding template" });
  }
});

// Update Template
app.put("/api/templates/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      componentKey: req.body.componentKey
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    await Template.findByIdAndUpdate(req.params.id, updateData);
    res.json({ message: "Template Updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating template" });
  }
});

// Delete Template
app.delete("/api/templates/:id", async (req, res) => {
  try {
    await Template.findByIdAndDelete(req.params.id);
    res.json({ message: "Template Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting template" });
  }
});

// ================= HEALTH CHECK ROUTE (FOR RENDER TEST) =================
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});