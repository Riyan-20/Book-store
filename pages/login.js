// pages/login.js
import { useState, useContext } from 'react';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies'; // To set cookies for persistent login
import styles from './Login.module.css';

const LoginContent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Save the token in cookies for persistent login
      setCookie(null, 'token', data.token, { path: '/' });

      // Call the login function in context to manage the user state
      login(data.token, data.user);

      // Redirect to the page they were trying to access (or homepage if none)
      const redirectTo = router.query.redirect || '/';
      router.push(redirectTo);
    } else {
      setError(data.error); // Show error message
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Login</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={styles.input}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
};

const Login = () => {
  return (
    <AuthProvider>
      <LoginContent />
    </AuthProvider>
  );
};

export default Login;
