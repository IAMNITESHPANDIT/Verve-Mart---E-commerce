const payment = require("../models/payment");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Process payment

exports.addPayment = async (req, res) => {
  try {
    const { amount, token, orderId, currency } = req.body;

    // Create a charge using Stripe
    const charge = await stripe.charges.create({
      amount: amount,
      currency: currency,
      source: token,
      description: "Payment for Order #" + orderId,
    });

    // Save the payment details in the database
    await payment.create({
      orderId: orderId,
      amount: amount,
      paymentId: charge.id,
      cardLastFour: charge.source.last4,
      // Include any other relevant payment details
    });

    res.status(200).json({ message: "Payment successful" });
  } catch (error) {
    console.log("Error processing payment: ", error);
    res.status(500).json({ error: "Failed to process payment" });
  }
};
