import { useRef } from "react";
import { useInView } from "framer-motion";

function CardSlide({ title, descrip }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className="p-4 my-4 bg-gray-200 md:p-8  lg:p-12 rounded-md m-4"
    >
      <div
        className="card"
        style={{
          transform: isInView ? "none" : "translateX(-200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        <h2 className="font-creepster text-2xl p-2 border-b-2 border-gray-500">
          {title}
        </h2>
        <p className="font-oswald leading-7 text-left px-4 ">{descrip}</p>
      </div>
    </div>
  );
}
export default CardSlide;
