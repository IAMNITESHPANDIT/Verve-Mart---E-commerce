import { loadStripe } from "@stripe/stripe-js";

const stripeKey = process.env.REACT_APP_STRIPE_SECRET_KEY || "";

const stripePromise = loadStripe(stripeKey);

export default stripePromise;
