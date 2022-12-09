import "./App.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Info from "./components/Info/Info";
import Footer from "./components/Footer/Footer";
import FAQ from "./components/FAQ/FAQ";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Info />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
