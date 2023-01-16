import "./App.css";
import Header from "./components/Header/Header";
//import Hero from "./components/Hero/Hero";
import Info from "./components/Info/Info";
import Footer from "./components/Footer/Footer";
import FAQ from "./components/FAQ/FAQ";
//import { Carousel } from "flowbite-react";
import Carousel from "./components/Carousel/carousel";
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <Carousel />
      <Info />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
