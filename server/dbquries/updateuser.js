const mongoose = require("mongoose");

exports.updateUser = async (userId, Updateddata) => {
  try {
    const validId = mongoose.Types.ObjectId.isValid(userId);
    if (!validId) {
      throw new Error("Invalid user ID");
    }
    const updatedUser = await User.findByIdAndUpdate(userId, Updateddata, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};
