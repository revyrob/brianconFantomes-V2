import "./Hero.scss";
import briancon from "../../assets/photos/briancon.jpg";
import brianconSnow from "../../assets/photos/brianconSnow.jpg";
import book from "../../assets/photos/photoByAaronBurdenOnUnsplash2.jpg";
import ImageGallery from "react-image-gallery";
import gargouille from "../../assets/photos/gargouille1.jpg";

function Hero() {
  return (
    <>
      <div
        id="carouselExampleCaptions"
        class="carousel slide relative mt-12"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4 ">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner relative w-full overflow-hidden">
          <div className="carousel-item active relative float-left w-full">
            <img
              src={book}
              className="block w-full mt-12 md:w-11/12 mx-auto md:mt-0"
              alt="briancon"
            />
          </div>
          <div className="carousel-item relative float-left w-full ">
            <img
              src={briancon}
              className="block w-full mt-12 md:w-11/12 mx-auto md:mt-0"
              alt="book and headphones"
            />
          </div>
          <div className="carousel-item relative float-left w-full ">
            <img
              src={gargouille}
              className="block w-full mt-12 md:w-11/12 mx-auto md:mt-0"
              alt="snowBriancon"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon inline-block bg-no-repeat "
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0 "
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon inline-block bg-no-repeat"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default Hero;
