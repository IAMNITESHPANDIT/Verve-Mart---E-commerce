const express = require("express");

const router = express.Router();

const addressController = require("../controllers/addressController");

// Get addres information

router.post("/", addressController.getCountries);

router.post("/getState", addressController.getState);

router.post("/getDistrict", addressController.getDistricts);

module.exports = router;
