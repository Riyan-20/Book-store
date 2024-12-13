// pages/books/index.js
import { useState } from 'react';
import BookCard from '../../components/BookCard';
import styles from './BookList.module.css';

export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:3000/api/books');
    if (!res.ok) {
      throw new Error('Failed to fetch books');
    }
    const books = await res.json();

    const genresRes = await fetch('http://localhost:3000/api/genres');
    if (!genresRes.ok) {
      throw new Error('Failed to fetch genres');
    }
    const genres = await genresRes.json();

    if (!books || books.length === 0) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        books,
        genres,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        books: [],
        genres: [],
      },
    };
  }
}

export default function BookList({ books, genres }) {
  const [selectedGenre, setSelectedGenre] = useState('');

  const filteredBooks = selectedGenre
    ? books.filter(book => book.genreId === selectedGenre)
    : books;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Book List</h1>

      <div className={styles.filterContainer}>
        <label htmlFor="genre-select">Filter by Genre:</label>
        <select
          id="genre-select"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.bookList}>
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
