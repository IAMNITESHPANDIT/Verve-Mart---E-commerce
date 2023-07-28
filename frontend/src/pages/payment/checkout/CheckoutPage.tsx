import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../PaymentForm";
import stripePromise from "../stripeConfig";
import "./checkout.style.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { post } from "../../../services/networkCalls";
import { GET_CARTS_ITEM_BY_ITEM_ID } from "../../../services/endPoints";

const CheckoutPage: React.FC = () => {
  const params = useParams();
  const [itemDetail, setItemDetail] = useState([]);

  const fetchDetails = async () => {
    try {
      const response: any = await post(
        GET_CARTS_ITEM_BY_ITEM_ID,
        {
          itemId: params.productId,
        },
        sessionStorage.getItem("AUTH_TOKEN") || ""
      );
      setItemDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const clientSecret = process.env.REACT_APP_STRIPE_SECRET_KEY;

  useEffect(() => {
    fetchDetails();
  }, []);

  const options = {
    clientSecret: clientSecret, // Remove the unnecessary curly braces and string interpolation
  };
  //  options = { options };
  return (
    <div className="checkout-page">
      <Elements stripe={stripePromise}>
        <PaymentForm
          data={itemDetail}
          addressId={params.addressId}
          productId={params.productId}
        />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
