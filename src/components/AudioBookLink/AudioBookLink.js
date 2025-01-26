import React, { useContext } from "react";
import { LanguageContext } from "../../Language";
import chevron from "../../assets/icons/chevron-down.svg";

function AudioBookLink() {
  const { dictionary } = useContext(LanguageContext);
  console.log(dictionary.book);
  return (
    <section
      id="tour"
      className="grid grid-cols-[40%_60%] gap-4 bg-gray-900 px-10 py-10 "
    >
      {/* figma file started for this design */}
      <img
        className="place-content-around w-80"
        src={dictionary.book.img}
        alt={"book cover"}
      />
      <div className="flex flex-col justify-evenly">
        <h1 className="text-white font-oswald text-3xl p-2 border-b-2 border-gray-500">
          {dictionary.book.title}
        </h1>
        <p className="text-white font-oswald text-3l p-2 w-[80%]">
          {dictionary.book.descrip}
        </p>
        <button className="flex items-center justify-center bg-yellow-200 px-4 py-4 max-w-[210px] rounded-full ">
          {dictionary.book.btn}
          <img className="pl-2" src={chevron} alt="chevron down" />
        </button>
      </div>
    </section>
  );
}

export default AudioBookLink;
