import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../PaymentForm";
import stripePromise from "../stripeConfig";
import "./checkout.style.scss";
const CheckoutPage: React.FC = () => {
  return (
    <div className="checkout-page">
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
