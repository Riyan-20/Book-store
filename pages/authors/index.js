// pages/authors.js
import useSWR from 'swr';
import styles from './Authors.module.css';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Authors() {
  const { data, error } = useSWR('/api/authors', fetcher);

  if (error) return <div>Failed to load authors.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>List of Authors</h1>
      <ul className={styles.authorList}>
        {data.map((author) => (
          <li key={author.id} className={styles.authorItem}>
            {author.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
