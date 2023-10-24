import { useNavigate } from "react-router-dom";
import { GET_CARTS_ITEM, UPDATE_ITEM_IN_CART } from "../../services/endPoints";
import { get, update } from "../../services/networkCalls";
import { calculatePrice } from "../../utils/handler/handler";
import { ToastOnFailure } from "../../utils/toast/message";
import CustomButton from "../CustomButton/CustomButton";
import "./card.style.scss";
import { useState, useEffect } from "react";
import { FaLessThan, FaGreaterThan } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addCartItems } from "../../store/reducers/cart";
const CartList = (props: any) => {
  const [cartItems, setCartItems] = useState<any>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDecrement = (id: string, quantity: number) => {
    if (quantity <= 1) {
      ToastOnFailure("Invalid quantity");
      return;
    }
    setCartItems((prevItems: any) => {
      // Create a new array with updated quantities
      const updatedItems = prevItems.map((item: any) => {
        if (item.itemId === id) {
          // Update the quantity of the matching item
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        } else {
          // Return the item unchanged if it doesn't match the specified ID
          return item;
        }
      });

      return updatedItems; // Return the updated array to setCartItems
    });
    upadateItem(id, quantity - 2);
  };

  const handleIncrement = (id: string, quantity: number) => {
    if (quantity <= 0) {
      ToastOnFailure("Invalid quantity");
      return;
    }
    setCartItems((prevItems: any) => {
      // Create a new array with updated quantities
      const updatedItems = prevItems.map((item: any) => {
        if (item.itemId === id) {
          // Update the quantity of the matching item
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        } else {
          // Return the item unchanged if it doesn't match the specified ID
          return item;
        }
      });

      return updatedItems; // Return the updated array to setCartItems
    });
    upadateItem(id, quantity);
  };

  const upadateItem = async (itemId: string, quantity: number) => {
    try {
      const updateResponse = await update(
        UPDATE_ITEM_IN_CART,
        {
          itemId: itemId,
          quantity: quantity + 1,
        },
        sessionStorage.getItem("AUTH_TOKEN") || ""
      );
      console.log(updateResponse);
    } catch (error) {
      console.log("error updating item", error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response: any = await get(
        GET_CARTS_ITEM,
        sessionStorage.getItem("AUTH_TOKEN") || ""
      );
      setCartItems(response.data);
      dispatch(addCartItems(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const navigateAddress = (id: string) => {
    navigate(`/checkout-page/${id}`);
    return;
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

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
                    <p>Price: ${calculatePrice(item.price, item.quantity)}</p>
                    <div className="quantity-section">
                      <button
                        className="btn-decrement"
                        onClick={() =>
                          handleDecrement(item.itemId, item.quantity)
                        }
                      >
                        <FaLessThan />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn-increment"
                        onClick={() =>
                          handleIncrement(item.itemId, item.quantity)
                        }
                      >
                        <FaGreaterThan />
                      </button>
                    </div>
                    <CustomButton
                      btnClsName="btn-buy-now"
                      btnName="Buy Now"
                      btnEvent={() => navigateAddress(item.itemId)}
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
