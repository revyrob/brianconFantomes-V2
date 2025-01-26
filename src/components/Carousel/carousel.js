import React, { useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const data = [
    "../../images/book.jpg",
    "../../images/brianconNight.jpg",
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
      <section className="w-[99%]">
        {/* height is in vh */}
        <div className="h-[calc(95vh_-_100px)] w-screen relative overflow-hidden ">
          <div
            className="h-full flex w-[300%] transition-all duration-1000"
            //if in vw than it pictures look best
            style={{ transform: `translate(-${currentSlide * 100}vw)` }}
          >
            <img
              className="w-screen h-full object-cover"
              src={data[0]}
              alt="book with headphones"
            ></img>
            <img
              className="w-screen h-full object-cover object-center"
              src={data[1]}
              alt="braincon night"
            ></img>
            <img
              className="w-screen h-full object-cover"
              src={data[2]}
              alt="gargouille"
            ></img>
          </div>
          <div className="absolute bottom-5 inset-x-0 flex justify-center gap-2.5">
            <div
              className="w-2 h-1 flex flex-col justify-center items-center cursor-pointer text-white mx-4 "
              onClick={prevSlide}
            >
              <ArrowBackOutlinedIcon />
            </div>
            <div
              className="w-2 h-1 flex flex-col justify-center items-center cursor-pointer text-white  mx-4"
              onClick={nextSlide}
            >
              <ArrowForwardOutlinedIcon />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Carousel;
