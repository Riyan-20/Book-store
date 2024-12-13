// context/AuthContext.js
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);  // Store the token

  useEffect(() => {
    // Check if the user is already logged in (via token)
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (token) => {
    setToken(token);
    localStorage.setItem('token', token);  // Store token in localStorage
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');  // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
