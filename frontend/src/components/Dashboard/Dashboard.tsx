import { useState, useEffect } from "react";
import { GET_CATEGORY, GET_SLIDERS } from "../../services/endPoints";
import { get } from "../../services/networkCalls";
import Slider from "../slider/Slider";
import CategoryList from "../category/Categoryt";
import GenricLoader from "../../utils/loader/Loader";

const Dashboard: React.FC = ({}) => {
  const [dataSlider, setDataSlider] = useState<any>([]);

  const [categoryData, setCategoryData] = useState<any>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data: any = await get(GET_SLIDERS);
      setDataSlider(data.data);
      const getCategory: any = await get(GET_CATEGORY);
      setCategoryData(getCategory.categories);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
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
          <Slider data={dataSlider} />
          <CategoryList data={categoryData} />
        </>
      )}
    </>
  );
};

export default Dashboard;
