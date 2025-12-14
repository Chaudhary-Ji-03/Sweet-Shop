const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");
const sweetController = require("./sweets.controller");

router.post("/", authMiddleware, roleMiddleware("ADMIN"), sweetController.createSweet);
router.get("/", authMiddleware, sweetController.getAllSweets);
router.delete("/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  (req, res) => res.status(204).send()
);

router.get("/search", authMiddleware, sweetController.searchSweets);
router.post("/:id/purchase", authMiddleware, sweetController.purchaseSweet);
router.post("/:id/restock", authMiddleware, roleMiddleware("ADMIN"), sweetController.restockSweet);

module.exports = router;
