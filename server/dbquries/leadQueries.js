const mongoose = require("mongoose");
const lead = require("../model/leadsModel");

// 🔍 Get single lead with user details
// use like this from call this query
// const leadId = req.params.id;
// const leadData = await getLeadWithUsers(leadId);
exports.getLeadWithUsers = async (leadId) => {
  return await lead.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(leadId) } },
    {
      $lookup: {
        from: "users",
        localField: "assigned",
        foreignField: "_id",
        as: "assignedUser",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdByUser",
      },
    },
    { $unwind: { path: "$assignedUser", preserveNullAndEmptyArrays: true } },
    { $unwind: { path: "$createdByUser", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        name: 1,
        email: 1,
        phone: 1,
        source: 1,
        status: 1,
        notes: 1,
        createdAt: 1,
        updatedAt: 1,
        "assignedUser.name": 1,
        "assignedUser.email": 1,
        "createdByUser.name": 1,
        "createdByUser.email": 1,
      },
    },
  ]);
};
