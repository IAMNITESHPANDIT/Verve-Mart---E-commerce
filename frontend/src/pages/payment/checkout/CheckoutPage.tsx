import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../PaymentForm";
import stripePromise from "../stripeConfig";
import "./checkout.style.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { post } from "../../../services/networkCalls";
import { GET_CARTS_ITEM_BY_ITEM_ID } from "../../../services/endPoints";
import ProductDetails from "../../../components/productDetail/ProductDetails";
import GenricLoader from "../../../utils/loader/Loader";

const CheckoutPage: React.FC = () => {
  const params = useParams();
  const [itemDetail, setItemDetail] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <>
      {loading ? (
        <GenricLoader loading={loading} />
      ) : (
        <div className="row checkout-page">
          <div className="col-12 col-md-6">
            <ProductDetails product={itemDetail} />
          </div>
          <div className="col-12 col-md-6">
            <Elements stripe={stripePromise}>
              <PaymentForm
                data={itemDetail}
                addressId={params.addressId}
                productId={params.productId}
                loading={loading}
                setLoading={setLoading}
              />
            </Elements>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
