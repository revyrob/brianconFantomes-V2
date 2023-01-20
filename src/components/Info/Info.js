import React from "react";
import CardInfo from "../CardInfo/CardInfo";
import CardEmpty from "../CardEmpty/CardEmpty";
import allInfo from "../../data/info.json";
import { useState } from "react";
import CardSlide from "../CardSlide/CardSlide";

function Info() {
  //set questions with state
  const [info] = useState(allInfo);

  return (
    <section
      id="about"
      className="bg-gray-900 pb-4 md:grid grid-cols-2 pt-8 max-w-6xl mx-auto "
    >
      {info?.map((i) =>
        i.id === undefined ? (
          <CardEmpty />
        ) : (
          <CardSlide key={i.id} title={i.title} descrip={i.descrip} />
        )
      )}
    </section>
  );
}

export default Info;
