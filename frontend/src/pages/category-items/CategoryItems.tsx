import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GET_CATEGORY_BY_NAME } from "../../services/endPoints";
import { post } from "../../services/networkCalls";
import CardItem from "../../components/cards/Card";
import GenricLoader from "../../utils/loader/Loader";

function CategoryItems() {
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [categoryItem, setCategoryItem] = useState({
    categoryId: "",
    items: [],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const data: any = await post(GET_CATEGORY_BY_NAME, {
        categoryName: params.categoryName,
        categoryId: params.categoryId,
      });
      setCategoryItem({
        categoryId: data.data.categoryId,
        items: data.data.categoryList,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const navigateScreen = (itemName: string, itemId: string) => {
    navigate(`/item/${itemName}/${itemId}`);
    return;
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <GenricLoader loading={loading} />
      ) : (
        <>
          <div className="item-list">
            <CardItem
              data={categoryItem.items}
              navigateScreen={navigateScreen}
            />
          </div>
        </>
      )}
    </>
  );
}

export default CategoryItems;
