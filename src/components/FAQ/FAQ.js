import React from "react";
import chevronDown from "../../assets/icons/chevron-down.svg";
import chevronUp from "../../assets/icons/chevron-up.svg";
import info from "../../language/en.json";
import { useState } from "react";
import Question from "../Question/Question";

function FAQ() {
  //set questions with state
  const [questions] = useState(info.faq);

  //if isShown is false not all questions are displayed.  If true all questions are displayed
  const [isShown, setIsShown] = useState(false);

  //the state for the chevron image
  const [chevron, setChevron] = useState(false);

  //toggle function for drop down
  function toggle() {
    //if selected the question drop down, compare previous state
    setIsShown((prevCheck) => !prevCheck);
    setChevron(!chevron);
  }

  return (
    <section className="p-4" id="faq">
      <div className="flex mx-auto w-full border-b-2 justify-center">
        <h1 className="text-2xl p-2  border-gray-500 font-creepster">FAQ</h1>
        <button className="transition duration-300 ease-in-out">
          {chevron === false ? (
            <img
              className=""
              src={chevronUp}
              alt="chevron down "
              onClick={() => toggle()}
            />
          ) : (
            <img
              className=""
              src={chevronDown}
              alt="chevron up"
              onClick={() => toggle()}
            />
          )}
        </button>
      </div>
      <div className="w-max-3/4 my-6">
        {chevron === false ? (
          <div>
            <h2 className="text-lg font-oswald">{questions[0].question}</h2>
            <p className="text-base">{questions[0].response}</p>
            <h2 className="text-lg font-oswald">. . . </h2>
          </div>
        ) : (
          <div>
            {isShown && (
              <div
                style={{
                  transform: "translateY(10px)",
                  opacity: 1,
                  transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }}
              >
                {questions?.map((question) => (
                  <Question
                    key={question.id}
                    question={question.question}
                    response={question.response}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default FAQ;
