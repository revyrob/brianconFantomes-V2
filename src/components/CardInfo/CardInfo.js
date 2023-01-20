import { motion } from "framer-motion";

function CardInfo({ title, descrip }) {
  //const cor creating cards sliding on screen

  const cardVariants = {
    offscreen: {
      y: 0,
    },
    onscreen: {
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };
  return (
    <motion.div
      className="p-4 my-4 bg-gray-200 md:p-8  lg:p-12 rounded-md m-4"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.div className="card" variants={cardVariants}>
        <h2 className="font-creepster text-2xl p-2 border-b-2 border-gray-500">
          {title}
        </h2>
        <p className="font-oswald leading-7 text-left px-4 ">{descrip}</p>
      </motion.div>
    </motion.div>
  );
}
export default CardInfo;
