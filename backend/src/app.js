const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const authRoutes = require("./modules/auth/auth.routes");
const sweetRoutes = require("./modules/sweets/sweets.routes");


app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

module.exports = app;
