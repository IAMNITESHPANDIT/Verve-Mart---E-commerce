// orderController.js

const order = require("../models/order");

// Get total orders for the logged-in user
exports.getTotalOrders = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming you have the authenticated user ID

    // Query the database to get the total number of orders for the user
    const totalOrders = await order.count({
      where: { userId },
    });

    res.json({ data: totalOrders });
  } catch (error) {
    console.log("Error retrieving total orders:", error);
    res.status(500).json({ error: "Failed to retrieve total orders" });
  }
};
