const express = require("express");
const router = express.Router();
const paymentCtrl = require("../controllers/paymentController");
const { authenticateUser } = require("../middleware/authMiddleware");

router.post("/", authenticateUser, paymentCtrl.addPayment);
// ...

module.exports = router;
