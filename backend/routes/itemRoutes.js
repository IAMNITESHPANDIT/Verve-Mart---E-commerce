const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemControlller");
const authMiddleware = require("../middleware/authMiddleware");

// Define item routes

//public routes:-

router.get("/", itemController.getAllItems);

router.post("/getItemById", itemController.getItemById);

// Add item to cart

router.post(
  "/cart",
  authMiddleware.authenticateUser,
  itemController.addItemToCart
);

// Update item in cart
router.put(
  "/cart",
  authMiddleware.authenticateUser,
  itemController.updateCartItem
);

// Delete item from cart
router.delete(
  "/cart",
  authMiddleware.authenticateUser,
  itemController.deleteCartItem
);

// Update item stock
router.put(
  "/cart/:id/stock",
  authMiddleware.isAdmin,
  itemController.updateItemStock
);

// Fetch existing cart items
router.get(
  "/cart",
  authMiddleware.authenticateUser,
  itemController.fetchExistingCartItems
);

// Fetch existing cart item by id
router.post(
  "/cart/identity",
  authMiddleware.authenticateUser,
  itemController.fetchCartItemById
);

//protected routes:- update|| delete by admin

router.post("/", authMiddleware.isAdmin, itemController.createItem);

router.put("/:id", authMiddleware.isAdmin, itemController.updateItem);

router.delete("/:id", authMiddleware.isAdmin, itemController.deleteItem);

module.exports = router;
