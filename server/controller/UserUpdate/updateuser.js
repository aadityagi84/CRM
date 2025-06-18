const { updateUser } = require("../../dbquries/updateuser");

const upDateUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, isUserActive, role } = req.body;
    const updatepayload = {
      name,
      isUserActive,
      role,
    };

    const updatedUserData = await updateUser(userId, updatepayload);
    if (updatedUserData) {
      res.status(200).json({
        success: true,
        data: updatedUserData,
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
