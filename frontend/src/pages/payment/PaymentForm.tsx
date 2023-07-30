import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { post } from "../../services/networkCalls";
import { ADD_PAYMENT } from "../../services/endPoints";
import { calculatePrice } from "../../utils/handler/handler";
import { useNavigate } from "react-router-dom";
import { ToastOnFailure, ToastOnSuccess } from "../../utils/toast/message";

interface iProps {
  data: any;
  productId: any;
  addressId: any;
  loading: boolean;
  setLoading: any;
}

const PaymentForm: React.FC<iProps> = ({
  data,
  productId,
  addressId,
  setLoading,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

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
      addPayment(token?.id, cardElement);
    }
  };

  const addPayment = async (token: any, cardElement: any, currency?: any) => {
    const Token = sessionStorage.getItem("AUTH_TOKEN") || "";
    setLoading(true);
    try {
      const response: any = await post(
        ADD_PAYMENT,
        {
          token: token,
          currency: currency || "USD",
          amount: calculatePrice(data[0]?.price, data[0]?.quantity) * 100,
          productId: productId,
          addressId: addressId,
          quantity: data[0]?.quantity,
        },
        Token
      );
      setLoading(false);
      ToastOnSuccess(response.data.message);
      navigate("/orders");
      // cardElement.clear();
    } catch (error: any) {
      ToastOnFailure(error.message);
      setLoading(false);
      console.log(error);
    } finally {
      setIsProcessing(false);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div>
        <label>
          <span className="me-3">Card</span>
          <CardElement
            options={{
              style: { base: { fontSize: "16px" } },
              hidePostalCode: true,
            }}
          />
        </label>
      </div>
      <button type="submit" disabled={isProcessing} className="pay-button">
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentForm;
