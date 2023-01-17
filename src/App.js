import "./App.css";
import Info from "./components/Info/Info";
import Footer from "./components/Footer/Footer";
import FAQ from "./components/FAQ/FAQ";
import Carousel from "./components/Carousel/carousel";
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <div className="App ">
      <div className="bg-gray-900">
        <Nav />
      </div>
      <Carousel />
      <Info />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
