const express = require("express");
const router = express.Router();
const sliderController = require("../controllers/sliderController");
const authMiddleware = require("../middleware/authMiddleware");

// Get all sliders
router.get("/", sliderController.getSliders);

// Create a new slider
router.post("/", authMiddleware.isAdmin, sliderController.createSlider);

// Update a slider
router.put("/:id", authMiddleware.isAdmin, sliderController.updateSlider);

// Delete a slider
router.delete("/:id", authMiddleware.isAdmin, sliderController.deleteSlider);

module.exports = router;
