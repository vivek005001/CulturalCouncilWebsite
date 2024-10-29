"use client";
import { motion } from "framer-motion";

function App() {
  const ferrisOfTechs = [
    "designauts.jpeg",
    "designauts.jpeg",
    "designauts.jpeg",
    "designauts.jpeg",
    "designauts.jpeg",
    "designauts.jpeg",
  ];
  return (
    <div className="">
      {ferrisOfTechs.map((tech, index: number) => {
        return (
          <motion.div
            className="fixed overflow-hidden lg:right-[0] lg:-bottom-[50%] h-[120%] max-sm:h-[100%] max-lg:right-[40%] max-sm:right-[38%] max-lg:-bottom-[70%] max-sm:-bottom-[65%]"
            key={index + 1}
            initial="initial"
            animate={["animate", "initialHide"]}
            variants={{
              initial: {
                opacity: 0,
              },
              initialHide: {
                opacity: 1,
                transition: {
                  delay: index + 1,
                },
              },
              animate: {
                rotate: -360,
                transition: {
                  duration: ferrisOfTechs.length,
                  repeat: Infinity,
                  delay: index + 1,
                  ease: "linear",
                },
              },
            }}
          >
            <div className="image-parent">
              <img
                className="pointer-events-none h-[150px] rounded-full"
                src={`/assets/images/${tech}`}
                alt={tech}
              />
            </div>
          </motion.div>
        );
      }, [])}
    </div>
  );
}

export default App;