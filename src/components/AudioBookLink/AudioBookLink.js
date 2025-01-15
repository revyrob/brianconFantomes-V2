import React, { useContext } from "react";
import { LanguageContext } from "../../Language";
import chevron from "../../assets/icons/chevron-down.svg";

function AudioBookLink() {
  const { dictionary } = useContext(LanguageContext);

  return (
    <section
      id="tour"
      className="flex flex-wrap bg-gray-900 px-4 justify-center items-center pt-10"
    >
      {/* figma file started for this design */}
      <img scr={dictionary.image} alt={"book cover"} />
      <h1>Walk back into time and visit history.</h1>
      <p>
        Transport back in time through the music and story of the medieval town
        of Briancon. Follow the map and stop at the markers for the each
        chapter.{" "}
      </p>
      <button>
        {dictionary.btn}
        <img src={chevron} alt="chevron down" />
      </button>
    </section>
  );
}

export default AudioBookLink;
