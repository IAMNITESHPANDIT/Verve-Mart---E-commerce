import React from "react";
import { Carousel } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./slider.style.scss";
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
    <div className="slider">
      {data.length > 0 && (
        <Carousel>
          {data.map((item: SliderItem, index) => {
            return (
              <Carousel.Item key={index}>
                <img
                  className="slider-img"
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
      )}
    </div>
  );
};

export default Slider;
