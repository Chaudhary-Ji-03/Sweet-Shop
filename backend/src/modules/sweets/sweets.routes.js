const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

// GET all sweets (protected route)
router.get("/", authMiddleware, (req, res) => {
  res.status(200).json([]);
});

// DELETE sweet by id (admin only)
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), (req, res) => {
  res.status(200).json({ message: "Deleted" });
});

module.exports = router;
