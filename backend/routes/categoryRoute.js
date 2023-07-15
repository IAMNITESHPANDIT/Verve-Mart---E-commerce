const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// get all Categories

router.get("/getAllCategory", categoryController.getCategory);

//get all items behelf of category

router.post("/getAllCategoryByName", categoryController.getAllCategoryByName);

module.exports = router;
