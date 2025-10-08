"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./TubelightNavbar.module.css";

export function TubelightNavbar({ items }) {
  // 1. Initialize state with a default value that is the same on server and client.
  const [activeTab, setActiveTab] = useState(items[0].name);

  // 2. Use useEffect to safely access the `window` object only on the client.
  useEffect(() => {
    // This code runs after the component has mounted in the browser.
    const currentPath = window.location.pathname;
    const activeItem = items.find(item => item.url === currentPath);
    if (activeItem) {
      setActiveTab(activeItem.name);
    }
  }, []); // Empty dependency array means this runs once on mount.

  return (
    <div className={styles.navContainer}>
      <div className={styles.navWrapper}>
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
            >
              <span className={styles.navText}>{item.name}</span>
              <span className={styles.navIcon}>
                <Icon size={18} strokeWidth={2.5} />
              </span>

              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className={styles.lamp}
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className={styles.lightEffect}>
                    <div className={styles.glow1} />
                    <div className={styles.glow2} />
                    <div className={styles.glow3} />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

