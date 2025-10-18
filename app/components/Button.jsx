"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import styles from "./Button.module.css";

const Button = React.forwardRef(
  ({ text = "Button", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${styles.button} ${className || ""}`}
        {...props}
      >
        <span className={styles.initialText}>{text}</span>
        <div className={styles.hoverContent}>
          <span>{text}</span>
          <ArrowRight size={16} />
        </div>
        <div className={styles.backgroundElement}></div>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
