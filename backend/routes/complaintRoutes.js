const express = require("express");
const Complaint = require("../models/Complaint");
const Message = require("../models/Message");

const router = express.Router();

// Create Complaint
router.post("/create", async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    await complaint.save();
    res.status(201).json({ message: "Complaint submitted successfully", complaint });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Complaints by User
router.get("/user/:userId", async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.params.userId });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Complaints (Admin)
router.get("/all", async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("userId", "name email");
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send Message (Chat)
router.post("/message", async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Messages by Complaint
router.get("/message/:complaintId", async (req, res) => {
  try {
    const messages = await Message.find({ complaintId: req.params.complaintId })
      .populate("senderId", "name userType");
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
