"use client";
import React, { useEffect, useState, useId } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion, useAnimation } from "framer-motion";
import styles from "./SparklesBackground.module.css";

const SparklesCore = (props) => {
  const { id, className, particleColor, particleDensity } = props;
  const [init, setInit] = useState(false);
  const controls = useAnimation();
  const generatedId = useId();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: { duration: 1 },
      });
    }
  };

  const options = {
    background: {
      color: { value: "transparent" },
    },
    fullScreen: {
      enable: false, // This is crucial for containment
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: particleColor || "#ffffff",
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "out",
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: particleDensity || 100,
      },
      opacity: {
        value: { min: 0.1, max: 1 },
      },
      size: {
        value: { min: 0.6, max: 1.4 },
      },
    },
    detectRetina: true,
  };

  return (
    <motion.div animate={controls} className={`${styles.container} ${className || ""}`}>
      {init && (
        <Particles
          id={id || generatedId}
          className={styles.particles}
          particlesLoaded={particlesLoaded}
          options={options}
        />
      )}
    </motion.div>
  );
};

export default SparklesCore;

