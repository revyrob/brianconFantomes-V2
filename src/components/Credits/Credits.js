import React, { useContext } from "react";
import { LanguageContext } from "../../Language";

function Credits() {
  const { dictionary } = useContext(LanguageContext);

  return (
    <section id="credits" className="p-4 h-[300px] relative truncate">
      <div className="flex mx-auto w-full border-b-2 justify-center">
        <h1 className="text-2xl p-2  border-gray-500 font-creepster">
          {dictionary.credits}
        </h1>
      </div>
      <div className="flex w-full justify-center truncate">
        <div className="animate-marquee-infinite relative ">
          <h2 className="md:text-lg ">{dictionary.heading1}</h2>
          <div className="text-sm my-2 p-4 md:text-base">
            <ul>
              <li>Bach - Toccata and Fugue in D Minor</li>
              <li>Secession Studies - Heart of Darkness</li>
              <li>Achille-Claude Debussy - Suite bergamasque: Clair de lune</li>
              <li>Mussorgsky - Night on the Bare Mountain</li>
              <li>Gustav Mahler - Adagietto from Symphony No. 5</li>
              <li>Frédéric Chopin - Prelude in E-Minor Op. 28 No. 4</li>
              <li>Vozes da Tranquilidade - Missa Cum Jubilo Sanctus</li>
              <li>Mark Korven - What Went We</li>
              <li>Rachmaninov - The Isle of the Dead, Symphonic poem Op. 29</li>
              <li>Frédéric Chopin - Op. 9, No. 1 in B flat minor. Larghetto</li>
              <li>Alexander Litvinovsky - Le Grand Cahier: X. L'Incendie</li>
            </ul>
          </div>
          <h2 className="text-lg mt-6 ">{dictionary.heading2}</h2>
          <div className="my-2">
            <ul>
              <li>Briançon à travers l'histoire - Jacqueline Routier</li>
              <li>Images du Brianconnais 1750-1950 - Roger Merle</li>
              <li>The History of Serre Chevalier and Briançon - Susan Lomas</li>
            </ul>
          </div>
          <h2 className="text-lg mt-6 ">{dictionary.heading3}</h2>
          <div className="my-2">
            <p>
              <a
                href="https://kaylerobson.com"
                rel="noreferrer"
                target="_blank"
              >
                Kayle Robson
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Credits;
