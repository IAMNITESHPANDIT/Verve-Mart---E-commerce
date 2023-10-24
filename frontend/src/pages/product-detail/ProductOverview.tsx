import { useEffect, useState } from "react";
import "./product.style.scss";
import { useParams } from "react-router-dom";
import { post } from "../../services/networkCalls";
import { GET_ITEM_BY_ID } from "../../services/endPoints";

const ProductOverview = (props: any) => {
  const params = useParams();
  const [itemDetails, setItemDetails] = useState<any>([]);

  const fetchItem = async () => {
    try {
      const response: any = await post(GET_ITEM_BY_ID, {
        itemId: params.itemId,
      });
      setItemDetails(response.data);
    } catch (error) {
      console.log("Fetching item failed", error);
    }
  };
  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <div className="product-details container">
      {Object.keys(itemDetails).length > 0 && (
        <>
          <img src={itemDetails?.image} alt={itemDetails?.itemName} />
          <div className="item-info">
            <h3>{itemDetails?.itemName}</h3>
            <p>{itemDetails?.description}</p>
            <p>Category: {itemDetails?.category}</p>
            <p>Price: ${itemDetails?.price}</p>
            <p>Stock: {itemDetails?.stock}</p>
            <p>Review Stars: {itemDetails?.reviewStars}</p>
            <p>Size: {itemDetails?.size}</p>
            <p>Color: {itemDetails?.color}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductOverview;
