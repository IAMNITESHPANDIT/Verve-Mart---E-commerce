const { tableParser } = require("../handler/handler");
const { Item, cartItem } = require("../sequelize/index");

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    if (items.length === 0) {
      return res.status(200).json({ message: "No items found", data: [] });
    }
    res.json(items);
  } catch (error) {
    console.log("Error retrieving items: ", error);
    res.status(500).json({ error: "Failed to retrieve items" });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const itemId = req.body.itemId;
    const item = await Item.findOne({ where: { itemId: itemId } });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (item.length === 0) {
      return res.status(200).json({ message: "No items found", data: [] });
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
      subCategory,
      categoryImage,
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
      subCategory,
      categoryImage,
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
      subCategory,
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
    item.subCategory = subCategory;

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

// for cart Items

exports.fetchExistingCartItems = async (req, res) => {
  try {
    const user = req.user;

    const cartItems = await cartItem.findAll({
      where: { userId: user.userId },
    });
    const itemIdsInCart = cartItems.map((cartItem) => cartItem.itemId);

    const items = await Item.findAll({ where: { itemId: itemIdsInCart } });

    const newArray = tableParser(items).map((item) => {
      const matchingCartItem = tableParser(cartItems).find(
        (cartItem) => item.itemId === cartItem.itemId
      );
      if (matchingCartItem) {
        item.quantity = matchingCartItem.quantity;
      } else {
        item.quantity = 0; // Set quantity to 0 if not found in cart
      }
      return item;
    });

    return res.json({ message: "Cart items are available", data: newArray });
  } catch (error) {
    console.log("Error retrieving existing items: ", error);
    return res.status(500).json({ error: "Failed to retrieve existing items" });
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
      const item = await cartItem.create({ itemId, userId });
      res.json({ message: "Item added to cart successfully", data: item });
    }
  } catch (error) {
    console.log("Error adding item to cart: ", error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
};

// Delete item from cart
exports.deleteCartItem = async (req, res) => {
  try {
    const { itemId, userId } = req.body;
    // Find the cart item
    const existingItem = await cartItem.findOne({
      where: { itemId: itemId, userId: userId },
    });

    if (!existingItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Remove the cart item from the user's cart
    await existingItem.destroy();

    res.json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.log("Error deleting cart item: ", error);
    res.status(500).json({ error: "Failed to delete cart item" });
  }
};

// Update item in cart
exports.updateCartItem = async (req, res) => {
  try {
    const { quantity, itemId } = req.body;
    const user = req.user;

    // Find the cart item
    const cart = await cartItem.findOne({
      where: { itemId: itemId, userId: user.userId },
    });

    if (!cart) {
      return res.status(404).json({ error: "CartItem not found" });
    }

    // Update the quantity of the cartItem
    cart.quantity = quantity;
    const updatedCartItem = await cart.save();

    res.json({
      message: "Cart item updated successfully",
      data: updatedCartItem,
    });
  } catch (error) {
    console.log("Error updating cart item: ", error);
    res.status(500).json({ error: "Failed to update cart item" });
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

// fetch cart items by id
exports.fetchCartItemById = async (req, res) => {
  try {
    const { itemId } = req.body;

    const user = req.user;

    // Find the cart item by cartId
    const cart = await cartItem.findOne({
      where: { itemId },
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    const cartItems = await cartItem.findAll({
      where: { userId: user.userId },
    });

    const items = await Item.findAll({ where: { itemId: itemId } });

    const newArray = tableParser(items).map((item) => {
      const matchingCartItem = tableParser(cartItems).find(
        (cartItem) => item.itemId === cartItem.itemId
      );
      if (matchingCartItem) {
        item.quantity = matchingCartItem.quantity;
      }
      return item;
    });

    return res.json({
      message: "Cart item fetched successfully",
      data: newArray,
    });
  } catch (error) {
    console.log("Error fetching cart item: ", error);
    return res.status(500).json({ error: "Failed to fetch cart item" });
  }
};
