import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Info from "./components/Info/Info";
import Footer from "./components/Footer/Footer";
import FAQ from "./components/FAQ/FAQ";
import Carousel from "./components/Carousel/carousel";
import Nav from "./components/Nav/Nav";
import Credits from "./components/Credits/Credits";
// import Map from "./components/Map/Map";
import AudioBookLink from "./components/AudioBookLink/AudioBookLink";
import ContactForm from "./pages/Contact/ContactForm";
import Dashboard from "./pages/Dashboard/Dashboard";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import CookieBanner from "./components/CookieBanner/CookieBanner";
import { LanguageProvider } from "./Language";
import RouteMap from "./components/Map/RouteMap";

function HomePage() {
  return (
    <>
      <Carousel />
      <Info />
      {/* <Map /> */}
      <RouteMap />
      <AudioBookLink />
      <Credits />
      <FAQ />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <div className="bg-gray-900">
          <Nav />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        <Footer />
        <CookieBanner />
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
