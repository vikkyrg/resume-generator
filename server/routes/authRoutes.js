const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/me", authMiddleware, async (req, res) => {
  res.json(req.user);
});

const {
  register,
  login,
  adminLogin,
  getAllUsers
} = require("../controllers/authController");

// AUTH ROUTES
router.post("/signup", register);
router.post("/login", login);
router.post("/admin-login", adminLogin);

// USERS (optional)
router.get("/users", getAllUsers); // later protect with admin middleware

module.exports = router;
