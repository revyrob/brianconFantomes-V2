import React from "react";
import ReactAudioPlayer from "react-audio-player";

function CardTour({ chapter }) {
  return (
    <div>
      <div>
        <img src={chapter.img} alt={chapter.title}></img>
      </div>
      <h3>{chapter.title}</h3>
      <div>
        <ReactAudioPlayer src={chapter.audio} autoPlay controls />
      </div>
    </div>
  );
}

export default CardTour;
