const { categoryItem } = require("../sequelize");

exports.getCategory = async (req, res) => {
  try {
    try {
      const categories = await categoryItem.findAll();
      res.json({ categories });
    } catch (error) {
      console.log("Error retrieving categories:", error);
      res.status(500).json({ error: "Failed to retrieve categories" });
    }
  } catch (error) {}
};
