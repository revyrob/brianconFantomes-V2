import React from "react";
//import CardTour from "../CardTour/CardTour";
import engTour from "../../data/engAudio.json";
//import fraTour from "../../../data/audioFra";
import CardMUI from "../CardMUI/CardMUI";

function Tour() {
  console.log(engTour);
  return (
    <section
      id="tour"
      className="flex flex-wrap bg-gray-900 px-4 justify-center items-center pt-10"
    >
      {engTour?.map((chpt) => (
        <CardMUI chapter={chpt} />
      ))}
    </section>
  );
}

export default Tour;
