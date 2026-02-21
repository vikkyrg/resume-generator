const express = require("express");
const router = express.Router();
const User = require("../models/User");


// ===============================
// GET ALL USERS
// ===============================
router.get("/users", async (req, res) => {
  try {

    const users = await User.find().select(
      "_id name email role status createdAt updatedAt"
    );

    res.json({
      users: users,
      totalUsers: users.length
    });

  } catch (error) {
    console.error("Fetch Users Error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});


// ===============================
// GET SINGLE USER BY ID
// ===============================
router.get("/users/:id", async (req, res) => {
  try {

    const user = await User.findById(req.params.id)
      .select("_id name email role status createdAt updatedAt");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    console.error("Fetch Single User Error:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});


// ===============================
// FIX OLD USERS (RUN ONCE)
// ===============================
router.get("/fix-users", async (req, res) => {
  try {

    const result = await User.updateMany(
      { name: { $exists: false } },
      { $set: { name: "User", role: "user" } }
    );

    res.json({
      message: "Old users updated successfully",
      modified: result.modifiedCount
    });

  } catch (error) {
    console.error("Fix Users Error:", error);
    res.status(500).json({ message: "Failed to update users" });
  }
});


// ===============================
module.exports = router;
