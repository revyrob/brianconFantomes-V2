import React, { useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import "./carousel.scss";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const data = [
    "../../images/book.jpg",
    "../../images/briancon.jpg",
    "../../images/gargouille1.jpg",
  ];

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1);
  };

  return (
    <>
      <div className="h-[calc(100vh_-_100px)] w-screen relative overflow-hidden">
        <div
          className="h-full flex w-[300vw] transition-all duration-1000"
          style={{ transform: `translate(-${currentSlide * 100}vw)` }}
        >
          <img
            className="w-screen h-full object-cover"
            src={data[0]}
            alt="slide 0"
          ></img>
          <img
            className="w-screen h-full object-cover"
            src={data[1]}
            alt="slide 1"
          ></img>
          <img
            className="w-screen h-full object-cover"
            src={data[2]}
            alt="slide 2"
          ></img>
        </div>
        <div className="absolute bottom-5 inset-x-0 flex justify-center gap-2.5">
          <div className="carousel__icon" onClick={prevSlide}>
            <ArrowBackOutlinedIcon />
          </div>
          <div className="carousel__icon" onClick={nextSlide}>
            <ArrowForwardOutlinedIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;