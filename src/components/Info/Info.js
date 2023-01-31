import CardEmpty from "../CardEmpty/CardEmpty";
import allInfo from "../../language/en.json";
import CardSlide from "../CardSlide/CardSlide";
import React, { useContext, useState } from "react";
//import { Text, LanguageContext } from "../containers/Language";

function Info() {
  //const { dictionary } = useContext(LanguageContext);

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
