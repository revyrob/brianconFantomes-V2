import "./App.scss";
import Info from "./components/Info/Info";
import Footer from "./components/Footer/Footer";
import FAQ from "./components/FAQ/FAQ";
import Carousel from "./components/Carousel/carousel";
import Nav from "./components/Nav/Nav";
import Credits from "./components/Credits/Credits";
import Tour from "./components/Tour/Tour";
import Map from "./components/Map/Map";

function App() {
  return (
    <div className="App ">
      <div className="bg-gray-900">
        <Nav />
      </div>
      <Carousel />
      <Info />
      <Map />
      <Tour />
      <Credits />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
