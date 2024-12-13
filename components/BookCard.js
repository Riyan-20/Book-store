// components/BookCard.js
import Link from 'next/link';
import styles from './BookCard.module.css';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function BookCard({ book }) {
  const { data: author, error } = useSWR(`/api/authors?id=${book.authorId}`, fetcher);

  if (error) return <div>Failed to load author information.</div>;
  if (!author) return <div>Loading author information...</div>;

  const authorName = author ? author.name : 'Unknown Author';

  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>{book.title}</h2>
      <p className={styles.cardAuthor}>By {authorName}</p>
      <p className={styles.cardPrice}>Price: ${book.price}</p>
      <Link href={`/books/${book.id}`} className={styles.link}>
        View Details
      </Link>
    </div>
  );
}
