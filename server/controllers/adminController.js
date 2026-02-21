const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const User = require("../models/User"); // ✅ REQUIRED FOR DELETE

/**
 * ==========================
 * GET ADMIN PROFILE
 * ==========================
 */
exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");

    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    res.json(admin);
  } catch (error) {
    console.error("GET ADMIN PROFILE ERROR:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

/**
 * ==========================
 * UPDATE ADMIN PROFILE
 * ==========================
 */
exports.updateAdminProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const admin = await Admin.findByIdAndUpdate(
      req.admin.id,
      { name, email },
      { new: true }
    ).select("-password");

    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    res.json(admin);
  } catch (error) {
    console.error("UPDATE ADMIN PROFILE ERROR:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

/**
 * ==========================
 * CHANGE ADMIN PASSWORD
 * ==========================
 */
exports.changeAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);

    await admin.save();

    res.json({ msg: "Password updated successfully" });
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

/**
 * ==========================
 * DELETE USER (FINAL WORKING LOGIC)
 * ==========================
 */
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({
      msg: "User deleted successfully",
      deletedUserId: userId,
    });

  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
