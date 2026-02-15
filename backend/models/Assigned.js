const mongoose = require("mongoose");

const assignedSchema = new mongoose.Schema({
  complaintId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Complaint",
    required: true
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    default: "Assigned"
  }
}, { timestamps: true });

module.exports = mongoose.model("Assigned", assignedSchema);
