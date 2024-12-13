// pages/books/[id]/author.js
import data from '../../../public/data/books.json';
import styles from './AuthorDetails.module.css';

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
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{author.name}</h1>
      <p className={styles.bio}>{author.biography}</p>
    </div>
  );
}
