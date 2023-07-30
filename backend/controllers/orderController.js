// orderController.js

const { Payment, Item, Address } = require("../sequelize/index");

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

exports.getAllOrdersById = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find all the payment details for the given userId
    const paymentDetails = await Payment.findAll({
      where: { userId },
    });

    if (paymentDetails.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for the user", data: [] });
    }

    // Extract the required details for each order
    const orders = await Promise.all(
      paymentDetails.map(async (payment) => {
        const { orderId, amount, productId, addressId, userId, quantity } =
          payment;

        // Fetch product details based on productId
        const product = await Item.findByPk(productId);

        // Fetch address details based on addressId
        const address = await Address.findByPk(addressId);

        return {
          userId,
          orderId,
          amount,
          quantity,
          product: product,
          addressId,
          address: address,
        };
      })
    );

    res
      .status(200)
      .json({ message: "Orders are successfully fetched..", data: orders });
  } catch (error) {
    console.log("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
