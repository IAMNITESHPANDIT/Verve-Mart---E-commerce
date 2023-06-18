const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemControlller");
const authMiddleware = require("../middleware/authMiddleware");

// Define item routes

//public routes:-
router.get("/", itemController.getAllItems);

router.get("/:id", itemController.getItemById);

//cart routes by user

// Protected routes for authenticated user

// Add item to cart

router.post(
  "/cart",
  authMiddleware.authenticateUser,
  itemController.addItemToCart
);

// Update item in cart
router.put(
  "/cart/:id",
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
  "/:id/stock",
  authMiddleware.isAdmin,
  itemController.updateItemStock
);

// Fetch existing items
router.get(
  "/items",
  authMiddleware.authenticateUser,
  itemController.fetchExistingItems
);

//protected routes:- update|| delete by admin

router.post("/", authMiddleware.isAdmin, itemController.createItem);

router.put("/:id", authMiddleware.authenticateUser, itemController.updateItem);

router.delete(
  "/:id",
  authMiddleware.authenticateUser,
  itemController.deleteItem
);

module.exports = router;
