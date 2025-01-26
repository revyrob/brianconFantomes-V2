import "./App.css";
import Info from "./components/Info/Info";
import Footer from "./components/Footer/Footer";
import FAQ from "./components/FAQ/FAQ";
import Carousel from "./components/Carousel/carousel";
import Nav from "./components/Nav/Nav";
import Credits from "./components/Credits/Credits";
import Tour from "./components/Tour/Tour";
import Map from "./components/Map/Map";
import { LanguageProvider } from "./Language";
import { useEffect } from "react";
import ReactGA from "react-ga";
import AudioBookLink from "./components/AudioBookLink/AudioBookLink";

const TRACKING_ID = "UA-201468426-1"; // OUR_TRACKING_ID

ReactGA.initialize(TRACKING_ID);

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <LanguageProvider>
      <div className="bg-gray-900">
        <Nav />
      </div>
      <Carousel />
      <Info />
      <Map />
      <AudioBookLink />
      {/* <Tour /> */}
      <Credits />
      <FAQ />
      <Footer />
    </LanguageProvider>
  );
}

export default App;
