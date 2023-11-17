import chevronDown from "../../assets/icons/chevron-down.svg";
import chevronUp from "../../assets/icons/chevron-up.svg";
import Question from "../Question/Question";
import React, { useContext, useState } from "react";
import { LanguageContext } from "../../Language";

function FAQ() {
  //use context to bring in the dictionary of the the two languages
  const { dictionary } = useContext(LanguageContext);

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
    <section className="p-4 text-center" id="faq">
      <div className=" mx-auto w-full border-b-2 justify-center">
        <h1 className="text-2xl p-2  border-gray-500 font-creepster">FAQ</h1>
          </div>
          <div>
           
              <div
                style={{
                  transform: "translateY(10px)",
                  opacity: 1,
                  transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }}
              >
                {dictionary.faq?.map((question) => (
                  <Question
                    key={question.id}
                    question={question.question}
                    response={question.response}
                  />
                ))}
              </div>
        
          </div>
        
    </section>
  );
}

export default FAQ;
