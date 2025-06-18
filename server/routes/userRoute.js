const express = require("express");
const { signUpController } = require("../controller/Auth/signUpController");
const {
  checkRegistration,
  checkLogin,
  checkLead,
} = require("../Helpers/UserValidator");
const { LoginController } = require("../controller/Auth/SignInController");
const {
  genrateLeads,
  fetchAllUsers,
  getAllLeads,
} = require("../controller/Leads/leadsController");
const { requireSignin } = require("../Middleware/requireSignin");
const router = express.Router();

// User registration and login routes
router.post("/register", checkRegistration, signUpController);
router.post("/login", checkLogin, LoginController);

// Additional routes can be added here for user management, such as updating user info, deleting users, etc.
router.post("/leads", checkLead, requireSignin, genrateLeads);
router.get("/fetchAllUsers", fetchAllUsers);
router.get("/getAllLeads", getAllLeads);

// check token
router.get("/checkToken", requireSignin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Token is valid",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

module.exports = router;
