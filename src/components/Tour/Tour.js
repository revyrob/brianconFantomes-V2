import React from "react";
import CardTour from "../CardTour/CardTour";
import engTour from "../../data/engAudio.json";
//import fraTour from "../../../data/audioFra";

function Tour() {
  console.log(engTour);
  return (
    <section>
      {engTour?.map((chpt) => (
        <CardTour chapter={chpt} />
      ))}
    </section>
  );
}

export default Tour;
