import React from "react";
import facebook from "../../assets/photos/facebook.png";
import insta from "../../assets/photos/insta-icon.png";
import tripAdvisor from "../../assets/photos/tripadvisor.png";
import logo from "../../assets/logo/logoskull.png";
import spotify from "../../assets/icons/spotify-icon.svg";
import { motion } from "framer-motion";
import QuestionForm from "../QuestionForm/QuestionForm";

function Footer() {
  const footerVarients = {
    offscreen: {
      x: 1000,
    },
    onscreen: {
      x: 0,
      rotate: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1.2,
      },
    },
  };
  return (
    <section className="bg-gray-900 text-slate-50">
      <div className="md:grid grid-cols-3 px-16 pt-8">
        <div className="order-last flex flex-col py-4 justify-middle items-start lg:order-first">
          <motion.div
            className="w-24 ml-[1rem]"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            variants={footerVarients}
          >
            <a href="#about">
              <p className="text-slate-50 py-5 text-lg align-middle border-l-2 hover:border-x-2">
                Show
              </p>
            </a>
          </motion.div>
          <motion.div
            className="w-24 ml-[2rem]"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            variants={footerVarients}
          >
            <a href="#about">
              <p className="text-slate-50 py-5 text-lg align-middle border-l-2 hover:border-x-2">
                About
              </p>
            </a>
          </motion.div>
          <motion.div
            className="w-24 ml-[3rem]"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            variants={footerVarients}
          >
            <a href="#faq">
              <p className="text-slate-50 py-5 text-lg align-middle border-l-2 hover:border-x-2">
                Credits
              </p>
            </a>
          </motion.div>
          <motion.div
            className="w-24 ml-[4rem]"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            variants={footerVarients}
          >
            <a href="#faq">
              <p className="text-slate-50 py-5 text-lg align-middle border-l-2 hover:border-x-2">
                FAQ
              </p>
            </a>
          </motion.div>
        </div>
        <div className="order-first flex flex-col pb-4 align-middle lg:order-2">
          <img
            src={logo}
            className="w-3/4 mx-auto"
            alt="briancon fantomes logo"
          />
          <div className="flex flex-row justify-center">
            <a href="https://www.facebook.com/BrianconFantomes/">
              <img className="h-8 m-2" src={facebook} alt="facebook-icon" />
            </a>
            <a href="https://www.instagram.com/brianconfantomes/">
              <img className="h-8 m-2" src={insta} alt="instagram-icon" />
            </a>
            <a href="https://www.tripadvisor.com/Attraction_Review-g219218-d21176245-Reviews-Briancon_Fantomes-Briancon_Hautes_Alpes_Provence_Alpes_Cote_d_Azur.html">
              <img
                className="h-8 m-2"
                src={tripAdvisor}
                alt="tripAdvisor-icon"
              />
            </a>
            <a href="https://open.spotify.com/playlist/3tCHTiFJrSC1HexGdCDesq">
              <img className="h-8 m-2" src={spotify} alt="spotify-icon" />
            </a>
          </div>
        </div>
        <div className="order-2 lg:order-last">
          <QuestionForm />
        </div>
      </div>
      <p className="mx-auto pb-4">Copyright Briancon Fantomes 2020</p>
    </section>
  );
}

export default Footer;
