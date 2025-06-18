const { deleteUser } = require("../../dbquries/deleteUser");

const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await deleteUser(userId);
    if (deletedUser) {
      res.status(200).json({
        success: true,
        data: deletedUser,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
