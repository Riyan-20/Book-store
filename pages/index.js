// pages/index.js
import { useRouter } from 'next/router';
import data from '../public/data/books.json';
import BookCard from '../components/BookCard';
import styles from './Home.module.css';
import SearchBar from '../components/SearchBar'; 

export default function Home() {
  const router = useRouter();
  const featuredBooks = data.books.slice(0, 4);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to the Book Store</h1>
      <SearchBar />
      <h2 className={styles.heading}>Featured Books</h2>
      <div className={styles.featuredBooks}>
        {featuredBooks.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <div className={styles.buttonContainer}>
        <button onClick={() => router.push('/books')} className={styles.button}>
          View Books
        </button>
        <button onClick={() => router.push('/authors')} className={styles.button}>
          View Authors
        </button>
        <button onClick={() => router.push('/genres')} className={styles.button}>
          View Genres
        </button>
        <button onClick={() => router.push('/search')} className={styles.button}>
          View Recent Searches
        </button>
      </div>
    </div>
  );
}
