const payment = require("../models/payment");
const User = require("../models/user");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Process payment
exports.addPayment = async (req, res) => {
  try {
    const { amount, token, currency } = req.body;
    const userId = req.user.userId;

    // Generate the orderId
    const orderId = generateOrderId();

    // Create a charge using Stripe
    const charge = await stripe.charges.create({
      amount: amount,
      currency: currency,
      source: token,
      description: "Payment for Order #" + orderId,
    });

    // Save the payment details in the database
    const paymentData = {
      orderId: orderId,
      amount: amount,
      paymentId: charge.id,
      cardLastFour: charge.source.last4,
      // Include any other relevant payment details
    };
    await payment.create(paymentData);

    // Update the user's payment details
    const userData = {
      paymentId: charge.id,
      cardLastFour: charge.source.last4,
      // Include any other relevant user payment details
    };
    await User.update(userData, { where: { userId } });

    res.status(200).json({ message: "Payment successful" });
  } catch (error) {
    console.log("Error processing payment: ", error);
    res.status(500).json({ error: "Failed to process payment" });
  }
};

// Function to generate a unique orderId
function generateOrderId() {
  // Generate a random alphanumeric string
  const randomString = Math.random().toString(36).substring(2, 10);

  // Get the current timestamp
  const timestamp = Date.now().toString();

  // Combine the random string and timestamp to create the orderId
  const orderId = randomString + timestamp;

  return orderId;
}
