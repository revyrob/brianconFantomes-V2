import facebook from "../../assets/photos/facebook.png";
import insta from "../../assets/photos/insta-icon.png";
import tripAdvisor from "../../assets/photos/tripadvisor.png";
import logo from "../../assets/logo/logoskull.png";
import spotify from "../../assets/icons/spotify-icon.svg";
import QuestionForm from "../QuestionForm/QuestionForm";
import { useRef } from "react";
import { useInView } from "framer-motion";
import React, { useContext, useState } from "react";
import { LanguageContext } from "../../Language";

function Footer() {
  //refs are used for the motion of the nav bar, it signals when the the div is in
  //view and then then navbar is brought on screen
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  //use context to bring in the dictionary of the the two languages
  const { dictionary } = useContext(LanguageContext);

  return (
    <section className="bg-gray-900 text-slate-50">
      <div className="lg:grid grid-cols-3 px-16 pt-8" ref={ref}>
        <div className="md:order-2 flex flex-col pb-4 align-middle ">
          <img
            src={logo}
            className="max-w-[18rem] mx-auto"
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

        <div className=" flex flex-col py-4 pb-6 justify-middle items-start md:order-3 md:pb-0">
          {dictionary.footer?.map((headings) => (
            <div
              key={toString(headings)}
              className={`w-24 ml-[${dictionary.footer.indexOf(headings)}rem]`}
              style={{
                transform: isInView ? "none" : "translateX(500px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
              }}
            >
              <a href={`#${headings.toLowerCase()}`}>
                <p className="text-slate-50 py-5 text-lg align-middle border-l-2 hover:border-x-2">
                  {headings}
                </p>
              </a>
            </div>
          ))}
        </div>

        <div className="pb-6 md:order-1">
          <QuestionForm />
        </div>
      </div>
      <p className="mx-auto pb-4">©️ Briancon Fantomes 2020</p>
    </section>
  );
}

export default Footer;
