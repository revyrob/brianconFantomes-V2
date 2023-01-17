import React from "react";
import ReactAudioPlayer from "react-audio-player";

function CardTour({ chapter }) {
  return (
    <div className="flex flex-col w-32 h-64 ">
      <div className="">
        <img src={chapter.img} alt={chapter.title}></img>
      </div>
      <h3>{chapter.title}</h3>
      <div>
        <ReactAudioPlayer src={chapter.audio} controls />
      </div>
    </div>
  );
}

export default CardTour;
