import Info from "../../components/Info/Info";
import FAQ from "../../components/FAQ/FAQ";
import Carousel from "../../components/Carousel/carousel";
import AudioBookLink from "../../components/AudioBookLink/AudioBookLink";
import RouteMap from "../../components/Map/RouteMap";
import Credits from "../../components/Credits/Credits";

function HomePage() {
  return (
    <>
      <Carousel />
      <Info />

      <div className="max-w-3xl mx-auto">
        <RouteMap />
      </div>
      <AudioBookLink />
      <Credits />
      <FAQ />
    </>
  );
}

export default HomePage;
