// components/SearchBar.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchTerm) {
      storeSearchTerm(searchTerm);

      const res = await fetch(`/api/books?search=${searchTerm}`);
      const book = await res.json();

      if (book) {
        router.push(`/books/${book.id}`);
      } else {
        alert('Book not found');
      }
    }
  };

  const storeSearchTerm = (term) => {
    const existingSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    existingSearches.push(term);
    const uniqueSearches = [...new Set(existingSearches)];
    localStorage.setItem('recentSearches', JSON.stringify(uniqueSearches));
  };

  return (
    <form onSubmit={handleSearch} className={styles.searchForm}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for books..."
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>Search</button>
    </form>
  );
}
