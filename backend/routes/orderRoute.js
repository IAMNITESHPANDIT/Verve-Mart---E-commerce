const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderController");

// GET /orders/total

router.get("/totalOrders", authenticateUser, orderController.getTotalOrders);

router.post("/getAllOrders", authenticateUser, orderController.getAllOrdersById);

module.exports = router;
