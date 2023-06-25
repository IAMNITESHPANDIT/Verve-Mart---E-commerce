const express = require("express");

const router = express.Router();

const addressController = require("../controllers/addressController");
const { authenticateUser } = require("../middleware/authMiddleware");

// Get addres information
router.post("/", addressController.getCountries);

router.post("/getState", addressController.getState);

router.post("/getDistrict", addressController.getDistricts);

// POST /address
router.post("/addAddress", authenticateUser, addressController.saveAddress);

module.exports = router;
