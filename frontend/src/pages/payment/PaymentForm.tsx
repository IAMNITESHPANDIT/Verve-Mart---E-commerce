import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { post } from "../../services/networkCalls";
import { ADD_PAYMENT } from "../../services/endPoints";
import { calculatePrice } from "../../utils/handler/handler";

interface iProps {
  data: any;
  productId: any;
  addressId: any;
}

const PaymentForm: React.FC<iProps> = ({ data, productId, addressId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true); // Disable the button during payment processing

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setIsProcessing(false); // Re-enable the button if there's an error
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    const { token } = await stripe.createToken(cardElement);

    if (error) {
      console.error("Error creating payment method:", error);
      setIsProcessing(false); // Re-enable the button if there's an error
    } else {
      // Send the payment method ID to your backend server for processing
      const paymentData = {
        paymentMethodId: paymentMethod?.id,
      };
      console.log("payment", token);
      console.log("dev", paymentMethod);
      addPayment(token?.id, cardElement);
    }
  };

  const addPayment = async (token: any, cardElement: any, currency?: any) => {
    const Token = sessionStorage.getItem("AUTH_TOKEN") || "";
    try {
      const response: any = await post(
        ADD_PAYMENT,
        {
          token: token,
          currency: currency || "USD",
          amount: calculatePrice(data[0]?.price, data[0]?.quantity) * 100,
          productId: productId,
          addressId: addressId,
        },
        Token
      );
      cardElement.clear();
      // ... handle response
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessing(false); // Re-enable the button after payment processing
      //cardElement.clear(); // Clear the card element if needed
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Card details
          <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
        </label>
      </div>
      <button type="submit" disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentForm;
