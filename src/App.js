import "./App.css";
import Info from "./components/Info/Info";
import Footer from "./components/Footer/Footer";
import FAQ from "./components/FAQ/FAQ";
import Carousel from "./components/Carousel/carousel";
import Nav from "./components/Nav/Nav";
import Credits from "./components/Credits/Credits";
import Map from "./components/Map/Map";
import AudioBookLink from "./components/AudioBookLink/AudioBookLink";
import DownloadPage from "./components/Download/DownloadPage";
import { LanguageProvider } from "./Language";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// TODO: Migrate to Google Analytics 4.
// Your UA-201468426-1 tracking ID stopped working July 2023 (Universal Analytics is deprecated).
// Steps: go to analytics.google.com → create a GA4 property → get your G-XXXXXXX measurement ID
// then add the GA4 script tag to public/index.html (see the placeholder already there)

function MainSite() {
  return (
    <>
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
    </>
  );
}

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
        <BrowserRouter>
          <Routes>
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/*" element={<MainSite />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </PayPalScriptProvider>
  );
}

export default App;
