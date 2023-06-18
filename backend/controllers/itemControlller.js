const CartItem = require("../models/CartItem");
const { Item, cartItem } = require("../sequelize/index");

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
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

// for user cart items

// Fetch existing items

exports.fetchExistingItems = async (req, res) => {
  try {
    const user = req.user;
    const items = await Item.findAll({ where: { UserId: user.id } });

    if (items.length === 0) {
      return res.status(200).json({ message: "No items found" });
    }

    res.json(items);
  } catch (error) {
    console.log("Error retrieving existing items: ", error);
    res.status(500).json({ error: "Failed to retrieve existing items" });
  }
};

// Add item to cart
exports.addItemToCart = async (req, res) => {
  try {
    const { itemId, userId } = req.body;

    const item = await Item.findOne({
      where: {
        itemId: itemId,
      },
    });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Check if the item is already in the user's cart
    const existingItem = await cartItem.findOne({
      where: { itemId, userId },
    });

    if (existingItem) {
      // If the item already exists in the cart, increment the quantity
      existingItem.quantity += 1;
      await existingItem.save(); // Save the updated cart item
      return res.json({
        message: "Item Updated to cart successfully",
        data: existingItem,
      });
    } else {
      // If the item doesn't exist in the cart, create a new cart item
      await cartItem.create({ itemId, userId });
      res.json({ message: "Item added to cart successfully" });
    }
  } catch (error) {
    console.log("Error adding item to cart: ", error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
};

// Delete item from cart
exports.deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    // Find the cart item
    const cartItem = await CartItem.findOne({
      where: { id, userId: user.id },
    });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Remove the cart item from the user's cart
    await cartItem.destroy();

    res.json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.log("Error deleting cart item: ", error);
    res.status(500).json({ error: "Failed to delete cart item" });
  }
};

// ...

// Update item in cart
exports.updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    // Find the cart item
    const cartItem = user.getCartItem(id);

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Update the quantity of the cart item
    cartItem.quantity = quantity;
    await cartItem.save();

    res.json({ message: "Cart item updated successfully" });
  } catch (error) {
    console.log("Error updating cart item: ", error);
    res.status(500).json({ error: "Failed to update cart item" });
  }
};

// Delete item from cart
exports.deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    // Find the cart item
    const cartItem = user.getCartItem(id);

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Remove the cart item from the user's cart
    await user.removeCartItem(cartItem);

    res.json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.log("Error deleting cart item: ", error);
    res.status(500).json({ error: "Failed to delete cart item" });
  }
};

// Update item stock
exports.updateItemStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Update the item stock
    item.stock = stock;
    await item.save();

    res.json({ message: "Item stock updated successfully" });
  } catch (error) {
    console.log("Error updating item stock: ", error);
    res.status(500).json({ error: "Failed to update item stock" });
  }
};