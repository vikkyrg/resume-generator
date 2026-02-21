const User = require("../models/User");
const Admin = require("../models/Admin"); // ✅ ADD THIS
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * ==========================
 * USER REGISTER
 * POST /api/auth/signup
 * ==========================
 */
exports.register = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // ✅ Require name also
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Name, email and password required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name: name,              // ✅ SAVE REAL NAME
      email: email,
      password: hashedPassword,
      role: "user",
      status: "active"
    });

    await user.save();

    return res.status(201).json({
      msg: "User registered successfully",
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};


/**
 * ==========================
 * USER LOGIN
 * POST /api/auth/login
 * ==========================
 */
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      token,
      msg: "Login successful",
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};


/**
 * ==========================
 * ADMIN LOGIN
 * POST /api/auth/admin-login
 * ==========================
 */
exports.adminLogin = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password required" });
    }

    // ✅ FIND ADMIN FROM DB (NOT HARDCODED)
    const admin = await Admin.findOne({ email: email.trim() });
    if (!admin) {
      return res.status(401).json({
        msg: "Invalid admin credentials",
      });
    }

    // ✅ COMPARE HASHED PASSWORD
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        msg: "Invalid admin credentials",
      });
    }

    // ✅ GENERATE ADMIN TOKEN
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      token,
      msg: "Admin login successful",
    });

  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);
    return res.status(500).json({
      msg: "Server error",
    });
  }
};


/**
 * ==========================
 * GET ALL USERS (ADMIN)
 * GET /api/auth/users
 * ==========================
 */
exports.getAllUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password");

    return res.status(200).json({
      totalUsers: users.length,
      users,
    });

  } catch (error) {
    console.error("GET USERS ERROR:", error);
    return res.status(500).json({
      msg: "Server error",
    });
  }
};
