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

function App() {
  return (
    <LanguageProvider>
      <div className="App ">
        <div className="bg-gray-900">
          <Nav />
        </div>
        {/* <Carousel /> */}
        <Info />
        <Map />
        <Tour />
        <Credits />
        <FAQ />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
