import React from "react";
import chevronDown from "../../assets/icons/chevron-down.svg";
import chevronUp from "../../assets/icons/chevron-up.svg";
import allQuestions from "../../data/faq.json";
import { useState } from "react";
import Question from "../Question/Question";

function FAQ() {
  //set questions with state
  const [questions] = useState(allQuestions);

  //if isShown is false not all questions are displayed.  If true all questions are displayed
  const [isShown, setIsShown] = useState(false);

  //toggle function for drop down
  function toggle() {
    //if selected the question drop down, compare previous state
    setIsShown((prevCheck) => !prevCheck);
  }

  return (
    <section className="p-4" id="faq">
      <div className="flex mx-auto w-full border-b-2 justify-center">
        <h1 className="text-2xl p-2  border-gray-500 font-creepster">FAQ</h1>
        <div class="bg-[url('../../assets/icons/chevron-up.svg')]"></div>
        <img src={chevronUp} alt="chevron up" onClick={() => toggle()} />
      </div>
      <div className="w-max-3/4 my-6">
        <h2 className="text-lg font-oswald">
          This first question shoudln't drop?
        </h2>
        <p className="text-base">Here is the response.</p>
      </div>
      {isShown && (
        <div>
          {questions?.map((question) => (
            <Question
              key={question.id}
              question={question.question}
              response={question.response}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default FAQ;
