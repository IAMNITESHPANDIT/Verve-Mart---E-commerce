import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GET_CATEGORY_BY_NAME } from "../../services/endPoints";
import { post } from "../../services/networkCalls";
import CardItem from "../../components/cards/Card";

function CategoryItems() {
  const params = useParams();

  const [categoryItem, setCategoryItem] = useState({
    categoryId: "",
    items: [],
  });

  const fetchData = async () => {
    try {
      const data: any = await post(GET_CATEGORY_BY_NAME, {
        categoryName: params.categoryName,
        categoryId: params.categoryId,
      });
      setCategoryItem({
        categoryId: data.data.categoryId,
        items: data.data.categoryList,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="item-list">
      <CardItem data={categoryItem.items} />
    </div>
  );
}

export default CategoryItems;
