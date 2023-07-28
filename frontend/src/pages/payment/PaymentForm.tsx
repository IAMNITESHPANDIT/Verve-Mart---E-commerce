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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    const { token } = await stripe.createToken(cardElement);

    if (error) {
      console.error("Error creating payment method:", error);
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
          amount: calculatePrice(data[0]?.price, data[0]?.quantity),
          productId: productId,
          addressId: addressId,
        },
        Token
      );
      console.log("*******>>>>", response.data);
      cardElement.clear();
    } catch (error) {
      console.log(error);
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
      <button type="submit">Pay Now</button>
    </form>
  );
};

export default PaymentForm;
