const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const connectDB = require("./config/db");

dotenv.config();

// ================= APP INIT =================
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.json());
app.use("/api/resumes", require("./routes/resumeRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));


// ================= DATABASE =================
connectDB();   // uses MONGO_URI from .env


// ================= STATIC UPLOADS =================
app.use("/uploads", express.static("uploads"));


// ================= MULTER SETUP =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
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
app.use("/api/resume", require("./routes/resumeRoutes"));

// Admin Routes
app.use("/api/admin", require("./routes/adminRoutes"));

// ✅ USER ROUTES (ADD THIS LINE)
app.use("/api/admin", require("./routes/userRoutes"));


// ---------------- TEMPLATE ROUTES ----------------

// Get Templates
app.get("/api/templates", async (req, res) => {
  const templates = await Template.find();
  res.json(templates);
});

// Add Template
app.post("/api/templates", upload.single("image"), async (req, res) => {
  const newTemplate = new Template({
    name: req.body.name,
    image: req.file.filename,
    componentKey: req.body.componentKey
  });

  await newTemplate.save();
  res.json({ message: "Template Added" });
});


// Update Template
app.put("/api/templates/:id", upload.single("image"), async (req, res) => {
  const updateData = {
    name: req.body.name,
    componentKey: req.body.componentKey
  };

  if (req.file) {
    updateData.image = req.file.filename;
  }

  await Template.findByIdAndUpdate(req.params.id, updateData);
  res.json({ message: "Template Updated" });
});


// Delete Template
app.delete("/api/templates/:id", async (req, res) => {
  await Template.findByIdAndDelete(req.params.id);
  res.json({ message: "Template Deleted" });
});


// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
