import CardMUI from "../CardMUI/CardMUI";
import React, { useContext } from "react";
import { LanguageContext } from "../../Language";

function Tour() {
  const { dictionary } = useContext(LanguageContext);

  //get the audio tour from the language json file
  //const [audio] = useState(dictionary.audio);

  return (
    <section
      id="tour"
      className="flex flex-wrap bg-gray-900 px-4 justify-center items-center pt-10"
    >
      {dictionary.audio?.map((chpt) => (
        <CardMUI key={chpt.id} chapter={chpt} />
      ))}
    </section>
  );
}

export default Tour;
