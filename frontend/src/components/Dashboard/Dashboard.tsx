import { useState, useEffect } from "react";
import { GET_CATEGORY, GET_SLIDERS } from "../../services/endPoints";
import { get } from "../../services/networkCalls";
import Slider from "../slider/Slider";
import CategoryList from "../category/Categoryt";

const Dashboard: React.FC = ({}) => {
  const [dataSlider, setDataSlider] = useState<any>([]);

  const [categoryData, setCategoryData] = useState<any>([]);

  const fetchData = async () => {
    try {
      const data: any = await get(GET_SLIDERS);
      setDataSlider(data.data);
      const getCategory: any = await get(GET_CATEGORY);
      setCategoryData(getCategory.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Slider data={dataSlider} />
      <CategoryList data={categoryData} />
    </>
  );
};

export default Dashboard;
