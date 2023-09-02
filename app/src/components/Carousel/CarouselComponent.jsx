import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import PropTypes from "prop-types"; // Import PropTypes
import { ViewPropTypes } from "deprecated-react-native-prop-types"; // Import ViewPropTypes
import { styles } from "./carosel.style";
import { get } from "../../services/networkCalls";

const CarouselComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState([]);

  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item.image }} style={styles.carouselImage} />
      <Text style={styles.carouselTitle}>{item.title}</Text>
      <Text style={styles.carouselDescription}>{item.description}</Text>
    </View>
  );

  const fetchItems = async () => {
    try {
      const response = await get("/slider");
      setData(response.data ? response.data : []);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={300}
        itemWidth={250}
        onSnapToItem={(index) => setActiveIndex(index)}
        autoplay={true}
        autoplayInterval={3000}
      />

      {/* Pagination */}
      {/* <Pagination
        dotsLength={data.length} // Use data.length instead of carouselData.length
        activeDotIndex={activeIndex}
        containerStyle={styles.pagination}
        dotStyle={styles.dot}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.8}
      /> */}
    </View>
  );
};

// Define propTypes using ViewPropTypes for compatibility
CarouselComponent.propTypes = {
  style: ViewPropTypes.style,
  data: PropTypes.array,
  renderItem: PropTypes.func,
  sliderWidth: PropTypes.number,
  itemWidth: PropTypes.number,
  onSnapToItem: PropTypes.func,
  autoplay: PropTypes.bool,
  autoplayInterval: PropTypes.number,
};

export default CarouselComponent;
