import React from "react";
import { Carousel } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface SliderItem {
  title: string;
  image: string;
  description: string;
  order: number;
}

interface SliderProps {
  data: SliderItem[];
}

const Slider: React.FC<SliderProps> = ({ data }) => {
  if (!Array.isArray(data)) {
    return null;
  }

  return (
    <div>
      <Carousel>
        {data.length > 0 &&
          data.map((item: SliderItem, index) => {
            return (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={item.image}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
    </div>
  );
};

export default Slider;
