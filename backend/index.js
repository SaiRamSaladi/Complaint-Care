const express = require("express");
const cors = require("cors");
const connectDB = require("./config");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const adminRoutes = require("./routes/adminRoutes");
const agentRoutes = require("./routes/agentRoutes");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/agent", agentRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("ComplaintCare API is Running...");
});

// Start Server
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
