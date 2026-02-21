const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  saveResume,
  getResume,
  getAllResumes,
  getResumeById,
  deleteResume,
  clearMyResume   // ✅ NEW CONTROLLER
} = require("../controllers/resumeController");


// ===============================
// USER ROUTES (Protected)
// ===============================

// Save resume (Auto Save)
router.post("/save", auth, saveResume);

// Get logged-in user's resume
router.get("/get", auth, getResume);

// ✅ NEW → Clear ONLY logged-in user's resume
router.delete("/clear", auth, clearMyResume);


// ===============================
// ADMIN ROUTES
// ===============================

// Get all resumes (with user name & email)
router.get("/", getAllResumes);

// Get resume by ID (Admin View)
router.get("/:id", getResumeById);

// Delete resume by ID (Admin Delete)
router.delete("/:id", deleteResume);


module.exports = router;
