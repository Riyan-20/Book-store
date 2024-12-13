// pages/search.js
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(recentSearches);
  }, []);

  return (
    <div>
      <h1>Search Page</h1>
      <h2>Recent Searches</h2>
      {recentSearches.length === 0 ? (
        <p>No recent searches.</p>
      ) : (
        <ul>
          {recentSearches.map((search, index) => (
            <li key={index}>{search}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
