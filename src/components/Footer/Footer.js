import React from "react";
import facebook from "../../assets/photos/facebook.png";
import insta from "../../assets/photos/insta-icon.png";
import tripAdvisor from "../../assets/photos/tripadvisor.png";
import logo from "../../assets/logo/logoskull.png";
import spotify from "../../assets/icons/spotify-icon.svg";
import Question from "../Question/Question";

function Footer() {
  return (
    <section className="bg-gray-900 text-slate-50">
      <div className="md:grid grid-cols-3 px-16 pt-8">
        <div className="">
          <br></br>
          <p>36 Grande Rue</p>
          <p>Briancon, France</p>
        </div>
        <div className="flex flex-col pb-4 align-middle">
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
        <div>
          <Question />
        </div>
      </div>
      <p className="mx-auto">Copyright Briancon Fantomes 2020</p>
    </section>
  );
}

export default Footer;
