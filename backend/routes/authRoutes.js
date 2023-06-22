const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Register/login user if doesn't exist

router.post("/login", authController.loginUser);
router.post("/register", authController.signupUser);

// Register/login admin if doesn't exist

router.post("/loginAdmin", authController.loginAdmin);
router.post("/registerAdmin", authController.registerAdmin);

// logout admin and user if exists

router.get("/logout", authController.logoutUser);

module.exports = router;
