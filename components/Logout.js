// components/Logout.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';

export default function Logout() {
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login'); // Redirect to login page
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}
