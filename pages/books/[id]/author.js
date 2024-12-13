// pages/books/[id]/author.js
import data from '../../../public/data/books.json';
import styles from './AuthorDetails.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export async function getStaticPaths() {
  const paths = data.authors.map(author => ({
    params: { id: author.id },
  }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const author = data.authors.find(a => a.id === params.id);

  if (!author) return { notFound: true };

  return { props: { author }, revalidate: 10 };
}

export default function AuthorDetails({ author }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in (e.g., check for a cookie)
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");

    if (!token) {
      // Redirect to login page if not logged in
      router.push('/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  if (!isLoggedIn) return null; // Show nothing until login status is checked

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{author.name}</h1>
      <p className={styles.bio}>{author.biography}</p>
    </div>
  );
}
