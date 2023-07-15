const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// get all Categories

router.get("/", categoryController.getCategory);

module.exports = router;
