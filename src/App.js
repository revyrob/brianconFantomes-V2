import "./App.css";
import Info from "./components/Info/Info";
import Footer from "./components/Footer/Footer";
import FAQ from "./components/FAQ/FAQ";
import Carousel from "./components/Carousel/carousel";
import Nav from "./components/Nav/Nav";
import Credits from "./components/Credits/Credits";

function App() {
  return (
    <div className="App ">
      <div className="bg-gray-900">
        <Nav />
      </div>
      <Carousel />
      <Info />
      <FAQ />
      <Credits />
      <Footer />
    </div>
  );
}

export default App;
