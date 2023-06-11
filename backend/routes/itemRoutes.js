const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemControlller");
const authMiddleware = require("../middleware/authMiddleware");

// Define item routes

router.get("/", authMiddleware.authenticateUser, itemController.getAllItems);

router.get("/", authMiddleware.authenticateUser, itemController.getAllItems);
router.get("/:id", authMiddleware.authenticateUser, itemController.getItemById);
router.post("/", authMiddleware.authenticateUser, itemController.createItem);
router.put("/:id", authMiddleware.authenticateUser, itemController.updateItem);
router.delete(
  "/:id",
  authMiddleware.authenticateUser,
  itemController.deleteItem
);

module.exports = router;
