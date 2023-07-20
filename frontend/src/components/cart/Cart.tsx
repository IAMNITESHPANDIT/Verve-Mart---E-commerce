import CustomButton from "../CustomButton/CustomButton";
import "./card.style.scss";
import { FaLessThan, FaGreaterThan } from "react-icons/fa";
const CartList = (props: any) => {
  const cartItems = props.cartItems || [
    {
      itemId: 1,
      image:
        "https://st.depositphotos.com/1438688/3540/i/950/depositphotos_35400583-stock-photo-localhost-url.jpg",
      itemName: "DepositPhots",
      price: 23,
      quantity: 34,
    },
    {
      itemId: 1,
      image:
        "https://st.depositphotos.com/1438688/3540/i/950/depositphotos_35400583-stock-photo-localhost-url.jpg",
      itemName: "DepositPhots",
      price: 23,
      quantity: 34,
    },
    {
      itemId: 1,
      image:
        "https://st.depositphotos.com/1438688/3540/i/950/depositphotos_35400583-stock-photo-localhost-url.jpg",
      itemName: "DepositPhots",
      price: 23,
      quantity: 34,
    },
    {
      itemId: 2,
      image:
        "https://st.depositphotos.com/1438688/3540/i/950/depositphotos_35400583-stock-photo-localhost-url.jpg",
      itemName: "DepositPhots",
      price: 23,
      quantity: 34,
    },
    {
      itemId: 3,
      image:
        "https://st.depositphotos.com/1438688/3540/i/950/depositphotos_35400583-stock-photo-localhost-url.jpg",
      itemName: "DepositPhots",
      price: 23,
      quantity: 34,
    },
    {
      itemId: 4,
      image:
        "https://st.depositphotos.com/1438688/3540/i/950/depositphotos_35400583-stock-photo-localhost-url.jpg",
      itemName: "DepositPhots",
      price: 23,
      quantity: 34,
    },
    {
      itemId: 3,
      image:
        "https://st.depositphotos.com/1438688/3540/i/950/depositphotos_35400583-stock-photo-localhost-url.jpg",
      itemName: "DepositPhots",
      price: 23,
      quantity: 34,
    },
    {
      itemId: 4,
      image:
        "https://st.depositphotos.com/1438688/3540/i/950/depositphotos_35400583-stock-photo-localhost-url.jpg",
      itemName: "DepositPhots",
      price: 23,
      quantity: 34,
    },
    {
      itemId: 3,
      image:
        "https://st.depositphotos.com/1438688/3540/i/950/depositphotos_35400583-stock-photo-localhost-url.jpg",
      itemName: "DepositPhots",
      price: 23,
      quantity: 34,
    },
    {
      itemId: 4,
      image:
        "https://st.depositphotos.com/1438688/3540/i/950/depositphotos_35400583-stock-photo-localhost-url.jpg",
      itemName: "DepositPhots",
      price: 23,
      quantity: 34,
    },
  ];

  const handleDecrement = (id: string) => {
    console.log(id);
  };

  const handleIncrement = (id: string) => {
    console.log(id);
  };
  return (
    <div className="cart-list container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item: any) => (
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
