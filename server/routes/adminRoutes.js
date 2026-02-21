const express = require("express");
const router = express.Router();

// ================= MIDDLEWARE =================
const adminAuth = require("../middleware/adminAuth");

// ================= CONTROLLERS =================
const {
  adminLogin,
  getAllUsers,
} = require("../controllers/authController");

const {
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
  deleteUser, // ✅ ADDED
} = require("../controllers/adminController");

const { getResumeById } = require("../controllers/resumeController");

// ================= ADMIN AUTH =================

// Admin Login
// POST /api/admin/login
router.post("/login", adminLogin);

// ================= ADMIN PROFILE =================

// Get Admin Profile
// GET /api/admin/profile
router.get("/profile", adminAuth, getAdminProfile);

// Update Admin Profile
// PUT /api/admin/profile
router.put("/profile", adminAuth, updateAdminProfile);

// Change Admin Password
// PUT /api/admin/change-password
router.put("/change-password", adminAuth, changeAdminPassword);

// ================= ADMIN DATA =================

// Get All Users
// GET /api/admin/users
router.get("/users", adminAuth, getAllUsers);

// ✅ DELETE USER (THIS WAS MISSING)
/// DELETE /api/admin/users/:id
router.delete("/users/:id", adminAuth, deleteUser);

// Get Resume By ID
// GET /api/admin/resume/:id
router.get("/resume/:id", adminAuth, getResumeById);

module.exports = router;
