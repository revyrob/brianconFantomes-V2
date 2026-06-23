import "./App.css";
import Info from "./components/Info/Info";
import Footer from "./components/Footer/Footer";
import FAQ from "./components/FAQ/FAQ";
import Carousel from "./components/Carousel/carousel";
import Nav from "./components/Nav/Nav";
import Credits from "./components/Credits/Credits";
import Map from "./components/Map/Map";
import { LanguageProvider } from "./Language";
import AudioBookLink from "./components/AudioBookLink/AudioBookLink";

// TODO: Migrate to Google Analytics 4.
// Your UA-201468426-1 tracking ID stopped working July 2023 (Universal Analytics is deprecated).
// Steps: go to analytics.google.com → create a GA4 property → get your G-XXXXXXX measurement ID
// then install: npm install gtag  and add the GA4 script tag to public/index.html

function App() {
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
