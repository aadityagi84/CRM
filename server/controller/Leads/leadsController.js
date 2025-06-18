const { validationResult } = require("express-validator");
const lead = require("../../model/leadsModel");
const mongoose = require("mongoose");
const User = require("../../model/UserModel");

// to get users for assinged thier values
const fetchAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({ isUserActive: true, role: 3 });
    if (allUsers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No active users found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Active users fetched successfully",
      data: allUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// genrate leads by admin apply for admin and sales executive
const genrateLeads = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].Message,
        errors: errors.array(),
      });
    }
    const { name, email, phone, source, status, assigned, notes } = req.body;
    const createdBy = req.user._id;
    if (!createdBy) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }
    if (!name || !email || !phone || !source || !status) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(assigned)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID" });
    }
    const userExists = await User.findById(assigned, { role: 2 });
    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, message: "assigned user not found" });
    }

    if (userExists.role !== 2) {
      return res
        .status(403)
        .json({ success: false, message: "User is not authorized" });
    }

    let mappedSource;

    if (source == 1) mappedSource = "Website";
    else if (source == 2) mappedSource = "Social Media";
    else if (source == 3) mappedSource = "Referral";
    else if (source == 4) mappedSource = "Event";
    else if (source == 5) mappedSource = "Other";
    else {
      return res.status(400).json({
        success: false,
        message: "Invalid source value",
      });
    }
    let mappedStatus;

    if (status == 1) mappedStatus = "new";
    else if (status == 2) mappedStatus = "contacted";
    else if (status == 3) mappedStatus = "qualified";
    else if (status == 4) mappedStatus = "lost";
    else if (status == 5) mappedStatus = "converted";
    else {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const leadGenrate = new lead({
      name,
      email,
      phone,
      source: mappedSource,
      status: mappedStatus,
      assigned,
      createdBy,
      notes,
    });
    await leadGenrate.save();
    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      lead: leadGenrate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// getAllLeads
const getAllLeads = async (req, res) => {
  try {
    const allLeads = await Lead.find()
      .populate("assigned", "-password -__v") // Populate assigned user, exclude password
      .populate("createdBy", "-password -__v"); // Populate creator user

    if (allLeads.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No leads found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Leads fetched successfully",
      data: allLeads,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  genrateLeads,
  fetchAllUsers,
  getAllLeads,
};
