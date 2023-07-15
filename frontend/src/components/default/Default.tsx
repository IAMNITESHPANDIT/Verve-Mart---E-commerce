import React, { useState, useEffect } from "react";
import { get } from "../../services/networkCalls";
import { GET_CATEGORY, GET_SLIDERS } from "../../services/endPoints";
import Header from "../header/Header";
import Slider from "../slider/Slider";
import CategoryList from "../category/Categoryt";
import Footer from "../footer/Footer";

function DefaultComponents(props: any) {
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
    <div>
      <Header />
      <Slider data={dataSlider} />
      <CategoryList data={categoryData} />
      {props.children}
      <Footer />
    </div>
  );
}

export default DefaultComponents;
