import React from "react";
import ReactAudioPlayer from "react-audio-player";

function Tour() {
  return (
    <section>
      <div>Tour</div>
      <ReactAudioPlayer src="../../audio/Chpt1.mp3" autoPlay controls />
    </section>
  );
}

export default Tour;
