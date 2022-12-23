import React from "react";

function Info() {
  return (
    <section
      id="about"
      className="bg-gray-900  md:grid grid-cols-2 px-16 pt-8 max-w-6xl mx-auto"
    >
      <div></div>
      <div className="p-4 bg-gray-200 md:p-8  lg:p-12 rounded-md">
        <h2 className="font-creepster text-2xl p-2 border-b-2 border-gray-500">
          AUDIO WALK
        </h2>
        <p className="font-oswald leading-7 text-left px-4 pt-4">
          An extraordinary adventure in the old town of Briançon. Travel through
          time, and visit the Vauban city in a different way. Let us frighten
          and surprise you as we guide you through the alleys and passages.
          Discover the dark history and legends of Briançon with Briançon
          Fantômes!
        </p>
      </div>

      <div className="p-4 mt-8 bg-gray-200 md:p-8 lg:p-12 rounded-md">
        <h2 className="text-2xl p-2 border-b-2 border-gray-500 font-creepster">
          ABOUT
        </h2>
        <p className=" font-oswald leading-7 text-left px-4 pt-4">
          You will be transported back in time and hear the tales of the fires
          that have ravaged the town twice, the meeting of witches, and much
          more! Briançon Fantômes is not for the faint-hearted!
        </p>
      </div>
      <div></div>
      <div></div>
      <div className="p-4 mt-8 bg-gray-200 md:p-8 lg:p-12 rounded-md">
        <h2 className="text-2xl p-2 border-b-2 border-gray-500 font-creepster">
          YOU NEED
        </h2>
        <p className="font-oswald leading-7 text-left px-4 pt-4">
          You will need a smartphone, headphones, and Internet/Data. Briançon
          Fantômes takes between 60-90 minutes to complete and we recommend to
          do it in the late afternoon or evening because the atmosphere in the
          old town of Briançon is mystical as dusk arrives.
        </p>
      </div>
      <div className="p-4 mt-8 mb-8 bg-gray-200 md:p-8 lg:p-12 rounded-md">
        <h2 className="text-2xl p-2 border-b-2 border-gray-500 font-creepster">
          WARNING
        </h2>
        <p className="font-oswald leading-7 text-left px-4 pt-4">
          Briançon Fantômes is not for the faint-hearted! Children under 8 years
          old are not recommended to listen to the audio tour.
        </p>
      </div>
    </section>
  );
}

export default Info;
