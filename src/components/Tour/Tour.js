import React from "react";
import engTour from "../../language/en.json";
import CardMUI from "../CardMUI/CardMUI";

function Tour() {
  //get the audio tour from the language json file
  const audio = engTour.audio;
  return (
    <section
      id="tour"
      className="flex flex-wrap bg-gray-900 px-4 justify-center items-center pt-10"
    >
      {audio?.map((chpt) => (
        <CardMUI key={chpt.id} chapter={chpt} />
      ))}
    </section>
  );
}

export default Tour;
