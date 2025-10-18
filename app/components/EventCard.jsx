"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./EventCard.module.css";

const EventCard = ({ event }) => {
  const ref = useRef(null);
  const [direction, setDirection] = useState("left");

  const handleMouseEnter = (event) => {
    if (!ref.current) return;

    const dir = getDirection(event, ref.current);
    switch (dir) {
      case 0: setDirection("top"); break;
      case 1: setDirection("right"); break;
      case 2: setDirection("bottom"); break;
      case 3: setDirection("left"); break;
      default: setDirection("left"); break;
    }
  };

  const getDirection = (ev, obj) => {
    const { width: w, height: h, left, top } = obj.getBoundingClientRect();
    const x = ev.clientX - left - w / 2;
    const y = ev.clientY - top - h / 2;
    const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    return d;
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      ref={ref}
      className={styles.cardContainer} // Uses the new glass effect styles
    >
      <AnimatePresence mode="wait">
        <motion.div
          className={styles.contentWrapper}
          initial="initial"
          whileHover={direction}
          exit="exit"
        >
          <motion.div className={styles.overlay} />
          <motion.div
            variants={variants}
            className={styles.imageWrapper}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Image
              alt={event.title}
              className={styles.image}
              width="1000"
              height="1000"
              src={event.posterUrl}
            />
          </motion.div>
          <motion.div
            variants={textVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={styles.textContainer}
          >
            <h3 className={styles.title}>{event.title}</h3>
            <p className={styles.date}>{event.date}</p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const variants = {
  initial: { x: 0 },
  exit: { x: 0, y: 0 },
  top: { y: 20 },
  bottom: { y: -20 },
  left: { x: 20 },
  right: { x: -20 },
};

const textVariants = {
  initial: { y: 0, x: 0, opacity: 0 },
  exit: { y: 0, x: 0, opacity: 0 },
  top: { y: -20, opacity: 1 },
  bottom: { y: 2, opacity: 1 },
  left: { x: -2, opacity: 1 },
  right: { x: 20, opacity: 1 },
};

export default EventCard;

