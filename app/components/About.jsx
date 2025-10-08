import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.aboutSection} id="about">
      <h2 className={styles.title}>About VCET-EVENTGO</h2>
      <div className={styles.content}>
        <p>
          VCET-EVENTGO is your centralized hub for all events happening at our college. 
          Our mission is to bridge the information gap between departments and students, 
          ensuring you never miss out on an opportunity to learn, engage, and grow.
        </p>
        <p>
          This platform is built by students, for students, with a focus on providing 
          a seamless, reliable, and up-to-date event feed.
        </p>
      </div>
    </section>
  );
}

