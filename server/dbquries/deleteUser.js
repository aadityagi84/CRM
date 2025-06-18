const mongoose = require("mongoose");
const User = require("../model/UserModel");

exports.deleteUser = async (userId) => {
  try {
    const isUser = mongoose.Types.ObjectId.isValid(userId);
    if (!isUser) {
      throw new Error("Invalid user ID");
    }
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new Error("User not found");
    }
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
};
