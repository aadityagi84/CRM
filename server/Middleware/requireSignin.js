const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");
const cookies = require("cookie-parser");
require("dotenv").config();

exports.requireSignin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    console.log("Token:", token);
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorized" });
  }
};
