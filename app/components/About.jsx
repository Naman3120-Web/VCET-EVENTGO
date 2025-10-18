import styles from "./About.module.css";

export default function About() {
  return (
    // This outer section is important for spacing on the homepage
    <section className={styles.section}>
      <div className={styles.glowingCard}>
        {/* These two divs are the animated elements */}
        <div className={styles.borderFollower} />
        <div className={styles.borderColorChanger} />

        {/* This div holds the text content */}
        <div className={styles.content}>
          <h1 className={styles.title}>About VCET-EVENTGO</h1>
          <p className={styles.description}>
            This platform is the central hub for all events, workshops, and
            activities happening at our college. Our goal is to create a vibrant,
            connected campus where no one misses out on an opportunity to learn,
            grow, and have fun.
          </p>
        </div>
      </div>
    </section>
  );
}

