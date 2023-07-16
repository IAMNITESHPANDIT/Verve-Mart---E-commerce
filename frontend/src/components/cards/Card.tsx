import React from "react";
import { Card, Button } from "react-bootstrap";
import "./card.style.scss";
import { useNavigate } from "react-router-dom";

interface cardProps {
  data: any;
}

const CardItem: React.FC<cardProps> = ({ data }) => {
  const navigate = useNavigate();

  const onNavigation = (id: string) => {
    console.log("onNavigation", id);
    navigate(`/checkout-page/${id}`);
    return;
  };

  return (
    <div className="cartItem">
      <div className="container ">
        <div className="item-list">
          {data.length > 0 ? (
            data.map((item: any) => (
              <Card
                key={item.id}
                className="item-card"
                onClick={() => onNavigation(item.itemId)}
              >
                <Card.Img
                  variant="top"
                  src={item.image}
                  className="item-image"
                />
                <Card.Body>
                  <Card.Title className="item-title">{item.title}</Card.Title>
                  <Card.Text className="item-description">
                    {item.description}
                  </Card.Text>
                  <div className="card-footer">
                    <div className="price">Price: ${item.price}</div>
                    <div className="rating">Rating: {item.reviewStars}/5</div>
                    <div className="actions">
                      <Button variant="primary" className="buy-now-button">
                        Buy Now
                      </Button>
                      <Button
                        variant="outline-primary"
                        className="add-to-cart-button"
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
