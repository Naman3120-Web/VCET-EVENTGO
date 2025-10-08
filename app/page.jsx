import EventCard from "./components/EventCard";
import About from "./components/About";
import styles from "./page.module.css";

// Mock data for events
const mockEvents = [
  {
    title: "Tech Fest 2024",
    department: "Computer Science",
    date: "2024-10-26",
    posterUrl: "https://placehold.co/600x400/000000/FFFFFF?text=Tech+Fest",
  },
  {
    title: "E-Summit",
    department: "E-Cell",
    date: "2024-11-05",
    posterUrl: "https://placehold.co/600x400/1a1a1a/FFFFFF?text=E-Summit",
  },
  {
    title: "Mech Mania",
    department: "Mechanical",
    date: "2024-11-12",
    posterUrl: "https://placehold.co/600x400/333333/FFFFFF?text=Mech+Mania",
  },
];

export default function HomePage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>VCET-EVENTGO</h1>
        <p className={styles.heroSubtitle}>
          Your Central Hub for All College Events.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Upcoming Events</h2>
        <div className={styles.eventGrid}>
          {mockEvents.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </section>

      <About />
    </main>
  );
}

