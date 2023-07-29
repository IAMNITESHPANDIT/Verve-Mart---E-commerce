const { Payment } = require("../sequelize/index");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Process payment
exports.addPayment = async (req, res) => {
  try {
    const { amount, token, currency, productId, addressId } = req.body;
    const userId = req.user.userId;

    // Create a payment intent using Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      payment_method_types: ["card"],
      payment_method_data: {
        type: "card",
        card: {
          token: token,
        },
      },
      confirm: true,
    });

    // Retrieve the PaymentMethod associated with the PaymentIntent
    const paymentMethod = await stripe.paymentMethods.retrieve(
      paymentIntent.payment_method
    );

    // Save the payment details in the database
    const paymentData = {
      orderId: generateOrderId(),
      amount: removLastTwoDigits(amount),
      paymentId: paymentIntent.id,
      cardLastFour: paymentMethod.card.last4,
      userId: userId,
      productId: productId,
      addressId: addressId,
    };

    // Use the createPayment method from the model to create a new payment record
    const data = await Payment.createPayment(paymentData);

    res.status(200).json({ message: "Payment successfull", data: data });
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

function removLastTwoDigits(amount) {
  return (amount / 100).toFixed(0);
}
