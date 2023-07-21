import { GET_CARTS_ITEM } from "../../services/endPoints";
import { get } from "../../services/networkCalls";
import CustomButton from "../CustomButton/CustomButton";
import "./card.style.scss";
import { useState, useEffect } from "react";
import { FaLessThan, FaGreaterThan } from "react-icons/fa";
const CartList = (props: any) => {
  const [cartItems, setCartItems] = useState([]);

  const handleDecrement = (id: string) => {
    console.log(id);
  };

  const handleIncrement = (id: string) => {
    console.log(id);
  };

  const fetchCartItems = async () => {
    try {
      const response: any = await get(
        GET_CARTS_ITEM,
        sessionStorage.getItem("AUTH_TOKEN") || ""
      );
      setCartItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  console.log("cart items fetched", cartItems);

  return (
    <div className="cart-list container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.length > 0 &&
            cartItems.map((item: any) => (
              <li key={item.itemId}>
                <div className="cart-item">
                  <img src={item.image} alt={item.itemName} />
                  <div className="item-details">
                    <h3>{item.itemName}</h3>
                    <p>Price: ${item.price}</p>
                    <div className="quantity-section">
                      <button
                        className="btn-decrement"
                        onClick={() => handleDecrement(item.itemId)}
                      >
                        <FaLessThan />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn-increment"
                        onClick={() => handleIncrement(item.itemId)}
                      >
                        <FaGreaterThan />
                      </button>
                    </div>
                    <CustomButton
                      btnClsName="btn-buy-now"
                      btnName="Buy Now"
                      btnEvent={() => console.log("btn event")}
                    />
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default CartList;
