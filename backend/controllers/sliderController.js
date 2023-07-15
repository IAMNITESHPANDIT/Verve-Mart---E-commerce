const { Slider } = require("../sequelize");

// Get all sliders
exports.getSliders = async (req, res) => {
  console.log("method exectued");
  try {
    const sliders = await Slider.findAll({ order: [["order", "ASC"]] });
    res.json({ data: sliders });
  } catch (error) {
    console.error("Error fetching sliders:", error);
    res.status(500).json({ error: "Failed to fetch sliders" });
  }
};

// Create a new slider
exports.createSlider = async (req, res) => {
  try {
    const { title, image, description, order } = req.body;
    const slider = await Slider.create({ title, image, description, order });
    res.status(201).json({ data: slider });
  } catch (error) {
    console.error("Error creating slider:", error);
    res.status(500).json({ error: "Failed to create slider" });
  }
};

// Update a slider
exports.updateSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, description, order } = req.body;

    const [updatedRowsCount, [updatedSlider]] = await Slider.update(
      { title, image, description, order },
      { where: { id }, returning: true }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "Slider not found" });
    }

    res.json({ data: updatedSlider });
  } catch (error) {
    console.error("Error updating slider:", error);
    res.status(500).json({ error: "Failed to update slider" });
  }
};

// Delete a slider
exports.deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRowsCount = await Slider.destroy({ where: { id } });

    if (deletedRowsCount === 0) {
      return res.status(404).json({ error: "Slider not found" });
    }

    res.json({ message: "Slider deleted successfully" });
  } catch (error) {
    console.error("Error deleting slider:", error);
    res.status(500).json({ error: "Failed to delete slider" });
  }
};
