const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");
const sweetController = require("./sweets.controller");

router.post("/", authMiddleware, roleMiddleware("ADMIN"), sweetController.createSweet);
router.get("/", authMiddleware, sweetController.getAllSweets);
router.get("/search", authMiddleware, sweetController.searchSweets);
router.post("/:id/purchase", authMiddleware, sweetController.purchaseSweet);
router.post("/:id/restock", authMiddleware, roleMiddleware("ADMIN"), sweetController.restockSweet);
router.put("/:id", authMiddleware, roleMiddleware("ADMIN"), sweetController.updateSweet);
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), sweetController.deleteSweet);

module.exports = router;
