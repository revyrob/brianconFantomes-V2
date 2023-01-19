import React from "react";

function Question({ question, response }) {
  return (
    <div className="w-max-3/4 my-6">
      <h2 className="text-lg font-oswald">{question}</h2>
      <p className="text-base">{response}</p>
    </div>
  );
}

export default Question;
