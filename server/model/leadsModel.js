const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    source: {
      type: String,
      enum: ["Website", "Social Media", "Referral", "Event", "Other"],
      default: "Website",
    },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "lost", "converted"],
      default: "new",
    },
    assigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const lead = mongoose.model("lead", leadSchema);
module.exports = lead;
