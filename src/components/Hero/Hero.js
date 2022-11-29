import "./Hero.scss";
import briancon from "../../assets/photos/briancon.jpg";
import snowBriancon from "../../assets/photos/city2.png";
import book from "../../assets/photos/photoByAaronBurdenOnUnsplash.jpg";
import ImageGallery from "react-image-gallery";

function Hero() {
  const images = [
    {
      original: { snowBriancon },
      // thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: { book },
      // thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: { briancon },
      // thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  return (
    <section className="hero flex flex-direction:row pt-12 bg-gray-900">
      <ImageGallery
        className="hero flex flex-direction:row pt-12 bg-gray-900"
        items={images}
      />
    </section>
  );
}

export default Hero;
