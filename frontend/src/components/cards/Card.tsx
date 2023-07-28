import React from "react";
import { Card, Button } from "react-bootstrap";
import "./card.style.scss";
import { useNavigate } from "react-router-dom";
import { ADD_ITEM_IN_CART } from "../../services/endPoints";
import { post } from "../../services/networkCalls";
import { ToastOnSuccess } from "../../utils/toast/message";

interface cardProps {
  data: any;
}

const CardItem: React.FC<cardProps> = ({ data }) => {
  const navigate = useNavigate();

  const addToCart = async (e: any, id: string) => {
    e.stopPropagation();
    if (sessionStorage.getItem("AUTH_TOKEN")) {
      const user: any = JSON.parse(
        sessionStorage.getItem("USER_DETAIL") || "{}"
      );

      try {
        const response: any = await post(
          ADD_ITEM_IN_CART,
          {
            userId: user.userId,
            itemId: id,
          },
          sessionStorage.getItem("AUTH_TOKEN") || ""
        );
        ToastOnSuccess(response.message);
        navigate("/cart");
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="cartItem">
      <div className="container ">
        <div className="item-list">
          {data.length > 0 ? (
            data.map((item: any) => (
              <Card key={item.itemId} className="item-card">
                <Card.Img
                  variant="top"
                  src={item.image}
                  className="item-image"
                />
                <Card.Body>
                  <Card.Title className="item-title">
                    {item.itemName}
                  </Card.Title>
                  <Card.Text className="item-description">
                    {item.description}
                  </Card.Text>
                  <div className="card-footer">
                    <div className="price">Price: ${item.price}</div>
                    <div className="rating">Rating: {item.reviewStars}/5</div>
                    <div className="actions">
                      <Button
                        variant="primary"
                        className="buy-now-button"
                        onClick={(e) => addToCart(e, item.itemId)}
                      >
                        Buy Now
                      </Button>

                      <Button
                        variant="outline-primary"
                        className="add-to-cart-button"
                        onClick={(e) => addToCart(e, item.itemId)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <h2>No Data Aviliable</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardItem;
