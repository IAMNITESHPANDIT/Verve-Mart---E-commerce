import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { post } from "../../services/networkCalls";
import { ADD_PAYMENT } from "../../services/endPoints";

const PaymentForm: React.FC = () => {
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

      cardElement.clear();
    }
  };

  const addPayment = async (
    curreny: string,
    token: string,
    amount: number,
    cb: any
  ) => {
    const Token = sessionStorage.getItem("AUTH_TOKEN") || "";
    try {
      const response: any = await post(
        ADD_PAYMENT,
        {
          token: token,
          curreny: curreny,
          amount: amount,
        },
        Token
      );
      console.log(response);
      cb();
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
