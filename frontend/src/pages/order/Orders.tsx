// OrderPage.js
import { useEffect, useState } from "react";
import "./order.style.scss";
import { get } from "../../services/networkCalls";
import { GET_ORDERS } from "../../services/endPoints";
import GenricLoader from "../../utils/loader/Loader";
import { formatDate } from "../../utils/handler/handler";

const OrderPage = () => {
  const [orders, setOrders] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response: any = await get(
        GET_ORDERS,
        sessionStorage.getItem("AUTH_TOKEN") || ""
      );
      setOrders(response.data);
      console.log("reponse data ", response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      {loading ? (
        <GenricLoader loading={loading} />
      ) : (
        <div className="order-page container">
          <h1>Your Orders</h1>
          {orders.length > 0 ? (
            orders.map((order: any) => (
              <div key={order.orderId} className="order">
                <div className="order-info">
                  <h3>Order ID: {order.orderId}</h3>
                  <p>Date: {formatDate(order.date)}</p>
                  <p>Total: ${order.amount}</p>
                </div>
                <div className="order-items">
                  <div className="order-item">
                    <img
                      src={order.product.image}
                      alt={order.product.itemName}
                    />
                    <div className="item-info">
                      <h4>{order.product.itemName}</h4>
                      <p>Quantity: {order.quantity}</p>
                      <p>Price: ${order.product.price}</p>
                    </div>
                  </div>
                </div>
                <div className="address-info">
                  <h3>Shipping Address</h3>
                  <p>Name: {order.address.name}</p>
                  <p>Street: {order.address.street}</p>
                  <p>Country: {order.address.country}</p>
                  <p>State: {order.address.state}</p>
                  <p>Dist: {order.address.dist}</p>
                  <p>Pincode: {order.address.pincode}</p>
                  <p>Phone Number: {order.address.phoneNumber}</p>
                </div>
              </div>
            ))
          ) : (
            <>No Orders Found </>
          )}
        </div>
      )}
    </>
  );
};

export default OrderPage;
