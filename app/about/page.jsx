import styles from "./page.module.css";
import Image from "next/image";

export default function AboutCollegePage() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <Image
          src="https://placehold.co/1200x400/000000/FFFFFF?text=VCET+Campus"
          alt="College Campus"
          width={1200}
          height={400}
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}></div>
        <h1 className={styles.title}>About Our College</h1>
      </div>
      <div className={styles.content}>
        <p>
          Welcome to our esteemed institution, a place where innovation, dedication, and knowledge converge. 
          Founded with the vision to nurture the next generation of leaders, we have been a beacon of academic 
          excellence for decades.
        </p>
        <p>
          Our campus is a vibrant community of students, faculty, and staff, all committed to pushing the boundaries 
          of learning and research. We offer a wide range of programs across various disciplines, ensuring that 
          every student finds their path to success.
        </p>
      </div>
    </main>
  );
}

