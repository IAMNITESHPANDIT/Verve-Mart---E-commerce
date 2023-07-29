import React from "react";
import "./product.style.scss";
import { calculatePrice } from "../../utils/handler/handler";

interface iProps {
  product: any;
}
const ProductDetails: React.FC<iProps> = ({ product }) => {
  return (
    <>
      {product.length > 0 &&
        product.map((item: any) => {
          return (
            <div className="product-details" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <h3>{item.itemName}</h3>
                <p>{item.description}</p>
                <p> Quantity: {item.quantity}</p>
                <p>Price: ${calculatePrice(item.price, item.quantity)}</p>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ProductDetails;
