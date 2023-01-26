import React from "react";
import CardEmpty from "../CardEmpty/CardEmpty";
import allInfo from "../../data/en.json";
import { useState } from "react";
import CardSlide from "../CardSlide/CardSlide";

function Info() {
  //set questions with state
  const [info] = useState(allInfo.info);

  return (
    <section
      id="about"
      className="bg-gray-900 pb-4 md:grid grid-cols-2 pt-8 max-w-6xl mx-auto "
    >
      {info?.map((i) =>
        i.id === undefined ? (
          <CardEmpty key={info.indexOf(i)} />
        ) : (
          //translate here
          <CardSlide key={i.id} title={i.title} descrip={i.descrip} />
        )
      )}
    </section>
  );
}

export default Info;
