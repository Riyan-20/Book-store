// pages/genres/[genreId].js
import { useRouter } from 'next/router';
import Link from 'next/link';
import BookCard from '../../components/BookCard';
import styles from './GenreBooks.module.css';

export async function getServerSideProps({ params }) {
  const { genreId } = params;
  const genreRes = await fetch(`http://localhost:3000/api/genres/${genreId}`);
  const genre = await genreRes.json();

  if (genreRes.status !== 200 || !genre) {
    return { notFound: true };
  }

  const booksRes = await fetch(`http://localhost:3000/api/books?genreId=${genreId}`);
  const books = await booksRes.json();

  return {
    props: { genre, books },
  };
}

export default function GenreBooks({ genre, books }) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Books in {genre.name}</h1>
      <div className={styles.bookList}>
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <button onClick={() => router.push('/genres')} className={styles.backButton}>
        Back to Genres
      </button>
    </div>
  );
}
