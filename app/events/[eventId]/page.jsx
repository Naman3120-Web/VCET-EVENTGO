"use client"; // Add this because we use the useRouter hook

import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.eventId || 'Unknown Event';

  // Capitalize the first letter and replace dashes with spaces for a cleaner title
  const formattedEventId = eventId.charAt(0).toUpperCase() + eventId.slice(1).replace(/-/g, ' ');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Event Details</h1>
      <p className={styles.eventInfo}>
        You are viewing the page for: <strong>{formattedEventId}</strong>
      </p>
      <p className={styles.comingSoon}>
        Full event details will be displayed here soon.
      </p>
      <Link href="/" className={styles.backLink}>
        &larr; Back to Home
      </Link>
    </div>
  );
}
