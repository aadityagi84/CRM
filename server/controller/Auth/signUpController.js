const { validationResult } = require("express-validator");
const User = require("../../model/UserModel");
const bcrypt = require("bcrypt");
const signUpController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].Message,
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      return res.status(200).json({
        success: false,
        message: "Accound already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.log("Error from SignUp", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { signUpController };
