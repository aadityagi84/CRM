const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isUserActive: {
    type: Boolean,
    default: false,
  },

  role: {
    type: Number,
    enum: [1, 2, 3],
    default: 3, // 1 for user, 2 for admin, 3 for sales executive
    // 1: user, 2: admin, 3: sales executive
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
