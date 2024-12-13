// pages/index.js
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import data from '../public/data/books.json';
import BookCard from '../components/BookCard';
import styles from './Home.module.css';
import SearchBar from '../components/SearchBar';
import { destroyCookie } from 'nookies'; // Import nookies to destroy cookies

const HomeContent = () => {
  const router = useRouter();
  const { user, token, logout } = useContext(AuthContext);
  const featuredBooks = data.books.slice(0, 4);

  // Handle logout functionality
  const handleLogout = async () => {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    if (res.ok) {
      logout();
      destroyCookie(null, 'token', { path: '/' });
      router.push('/login');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Welcome to the Book Store</h1>
        
        {user && user.email && (
          <p className={styles.userEmail}>Logged in as: {user.email}</p>
        )}

        <div className={styles.authButtons}>
          {token ? (
            <button onClick={handleLogout} className={styles.button}>Logout</button>
          ) : (
            <button onClick={() => router.push('/login')} className={styles.button}>Login</button>
          )}
        </div>
      </div>

      <SearchBar />
      <h2 className={styles.heading}>Featured Books</h2>
      <div className={styles.featuredBooks}>
        {featuredBooks.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <div className={styles.buttonContainer}>
        <button onClick={() => router.push('/books')} className={styles.button}>View Books</button>
        <button onClick={() => router.push('/authors')} className={styles.button}>View Authors</button>
        <button onClick={() => router.push('/genres')} className={styles.button}>View Genres</button>

        {/* Only show this button if the user is logged in */}
        {token && (
          <button onClick={() => router.push('/search')} className={styles.button}>View Recent Searches</button>
        )}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <AuthProvider>
      <HomeContent />
    </AuthProvider>
  );
};

export default Home;
