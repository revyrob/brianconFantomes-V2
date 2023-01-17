import React from "react";
import { motion } from "framer-motion";

function Info() {
  //const cor creating cards sliding on screen
  const cardVariants = {
    offscreen: {
      x: 1000,
    },
    onscreen: {
      x: 0,
      rotate: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  function Card({ title, descrip }) {
    return (
      <motion.div
        className="p-4 my-4 bg-gray-200 md:p-8  lg:p-12 rounded-md m-4"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
      >
        <motion.div className="card" variants={cardVariants}>
          <h2 className="font-creepster text-2xl p-2 border-b-2 border-gray-500">
            {title}
          </h2>
          <p className="font-oswald leading-7 text-left px-4 ">{descrip}</p>
        </motion.div>
      </motion.div>
    );
  }
  function CardEmpty() {
    return <div className="bg-gray-900"></div>;
  }
  const info = [
    {
      id: "1343",
      title: "ABOUT AUDIO WALK",
      descrip:
        "An extraordinary adventure in the old town of Briançon! Travel through time, and visit the Vauban city in a different way. Let us frighten and surprise you as we guide you through the alleys and passages. You will be transported back in time and hear the tales of the fires that have ravaged the town twice, the meeting of witches, and much more! Discover the dark history and legends of Briançon with Briançon Fantômes!",
    },
    {},
    {},
    {
      id: "1sdsdf43",
      title: "YOU NEED",
      descrip:
        "You will need a smartphone, headphones, and Internet/Data. Briançon Fantômes takes between 60-90 minutes to complete and we recommend to do it in the late afternoon or evening because the atmosphere in the old town of Briançon is mystical as dusk arrives.",
    },

    {
      id: "1sdf43",
      title: "WARNING",
      descrip:
        "Briançon Fantômes is not for the faint-hearted! Children under 8 years old are not recommended to listen to the audio tour. The town is steep and has uneven surfaces, please pay attention while walking through and around the old town. Stop in a safe area when listening to the audio for the tour.",
    },
  ];

  return (
    <section
      id="about"
      //bg-gray-900  md:grid grid-cols-2 px-16 pt-8 max-w-6xl mx-auto
      //bg-gray-900 sm:m-2 p-2 md:grid grid-cols-2 px-16 pt-8 max-w-6xl mx-auto
      className="bg-gray-900 pb-4 md:grid grid-cols-2  pt-8 max-w-6xl mx-auto"
    >
      {info?.map((i) =>
        i.id === undefined ? (
          <CardEmpty />
        ) : (
          <Card key={i.id} title={i.title} descrip={i.descrip} />
        )
      )}

      {/* <div></div>
      <div className="p-4 bg-gray-200 md:p-8  lg:p-12 rounded-md">
        <h2 className="font-creepster text-2xl p-2 border-b-2 border-gray-500">
          ABOUT AUDIO WALK
        </h2>
        <p className="font-oswald leading-7 text-left px-4 pt-4">
          An extraordinary adventure in the old town of Briançon! Travel through
          time, and visit the Vauban city in a different way. Let us frighten
          and surprise you as we guide you through the alleys and passages. You
          will be transported back in time and hear the tales of the fires that
          have ravaged the town twice, the meeting of witches, and much more!
          Discover the dark history and legends of Briançon with Briançon
          Fantômes!
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
      <div></div>
      <div></div>

      <div className="p-4 mt-8 mb-8 bg-gray-200 md:p-8 lg:p-12 rounded-md">
        <h2 className="text-2xl p-2 border-b-2 border-gray-500 font-creepster">
          WARNING
        </h2>
        <p className="font-oswald leading-7 text-left px-4 pt-4">
          Briançon Fantômes is not for the faint-hearted! Children under 8 years
          old are not recommended to listen to the audio tour. The town is
          steep> and has uneven surfaces, please pay attention while walking
          through and around the old town. Stop in a safe area when listening to
          the audio for the tour.
        </p>
      </div> */}
    </section>
  );
}

export default Info;
