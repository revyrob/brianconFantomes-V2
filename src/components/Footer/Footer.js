import React from "react";
import facebook from "../../assets/photos/facebook.png";
import insta from "../../assets/photos/insta-icon.png";
import tripAdvisor from "../../assets/photos/tripAdvisor.png";

function Footer() {
  return (
    <section>
      <div>
        <h3>Contact</h3>
        <p>36 Grande Rue</p>
        <p>Briancon, France</p>
        <p>Contact</p>
      </div>
      <div>
        <h3>Social</h3>
        <img src={facebook} alt="facebook-icon" />
        <img src={insta} alt="instagram-icon" />
        <img src={tripAdvisor} alt="tripAdvisor-icon" />
      </div>
    </section>
  );
}

export default Footer;
