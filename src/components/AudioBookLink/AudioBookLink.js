import React, { useContext, useState } from "react";
import { LanguageContext } from "../../Language";
import chevron from "../../assets/icons/chevron-down.svg";

function AudioBookLink() {
  const { dictionary } = useContext(LanguageContext);
  //if isShown is false not all questions are displayed.  If true all questions are displayed
  const [isShown, setIsShown] = useState(false);

  //toggle function for drop down
  function toggle() {
    //if selected the question drop down, compare previous state
    setIsShown((prevCheck) => !prevCheck);
  }
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
        <div>
          <button
            onClick={toggle}
            className="flex items-center justify-center bg-yellow-200 px-4 py-4 max-w-[210px] rounded-full "
          >
            {dictionary.book.btn}
            <img className="pl-2" src={chevron} alt="chevron down" />
          </button>
          <div
            className="bg-white flex flex-col max-w-[200px] rounded-xl"
            style={
              isShown === true ? { visibility: "visible" } : { display: "none" }
            }
          >
            {dictionary.book.vendors?.map((vendor, index) => (
              <a
                className="p-2"
                key={index}
                href={vendor.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {vendor.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AudioBookLink;
