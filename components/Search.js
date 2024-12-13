// components/Search.js
import { useState } from 'react';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    const existingSearches = JSON.parse(localStorage.getItem('searchHistory')) || [];

    if (!existingSearches.includes(searchTerm)) {
      existingSearches.push(searchTerm);
      localStorage.setItem('searchHistory', JSON.stringify(existingSearches));

      // Fetch search results from the API
      const res = await fetch(`/api/books?search=${searchTerm}`);
      const books = await res.json();
      console.log('Search results:', books);
    }

    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for books..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
