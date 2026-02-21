const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ msg: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = { id: decoded.id };

    next();
  } catch (error) {
    console.error("ADMIN AUTH ERROR:", error);
    return res.status(401).json({ msg: "Token invalid" });
  }
};

module.exports = adminAuth;
