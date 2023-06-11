const { Item } = require("../sequelize/index");

exports.getAllItems = async (req, res) => {
  try {
    const user = req.user;
    const items = await Item.findAll({ where: { UserId: user.id } });
    if (items.length === 0) {
      return res.status(200).json({ message: "No items found" });
    }
    res.json(items);
  } catch (error) {
    console.log("Error retrieving items: ", error);
    res.status(500).json({ error: "Failed to retrieve items" });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const itemId = req.params.id;
    const user = req.user;
    const item = await Item.findOne({ where: { id: itemId, UserId: user.id } });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (item.length === 0) {
      return res.status(200).json({ message: "No items found" });
    }
    res.json({ message: "items are following..", data: item });
  } catch (error) {
    console.log("Error retrieving item: ", error);
    res.status(500).json({ error: "Failed to retrieve item" });
  }
};

exports.createItem = async (req, res) => {
  try {
    const {
      sku,
      itemName,
      category,
      price,
      description,
      stock,
      reviewStars,
      size,
      color,
      image,
    } = req.body;

    // Validate required fields
    if (!sku || !itemName || !category || !price || !stock) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate data types
    if (
      typeof sku !== "string" ||
      typeof itemName !== "string" ||
      typeof category !== "string" ||
      typeof price !== "number" ||
      typeof stock !== "number"
    ) {
      return res.status(400).json({ error: "Invalid data types" });
    }

    const user = req.user;
    const item = await Item.create({
      sku,
      itemName,
      category,
      price,
      description,
      stock,
      reviewStars,
      size,
      color,
      UserId: user.id,
      image,
    });

    res.status(201).json({ message: "Item is created" });
  } catch (error) {
    console.log("Error creating item: ", error.message);
    res.status(500).json({ error: `Failed to create item ${error.message}` });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const user = req.user;
    const {
      sku,
      itemName,
      category,
      price,
      description,
      stock,
      reviewStars,
      size,
      color,
    } = req.body;

    const item = await Item.findOne({ where: { id: itemId, UserId: user.id } });
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Update the item fields
    item.sku = sku;
    item.itemName = itemName;
    item.category = category;
    item.price = price;
    item.description = description;
    item.stock = stock;
    item.reviewStars = reviewStars;
    item.size = size;
    item.color = color;

    await item.save();

    res.json(item);
  } catch (error) {
    console.log("Error updating item: ", error);
    res.status(500).json({ error: "Failed to update item" });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    // Find the item by ID
    const item = await Item.findOne({ where: { itemId } });
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Delete the item
    await item.destroy();

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    // Handle error
    console.log("Delete item error: ", error);
    res.status(500).json({ error: "Failed to delete item" });
  }
};
