const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.token; 
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
