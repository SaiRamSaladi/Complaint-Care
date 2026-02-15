const express = require("express");
const User = require("../models/User");
const Complaint = require("../models/Complaint");

const router = express.Router();

// Get all agents
router.get("/agents", async (req, res) => {
  try {
    const agents = await User.find({ userType: "agent" });
    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all complaints
router.get("/complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("assignedTo");
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Assign complaint to agent
router.put("/assign/:id", async (req, res) => {
  try {
    const { agentId } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        assignedTo: agentId,
        status: "Assigned",
      },
      { new: true }
    );

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

// Complaint Statistics
router.get("/stats", async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: "Pending" });
    const assigned = await Complaint.countDocuments({ status: "Assigned" });
    const resolved = await Complaint.countDocuments({ status: "Resolved" });

    res.json({
      total,
      pending,
      assigned,
      resolved
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

