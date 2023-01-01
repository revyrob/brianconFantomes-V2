import React from "react";
import facebook from "../../assets/photos/facebook.png";
import insta from "../../assets/photos/insta-icon.png";
import tripAdvisor from "../../assets/photos/tripadvisor.png";
import logo from "../../assets/logo/logoskull.png";

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
            <img className="h-8 m-2" src={facebook} alt="facebook-icon" />
            <img className="h-8 m-2" src={insta} alt="instagram-icon" />
            <img className="h-8 m-2" src={tripAdvisor} alt="tripAdvisor-icon" />
          </div>
        </div>
        <div>
          <h3>Contact</h3>
          <p>36 Grande Rue</p>
          <p>Briancon, France</p>
          <p>Contact</p>
        </div>
      </div>
      <p className="mx-auto">Copyright Briancon Fantomes 2020</p>
    </section>
  );
}

export default Footer;
