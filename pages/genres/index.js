// pages/genres.js
import Link from 'next/link';
import styles from './Genres.module.css';

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/genres');
  const genres = await res.json();
  return {
    props: {
      genres,
    },
  };
}

export default function Genres({ genres }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Book Genres</h1>
      <ul className={styles.genreList}>
        {genres.map((genre) => (
          <li key={genre.id} className={styles.genreItem}>
            <Link href={`/genres/${genre.id}`} legacyBehavior>
              <a className={styles.genreLink}>{genre.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
