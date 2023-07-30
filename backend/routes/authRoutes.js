const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Register/login user if doesn't exist

router.post("/login", authController.loginUser);

router.post("/register", authController.signupUser);

// Register/login admin if doesn't exist

router.post("/loginAdmin", authController.loginAdmin);

router.post("/registerAdmin", authController.registerAdmin);

router.post(
  "/updateUser",
  authMiddleware.authenticateUser,
  authController.updateUser
);

router.get(
  "/getUserDetail",
  authMiddleware.authenticateUser,
  authController.getUserDetails
);

// logout admin and user if exists

router.get("/logout", authController.logoutUser);

module.exports = router;
