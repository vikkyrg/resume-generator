const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function (req, res, next) {
try {
// ===============================
// GET AUTH HEADER
// ===============================
const authHeader = req.header("Authorization");


if (!authHeader) {
  return res.status(401).json({ msg: "No token, authorization denied" });
}

// ===============================
// SUPPORT BOTH FORMATS:
// 1) "Bearer TOKEN"
// 2) "TOKEN"
// ===============================
let token;

if (authHeader.startsWith("Bearer ")) {
  token = authHeader.split(" ")[1]; // remove Bearer
} else {
  token = authHeader;
}

// ===============================
// VERIFY TOKEN
// ===============================
const decoded = jwt.verify(token, process.env.JWT_SECRET);

// ===============================
// FIND USER
// ===============================
const user = await User.findById(decoded.id).select("-password");

if (!user) {
  return res.status(401).json({ msg: "User not found" });
}

// ===============================
// ATTACH USER TO REQUEST
// ===============================
req.user = user;

next();


} catch (err) {
console.error("Auth Middleware Error:", err.message);
res.status(401).json({ msg: "Token is not valid" });
}
};
