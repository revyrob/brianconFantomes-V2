import "./App.css";
import Info from "./components/Info/Info";
import Footer from "./components/Footer/Footer";
import FAQ from "./components/FAQ/FAQ";
import Carousel from "./components/Carousel/carousel";
import Nav from "./components/Nav/Nav";
import Credits from "./components/Credits/Credits";
import Map from "./components/Map/Map";
import AudioBookLink from "./components/AudioBookLink/AudioBookLink";
import { LanguageProvider } from "./Language";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// TODO: Replace REACT_APP_GA_MEASUREMENT_ID with your GA4 property ID in .env
// (analytics.google.com → create GA4 property → get G-XXXXXXX)

function App() {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID || "test",
        currency: "EUR",
        intent: "capture",
      }}
    >
      <LanguageProvider>
        <div className="bg-gray-900">
          <Nav />
        </div>
        <Carousel />
        <Info />
        <Map />
        <AudioBookLink />
        <Credits />
        <FAQ />
        <Footer />
      </LanguageProvider>
    </PayPalScriptProvider>
  );
}

export default App;
