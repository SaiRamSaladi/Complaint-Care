const express = require("express");
const Complaint = require("../models/Complaint");

const router = express.Router();

// Get complaints assigned to agent
router.get("/:agentId", async (req, res) => {
  try {
    const complaints = await Complaint.find({
      assignedTo: req.params.agentId,
    });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update complaint status
router.put("/update/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
