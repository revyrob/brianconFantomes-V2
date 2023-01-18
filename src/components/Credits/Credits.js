import React from "react";

function Credits() {
  return (
    <section className="p-4">
      <div className="flex mx-auto w-full border-b-2 justify-center">
        <h1 className="text-2xl p-2  border-gray-500 font-creepster">
          Credits
        </h1>
      </div>
      <h2 className="text-lg mt-6">Music</h2>
      <div className="my-2">
        <ul>
          <li>Bach - Toccata and Fugue in D Minor</li>
          <li>Secession Studies - Heart of Darkness</li>
          <li>Achille-Claude Debussy - Suite bergamasque: Clair de lune</li>
          <li>Mussorgsky - Night on the Bare Mountain</li>
          <li>Gustav Mahler - Adagietto from Symphony no. 5</li>
          <li>Frédéric Chopin - Prelude in E-Minor Op. 28 No. 4</li>
          <li>Vozes da Tranquilidade - Missa Cum Jubilo Sanctus</li>
          <li>Mark Korven - What Went We</li>
          <li>Rachmaninov - The Isle of the Dead, Symphonic poem Op. 29</li>
          <li>Frédéric Chopin - Op. 9, No. 1 in B flat minor. Larghetto</li>
          <li>Alexander Litvinovsky - Le Grand Cahier: X. L'Incendie</li>
        </ul>
      </div>
      <h2 className="text-lg mt-6 ">Historical References</h2>
      <div className="my-2">
        <ul>
          <li>Briançon à travers l'histoire - Jacqueline Routier</li>
          <li>Images du Brianconnais 1750-1950 - Roger Merle</li>
          <li>The History of Serre Chevalier and Briançon - Susan Lomas</li>
        </ul>
      </div>
      <h2 className="text-lg mt-6 ">Writer/Producer/Web Developer</h2>
      <div className="my-2">
        <p>
          <a href="https://kaylerobson.com" rel="noreferrer" target="_blank">
            Kayle Robson
          </a>
        </p>
      </div>
    </section>
  );
}

export default Credits;
