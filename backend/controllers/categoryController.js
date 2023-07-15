const { categoryItem, Item } = require("../sequelize");

exports.getCategory = async (req, res) => {
  try {
    try {
      const categories = await categoryItem.findAll();
      res.json({ categories });
    } catch (error) {
      console.log("Error retrieving categories:", error);
      res.status(500).json({ error: "Failed to retrieve categories" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve category items" });
  }
};

exports.getAllCategoryByName = async (req, res) => {
  try {
    const { categoryName } = req.body;

    // Find the category by name
    const category = await categoryItem.findOne({
      where: { name: categoryName },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Find all items associated with the category

    // already associated with id also as now i'm developing so i'm taking name forgive for this one :)

    const items = await Item.findAll({
      where: { category: categoryName },
    });

    res.json({
      massage: "Data Fetched Successfully",
      data: { categoryId: category.categoryId, categoryList: items },
    });
  } catch (error) {
    console.log("Error retrieving items by category:", error);
    res.status(500).json({ error: "Failed to retrieve items by category" });
  }
};
