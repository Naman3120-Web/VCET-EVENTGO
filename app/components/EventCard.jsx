import Image from 'next/image';
import Link from 'next/link';
import styles from './EventCard.module.css';

// Defines EventCard as a valid React functional component
const EventCard = ({ event }) => {
  if (!event) {
    return null;
  }

  return (
    <Link href={`/events/${event.title.toLowerCase().replace(/\s+/g, '-')}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={event.posterUrl}
          alt={`${event.title} Poster`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.posterImage}
        />
      </div>
      <div className={styles.content}>
        <span className={styles.department}>{event.department}</span>
        <h3 className={styles.title}>{event.title}</h3>
        <p className={styles.summary}>{event.summary}</p>
        <div className={styles.footer}>
          <span className={styles.date}>{event.date}</span>
        </div>
      </div>
    </Link>
  );
};

// Ensures the component is exported correctly
export default EventCard;

