"use client";

import styles from "./page.module.css";
import Hero from "./components/Hero";
import EventCard from "./components/EventCard";
import About from "./components/About";
import Link from "next/link";

const mockEvents = [
  {
    title: "Tech Fest 2025",
    date: "October 15, 2025",
    posterUrl: "/images/image.jpg",
    id: "tech-fest-2025",
  },
  {
    title: "Annual Sports Meet",
    date: "November 5, 2025",
    posterUrl: "/images/image.jpg",
    id: "sports-meet-2025",
  },
  {
    title: "Cultural Night",
    date: "December 20, 2025",
    posterUrl: "/images/image.jpg",
    id: "cultural-night-2025",
  },
];

export default function HomePage() {
  const handlePrimaryClick = () => {
    const eventsSection = document.getElementById("events");
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className={styles.main}>
      <Hero
        headline={{ line1: "VCET-EVENTGO", line2: "Your College Events Hub" }}
        subtitle="Discover, share, and never miss out on what's happening on campus. All events, one place."
        buttons={{
          primary: { text: "Explore Events", onClick: handlePrimaryClick },
        }}
      />

      {/* The sections now follow the hero directly */}
      <section id="events" className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Upcoming Events</h2>
          <div className={styles.eventGrid}>
            {mockEvents.map((event) => (
              <Link href={`/events/${event.id}`} key={event.id}>
                <EventCard event={event} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <About />
    </main>
  );
}

