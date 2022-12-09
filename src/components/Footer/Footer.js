import React from "react";
import facebook from "../../assets/photos/facebook.png";
import insta from "../../assets/photos/insta-icon.png";
import tripAdvisor from "../../assets/photos/tripadvisor.png";

function Footer() {
  return (
    <section className="bg-gray-900 text-slate-50 md:grid grid-cols-3 px-16 pt-8">
      <div className="">
        <h3>Contact</h3>
        <p>36 Grande Rue</p>
        <p>Briancon, France</p>
        <p>Contact</p>
      </div>
      <div>
        <h3>Contact</h3>
        <p>36 Grande Rue</p>
        <p>Briancon, France</p>
        <p>Contact</p>
      </div>
      <div>
        <h3>Social</h3>
        <div className="flex flex-row">
          <img className="h-8" src={facebook} alt="facebook-icon" />
          <img className="h-8" src={insta} alt="instagram-icon" />
          <img className="h-8" src={tripAdvisor} alt="tripAdvisor-icon" />
        </div>
      </div>
    </section>
  );
}

export default Footer;
