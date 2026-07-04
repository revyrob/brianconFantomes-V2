import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "./components/Footer/Footer";
import Carousel from "./components/Carousel/carousel";
import Nav from "./components/Nav/Nav";
import HomePage from "./pages/HomePage/HomePage";
import AudioBookLink from "./components/AudioBookLink/AudioBookLink";
import ContactForm from "./pages/Contact/ContactForm";
import Dashboard from "./pages/Dashboard/Dashboard";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import CookieBanner from "./components/CookieBanner/CookieBanner";
import { LanguageProvider } from "./Language";
import RouteMap from "./components/Map/RouteMap";

function ScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [hash]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <div className="bg-gray-900">
          <Nav />
        </div>
        <ScrollToHash />
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
