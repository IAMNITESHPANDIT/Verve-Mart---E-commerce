//import { Payment } from "../sequelize/index";
const { Payment } = require("../sequelize/index");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Process payment
exports.addPayment = async (req, res) => {
  try {
    const { amount, token, currency, productId, addressId } = req.body;
    const userId = req.user.userId;

    // Generate the orderId
    const orderId = generateOrderId();

    // Create a charge using Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      description: "Software development services",
      shipping: {
        name: "Jenny Rosen",
        address: {
          line1: "510 Townsend St",
          postal_code: "98140",
          city: "San Francisco",
          state: "CA",
          country: "US",
        },
      },
      amount: amount,
      currency: currency,
      payment_method_types: ["card"],
    });

    // Save the payment details in the database
    const paymentData = {
      orderId: generateOrderId(),
      amount: amount,
      // paymentId: paymentIntent.id,
      cardLastFour:
        paymentIntent.charges?.data[0]?.payment_method_details.card.last4 ||
        "2344",
      userId: userId,
      productId: productId,
      addressId: addressId,
    };

    // Use the createPayment method from the model to create a new payment record
    const data = await Payment.create(paymentData);

    res.status(200).json({ message: "Payment successful", data: data });
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
