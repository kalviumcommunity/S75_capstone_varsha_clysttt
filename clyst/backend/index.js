const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("CLYST Backend Running");
});

app.get("/api/colleges", authMiddleware, (req, res) => {
  res.json([
    { name: "Anna University", location: "Chennai" },
    { name: "PSG College of Technology", location: "Coimbatore" },
    { name: "Loyola College", location: "Chennai" }
  ]);
});

// DB CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
